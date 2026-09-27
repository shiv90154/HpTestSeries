import "server-only";
import { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import { createRazorpayOrder, razorpayPublicKey, verifyCheckoutSignature } from "@/lib/razorpay";

export type CheckoutOrder = {
  orderId: string;
  razorpayOrderId: string;
  amountPaise: number;
  keyId: string;
  productTitle: string;
};

/** Creates a local Order plus the matching Razorpay order, ready to hand to Razorpay Checkout. */
export async function createOrderForProduct(userId: string, productSlug: string): Promise<CheckoutOrder | { error: string }> {
  const product = await db.product.findUnique({ where: { slug: productSlug } });
  if (!product || !product.isActive) return { error: "This product is not available." };

  const order = await db.order.create({
    data: { userId, productId: product.id, amountPaise: product.priceInPaise, status: "CREATED" },
  });

  try {
    const rpOrder = await createRazorpayOrder({
      amountPaise: product.priceInPaise,
      receipt: order.id,
      notes: { userId, productSlug },
    });
    await db.order.update({ where: { id: order.id }, data: { razorpayOrderId: rpOrder.id } });
    return {
      orderId: order.id,
      razorpayOrderId: rpOrder.id,
      amountPaise: product.priceInPaise,
      keyId: razorpayPublicKey(),
      productTitle: product.title,
    };
  } catch (err) {
    await db.order.update({ where: { id: order.id }, data: { status: "FAILED" } });
    throw err;
  }
}

/**
 * Confirms a payment reported by Razorpay Checkout's client-side handler, so access unlocks
 * immediately. The Razorpay webhook (commerce/webhook.ts) is the source of truth and also covers
 * payments whose callback never arrives (tab closed, network drop).
 */
export async function confirmCheckoutPayment(opts: {
  userId: string;
  orderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}): Promise<{ ok: true } | { error: string }> {
  const order = await db.order.findUnique({ where: { id: opts.orderId }, include: { product: true } });
  if (!order || order.userId !== opts.userId) return { error: "Order not found." };
  if (!order.razorpayOrderId) return { error: "Order was never sent to Razorpay." };

  if (order.status === "PAID") return { ok: true }; // idempotent

  const valid = verifyCheckoutSignature({
    razorpayOrderId: order.razorpayOrderId,
    razorpayPaymentId: opts.razorpayPaymentId,
    razorpaySignature: opts.razorpaySignature,
  });
  if (!valid) return { error: "Payment signature could not be verified." };

  await fulfillOrder(order, opts.razorpayPaymentId, opts);
  return { ok: true };
}

/**
 * Marks an order PAID and grants its entitlement. Idempotent: the checkout callback and the
 * webhook may both arrive (even concurrently) for the same payment.
 */
export async function fulfillOrder(
  order: { id: string; userId: string; productId: string; product: { validUntil: Date | null; validityDays: number | null } },
  razorpayPaymentId: string,
  raw: Prisma.InputJsonValue,
): Promise<void> {
  const now = new Date();
  const expiresAt = order.product.validUntil ?? new Date(now.getTime() + (order.product.validityDays ?? 365) * 86_400_000);

  try {
    await db.$transaction([
      db.order.update({ where: { id: order.id }, data: { status: "PAID" } }),
      db.payment.upsert({
        where: { razorpayPaymentId },
        create: { orderId: order.id, razorpayPaymentId, status: "captured", raw },
        update: {},
      }),
      db.entitlement.upsert({
        where: { orderId: order.id },
        create: {
          userId: order.userId,
          productId: order.productId,
          source: "PURCHASE",
          startsAt: now,
          expiresAt,
          orderId: order.id,
        },
        update: {},
      }),
    ]);
  } catch (err) {
    // A concurrent fulfilment of the same payment won the unique-key race; it already did the work.
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") return;
    throw err;
  }
}

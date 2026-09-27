import "server-only";
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
 * Confirms a payment reported by Razorpay Checkout's client-side handler. This is a stopgap for
 * local/dev testing — BLUEPRINT §17 requires the `payment.captured` webhook as the actual source
 * of truth once the site has a public URL, since a client callback alone can be spoofed or dropped.
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

  const now = new Date();
  const expiresAt = order.product.validUntil ?? new Date(now.getTime() + (order.product.validityDays ?? 365) * 86_400_000);

  await db.$transaction([
    db.order.update({ where: { id: order.id }, data: { status: "PAID" } }),
    db.payment.upsert({
      where: { razorpayPaymentId: opts.razorpayPaymentId },
      create: { orderId: order.id, razorpayPaymentId: opts.razorpayPaymentId, status: "captured", raw: opts },
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

  return { ok: true };
}

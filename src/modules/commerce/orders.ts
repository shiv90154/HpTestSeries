import "server-only";
import { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import { logError } from "@/lib/logger";
import { consumeRateLimit } from "@/lib/rate-limit";
import { createRazorpayOrder, fetchOrderPayments, razorpayPublicKey, verifyCheckoutSignature } from "@/lib/razorpay";
import { recordRedemption, quoteCoupon } from "./coupon-service";
import { renewalStart } from "./ownership";
import { getOwnership } from "./purchases";
import { paymentMatchesOrder } from "./webhook-event";

export type CheckoutOrder = {
  orderId: string;
  razorpayOrderId: string;
  amountPaise: number;
  keyId: string;
  productTitle: string;
};

export type CreateOrderResult = CheckoutOrder | { free: true; orderId: string } | { error: string };

type OrderForFulfilment = {
  id: string;
  userId: string;
  productId: string;
  couponId: string | null;
  product: { validUntil: Date | null; validityDays: number | null };
};

/** Price quote for the buy page's coupon box. */
export async function quoteForProduct(userId: string, productSlug: string, code: string) {
  const product = await db.product.findUnique({ where: { slug: productSlug }, select: { priceInPaise: true, isActive: true } });
  if (!product || !product.isActive) return { error: "This product is not available." };
  return quoteCoupon(userId, code, product.priceInPaise);
}

/**
 * Creates a local Order plus the matching Razorpay order, ready to hand to Razorpay Checkout.
 * A coupon that brings the price to zero skips Razorpay and grants access straight away.
 */
export async function createOrderForProduct(userId: string, productSlug: string, couponCode?: string): Promise<CreateOrderResult> {
  if (!(await consumeRateLimit(`order:${userId}`, 10 * 60, 10))) {
    return { error: "Too many payment attempts. Please wait a few minutes and try again." };
  }
  const product = await db.product.findUnique({ where: { slug: productSlug } });
  if (!product || !product.isActive) return { error: "This product is not available." };

  // The buy page hides the button in this case; this guards against a stale page or a double tab.
  const own = await getOwnership(userId, product.id);
  if (own.kind === "owned") {
    const until = own.until.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
    return { error: `You already have access${own.via === "same" ? "" : ` through ${own.viaTitle}`} until ${until}.` };
  }

  let amountPaise = product.priceInPaise;
  let discountPaise = 0;
  let couponId: string | null = null;
  if (couponCode?.trim()) {
    const quote = await quoteCoupon(userId, couponCode, product.priceInPaise);
    if ("error" in quote) return quote;
    amountPaise = quote.finalPaise;
    discountPaise = quote.discountPaise;
    couponId = quote.couponId;
  }

  if (amountPaise === 0) {
    const order = await db.order.create({
      data: { userId, productId: product.id, amountPaise: 0, discountPaise, couponId, status: "CREATED" },
      include: { product: true },
    });
    await fulfillOrder(order, null, {});
    return { free: true, orderId: order.id };
  }

  const order = await db.order.create({
    data: { userId, productId: product.id, amountPaise, discountPaise, couponId, status: "CREATED" },
  });

  try {
    const rpOrder = await createRazorpayOrder({
      amountPaise,
      receipt: order.id,
      notes: { userId, productSlug },
    });
    await db.order.update({ where: { id: order.id }, data: { razorpayOrderId: rpOrder.id } });
    return {
      orderId: order.id,
      razorpayOrderId: rpOrder.id,
      amountPaise,
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
 * webhook may both arrive (even concurrently) for the same payment. `razorpayPaymentId` is null
 * for orders a 100% coupon made free.
 */
export async function fulfillOrder(order: OrderForFulfilment, razorpayPaymentId: string | null, raw: Prisma.InputJsonValue): Promise<void> {
  const now = new Date();
  // A renewal bought before the current period ends starts when that period ends, so no paid days are lost.
  const current = order.product.validUntil
    ? []
    : await db.entitlement.findMany({
        where: { userId: order.userId, productId: order.productId, revokedAt: null, expiresAt: { gt: now }, NOT: { orderId: order.id } },
        select: { productId: true, expiresAt: true, revokedAt: true },
      });
  const startsAt = renewalStart(order.productId, current, now);
  const expiresAt = order.product.validUntil ?? new Date(startsAt.getTime() + (order.product.validityDays ?? 365) * 86_400_000);

  try {
    await db.$transaction([
      db.order.update({ where: { id: order.id }, data: { status: "PAID" } }),
      ...(razorpayPaymentId
        ? [
            db.payment.upsert({
              where: { razorpayPaymentId },
              create: { orderId: order.id, razorpayPaymentId, status: "captured", raw },
              update: {},
            }),
          ]
        : []),
      db.entitlement.upsert({
        where: { orderId: order.id },
        create: {
          userId: order.userId,
          productId: order.productId,
          source: razorpayPaymentId ? "PURCHASE" : "COUPON_FREE",
          startsAt,
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
  if (order.couponId) await recordRedemption(order.couponId).catch((e) => logError(e, { path: "coupon-redemption", userId: order.userId }));
}

/**
 * Safety net for payments whose webhook and browser callback both went missing: asks Razorpay about
 * every unpaid order from the last few days and fulfils the ones that were actually paid.
 */
export async function reconcilePendingOrders(): Promise<{ checked: number; recovered: number; errors: number }> {
  const pending = await db.order.findMany({
    where: {
      status: { in: ["CREATED", "FAILED"] },
      razorpayOrderId: { not: null },
      createdAt: { gt: new Date(Date.now() - 3 * 86_400_000), lt: new Date(Date.now() - 2 * 60_000) },
    },
    include: { product: true },
    orderBy: { createdAt: "desc" },
    take: 200,
  });
  let recovered = 0;
  let errors = 0;
  for (const order of pending) {
    try {
      const payments = await fetchOrderPayments(order.razorpayOrderId!);
      const paid = payments.find((p) => p.status === "captured" && paymentMatchesOrder({ amountPaise: p.amount, currency: p.currency }, order));
      if (paid) {
        await fulfillOrder(order, paid.id, paid as unknown as Prisma.InputJsonValue);
        recovered++;
      }
    } catch (err) {
      errors++;
      await logError(err, { path: "reconcile", userId: order.userId });
    }
  }
  return { checked: pending.length, recovered, errors };
}

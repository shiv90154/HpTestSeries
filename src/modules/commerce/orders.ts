import "server-only";
import { randomBytes } from "node:crypto";
import { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import { logError } from "@/lib/logger";
import { consumeRateLimit } from "@/lib/rate-limit";
import { createRazorpayOrder, fetchOrderPayments, razorpayPublicKey, verifyCheckoutSignature } from "@/lib/razorpay";
import { recordRedemption, quoteCoupon } from "./coupon-service";
import { renewalStart } from "./ownership";
import { rewardReferrer } from "./referral";
import { getOwnership } from "./purchases";
import { confirmSpendOp, createOrderWithWallet, releaseOrderReservation } from "./wallet";
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
  userId: string | null; // null: guest order, access is granted when it is claimed (claimGuestOrders)
  productId: string;
  couponId: string | null;
  walletPaise: number; // part paid from the HP wallet; reserved when the order was created, confirmed when it is paid
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
 * With `useWallet` the student's HP wallet pays first and Razorpay charges only the rest. If a coupon and/or the
 * wallet bring the price to zero, Razorpay is skipped and access is granted straight away.
 */
export async function createOrderForProduct(userId: string, productSlug: string, couponCode?: string, useWallet = false): Promise<CreateOrderResult> {
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

  // The order's amountPaise is the cash part; a wallet reservation (if any) is made in the same transaction.
  const order = await createOrderWithWallet({ userId, productId: product.id, totalPaise: amountPaise, discountPaise, couponId, useWallet: useWallet && amountPaise > 0 });
  if (order.amountPaise === 0) {
    await fulfillOrder(order, null, {});
    return { free: true, orderId: order.id };
  }

  try {
    const rpOrder = await createRazorpayOrder({
      amountPaise: order.amountPaise,
      receipt: order.id,
      notes: { userId, productSlug },
    });
    await db.order.update({ where: { id: order.id }, data: { razorpayOrderId: rpOrder.id } });
    return {
      orderId: order.id,
      razorpayOrderId: rpOrder.id,
      amountPaise: order.amountPaise,
      keyId: razorpayPublicKey(),
      productTitle: product.title,
    };
  } catch (err) {
    await db.order.update({ where: { id: order.id }, data: { status: "FAILED" } });
    await releaseOrderReservation(order.id).catch((e) => logError(e, { path: "wallet-release", userId }));
    throw err;
  }
}

/**
 * Checkout for a buyer who is not logged in. The order belongs to nobody yet: the caller keeps the returned
 * `claimToken` in the buyer's browser, and once they sign in claimGuestOrders() attaches the order to their
 * account and grants the access. Coupons and the wallet need an account, so guests pay the list price.
 */
export async function createGuestOrderForProduct(productSlug: string): Promise<(CheckoutOrder & { claimToken: string }) | { error: string }> {
  const product = await db.product.findUnique({ where: { slug: productSlug } });
  if (!product || !product.isActive) return { error: "This product is not available." };
  if (product.priceInPaise <= 0) return { error: "Please log in to get this product." };

  const claimToken = randomBytes(24).toString("base64url");
  const order = await db.order.create({
    data: { userId: null, claimToken, productId: product.id, amountPaise: product.priceInPaise, status: "CREATED" },
  });
  try {
    const rpOrder = await createRazorpayOrder({ amountPaise: order.amountPaise, receipt: order.id, notes: { guest: "1", productSlug } });
    await db.order.update({ where: { id: order.id }, data: { razorpayOrderId: rpOrder.id } });
    return { orderId: order.id, razorpayOrderId: rpOrder.id, amountPaise: order.amountPaise, keyId: razorpayPublicKey(), productTitle: product.title, claimToken };
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
  userId: string | null; // null: the buyer is not logged in (guest order)
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

  // The signature already proves the payment. For a guest order also ask Razorpay who paid, so the buyer can
  // still claim it from another device by email; failing to reach Razorpay must not fail a verified payment.
  let raw: Prisma.InputJsonValue = opts;
  if (order.userId === null) {
    const payment = await fetchOrderPayments(order.razorpayOrderId)
      .then((ps) => ps.find((p) => p.id === opts.razorpayPaymentId))
      .catch(() => undefined);
    if (payment) raw = payment as unknown as Prisma.InputJsonValue;
  }
  await fulfillOrder(order, opts.razorpayPaymentId, raw);
  return { ok: true };
}

/**
 * Marks an order PAID and grants its entitlement. Idempotent: the checkout callback and the
 * webhook may both arrive (even concurrently) for the same payment. `razorpayPaymentId` is null
 * for orders a 100% coupon made free.
 */
export async function fulfillOrder(order: OrderForFulfilment, razorpayPaymentId: string | null, raw: Prisma.InputJsonValue): Promise<void> {
  const grant = order.userId ? await entitlementGrant(order.userId, order) : null;
  const payerEmail = order.userId ? undefined : payerEmailFrom(raw);

  try {
    await db.$transaction([
      db.order.update({ where: { id: order.id }, data: { status: "PAID", ...(payerEmail && { payerEmail }) } }),
      ...(order.userId && order.walletPaise > 0 ? [confirmSpendOp({ id: order.id, userId: order.userId, walletPaise: order.walletPaise })] : []),
      ...(razorpayPaymentId
        ? [
            db.payment.upsert({
              where: { razorpayPaymentId },
              create: { orderId: order.id, razorpayPaymentId, status: "captured", raw },
              update: {},
            }),
          ]
        : []),
      // A guest order has nobody to give access to yet; claimGuestOrders() does it once they sign in.
      ...(grant && order.userId
        ? [
            db.entitlement.upsert({
              where: { orderId: order.id },
              create: { userId: order.userId, productId: order.productId, source: razorpayPaymentId || order.walletPaise > 0 ? "PURCHASE" : "COUPON_FREE", orderId: order.id, ...grant },
              update: {},
            }),
          ]
        : []),
    ]);
  } catch (err) {
    // A concurrent fulfilment of the same payment won the unique-key race; it already did the work.
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") return;
    throw err;
  }
  if (order.couponId) {
    await recordRedemption(order.couponId).catch((e) => logError(e, { path: "coupon-redemption", userId: order.userId ?? undefined }));
    await rewardReferrer(order.id).catch((e) => logError(e, { path: "referral-reward", userId: order.userId ?? undefined }));
  }
  // A guest order may have been claimed while this payment was being recorded; then it is owed its access now.
  if (!order.userId) await grantIfPaid(order.id);
}

/** Grants the access of a PAID order that now has an owner. Idempotent (one entitlement per order). */
async function grantIfPaid(orderId: string): Promise<boolean> {
  const order = await db.order.findUnique({ where: { id: orderId }, include: { product: true } });
  if (!order?.userId || order.status !== "PAID") return false;
  const grant = await entitlementGrant(order.userId, order);
  try {
    await db.entitlement.upsert({
      where: { orderId },
      create: { userId: order.userId, productId: order.productId, source: "PURCHASE", orderId, ...grant },
      update: {},
    });
  } catch (err) {
    // The other side of the claim/payment race already created it.
    if (!(err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002")) throw err;
  }
  return true;
}

/** When the access an order buys starts and ends for `userId`. */
async function entitlementGrant(userId: string, order: Pick<OrderForFulfilment, "id" | "productId" | "product">): Promise<{ startsAt: Date; expiresAt: Date }> {
  const now = new Date();
  // A renewal bought before the current period ends starts when that period ends, so no paid days are lost.
  const current = order.product.validUntil
    ? []
    : await db.entitlement.findMany({
        where: { userId, productId: order.productId, revokedAt: null, expiresAt: { gt: now }, NOT: { orderId: order.id } },
        select: { productId: true, expiresAt: true, revokedAt: true },
      });
  const startsAt = renewalStart(order.productId, current, now);
  const expiresAt = order.product.validUntil ?? new Date(startsAt.getTime() + (order.product.validityDays ?? 365) * 86_400_000);
  return { startsAt, expiresAt };
}

/** The buyer's email as Razorpay recorded it (payment entities carry `email`); ignores placeholder values. */
function payerEmailFrom(raw: Prisma.InputJsonValue): string | undefined {
  const email = raw && typeof raw === "object" && !Array.isArray(raw) ? (raw as Record<string, unknown>).email : undefined;
  if (typeof email !== "string") return undefined;
  const e = email.trim().toLowerCase();
  // Razorpay fills "void@razorpay.com" when the buyer gave no email (UPI / netbanking); it identifies nobody.
  return e.includes("@") && !e.endsWith(".invalid") && !e.endsWith("@razorpay.com") ? e : undefined;
}

/**
 * Attaches the guest orders a just-signed-in student paid for to their account and grants the access.
 * An order matches by the claim token in this browser's cookie (any status: the webhook may still be on its
 * way, and fulfillOrder then grants access to the now-owned order), or, once paid, by the email the buyer
 * gave Razorpay — which only counts because the account's email was verified by the login code / Google.
 * Safe to call repeatedly: an order is claimed by exactly one account, once.
 */
export async function claimGuestOrders(user: { id: string; email: string }, tokens: string[]): Promise<{ claimed: number; unlocked: number }> {
  const result = await attachGuestOrders(user, tokens);
  // The login redirect chain can render the claim step twice (e.g. router.replace + router.refresh); the second
  // pass finds nothing left to claim but must still report the purchase as unlocked, so count recent claims too.
  const recent = await db.order.count({ where: { userId: user.id, status: "PAID", claimedAt: { gt: new Date(Date.now() - 2 * 60_000) } } });
  return { claimed: result.claimed, unlocked: Math.max(result.unlocked, recent) };
}

async function attachGuestOrders(user: { id: string; email: string }, tokens: string[]): Promise<{ claimed: number; unlocked: number }> {
  const email = user.email.toLowerCase();
  const byEmail = email.endsWith(".invalid") ? [] : [{ status: "PAID" as const, payerEmail: email }];
  const matches = [...(tokens.length ? [{ claimToken: { in: tokens } }] : []), ...byEmail];
  if (!matches.length) return { claimed: 0, unlocked: 0 };
  const candidates = await db.order.findMany({ where: { userId: null, OR: matches }, include: { product: true }, take: 20 });

  let claimed = 0;
  let unlocked = 0;
  for (const order of candidates) {
    try {
      // The `userId: null` guard makes the claim atomic: of two racing claimers only one updates a row.
      const { count } = await db.order.updateMany({ where: { id: order.id, userId: null }, data: { userId: user.id, claimedAt: new Date() } });
      if (count !== 1) continue;
      claimed++;
      // Status is read after the claim: a payment landing at the same moment is then covered by one side or the other.
      if (await grantIfPaid(order.id)) unlocked++;
    } catch (err) {
      await logError(err, { path: "guest-claim", userId: user.id });
    }
  }
  return { claimed, unlocked };
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
      await logError(err, { path: "reconcile", userId: order.userId ?? undefined });
    }
  }
  return { checked: pending.length, recovered, errors };
}

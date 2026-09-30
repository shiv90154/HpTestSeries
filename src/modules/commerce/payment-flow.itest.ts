import "dotenv/config";
import { createHmac, randomBytes } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// Needs RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET (test keys) and RAZORPAY_WEBHOOK_SECRET in .env.
process.env.RAZORPAY_WEBHOOK_SECRET ||= "itest_webhook_secret";
const KEY_ID = process.env.RAZORPAY_KEY_ID ?? "";
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET ?? "";
const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET!;

const { db } = await import("@/lib/db");
const { claimGuestOrders, confirmCheckoutPayment, createGuestOrderForProduct, createOrderForProduct, reconcilePendingOrders } = await import("./orders");
const { handleRazorpayWebhook } = await import("./webhook");
const { quoteCoupon } = await import("./coupon-service");

const tag = randomBytes(4).toString("hex");
const P_PRICE = 14900;
let productId = "";
let productSlug = "";
const userIds: string[] = [];
const couponIds: string[] = [];

async function newUser(label: string) {
  const u = await db.user.create({ data: { name: `IT ${label}`, email: `it-${tag}-${label}@example.com` } });
  userIds.push(u.id);
  return u.id;
}

const checkoutSig = (orderId: string, paymentId: string) => createHmac("sha256", KEY_SECRET).update(`${orderId}|${paymentId}`).digest("hex");

function webhook(event: string, o: { rpOrderId: string; paymentId: string; amount: number; currency?: string }) {
  const body = JSON.stringify({
    event,
    payload: { payment: { entity: { id: o.paymentId, order_id: o.rpOrderId, amount: o.amount, currency: o.currency ?? "INR", status: "captured" } } },
  });
  const sig = createHmac("sha256", WEBHOOK_SECRET).update(body).digest("hex");
  return { body, sig };
}

function isCheckout(r: Awaited<ReturnType<typeof createOrderForProduct>>): r is Extract<typeof r, { razorpayOrderId: string }> {
  return "razorpayOrderId" in r;
}

beforeAll(async () => {
  expect(KEY_ID).toMatch(/^rzp_test_/); // never run against live keys
  productSlug = `it-pass-${tag}`;
  const p = await db.product.create({ data: { slug: productSlug, title: `IT Pass ${tag}`, kind: "PASS", priceInPaise: P_PRICE, validityDays: 30, isActive: true } });
  productId = p.id;
});

afterAll(async () => {
  await db.entitlement.deleteMany({ where: { userId: { in: userIds } } });
  await db.payment.deleteMany({ where: { order: { userId: { in: userIds } } } });
  await db.order.deleteMany({ where: { userId: { in: userIds } } });
  await db.coupon.deleteMany({ where: { id: { in: couponIds } } });
  // Guest orders that were never claimed have no user to be cleaned up by.
  await db.payment.deleteMany({ where: { order: { productId } } });
  await db.entitlement.deleteMany({ where: { productId } });
  await db.order.deleteMany({ where: { productId } });
  await db.product.delete({ where: { id: productId } });
  await db.user.deleteMany({ where: { id: { in: userIds } } });
  await db.rateLimit.deleteMany({ where: { key: { in: userIds.map((id) => `order:${id}`) } } });
  await db.$disconnect();
});

describe("checkout callback path (real Razorpay test API)", () => {
  it("creates a real Razorpay order with the right amount, then unlocks access on a valid signature", async () => {
    const userId = await newUser("cb");
    const order = await createOrderForProduct(userId, productSlug);
    if (!isCheckout(order)) throw new Error(JSON.stringify(order));
    expect(order.razorpayOrderId).toMatch(/^order_/);
    expect(order.amountPaise).toBe(P_PRICE);
    expect(order.keyId).toBe(KEY_ID);

    // Ask Razorpay itself to confirm the order exists with that amount.
    const res = await fetch(`https://api.razorpay.com/v1/orders/${order.razorpayOrderId}`, { headers: { Authorization: "Basic " + Buffer.from(`${KEY_ID}:${KEY_SECRET}`).toString("base64") } });
    const rp = (await res.json()) as { amount: number; status: string; receipt: string };
    expect(rp).toMatchObject({ amount: P_PRICE, status: "created", receipt: order.orderId });

    const bad = await confirmCheckoutPayment({ userId, orderId: order.orderId, razorpayPaymentId: "pay_fake1", razorpaySignature: "deadbeef" });
    expect(bad).toEqual({ error: "Payment signature could not be verified." });
    expect((await db.order.findUnique({ where: { id: order.orderId } }))?.status).toBe("CREATED");

    // Someone else's order can't be confirmed.
    const other = await newUser("cb-other");
    expect(await confirmCheckoutPayment({ userId: other, orderId: order.orderId, razorpayPaymentId: "pay_fake1", razorpaySignature: checkoutSig(order.razorpayOrderId, "pay_fake1") })).toEqual({ error: "Order not found." });

    const ok = await confirmCheckoutPayment({ userId, orderId: order.orderId, razorpayPaymentId: "pay_cb1" + tag, razorpaySignature: checkoutSig(order.razorpayOrderId, "pay_cb1" + tag) });
    expect(ok).toEqual({ ok: true });
    expect((await db.order.findUnique({ where: { id: order.orderId } }))?.status).toBe("PAID");
    const ent = await db.entitlement.findUnique({ where: { orderId: order.orderId } });
    expect(ent?.source).toBe("PURCHASE");
    expect((ent!.expiresAt.getTime() - ent!.startsAt.getTime()) / 86_400_000).toBeCloseTo(30, 0);

    // Idempotent: confirming again changes nothing.
    expect(await confirmCheckoutPayment({ userId, orderId: order.orderId, razorpayPaymentId: "pay_cb1" + tag, razorpaySignature: checkoutSig(order.razorpayOrderId, "pay_cb1" + tag) })).toEqual({ ok: true });
    expect(await db.payment.count({ where: { orderId: order.orderId } })).toBe(1);
    expect(await db.entitlement.count({ where: { orderId: order.orderId } })).toBe(1);

    // Already owns it -> a second purchase is refused.
    const again = await createOrderForProduct(userId, productSlug);
    expect(again).toHaveProperty("error");
  });
});

describe("guest checkout (pay first, sign in later)", () => {
  it("holds a paid guest order without access, then grants it to the account that claims it", async () => {
    const order = await createGuestOrderForProduct(productSlug);
    if ("error" in order) throw new Error(order.error);
    expect(order.claimToken).toMatch(/^[A-Za-z0-9_-]{32}$/);
    expect(await db.order.findUnique({ where: { id: order.orderId } })).toMatchObject({ userId: null, status: "CREATED" });

    // A signed-in user can't confirm a guest order as their own.
    const stranger = await newUser("g-stranger");
    const pay = "pay_g1" + tag;
    const sig = checkoutSig(order.razorpayOrderId, pay);
    expect(await confirmCheckoutPayment({ userId: stranger, orderId: order.orderId, razorpayPaymentId: pay, razorpaySignature: sig })).toEqual({ error: "Order not found." });

    expect(await confirmCheckoutPayment({ userId: null, orderId: order.orderId, razorpayPaymentId: pay, razorpaySignature: sig })).toEqual({ ok: true });
    expect(await db.order.findUnique({ where: { id: order.orderId } })).toMatchObject({ userId: null, status: "PAID" });
    expect(await db.entitlement.count({ where: { orderId: order.orderId } })).toBe(0);

    // The wrong token claims nothing; the right one attaches the order and unlocks it, exactly once.
    const buyer = await newUser("g-buyer");
    const buyerEmail = `it-${tag}-g-buyer@example.com`;
    expect(await claimGuestOrders({ id: buyer, email: buyerEmail }, ["x".repeat(32)])).toEqual({ claimed: 0, unlocked: 0 });
    expect(await claimGuestOrders({ id: buyer, email: buyerEmail }, [order.claimToken])).toEqual({ claimed: 1, unlocked: 1 });
    expect(await db.entitlement.findUnique({ where: { orderId: order.orderId } })).toMatchObject({ userId: buyer, productId, source: "PURCHASE" });
    expect(await claimGuestOrders({ id: stranger, email: "s@example.com" }, [order.claimToken])).toEqual({ claimed: 0, unlocked: 0 });
    expect(await db.entitlement.count({ where: { orderId: order.orderId } })).toBe(1);
  });

  it("claims an order still awaiting its webhook, and the webhook then grants the access", async () => {
    const order = await createGuestOrderForProduct(productSlug);
    if ("error" in order) throw new Error(order.error);
    const buyer = await newUser("g-early");
    expect(await claimGuestOrders({ id: buyer, email: `it-${tag}-g-early@example.com` }, [order.claimToken])).toEqual({ claimed: 1, unlocked: 0 });

    const w = webhook("payment.captured", { rpOrderId: order.razorpayOrderId, paymentId: "pay_g2" + tag, amount: P_PRICE });
    expect(await handleRazorpayWebhook(w.body, w.sig)).toBe(200);
    expect(await db.entitlement.findUnique({ where: { orderId: order.orderId } })).toMatchObject({ userId: buyer });
  });

  it("lets the email given to Razorpay claim a paid order without the cookie", async () => {
    const order = await createGuestOrderForProduct(productSlug);
    if ("error" in order) throw new Error(order.error);
    await db.order.update({ where: { id: order.orderId }, data: { status: "PAID", payerEmail: `it-${tag}-g-mail@example.com` } });
    const buyer = await newUser("g-mail");
    expect(await claimGuestOrders({ id: buyer, email: `IT-${tag}-g-mail@example.com` }, [])).toEqual({ claimed: 1, unlocked: 1 });
  });
});

describe("webhook path", () => {
  it("rejects a bad signature and a missing one", async () => {
    const w = webhook("payment.captured", { rpOrderId: "order_x", paymentId: "pay_x", amount: 100 });
    expect(await handleRazorpayWebhook(w.body, "0".repeat(64))).toBe(400);
    expect(await handleRazorpayWebhook(w.body, null)).toBe(400);
    expect(await handleRazorpayWebhook("not json", createHmac("sha256", WEBHOOK_SECRET).update("not json").digest("hex"))).toBe(400);
  });

  it("fulfils a paid order once even if the webhook is delivered twice or in parallel", async () => {
    const userId = await newUser("wh");
    const order = await createOrderForProduct(userId, productSlug);
    if (!isCheckout(order)) throw new Error(JSON.stringify(order));
    const w = webhook("payment.captured", { rpOrderId: order.razorpayOrderId, paymentId: "pay_wh" + tag, amount: P_PRICE });
    const codes = await Promise.all([handleRazorpayWebhook(w.body, w.sig), handleRazorpayWebhook(w.body, w.sig), handleRazorpayWebhook(w.body, w.sig)]);
    expect(codes).toEqual([200, 200, 200]);
    expect((await db.order.findUnique({ where: { id: order.orderId } }))?.status).toBe("PAID");
    expect(await db.entitlement.count({ where: { orderId: order.orderId } })).toBe(1);
    expect(await db.payment.count({ where: { orderId: order.orderId } })).toBe(1);
  });

  it("ignores a payment of the wrong amount or currency", async () => {
    const userId = await newUser("wh-amt");
    const order = await createOrderForProduct(userId, productSlug);
    if (!isCheckout(order)) throw new Error(JSON.stringify(order));
    for (const w of [
      webhook("payment.captured", { rpOrderId: order.razorpayOrderId, paymentId: "pay_lo" + tag, amount: 100 }),
      webhook("order.paid", { rpOrderId: order.razorpayOrderId, paymentId: "pay_usd" + tag, amount: P_PRICE, currency: "USD" }),
    ]) {
      expect(await handleRazorpayWebhook(w.body, w.sig)).toBe(200);
    }
    expect((await db.order.findUnique({ where: { id: order.orderId } }))?.status).toBe("CREATED");
    expect(await db.entitlement.count({ where: { orderId: order.orderId } })).toBe(0);
  });

  it("marks failed payments, and still honours a later successful capture", async () => {
    const userId = await newUser("wh-fail");
    const order = await createOrderForProduct(userId, productSlug);
    if (!isCheckout(order)) throw new Error(JSON.stringify(order));
    const f = webhook("payment.failed", { rpOrderId: order.razorpayOrderId, paymentId: "pay_f" + tag, amount: P_PRICE });
    expect(await handleRazorpayWebhook(f.body, f.sig)).toBe(200);
    expect((await db.order.findUnique({ where: { id: order.orderId } }))?.status).toBe("FAILED");
    const ok = webhook("payment.captured", { rpOrderId: order.razorpayOrderId, paymentId: "pay_ok" + tag, amount: P_PRICE });
    expect(await handleRazorpayWebhook(ok.body, ok.sig)).toBe(200);
    expect((await db.order.findUnique({ where: { id: order.orderId } }))?.status).toBe("PAID");
  });

  it("ignores orders that are not ours and unrelated events", async () => {
    const a = webhook("payment.captured", { rpOrderId: "order_unknown", paymentId: "pay_u", amount: 100 });
    expect(await handleRazorpayWebhook(a.body, a.sig)).toBe(200);
    const b = webhook("refund.processed", { rpOrderId: "order_unknown", paymentId: "pay_u", amount: 100 });
    expect(await handleRazorpayWebhook(b.body, b.sig)).toBe(200);
  });
});

describe("coupons", () => {
  async function coupon(data: { code: string; pctOff?: number; flatOffPaise?: number; maxUses?: number; validTill?: Date; isActive?: boolean }) {
    const c = await db.coupon.create({ data: { ...data, code: `${data.code}${tag}`.toUpperCase() } });
    couponIds.push(c.id);
    return c;
  }
  const codeOf = (c: { code: string }) => c.code;

  it("charges the discounted amount on the real Razorpay order and counts the redemption once paid", async () => {
    const c = await coupon({ code: "HALF", pctOff: 50, maxUses: 5 });
    const userId = await newUser("cp");
    const q = await quoteCoupon(userId, codeOf(c).toLowerCase(), P_PRICE);
    expect(q).toMatchObject({ discountPaise: 7450, finalPaise: 7450 });

    const order = await createOrderForProduct(userId, productSlug, codeOf(c));
    if (!isCheckout(order)) throw new Error(JSON.stringify(order));
    expect(order.amountPaise).toBe(7450);
    const row = await db.order.findUnique({ where: { id: order.orderId } });
    expect(row).toMatchObject({ amountPaise: 7450, discountPaise: 7450, couponId: c.id });
    expect((await db.coupon.findUnique({ where: { id: c.id } }))?.usedCount).toBe(0); // not counted until paid

    // A payment of the FULL price must not satisfy a discounted order.
    const full = webhook("payment.captured", { rpOrderId: order.razorpayOrderId, paymentId: "pay_full" + tag, amount: P_PRICE });
    await handleRazorpayWebhook(full.body, full.sig);
    expect((await db.order.findUnique({ where: { id: order.orderId } }))?.status).toBe("CREATED");

    const w = webhook("payment.captured", { rpOrderId: order.razorpayOrderId, paymentId: "pay_half" + tag, amount: 7450 });
    await handleRazorpayWebhook(w.body, w.sig);
    expect((await db.order.findUnique({ where: { id: order.orderId } }))?.status).toBe("PAID");
    expect((await db.coupon.findUnique({ where: { id: c.id } }))?.usedCount).toBe(1);
    expect(await quoteCoupon(userId, codeOf(c), P_PRICE)).toEqual({ error: "You have already used this coupon." });
  });

  it("a 100% coupon grants access without Razorpay and can't be reused by the same student", async () => {
    const c = await coupon({ code: "FREE", pctOff: 100 });
    const userId = await newUser("free");
    const res = await createOrderForProduct(userId, productSlug, codeOf(c));
    expect(res).toHaveProperty("free", true);
    const orderId = (res as { orderId: string }).orderId;
    expect(await db.order.findUnique({ where: { id: orderId } })).toMatchObject({ status: "PAID", amountPaise: 0, razorpayOrderId: null });
    expect((await db.entitlement.findUnique({ where: { orderId } }))?.source).toBe("COUPON_FREE");
    expect((await db.coupon.findUnique({ where: { id: c.id } }))?.usedCount).toBe(1);
  });

  it("rejects unknown, expired, inactive and used-up coupons", async () => {
    const userId = await newUser("cp-bad");
    const expired = await coupon({ code: "OLD", pctOff: 10, validTill: new Date(Date.now() - 1000) });
    const off = await coupon({ code: "OFF", pctOff: 10, isActive: false });
    const full = await coupon({ code: "FULL", pctOff: 10, maxUses: 1 });
    await db.coupon.update({ where: { id: full.id }, data: { usedCount: 1 } });
    expect(await quoteCoupon(userId, "NOPE" + tag, P_PRICE)).toEqual({ error: "This coupon code is not valid." });
    expect(await quoteCoupon(userId, expired.code, P_PRICE)).toEqual({ error: "This coupon has expired." });
    expect(await quoteCoupon(userId, off.code, P_PRICE)).toEqual({ error: "This coupon is not active." });
    expect(await quoteCoupon(userId, full.code, P_PRICE)).toEqual({ error: "This coupon has been fully used." });
    expect(await createOrderForProduct(userId, productSlug, "NOPE" + tag)).toEqual({ error: "This coupon code is not valid." });
  });
});

describe("reconcile", () => {
  it("runs against the real Razorpay API and leaves genuinely unpaid orders alone", async () => {
    const userId = await newUser("rec");
    const order = await createOrderForProduct(userId, productSlug);
    if (!isCheckout(order)) throw new Error(JSON.stringify(order));
    // Pretend it is old enough to be checked.
    await db.order.update({ where: { id: order.orderId }, data: { createdAt: new Date(Date.now() - 10 * 60_000) } });
    const r = await reconcilePendingOrders();
    expect(r.errors).toBe(0);
    expect(r.checked).toBeGreaterThanOrEqual(1);
    expect((await db.order.findUnique({ where: { id: order.orderId } }))?.status).toBe("CREATED");
  });
});

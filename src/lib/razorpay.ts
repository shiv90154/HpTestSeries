import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

const KEY_ID = process.env.RAZORPAY_KEY_ID;
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

function auth(): string {
  if (!KEY_ID || !KEY_SECRET) throw new Error("Razorpay is not configured (RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET).");
  return "Basic " + Buffer.from(`${KEY_ID}:${KEY_SECRET}`).toString("base64");
}

export function razorpayPublicKey(): string {
  if (!KEY_ID) throw new Error("RAZORPAY_KEY_ID is not set.");
  return KEY_ID;
}

/** Creates a Razorpay order (amount in paise). https://razorpay.com/docs/api/orders/create/ */
export async function createRazorpayOrder(opts: { amountPaise: number; receipt: string; notes?: Record<string, string> }): Promise<{
  id: string;
}> {
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: { Authorization: auth(), "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: opts.amountPaise,
      currency: "INR",
      receipt: opts.receipt,
      notes: opts.notes,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Razorpay order creation failed (${res.status}): ${body}`);
  }
  return res.json();
}

export type RazorpayPayment = { id: string; status: string; amount: number; currency: string; order_id: string };

/** Payments made against one order (used to recover payments whose webhook never arrived). */
export async function fetchOrderPayments(razorpayOrderId: string): Promise<RazorpayPayment[]> {
  const res = await fetch(`https://api.razorpay.com/v1/orders/${encodeURIComponent(razorpayOrderId)}/payments`, {
    headers: { Authorization: auth() },
  });
  if (!res.ok) throw new Error(`Razorpay payments lookup failed (${res.status}): ${await res.text()}`);
  return ((await res.json()) as { items: RazorpayPayment[] }).items;
}

/** Verifies the signature Razorpay Checkout returns to the client after a successful payment. */
export function verifyCheckoutSignature(opts: { razorpayOrderId: string; razorpayPaymentId: string; razorpaySignature: string }): boolean {
  if (!KEY_SECRET) throw new Error("RAZORPAY_KEY_SECRET is not set.");
  const expected = createHmac("sha256", KEY_SECRET)
    .update(`${opts.razorpayOrderId}|${opts.razorpayPaymentId}`)
    .digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(opts.razorpaySignature);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Verifies the `X-Razorpay-Signature` header on webhook payloads. */
export function verifyWebhookSignature(rawBody: string, signature: string, secret: string): boolean {
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

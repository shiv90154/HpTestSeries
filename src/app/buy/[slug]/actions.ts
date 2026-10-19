"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { consumeRateLimit } from "@/lib/rate-limit";
import { rememberGuestOrder } from "@/modules/commerce/guest-session";
import { confirmCheckoutPayment, createGuestOrderForProduct, createOrderForProduct, quoteForProduct, type CheckoutOrder, type CreateOrderResult } from "@/modules/commerce/orders";
import type { CouponError, CouponQuote } from "@/modules/commerce/coupon-service";
import { getCurrentUser } from "@/modules/identity/session";

const slugSchema = z.string().min(1).max(80);
const codeSchema = z.string().max(40);
const emailSchema = z.string().trim().toLowerCase().email().max(200);

export async function createOrderAction(productSlug: string, couponCode?: string, useWallet = false): Promise<CreateOrderResult> {
  const user = await getCurrentUser();
  if (!user) return { error: "Please log in first." };
  return createOrderForProduct(user.id, slugSchema.parse(productSlug), couponCode ? codeSchema.parse(couponCode) : undefined, useWallet === true);
}

/** Checkout without an account: the order is remembered in this browser and attached to whoever signs in next. */
export async function createGuestOrderAction(productSlug: string, couponCode?: string, email?: string): Promise<CheckoutOrder | { error: string }> {
  if (await getCurrentUser()) return { error: "You are already logged in — please refresh the page." };
  const payerEmail = emailSchema.safeParse(email);
  if (!payerEmail.success) return { error: "Please enter a valid email address." };
  // Same limit as logged-in buyers (10 per 10 min), keyed by IP; nginx sets X-Real-IP (see modules/identity/auth.ts).
  const ip = (await headers()).get("x-real-ip") ?? "unknown";
  if (!(await consumeRateLimit(`order-guest:${ip}`, 10 * 60, 10))) {
    return { error: "Too many payment attempts. Please wait a few minutes and try again." };
  }
  const order = await createGuestOrderForProduct(slugSchema.parse(productSlug), couponCode ? codeSchema.parse(couponCode) : undefined, payerEmail.data);
  if ("error" in order) return order;
  const { claimToken, ...checkout } = order;
  await rememberGuestOrder(claimToken); // the token never reaches client code
  return checkout;
}

export async function quoteCouponAction(productSlug: string, code: string): Promise<CouponQuote | CouponError> {
  const user = await getCurrentUser();
  if (!user) {
    // Guests can try codes without an account, so cap the guessing per IP.
    const ip = (await headers()).get("x-real-ip") ?? "unknown";
    if (!(await consumeRateLimit(`coupon-guest:${ip}`, 10 * 60, 20))) return { error: "Too many tries. Please wait a few minutes." };
  }
  return quoteForProduct(user?.id ?? null, slugSchema.parse(productSlug), codeSchema.parse(code));
}

const confirmSchema = z.object({
  orderId: z.string().min(1),
  razorpayPaymentId: z.string().min(1),
  razorpaySignature: z.string().min(1),
});

/** `guest`: the buyer paid without logging in. The Razorpay signature is what authorises confirming their order. */
export async function confirmPaymentAction(input: z.infer<typeof confirmSchema>, guest = false): Promise<{ ok: true } | { error: string }> {
  const user = await getCurrentUser();
  if (!user && !guest) return { error: "Please log in first." };
  const parsed = confirmSchema.safeParse(input);
  if (!parsed.success) return { error: "Invalid payment response." };
  return confirmCheckoutPayment({ userId: guest ? null : user!.id, ...parsed.data });
}

"use server";

import { z } from "zod";
import { confirmCheckoutPayment, createOrderForProduct, quoteForProduct, type CreateOrderResult } from "@/modules/commerce/orders";
import type { CouponQuote } from "@/modules/commerce/coupon-service";
import { getCurrentUser } from "@/modules/identity/session";

const slugSchema = z.string().min(1).max(80);
const codeSchema = z.string().max(40);

export async function createOrderAction(productSlug: string, couponCode?: string): Promise<CreateOrderResult> {
  const user = await getCurrentUser();
  if (!user) return { error: "Please log in first." };
  return createOrderForProduct(user.id, slugSchema.parse(productSlug), couponCode ? codeSchema.parse(couponCode) : undefined);
}

export async function quoteCouponAction(productSlug: string, code: string): Promise<CouponQuote | { error: string }> {
  const user = await getCurrentUser();
  if (!user) return { error: "Please log in first." };
  return quoteForProduct(user.id, slugSchema.parse(productSlug), codeSchema.parse(code));
}

const confirmSchema = z.object({
  orderId: z.string().min(1),
  razorpayPaymentId: z.string().min(1),
  razorpaySignature: z.string().min(1),
});

export async function confirmPaymentAction(input: z.infer<typeof confirmSchema>): Promise<{ ok: true } | { error: string }> {
  const user = await getCurrentUser();
  if (!user) return { error: "Please log in first." };
  const parsed = confirmSchema.safeParse(input);
  if (!parsed.success) return { error: "Invalid payment response." };
  return confirmCheckoutPayment({ userId: user.id, ...parsed.data });
}

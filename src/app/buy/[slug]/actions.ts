"use server";

import { z } from "zod";
import { confirmCheckoutPayment, createOrderForProduct, type CheckoutOrder } from "@/modules/commerce/orders";
import { getCurrentUser } from "@/modules/identity/session";

export async function createOrderAction(productSlug: string): Promise<CheckoutOrder | { error: string }> {
  const user = await getCurrentUser();
  if (!user) return { error: "Please log in first." };
  return createOrderForProduct(user.id, z.string().min(1).max(80).parse(productSlug));
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

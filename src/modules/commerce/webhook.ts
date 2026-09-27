import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import { logError } from "@/lib/logger";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { fulfillOrder } from "./orders";
import { parseWebhookEvent, paymentMatchesOrder } from "./webhook-event";

/**
 * Handles a Razorpay webhook (the source of truth for payments). Returns the HTTP status to send:
 * 400 for a bad signature/body, 200 for everything processed or deliberately ignored (a non-2xx
 * makes Razorpay retry, which only helps for transient failures — those throw instead).
 */
export async function handleRazorpayWebhook(rawBody: string, signature: string | null): Promise<number> {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) throw new Error("RAZORPAY_WEBHOOK_SECRET is not set.");
  if (!signature || !verifyWebhookSignature(rawBody, signature, secret)) return 400;

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return 400;
  }

  const event = parseWebhookEvent(body);
  if (event.kind === "ignored") return 200;

  const order = await db.order.findUnique({ where: { razorpayOrderId: event.razorpayOrderId }, include: { product: true } });
  if (!order) return 200; // not one of ours (e.g. another integration on the same account)

  if (event.kind === "failed") {
    if (order.status === "CREATED") await db.order.update({ where: { id: order.id }, data: { status: "FAILED" } });
    return 200;
  }

  if (!paymentMatchesOrder(event, order)) {
    await logError(
      new Error(`Razorpay payment ${event.razorpayPaymentId} paid ${event.amountPaise} ${event.currency}, order ${order.id} expects ${order.amountPaise} INR`),
      { path: "/api/razorpay/webhook", userId: order.userId },
    );
    return 200;
  }

  // A late capture after an earlier failed attempt still counts: the student paid.
  if (order.status !== "PAID") await fulfillOrder(order, event.razorpayPaymentId, event.entity as Prisma.InputJsonValue);
  return 200;
}

// Pure parsing of Razorpay webhook payloads (no DB), kept separate so it is unit-testable.
// https://razorpay.com/docs/webhooks/payloads/payments/

export type WebhookEvent =
  | { kind: "paid"; razorpayOrderId: string; razorpayPaymentId: string; amountPaise: number; currency: string; entity: Record<string, unknown> }
  | { kind: "failed"; razorpayOrderId: string }
  | { kind: "ignored" };

type PaymentEntity = { id?: unknown; order_id?: unknown; amount?: unknown; currency?: unknown };

export function parseWebhookEvent(body: unknown): WebhookEvent {
  if (!body || typeof body !== "object") return { kind: "ignored" };
  const { event, payload } = body as { event?: unknown; payload?: { payment?: { entity?: PaymentEntity } } };
  const entity = payload?.payment?.entity;
  if (!entity || typeof entity.order_id !== "string" || !entity.order_id) return { kind: "ignored" };

  if (event === "payment.captured" || event === "order.paid") {
    if (typeof entity.id !== "string" || typeof entity.amount !== "number" || typeof entity.currency !== "string") {
      return { kind: "ignored" };
    }
    return {
      kind: "paid",
      razorpayOrderId: entity.order_id,
      razorpayPaymentId: entity.id,
      amountPaise: entity.amount,
      currency: entity.currency,
      entity: entity as Record<string, unknown>,
    };
  }
  if (event === "payment.failed") return { kind: "failed", razorpayOrderId: entity.order_id };
  return { kind: "ignored" };
}

/** A captured payment only unlocks access if it paid exactly what the order was created for. */
export function paymentMatchesOrder(event: { amountPaise: number; currency: string }, order: { amountPaise: number }): boolean {
  return event.currency === "INR" && event.amountPaise === order.amountPaise;
}

import { describe, expect, it } from "vitest";
import { parseWebhookEvent, paymentMatchesOrder } from "./webhook-event";

const payment = { id: "pay_1", order_id: "order_1", amount: 9900, currency: "INR", status: "captured" };

describe("parseWebhookEvent", () => {
  it("reads captured payments and paid orders", () => {
    for (const event of ["payment.captured", "order.paid"]) {
      expect(parseWebhookEvent({ event, payload: { payment: { entity: payment } } })).toMatchObject({
        kind: "paid",
        razorpayOrderId: "order_1",
        razorpayPaymentId: "pay_1",
        amountPaise: 9900,
        currency: "INR",
      });
    }
  });

  it("reads failed payments", () => {
    expect(parseWebhookEvent({ event: "payment.failed", payload: { payment: { entity: payment } } })).toEqual({
      kind: "failed",
      razorpayOrderId: "order_1",
    });
  });

  it("ignores other events and malformed bodies", () => {
    expect(parseWebhookEvent({ event: "refund.created", payload: { payment: { entity: payment } } }).kind).toBe("ignored");
    expect(parseWebhookEvent({ event: "payment.captured", payload: {} }).kind).toBe("ignored");
    expect(parseWebhookEvent({ event: "payment.captured", payload: { payment: { entity: { ...payment, amount: "9900" } } } }).kind).toBe("ignored");
    expect(parseWebhookEvent(null).kind).toBe("ignored");
  });
});

describe("paymentMatchesOrder", () => {
  it("requires the exact INR amount", () => {
    expect(paymentMatchesOrder({ amountPaise: 9900, currency: "INR" }, { amountPaise: 9900 })).toBe(true);
    expect(paymentMatchesOrder({ amountPaise: 100, currency: "INR" }, { amountPaise: 9900 })).toBe(false);
    expect(paymentMatchesOrder({ amountPaise: 9900, currency: "USD" }, { amountPaise: 9900 })).toBe(false);
  });
});

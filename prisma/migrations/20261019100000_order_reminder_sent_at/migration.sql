-- One "finish your payment" reminder per unpaid checkout.
ALTER TABLE "Order" ADD COLUMN "reminderSentAt" TIMESTAMP(3);

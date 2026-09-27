import { handleRazorpayWebhook } from "@/modules/commerce/webhook";

// Configure in Razorpay Dashboard → Webhooks: <site>/api/razorpay/webhook with
// payment.captured, order.paid and payment.failed, secret = RAZORPAY_WEBHOOK_SECRET.
export async function POST(request: Request) {
  // The signature covers the exact bytes, so read the raw text before parsing.
  const status = await handleRazorpayWebhook(await request.text(), request.headers.get("x-razorpay-signature"));
  return new Response(null, { status });
}

"use client";

import Script from "next/script";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { track } from "@/components/analytics";
import { btn } from "@/components/ui";
import { site } from "@/lib/site";
import { confirmPaymentAction, createOrderAction } from "./actions";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open(): void };
  }
}

export function BuyButton({ productSlug, user }: { productSlug: string; user: { name: string; email: string; phoneNumber: string | null } | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function pay() {
    if (!user) {
      router.push(`/login?next=${encodeURIComponent(`/buy/${productSlug}`)}`);
      return;
    }
    // Checkout script loads lazily; bail out before creating an order that could never be paid.
    const Razorpay = window.Razorpay;
    if (!Razorpay) {
      toast.error("Payment is still loading — please try again in a moment.");
      return;
    }
    // Stays true while Razorpay Checkout is open, so a second tap can't create a second order.
    setLoading(true);
    try {
      const order = await createOrderAction(productSlug);
      if ("error" in order) {
        toast.error(order.error);
        setLoading(false);
        return;
      }
      const razorpay = new Razorpay({
        key: order.keyId,
        amount: order.amountPaise,
        currency: "INR",
        name: site.name,
        description: order.productTitle,
        order_id: order.razorpayOrderId,
        prefill: { name: user.name, email: user.email, contact: user.phoneNumber ?? undefined },
        theme: { color: site.themeColor },
        handler: async (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
          const result = await confirmPaymentAction({
            orderId: order.orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });
          if ("error" in result) {
            toast.error(`Payment received but could not be confirmed: ${result.error}`);
            setLoading(false);
            return;
          }
          track("purchase", { transaction_id: order.orderId, value: order.amountPaise / 100, currency: "INR", item_name: order.productTitle });
          toast.success("Payment successful! Access unlocked.");
          router.push("/dashboard");
          router.refresh();
        },
        modal: { ondismiss: () => setLoading(false) },
      });
      track("begin_checkout", { value: order.amountPaise / 100, currency: "INR", item_name: order.productTitle });
      razorpay.open();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not start payment.");
      setLoading(false);
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <button onClick={pay} disabled={loading} className={btn("primary", "lg")}>
        {loading ? "Please wait…" : "Buy now"}
      </button>
    </>
  );
}

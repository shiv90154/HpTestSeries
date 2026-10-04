"use client";

import Script from "next/script";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { track } from "@/components/analytics";
import { btn } from "@/components/ui";
import { rupees } from "@/lib/money";
import { splitWallet } from "@/modules/commerce/wallet-rules";
import { site } from "@/lib/site";
import { confirmPaymentAction, createGuestOrderAction, createOrderAction, quoteCouponAction } from "./actions";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open(): void };
  }
}

type Quote = { code: string; discountPaise: number; finalPaise: number };

export function BuyButton({
  productSlug,
  pricePaise,
  user,
  label = "Buy now",
  initialCode = "",
  walletPaise = 0,
}: {
  productSlug: string;
  pricePaise: number;
  user: { name: string; email: string; phoneNumber: string | null } | null;
  label?: string;
  /** a referral code from the friend's shared link; pre-filled, the student still taps Apply */
  initialCode?: string;
  /** the student's HP wallet balance; spent first when they tick the box */
  walletPaise?: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(initialCode);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [useWallet, setUseWallet] = useState(true);

  async function applyCode() {
    if (!user) {
      router.push(`/login?next=${encodeURIComponent(`/buy/${productSlug}`)}`);
      return;
    }
    setChecking(true);
    setCouponError(null);
    try {
      const res = await quoteCouponAction(productSlug, code);
      if ("error" in res) {
        setQuote(null);
        setCouponError(res.error);
      } else setQuote(res);
    } finally {
      setChecking(false);
    }
  }

  function removeCode() {
    setQuote(null);
    setCode("");
    setCouponError(null);
  }

  async function pay() {
    // Checkout script loads lazily; bail out before creating an order that could never be paid.
    const Razorpay = window.Razorpay;
    if (!Razorpay) {
      toast.error("Payment is still loading — please try again in a moment.");
      return;
    }
    const guest = !user;
    // Stays true while Razorpay Checkout is open, so a second tap can't create a second order.
    setLoading(true);
    try {
      // Not logged in: the order is created anyway and attached to the account on the next login (/claim).
      const order = guest ? await createGuestOrderAction(productSlug) : await createOrderAction(productSlug, quote?.code, useWallet && walletPaise > 0);
      if ("error" in order) {
        toast.error(order.error);
        setLoading(false);
        return;
      }
      if ("free" in order) {
        track("purchase", { transaction_id: order.orderId, value: 0, currency: "INR", item_name: productSlug });
        toast.success("Coupon applied! Access unlocked.");
        router.push("/dashboard");
        router.refresh();
        return;
      }
      // Phone-only accounts carry a placeholder address that can never receive mail; don't hand it to Razorpay.
      const realEmail = user && !user.email.endsWith(".invalid") ? user.email : undefined;
      const razorpay = new Razorpay({
        key: order.keyId,
        amount: order.amountPaise,
        currency: "INR",
        name: site.name,
        description: order.productTitle,
        order_id: order.razorpayOrderId,
        prefill: user ? { name: user.name, email: realEmail, contact: user.phoneNumber ?? undefined } : undefined,
        theme: { color: site.themeColor },
        handler: async (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
          const result = await confirmPaymentAction(
            { orderId: order.orderId, razorpayPaymentId: response.razorpay_payment_id, razorpaySignature: response.razorpay_signature },
            guest,
          );
          if ("error" in result) {
            toast.error(
              guest
                ? `Payment received but could not be confirmed: ${result.error}. Don't pay again — log in and your access is added automatically within a few minutes.`
                : `Payment received but could not be confirmed: ${result.error}. If money was deducted, access unlocks automatically within a few minutes.`,
            );
            if (guest) router.push("/claim");
            else setLoading(false);
            return;
          }
          track("purchase", { transaction_id: order.orderId, value: order.amountPaise / 100, currency: "INR", item_name: order.productTitle });
          if (guest) {
            // /claim asks them to log in or sign up, then attaches this purchase to that account.
            toast.success("Payment successful! Log in or sign up to unlock your access.");
            router.push("/claim");
            return;
          }
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

  // The server decides the real split when the order is created; this only previews it.
  const total = quote ? quote.finalPaise : pricePaise;
  const split = useWallet && walletPaise > 0 && total > 0 ? splitWallet(total, walletPaise) : { walletPaise: 0, cashPaise: total };
  const payLabel = quote || split.walletPaise > 0 ? (split.cashPaise === 0 ? "Get it free" : `${label} · ${rupees(split.cashPaise)}`) : label;

  return (
    <div className="space-y-4">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {quote ? (
        <p className="flex items-center justify-between gap-3 rounded-xl border border-success bg-success-soft p-3 text-sm">
          <span>
            <b>{quote.code}</b> applied — you save {rupees(quote.discountPaise)}
            <span className="block text-xs text-muted">
              {rupees(pricePaise)} → <b className="text-foreground">{rupees(quote.finalPaise)}</b>
            </span>
          </span>
          <button type="button" onClick={removeCode} className="text-xs font-medium text-muted underline">
            Remove
          </button>
        </p>
      ) : (
        <div className="space-y-1.5">
          <div className="flex gap-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Coupon code"
              aria-label="Coupon code"
              autoCapitalize="characters"
              maxLength={24}
              className="h-11 min-w-0 flex-1 rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-primary"
            />
            <button type="button" onClick={applyCode} disabled={!code.trim() || checking} className={btn("outline", "md")}>
              {checking ? "Checking…" : "Apply"}
            </button>
          </div>
          {couponError && (
            <p role="alert" className="text-xs text-danger">
              {couponError}
            </p>
          )}
        </div>
      )}

      {user && walletPaise > 0 && total > 0 && (
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-surface-muted p-3 text-sm">
          <input type="checkbox" checked={useWallet} onChange={(e) => setUseWallet(e.target.checked)} className="mt-0.5 size-4 accent-[var(--primary)]" />
          <span>
            <b>Use my HP wallet</b> <span className="text-muted">({rupees(walletPaise)} available)</span>
            {useWallet && split.walletPaise > 0 && (
              <span className="block text-xs text-muted">
                {rupees(split.walletPaise)} from wallet · {split.cashPaise === 0 ? "nothing to pay" : `${rupees(split.cashPaise)} to pay`}
              </span>
            )}
          </span>
        </label>
      )}

      <button onClick={pay} disabled={loading} className={btn("primary", "lg", "w-full")}>
        {loading ? "Please wait…" : payLabel}
      </button>
      {!user && (
        <p className="text-center text-xs text-muted">
          No login needed to pay. Right after payment you log in or sign up, and your access is added to that account automatically.
        </p>
      )}
    </div>
  );
}

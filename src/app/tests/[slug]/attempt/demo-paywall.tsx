"use client";

import { BadgeCheck, Lock, X } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { rupees } from "@/lib/money";
import { useFocusTrap } from "@/lib/use-focus-trap";
import type { DemoInfo } from "@/modules/assessment/types";

/**
 * The "Pay now" popup of the free demo. Shown when the candidate reaches the end of the free questions
 * or taps a locked one. Paying leaves the demo; "Submit demo" grades what was answered so far.
 */
export function DemoPaywall(props: {
  demo: DemoInfo;
  hi: boolean;
  /** true once the candidate has reached the end of the free part (changes the heading) */
  finished: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onPay: () => void;
}) {
  const { demo, hi, finished, onClose, onSubmit, onPay } = props;
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, true, onClose);
  const { buy, lockedTotal } = demo;

  const perks = hi
    ? [`बाकी ${lockedTotal} प्रश्न भी अनलॉक`, "हर प्रश्न का विस्तृत हल (हिंदी + English)", "पूरे हिमाचल में आपकी रैंक और टॉपिक-वार विश्लेषण"]
    : [`All ${lockedTotal} remaining questions`, "Detailed solution for every question (Hindi + English)", "Your HP rank and topic-wise analysis"];

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/55 p-4 font-sans" role="dialog" aria-modal="true" aria-labelledby="paywall-title">
      <div ref={ref} className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <button type="button" onClick={onClose} className="absolute right-3 top-3 rounded-md p-1.5 text-white/85 hover:bg-white/15" aria-label={hi ? "बंद करें" : "Close"}>
          <X className="size-5" />
        </button>
        <div className="bg-linear-to-br from-[#133a9e] to-[#1e4fd8] px-6 pb-5 pt-6 text-white">
          <span className="mb-3 grid size-11 place-items-center rounded-full bg-white/15">
            <Lock className="size-5" aria-hidden />
          </span>
          <h2 id="paywall-title" className="text-xl font-bold leading-snug">
            {finished
              ? hi
                ? "फ्री डेमो पूरा हुआ! 🎉"
                : "You've finished the free demo! 🎉"
              : hi
                ? "यह प्रश्न लॉक है"
                : "This question is locked"}
          </h2>
          <p className="mt-1 text-sm text-white/85">
            {hi
              ? `पूरा टेस्ट अनलॉक करके बाकी ${lockedTotal} प्रश्न हल करें।`
              : `Unlock the full test to attempt the remaining ${lockedTotal} questions.`}
          </p>
        </div>

        <div className="space-y-4 p-6">
          <ul className="space-y-2 text-sm">
            {perks.map((p) => (
              <li key={p} className="flex gap-2">
                <BadgeCheck className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                {p}
              </li>
            ))}
          </ul>

          {buy && (
            <div className="rounded-xl bg-surface-muted p-4">
              <p className="text-sm font-semibold">{buy.title}</p>
              <p className="mt-0.5 text-2xl font-bold tabular-nums">
                {rupees(buy.priceInPaise)}
                {buy.validityDays && (
                  <span className="ml-2 text-xs font-normal text-muted">{hi ? `${buy.validityDays} दिन वैध` : `valid ${buy.validityDays} days`}</span>
                )}
              </p>
            </div>
          )}

          <div className="space-y-2">
            {buy ? (
              <Link
                href={buy.href}
                onClick={onPay}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-accent text-base font-bold text-[#1f1300] shadow-sm hover:bg-accent-strong"
              >
                {hi ? `अभी पेमेंट करें — ${rupees(buy.priceInPaise)}` : `Pay now — ${rupees(buy.priceInPaise)}`}
              </Link>
            ) : (
              <Link href="/tests" onClick={onPay} className="flex h-12 w-full items-center justify-center rounded-xl bg-primary font-semibold text-white">
                {hi ? "सभी टेस्ट देखें" : "See all tests"}
              </Link>
            )}
            <button type="button" onClick={onSubmit} className="h-11 w-full rounded-xl border border-border font-semibold hover:bg-surface-muted">
              {hi ? "डेमो सबमिट करें और रिज़ल्ट देखें" : "Submit demo & see my result"}
            </button>
            {!finished && (
              <button type="button" onClick={onClose} className="h-10 w-full text-sm font-medium text-muted hover:text-foreground">
                {hi ? "डेमो जारी रखें" : "Continue the demo"}
              </button>
            )}
          </div>
          <p className="text-center text-xs text-muted">
            {hi ? "Razorpay से सुरक्षित पेमेंट (UPI, कार्ड, नेटबैंकिंग)।" : "Secure payment via Razorpay (UPI, cards, netbanking)."}
          </p>
        </div>
      </div>
    </div>
  );
}

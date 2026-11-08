"use client";

import { Clock, Tag, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { activeOffer, timeLeft, type Offer } from "@/sites/offers";
import { useSite, useSitePathname } from "@/sites/provider";
import { track } from "./analytics";
import { btn } from "./ui";

const SEEN_KEY = "offer-popup-seen";
const SHOW_AFTER_MS = 6_000;
const QUIET_MS = 12 * 3_600_000; // after a dismiss, stay away for 12 hours

// Pages where a sale popup would get in the way of paying or reading.
const QUIET_PATHS = ["/buy", "/login", "/verify-2fa", "/claim", "/orders", "/refund"];

/**
 * Time-boxed sale popup (config in sites/offers.ts). Renders nothing when this site has no running offer, on checkout
 * and login pages, or for 12 hours after the student closes it.
 */
export function OfferPopup() {
  const site = useSite();
  const path = useSitePathname();
  const [offer, setOffer] = useState<Offer | undefined>();
  const [open, setOpen] = useState(false);
  const [, setTick] = useState(0);

  const quiet = QUIET_PATHS.some((p) => path === p || path.startsWith(`${p}/`));
  useEffect(() => {
    const o = activeOffer(site.code);
    if (!o || quiet) return;
    let seen = 0;
    try {
      seen = Number(localStorage.getItem(`${SEEN_KEY}:${o.productSlug}`)) || 0;
    } catch {} // private mode: show it, we just cannot remember the dismiss
    if (Date.now() - seen < QUIET_MS) return;
    const id = setTimeout(() => {
      setOffer(o);
      setOpen(true);
      track("offer_popup_view", { offer: o.productSlug });
    }, SHOW_AFTER_MS);
    return () => clearTimeout(id);
  }, [site.code, quiet]);

  // Keep the countdown honest while the popup is open.
  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => setTick((n) => n + 1), 30_000);
    return () => clearInterval(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    setOpen(false);
    if (!offer) return;
    try {
      localStorage.setItem(`${SEEN_KEY}:${offer.productSlug}`, String(Date.now()));
    } catch {}
  }

  if (!open || !offer) return null;
  const left = timeLeft(offer.endsAt);
  const examLeft = timeLeft(offer.examDate);
  const off = Math.round(((offer.mrp - offer.price) / offer.mrp) * 100);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-3 sm:items-center" onClick={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-title"
        className="relative w-full max-w-sm space-y-4 rounded-2xl bg-surface p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={close} aria-label="Close" className="absolute right-3 top-3 rounded-full p-2 text-muted hover:bg-primary-soft">
          <X className="size-5" />
        </button>

        <p className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-ink">
          <Clock className="size-3.5" aria-hidden /> {examLeft.days > 0 ? `${examLeft.days} din baaki` : "Exam bahut paas"}
        </p>
        <div>
          <h2 id="offer-title" className="text-xl font-bold leading-tight">
            {offer.title}
          </h2>
          <p lang="hi" className="mt-0.5 text-sm text-muted">
            {offer.titleHi}
          </p>
        </div>

        <p className="text-sm text-muted">
          7 full mocks + 14 subject tests, har sawaal ka solution Hindi aur English me. Last-minute practice ke liye abhi sabse sahi time.
        </p>

        <div className="flex items-end gap-3">
          <span className="text-4xl font-bold text-primary">₹{offer.price}</span>
          <span className="pb-1 text-lg text-muted line-through">₹{offer.mrp}</span>
          <span className="mb-1.5 rounded-md bg-accent px-2 py-0.5 text-xs font-bold text-accent-ink">{off}% OFF</span>
        </div>

        <p className="flex items-center gap-1.5 text-sm font-medium">
          <Tag className="size-4 text-accent-strong" aria-hidden />
          Code <b className="rounded bg-primary-soft px-1.5 py-0.5 tracking-wide">{offer.couponCode}</b> khud lag jayega
        </p>

        <Link
          href={`/buy/${offer.productSlug}?coupon=${encodeURIComponent(offer.couponCode)}`}
          onClick={() => track("offer_popup_click", { offer: offer.productSlug })}
          className={btn("primary", "lg", "w-full justify-center")}
        >
          Offer lo, ₹{offer.price} me
        </Link>
        <p className="text-center text-xs text-muted">
          Offer {left.days > 0 ? `${left.days} din ${left.hours} ghante` : `${left.hours} ghante ${left.minutes} minute`} me khatam. Ek baar ka payment, koi subscription nahi.
        </p>
      </div>
    </div>
  );
}

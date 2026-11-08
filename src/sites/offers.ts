// Time-boxed sale shown as a popup (components/offer-popup.tsx). The discount itself is a Coupon row, created by
// `npx tsx prisma/patwari-offer.ts --apply`; this file only holds what the popup says. When the sale is over, the
// popup stops by itself at `endsAt`, so nothing needs removing on the day.

import type { SiteCode } from "./types";

export type Offer = {
  site: SiteCode;
  /** Product the button opens, and the coupon pre-filled on its buy page. */
  productSlug: string;
  couponCode: string;
  /** Strike-through price and the price after the coupon, in rupees. Must match the product and the Coupon row. */
  mrp: number;
  price: number;
  /** Last moment the offer is shown. */
  endsAt: string;
  /** Exam start, for the "exam starts on" line. */
  examDate: string;
  examLabel: string;
  title: string;
  titleHi: string;
};

export const OFFERS: Offer[] = [
  {
    site: "hp",
    productSlug: "hp-patwari-mock-series",
    couponCode: "PATWARI50",
    mrp: 398,
    price: 199,
    endsAt: "2026-11-22T23:59:59+05:30", // the night before the exam
    examDate: "2026-11-23T00:00:00+05:30",
    examLabel: "HP Patwari exam",
    title: "Patwari exam starts 23 November",
    titleHi: "पटवारी परीक्षा 23 नवंबर से",
  },
];

/** The offer running on this site right now, or undefined. */
export function activeOffer(site: SiteCode, now: Date = new Date()): Offer | undefined {
  return OFFERS.find((o) => o.site === site && now.getTime() <= new Date(o.endsAt).getTime());
}

/** Whole days, hours and minutes left until `iso`; zeros once passed. */
export function timeLeft(iso: string, now: Date = new Date()): { days: number; hours: number; minutes: number } {
  const ms = Math.max(0, new Date(iso).getTime() - now.getTime());
  return { days: Math.floor(ms / 86_400_000), hours: Math.floor(ms / 3_600_000) % 24, minutes: Math.floor(ms / 60_000) % 60 };
}

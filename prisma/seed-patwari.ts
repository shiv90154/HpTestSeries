// HP Patwari mock test series: 3 full mocks (100 questions each) and 14 subject tests (25 questions each),
// all in one series and one paid product. Adding a new test = adding it to prisma/patwari/index.ts.

import type { PrismaClient } from "../src/generated/prisma/client";
import { PATWARI_TESTS } from "./patwari";
import { seedSeries } from "./seed-series";

export const PATWARI_SERIES_SLUG = "hp-patwari-mock-test-series";
export const PATWARI_PRODUCT_SLUG = "hp-patwari-mock-series";
const PRICE_IN_PAISE = 199_00; // ₹199 for the whole series
const VALIDITY_DAYS = 180;

export function seedPatwari(db: PrismaClient) {
  return seedSeries(db, {
    label: "Patwari seed",
    bodySlug: "hp-revenue",
    examSlug: "patwari",
    tests: PATWARI_TESTS,
    series: {
      slug: PATWARI_SERIES_SLUG,
      title: "HP Patwari Mock Test Series (3 Full Mocks + 14 Subject Tests)",
      titleHi: "एचपी पटवारी मॉक टेस्ट सीरीज़ (3 फुल मॉक + 14 विषय-वार टेस्ट)",
      description:
        "Three full-length, exam-level HP Patwari mock tests (100 questions each) plus 14 subject-wise tests of 25 questions: " +
        "Himachal GK, General Knowledge, Reasoning, Mathematics, Hindi, English and Revenue & Computer, two tests each. " +
        "Every question has a detailed solution in Hindi and English.",
    },
    product: {
      slug: PATWARI_PRODUCT_SLUG,
      title: "HP Patwari Mock Test Series — 3 Full Mocks + 14 Subject Tests",
      titleHi: "एचपी पटवारी मॉक टेस्ट सीरीज़ — 3 फुल मॉक + 14 विषय-वार टेस्ट",
      priceInPaise: PRICE_IN_PAISE,
      validityDays: VALIDITY_DAYS,
    },
  });
}

// PSSSB Patwari mock test series (pbtestseries.in): the free mock now, paid mocks to follow, in one series and one paid
// product. The product is created hidden until there are paid mocks to sell; switch it on in /admin/products.
// Adding a new test = adding it to prisma/pb-patwari/index.ts.

import type { PrismaClient } from "../src/generated/prisma/client";
import { PB_PATWARI_TESTS } from "./pb-patwari";
import { seedSeries } from "./seed-series";

export const PB_PATWARI_SERIES_SLUG = "psssb-patwari-mock-test-series";
export const PB_PATWARI_PRODUCT_SLUG = "psssb-patwari-mock-series";
const PRICE_IN_PAISE = 149_00; // proposed in docs/PB-TEST-SERIES-PLAN.md §4.4; not yet confirmed by the owner, editable in admin
const VALIDITY_DAYS = 180;

export function seedPbPatwari(db: PrismaClient) {
  return seedSeries(db, {
    label: "PSSSB Patwari seed",
    bodySlug: "psssb",
    examSlug: "patwari",
    tests: PB_PATWARI_TESTS,
    series: {
      slug: PB_PATWARI_SERIES_SLUG,
      title: "PSSSB Patwari Mock Test Series",
      titleHi: "पीएसएसएसबी पटवारी मॉक टेस्ट सीरीज़",
      description:
        "Full mocks for the PSSSB Patwari written exam: 100 questions in 120 minutes with a quarter-mark negative " +
        "(Punjab GK, General Knowledge, Reasoning & Maths, English, Punjabi and Computer). Every question has a detailed solution in English and Hindi.",
    },
    product: {
      slug: PB_PATWARI_PRODUCT_SLUG,
      title: "PSSSB Patwari Mock Test Series",
      titleHi: "पीएसएसएसबी पटवारी मॉक टेस्ट सीरीज़",
      priceInPaise: PRICE_IN_PAISE,
      validityDays: VALIDITY_DAYS,
      isActive: false,
    },
  });
}

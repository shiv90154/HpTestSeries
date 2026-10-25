// Punjab District Court Clerk mock test series (pbtestseries.in): one free mock and the paid full mocks, in one series
// and one paid product. Adding a new test = adding it to prisma/pb-court-clerk/index.ts.

import type { PrismaClient } from "../src/generated/prisma/client";
import { COURT_CLERK_TESTS } from "./pb-court-clerk";
import { seedSeries } from "./seed-series";

export const COURT_CLERK_SERIES_SLUG = "punjab-court-clerk-mock-test-series";
export const COURT_CLERK_PRODUCT_SLUG = "punjab-court-clerk-mock-series";
const PRICE_IN_PAISE = 149_00; // proposed in docs/PB-TEST-SERIES-PLAN.md; not yet confirmed by the owner, editable in admin
const VALIDITY_DAYS = 180;

export function seedPbCourtClerk(db: PrismaClient) {
  return seedSeries(db, {
    label: "Punjab Court Clerk seed",
    bodySlug: "punjab-courts",
    examSlug: "clerk",
    tests: COURT_CLERK_TESTS,
    series: {
      slug: COURT_CLERK_SERIES_SLUG,
      title: "Punjab District Court Clerk Mock Test Series",
      titleHi: "पंजाब ज़िला न्यायालय क्लर्क मॉक टेस्ट सीरीज़",
      description:
        "Full mocks in the pattern of the Punjab District Court Clerk written exam: 50 General Knowledge and 20 English questions " +
        "with a quarter-mark negative, including Punjab GK. Every question has a detailed solution in English and Hindi.",
    },
    product: {
      slug: COURT_CLERK_PRODUCT_SLUG,
      title: "Punjab District Court Clerk Mock Test Series",
      titleHi: "पंजाब ज़िला न्यायालय क्लर्क मॉक टेस्ट सीरीज़",
      priceInPaise: PRICE_IN_PAISE,
      validityDays: VALIDITY_DAYS,
    },
  });
}

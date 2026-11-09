// HSSC CET Group C mock test series (hrtestseries.in): Haryana GK sectionals now, full mocks to follow, in one series and
// one paid product. The product is created hidden until there are full mocks to sell; switch it on in /admin/products.
// Adding a new test = adding it to prisma/hr-cet/index.ts.

import type { PrismaClient } from "../src/generated/prisma/client";
import { CET_TESTS } from "./hr-cet";
import { seedSeries } from "./seed-series";

export const HR_CET_SERIES_SLUG = "hssc-cet-group-c-mock-test-series";
export const HR_CET_PRODUCT_SLUG = "hssc-cet-group-c-mock-series";
const PRICE_IN_PAISE = 149_00; // proposed in docs/HR-TEST-SERIES-PLAN.md §3.1; not yet confirmed by the owner, editable in admin
const VALIDITY_DAYS = 180;

export function seedHrCet(db: PrismaClient) {
  return seedSeries(db, {
    label: "HSSC CET seed",
    bodySlug: "hssc",
    examSlug: "cet-group-c",
    tests: CET_TESTS,
    series: {
      slug: HR_CET_SERIES_SLUG,
      title: "HSSC CET Group C Mock Test Series",
      titleHi: "एचएसएससी सीईटी ग्रुप सी मॉक टेस्ट सीरीज़",
      description:
        "Mock tests for the HSSC CET Group C exam, starting with Haryana GK sectionals. Every question has a detailed solution in English and Hindi.",
    },
    product: {
      slug: HR_CET_PRODUCT_SLUG,
      title: "HSSC CET Group C Mock Test Series",
      titleHi: "एचएसएससी सीईटी ग्रुप सी मॉक टेस्ट सीरीज़",
      priceInPaise: PRICE_IN_PAISE,
      validityDays: VALIDITY_DAYS,
      isActive: false,
    },
  });
}

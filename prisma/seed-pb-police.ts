// Punjab Police Constable mock test series (pbtestseries.in): the free Paper I mock and the paid Paper I mocks, in one
// series and one paid product. Adding a mock = adding it to prisma/pb-police/index.ts.

import type { PrismaClient } from "../src/generated/prisma/client";
import { PB_POLICE_TESTS } from "./pb-police";
import { seedSeries } from "./seed-series";

export const PB_POLICE_SERIES_SLUG = "punjab-police-constable-mock-test-series";
export const PB_POLICE_PRODUCT_SLUG = "punjab-police-constable-mock-series";
const PRICE_IN_PAISE = 199_00; // proposed in docs/PB-TEST-SERIES-PLAN.md; not yet confirmed by the owner, editable in admin
const VALIDITY_DAYS = 365;

export function seedPbPolice(db: PrismaClient) {
  return seedSeries(db, {
    label: "Punjab Police seed",
    bodySlug: "punjab-police",
    examSlug: "constable",
    tests: PB_POLICE_TESTS,
    series: {
      slug: PB_POLICE_SERIES_SLUG,
      title: "Punjab Police Constable Mock Test Series",
      titleHi: "पंजाब पुलिस कांस्टेबल मॉक टेस्ट सीरीज़",
      description:
        "Full Paper I mocks in the pattern of the Punjab Police Constable CBT: 100 questions in 120 minutes with no negative marking " +
        "(General Awareness 35, Quantitative Aptitude 20, Reasoning 20, English 10, Punjabi 10, Digital Literacy 5). " +
        "Every question has a detailed solution in English and Hindi.",
    },
    product: {
      slug: PB_POLICE_PRODUCT_SLUG,
      title: "Punjab Police Constable Mock Test Series",
      titleHi: "पंजाब पुलिस कांस्टेबल मॉक टेस्ट सीरीज़",
      priceInPaise: PRICE_IN_PAISE,
      validityDays: VALIDITY_DAYS,
    },
  });
}

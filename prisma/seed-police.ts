// HP Police Constable mock test series: 9 full mocks (100 questions each) and 12 subject tests (25 questions each),
// all in one series and one paid product. Adding a new test = adding it to prisma/police/index.ts.

import type { PrismaClient } from "../src/generated/prisma/client";
import { POLICE_TESTS } from "./police";
import { seedSeries } from "./seed-series";

export const POLICE_SERIES_SLUG = "hp-police-constable-mock-test-series";
export const POLICE_PRODUCT_SLUG = "hp-police-constable-mock-series";
const PRICE_IN_PAISE = 199_00; // ₹199 for the whole series, same as Patwari
const VALIDITY_DAYS = 180;

export function seedPolice(db: PrismaClient) {
  return seedSeries(db, {
    label: "Police seed",
    bodySlug: "hp-police",
    examSlug: "constable",
    tests: POLICE_TESTS,
    series: {
      slug: POLICE_SERIES_SLUG,
      title: "HP Police Constable Mock Test Series",
      titleHi: "एचपी पुलिस कांस्टेबल मॉक टेस्ट सीरीज़",
      description:
        "Full-length, exam-level HP Police Constable mock tests plus subject-wise tests in Himachal GK, General Knowledge, " +
        "Reasoning, Numerical Ability, Hindi and English. " +
        "Every question has a detailed solution in Hindi and English.",
    },
    product: {
      slug: POLICE_PRODUCT_SLUG,
      title: "HP Police Constable Mock Test Series",
      titleHi: "एचपी पुलिस कांस्टेबल मॉक टेस्ट सीरीज़",
      priceInPaise: PRICE_IN_PAISE,
      validityDays: VALIDITY_DAYS,
    },
  });
}

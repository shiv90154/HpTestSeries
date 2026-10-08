// HP Panchayat Secretary mock test series on the HPRCA pattern: full mocks (120 questions each) and subject tests
// (25 questions each), all in one series and one paid product. Adding a new test = adding it to prisma/panchayat-secretary/index.ts.

import type { PrismaClient } from "../src/generated/prisma/client";
import { PANCHAYAT_SECRETARY_TESTS } from "./panchayat-secretary";
import { seedSeries } from "./seed-series";

export const PANCHAYAT_SECRETARY_SERIES_SLUG = "hp-panchayat-secretary-mock-test-series";
export const PANCHAYAT_SECRETARY_PRODUCT_SLUG = "hp-panchayat-secretary-mock-series";
const PRICE_IN_PAISE = 199_00; // ₹199 for the whole series, same as Patwari and Police
const VALIDITY_DAYS = 180;

export function seedPanchayatSecretary(db: PrismaClient) {
  return seedSeries(db, {
    label: "Panchayat Secretary seed",
    bodySlug: "hprca",
    examSlug: "panchayat-secretary",
    tests: PANCHAYAT_SECRETARY_TESTS,
    // Titles and description leave out test counts: the site shows only the total, never a mocks/subject split.
    series: {
      slug: PANCHAYAT_SECRETARY_SERIES_SLUG,
      title: "HP Panchayat Secretary Mock Test Series",
      titleHi: "एचपी पंचायत सचिव मॉक टेस्ट सीरीज़",
      description:
        "Full-length HP Panchayat Secretary mock tests on the HPRCA pattern plus subject-wise tests in Panchayati Raj, rural development " +
        "schemes and panchayat accounts, Himachal GK, social science, everyday science, reasoning, Hindi, English and computer. " +
        "Every question has a detailed solution in Hindi and English.",
    },
    product: {
      slug: PANCHAYAT_SECRETARY_PRODUCT_SLUG,
      title: "HP Panchayat Secretary Mock Test Series",
      titleHi: "एचपी पंचायत सचिव मॉक टेस्ट सीरीज़",
      priceInPaise: PRICE_IN_PAISE,
      validityDays: VALIDITY_DAYS,
    },
  });
}

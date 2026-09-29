// HP JOA IT mock test series on the HPRCA pattern: full mocks (120 questions each) and computer subject tests
// (25 questions each), all in one series and one paid product. Adding a new test = adding it to prisma/joa-it/index.ts.

import type { PrismaClient } from "../src/generated/prisma/client";
import { JOA_IT_TESTS } from "./joa-it";
import { seedSeries } from "./seed-series";

export const JOA_IT_SERIES_SLUG = "hp-joa-it-mock-test-series";
export const JOA_IT_PRODUCT_SLUG = "hp-joa-it-mock-series";
const PRICE_IN_PAISE = 149_00; // ₹149 for the whole series
const VALIDITY_DAYS = 180;

export function seedJoaIt(db: PrismaClient) {
  return seedSeries(db, {
    label: "JOA IT seed",
    bodySlug: "hprca",
    examSlug: "joa-it",
    tests: JOA_IT_TESTS,
    // Titles and description leave out test counts: the seed never updates them, and the series will keep growing.
    series: {
      slug: JOA_IT_SERIES_SLUG,
      title: "HP JOA IT Mock Test Series (HPRCA New Pattern)",
      titleHi: "एचपी जेओए आईटी मॉक टेस्ट सीरीज़ (एचपीआरसीए नया पैटर्न)",
      description:
        "Full-length HP JOA IT mocks on the new HPRCA pattern (120 questions: 65 Computer, 20 Mathematics and 35 general " +
        "awareness, reasoning and language) plus 25-question computer subject tests for every syllabus area: Fundamentals & " +
        "Hardware, Software & OS, MS Word & PowerPoint, MS Excel, Networking & Cyber Security, and Number System, DBMS & Web. " +
        "Every question has a detailed solution in Hindi and English.",
    },
    product: {
      slug: JOA_IT_PRODUCT_SLUG,
      title: "HP JOA IT Mock Test Series — HPRCA New Pattern",
      titleHi: "एचपी जेओए आईटी मॉक टेस्ट सीरीज़ — एचपीआरसीए नया पैटर्न",
      priceInPaise: PRICE_IN_PAISE,
      validityDays: VALIDITY_DAYS,
    },
  });
}

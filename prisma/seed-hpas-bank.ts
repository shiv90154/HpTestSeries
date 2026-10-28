// HPAS Prelims, ahead of the 13 December 2026 exam: General Studies Full Mocks 4-9 and CSAT (Paper II) Mocks 1-4.
//
// The HPAS series had three General Studies mocks and nothing for Paper II, the aptitude paper (CSAT) every candidate
// must clear with 33%. These tests are drawn from questions already in the bank (see bank-picker.ts): GS mocks follow
// the section split of HPAS mocks 1-3, harder questions first, never repeating a question or fact from the HPAS tests
// before them; CSAT mocks take reasoning, maths and passage questions. CSAT Mock 1 is free, the rest join the paid
// HPAS series. Idempotent: an existing test (matched by slug) is left alone.

import type { PrismaClient } from "../src/generated/prisma/client";
import { createBankPicker, createBankTest, type Slot } from "./bank-picker";
import { HPAS_SECTIONS } from "./hpas-series";

const SERIES_SLUG = "hpas-mock-test-series";
const GS_MOCKS = [4, 5, 6, 7, 8, 9];
const CSAT_MOCKS = [1, 2, 3, 4];

/** Every test this seed makes, for link checks in posts and exam copy. */
export const HPAS_BANK_TEST_SLUGS = [...GS_MOCKS.map((n) => `hpas-full-mock-${n}`), ...CSAT_MOCKS.map((n) => `hpas-csat-mock-${n}`)];

/** Questions per HPAS_SECTIONS section, as in HPAS mocks 1-3: 100 in all. */
const GS_SLOTS: Slot[] = [
  { section: 0, subject: "hp-gk", count: 25 },
  { section: 1, subject: "general-studies", topics: ["indian-history"], count: 15 },
  { section: 2, subject: "general-studies", topics: ["indian-polity"], count: 20 },
  { section: 3, subject: "general-studies", topics: ["indian-geography"], count: 15 },
  { section: 4, subject: "general-studies", topics: ["indian-economy"], count: 15 },
  { section: 5, subject: "general-studies", topics: ["general-science"], count: 10 },
];

const CSAT_SECTIONS = [
  { name: "Logical Reasoning & Mental Ability", nameHi: "तार्किक क्षमता एवं मानसिक योग्यता" },
  { name: "Basic Numeracy & Data Interpretation", nameHi: "आधारभूत संख्यात्मकता एवं आँकड़ों का विश्लेषण" },
  { name: "Comprehension", nameHi: "बोधगम्यता" },
];

const CSAT_SLOTS: Slot[] = [
  // Figure questions (mirror images, dice) read badly as text; the rest of the reasoning bank is CSAT ground.
  { section: 0, subject: "reasoning", topics: ["series", "coding-decoding", "blood-relations", "syllogism", "puzzles", "direction-sense", "ranking", "analogy", "odd-one-out", "clock-calendar", "inequality", "venn-diagram", "alphabet-test", "math-operations"], count: 45 },
  { section: 1, subject: "quant", count: 45 },
  { section: 2, subject: "english", topics: ["comprehension"], count: 10 },
];

const GS_INSTRUCTIONS =
  "HPAS Prelims Paper I (General Studies) mock: 100 questions in 120 minutes. Sections: Himachal GK (25), Indian History & Culture (15), " +
  "Polity & Governance (20), Geography & Environment (15), Indian Economy (15) and Science & Technology (10). Each correct answer gives " +
  "1 mark and each wrong answer deducts 0.25 marks. You can switch between Hindi and English at any time.";

const CSAT_INSTRUCTIONS =
  "HPAS Prelims Paper II (CSAT, aptitude) mock: 100 questions in 120 minutes. Sections: Logical Reasoning & Mental Ability (45), " +
  "Basic Numeracy & Data Interpretation (45) and Comprehension (10). Paper II is qualifying: you need 33% to have Paper I counted. " +
  "Each correct answer gives 1 mark and each wrong answer deducts 0.25 marks. You can switch between Hindi and English at any time.";

export async function seedHpasBank(db: PrismaClient) {
  const exam = await db.exam.findFirst({ where: { slug: "hpas", body: { slug: "hppsc" } }, select: { id: true } });
  const series = await db.testSeries.findUnique({ where: { slug: SERIES_SLUG }, select: { id: true, tests: { select: { order: true } } } });
  if (!exam || !series) {
    console.warn("HPAS bank seed: exam hppsc/hpas or its series is missing, skipping");
    return { createdTests: 0 };
  }
  const hpasTests = (await db.test.findMany({ where: { examId: exam.id }, select: { slug: true } })).map((t) => t.slug);
  const gsSlugs = GS_MOCKS.map((n) => `hpas-full-mock-${n}`);
  const csatSlugs = CSAT_MOCKS.map((n) => `hpas-csat-mock-${n}`);
  const have = new Set(hpasTests);
  let order = Math.max(-1, ...series.tests.map((t) => t.order)) + 1;
  let createdTests = 0;

  const attach = async (testId: string) => {
    await db.seriesTest.create({ data: { seriesId: series.id, testId, order: order++ } });
    createdTests++;
  };

  if (!gsSlugs.every((s) => have.has(s))) {
    const gs = await createBankPicker(db, { subjects: ["hp-gk", "general-studies"], difficulties: ["HARD", "MEDIUM"], avoidTests: hpasTests });
    for (const [i, n] of GS_MOCKS.entries()) {
      if (have.has(gsSlugs[i])) continue;
      const sections = HPAS_SECTIONS.map((sec, s) => ({ ...sec, questionIds: GS_SLOTS.filter((x) => x.section === s).flatMap((x) => gs.take(x)) }));
      const total = sections.reduce((t, s) => t + s.questionIds.length, 0);
      if (total < 100) throw new Error(`Not enough General Studies questions for ${gsSlugs[i]}: ${total} of 100`);
      await attach(
        await createBankTest(db, {
          slug: gsSlugs[i],
          title: `HPAS Prelims Full Mock Test ${n}`,
          titleHi: `एचपीएएस प्रारंभिक फुल मॉक टेस्ट ${n}`,
          examId: exam.id,
          durationSec: 120 * 60,
          isFree: false,
          instructions: GS_INSTRUCTIONS,
          marksCorrect: 1,
          marksWrong: 0.25,
          sections,
        }),
      );
    }
  }

  if (!csatSlugs.every((s) => have.has(s))) {
    // Reasoning and maths share answers like "24" across unrelated questions, so only exact repeats are avoided here.
    const csat = await createBankPicker(db, { subjects: ["reasoning", "quant", "english"], difficulties: ["MEDIUM", "HARD", "EASY"], avoidTests: hpasTests, dedupe: false });
    for (const [i, n] of CSAT_MOCKS.entries()) {
      if (have.has(csatSlugs[i])) continue;
      const sections = CSAT_SECTIONS.map((sec, s) => ({ ...sec, questionIds: CSAT_SLOTS.filter((x) => x.section === s).flatMap((x) => csat.take(x)) }));
      const total = sections.reduce((t, s) => t + s.questionIds.length, 0);
      if (total < 100) throw new Error(`Not enough aptitude questions for ${csatSlugs[i]}: ${total} of 100`);
      await attach(
        await createBankTest(db, {
          slug: csatSlugs[i],
          title: `HPAS CSAT (Paper II) Mock Test ${n}`,
          titleHi: `एचपीएएस सीसैट (पेपर II) मॉक टेस्ट ${n}`,
          examId: exam.id,
          durationSec: 120 * 60,
          // The first CSAT mock is free: no other site offers a free HPAS Paper II mock, and it shows what the series adds.
          isFree: n === 1,
          instructions: CSAT_INSTRUCTIONS,
          marksCorrect: 1,
          marksWrong: 0.25,
          sections,
        }),
      );
    }
  }
  return { createdTests };
}

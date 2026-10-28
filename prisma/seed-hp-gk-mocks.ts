// Himachal GK Free Mock Tests 2-5: no-login, 25 Himachal GK questions each, for the /himachal-gk-mock-test hub.
//
// Students search "hp gk mock test" (and "... in hindi") more than any other free-test query, but only Free Mock 1
// existed. These mocks are drawn from the Himachal GK questions already in the bank (written and checked for the
// exam series), spread across topics, so no new facts are introduced here. No question repeats across the free GK
// mocks. Idempotent: an existing test (matched by slug) is left alone, so admin edits survive a re-seed.

import type { PrismaClient } from "../src/generated/prisma/client";
import { createBankPicker, createBankTest } from "./bank-picker";
import { DEMO_TEST_SLUG } from "./seed-demo";

export const HP_GK_FREE_MOCK_PREFIX = "hp-gk-free-mock-";

/** Questions per topic in each mock: 25 in all. */
const QUOTA: [topic: string, count: number][] = [
  ["history", 4],
  ["geography", 4],
  ["rivers-lakes", 3],
  ["districts", 3],
  ["culture-festivals", 4],
  ["economy", 2],
  ["polity-administration", 3],
  ["personalities", 2],
];

const MOCKS = [2, 3, 4, 5];

/** Every test this seed makes, for link checks in posts and exam copy. */
export const HP_GK_FREE_MOCK_SLUGS = MOCKS.map((n) => `${HP_GK_FREE_MOCK_PREFIX}${n}`);

export async function seedHpGkFreeMocks(db: PrismaClient) {
  const slugs = MOCKS.map((n) => `${HP_GK_FREE_MOCK_PREFIX}${n}`);
  const have = new Set((await db.test.findMany({ where: { slug: { in: slugs } }, select: { slug: true } })).map((t) => t.slug));
  if (slugs.every((s) => have.has(s))) return { created: 0 };
  const picker = await createBankPicker(db, { subjects: ["hp-gk"], difficulties: ["EASY", "MEDIUM"], avoidTests: [DEMO_TEST_SLUG, ...slugs] });

  let created = 0;
  for (const [i, n] of MOCKS.entries()) {
    const slug = slugs[i];
    if (have.has(slug)) continue;
    const ids = QUOTA.flatMap(([topic, count]) => picker.take({ section: 0, subject: "hp-gk", topics: [topic], count }));
    // A topic that ran out of fresh facts is made up from the others.
    if (ids.length < 25) ids.push(...picker.take({ section: 0, subject: "hp-gk", count: 25 - ids.length }));
    if (ids.length < 25) throw new Error(`Not enough Himachal GK questions for ${slug}: ${ids.length} of 25`);
    await createBankTest(db, {
      slug,
      title: `Himachal GK Free Mock Test ${n}`,
      titleHi: `हिमाचल GK फ्री मॉक टेस्ट ${n}`,
      durationSec: 20 * 60,
      isFree: true,
      instructions:
        "25 Himachal GK questions on history, geography, rivers, districts, culture, economy and polity of Himachal Pradesh: the section every HPRCA, HP Police, Patwari, High Court and HPAS exam has.",
      marksCorrect: 1,
      marksWrong: 0.25,
      sections: [{ name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान", questionIds: ids }],
    });
    created++;
  }
  return { created };
}

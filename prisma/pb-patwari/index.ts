// PSSSB Patwari mock tests for pbtestseries.in. The notification is not out yet (docs/PB-TEST-SERIES-PLAN.md §4.4), so the
// 100-question, 120-minute pattern with a quarter-mark negative and the section split are ours, built on the PSSSB merit-paper
// subjects. Re-check against the official advertisement once it is published. Adding a mock = writing mockN.ts and adding it here.

import type { PatwariQuestion, TestDef } from "../patwari/types";
import { patwariFreeMock } from "./free-mock";
import { pbPatwariMock1 } from "./mock1";
import { pbPatwariMock2 } from "./mock2";
import { pbPatwariMock3 } from "./mock3";

export const PB_PATWARI_SECTIONS = [
  { name: "Punjab GK", nameHi: "पंजाब सामान्य ज्ञान", count: 30 },
  { name: "General Knowledge", nameHi: "सामान्य ज्ञान", count: 20 },
  { name: "Reasoning & Maths", nameHi: "तर्कशक्ति एवं गणित", count: 20 },
  { name: "English", nameHi: "अंग्रेज़ी", count: 10 },
  { name: "Punjabi", nameHi: "पंजाबी", count: 10 },
  { name: "Computer", nameHi: "कंप्यूटर", count: 10 },
] as const;

export const PB_PATWARI_FREE_MOCK_SLUG = "psssb-patwari-free-mock-1";

const mock = (slug: string, title: string, titleHi: string, questions: PatwariQuestion[], isFree = false): TestDef => ({
  slug,
  title,
  titleHi,
  type: "MOCK",
  durationSec: 120 * 60,
  isFree,
  instructions:
    `Practice paper for the PSSSB Patwari written exam: ${questions.length} questions, ${questions.length} marks, 120 minutes. ` +
    "The Patwari advertisement is not out yet, so the pattern follows the PSSSB merit papers: Punjab GK 30, General Knowledge 20, Reasoning & Maths 20, English 10, Punjabi 10 and Computer 10. " +
    "Each correct answer gives 1 mark and each wrong answer deducts 0.25 marks. The qualifying Punjabi language paper is not covered in this test. " +
    "You can switch between English and Hindi at any time.",
  sections: PB_PATWARI_SECTIONS.map(({ name, nameHi }) => ({ name, nameHi })),
  questions,
});

export const PB_PATWARI_FREE_TEST: TestDef = mock(
  PB_PATWARI_FREE_MOCK_SLUG,
  "PSSSB Patwari Free Mock Test 1",
  "पीएसएसएसबी पटवारी फ़्री मॉक टेस्ट 1",
  patwariFreeMock,
  true,
);

const PAID_MOCKS: PatwariQuestion[][] = [pbPatwariMock1, pbPatwariMock2, pbPatwariMock3];

export const PB_PATWARI_PAID_TESTS: TestDef[] = PAID_MOCKS.map((questions, i) =>
  mock(`psssb-patwari-mock-${i + 1}`, `PSSSB Patwari Mock Test ${i + 1}`, `पीएसएसएसबी पटवारी मॉक टेस्ट ${i + 1}`, questions),
);

export const PB_PATWARI_TESTS: TestDef[] = [PB_PATWARI_FREE_TEST, ...PB_PATWARI_PAID_TESTS];

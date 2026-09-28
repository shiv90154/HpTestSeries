// Every HP Patwari test that is seeded: 3 full mocks followed by 14 single-subject tests (2 per subject).

import { mock1 } from "./mock1";
import { mock2 } from "./mock2";
import { mock3 } from "./mock3";
import { english1, english2 } from "./sectional/english";
import { gk1, gk2 } from "./sectional/gk";
import { hindi1, hindi2 } from "./sectional/hindi";
import { hpGk1, hpGk2 } from "./sectional/hp-gk";
import { maths1, maths2 } from "./sectional/maths";
import { reasoning1, reasoning2 } from "./sectional/reasoning";
import { revenueComputer1, revenueComputer2 } from "./sectional/revenue-computer";
import { SECTIONS, type PatwariQuestion, type TestDef } from "./types";

const MOCK_INSTRUCTIONS =
  "Full-length HP Patwari mock: 100 questions, 100 marks, 90 minutes. Each correct answer gives 1 mark and each wrong answer " +
  "deducts 0.25 marks. Sections: Himachal GK (30), General Knowledge (20), Reasoning (15), Mathematics (15), Hindi & English (15) " +
  "and Revenue & Computer (5). The paper is set at a level slightly above the real exam, so treat it as tough practice. " +
  "You can switch between Hindi and English at any time.";

const SUBJECT_INSTRUCTIONS = (subject: string) =>
  `Subject test: 25 questions, 25 marks, 25 minutes. Each correct answer gives 1 mark and each wrong answer deducts 0.25 marks. ` +
  `This test covers ${subject} only, set slightly above the real exam level. You can switch between Hindi and English at any time.`;

const mocks: TestDef[] = [mock1, mock2, mock3].map((questions, i) => ({
  slug: `hp-patwari-full-mock-${i + 1}`,
  title: `HP Patwari Full Mock Test ${i + 1}`,
  titleHi: `एचपी पटवारी फुल मॉक टेस्ट ${i + 1}`,
  type: "MOCK",
  durationSec: 90 * 60,
  instructions: MOCK_INSTRUCTIONS,
  sections: SECTIONS.map((s) => ({ name: s.name, nameHi: s.nameHi })),
  questions,
}));

const SUBJECTS: { slug: string; name: string; nameHi: string; tests: [PatwariQuestion[], PatwariQuestion[]] }[] = [
  { slug: "hp-gk", name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान", tests: [hpGk1, hpGk2] },
  { slug: "gk", name: "General Knowledge", nameHi: "सामान्य ज्ञान", tests: [gk1, gk2] },
  { slug: "reasoning", name: "Reasoning", nameHi: "तर्कशक्ति", tests: [reasoning1, reasoning2] },
  { slug: "maths", name: "Mathematics", nameHi: "गणित", tests: [maths1, maths2] },
  { slug: "hindi", name: "Hindi", nameHi: "हिंदी", tests: [hindi1, hindi2] },
  { slug: "english", name: "English", nameHi: "अंग्रेज़ी", tests: [english1, english2] },
  { slug: "revenue-computer", name: "Revenue & Computer", nameHi: "राजस्व एवं कंप्यूटर", tests: [revenueComputer1, revenueComputer2] },
];

const subjectTests: TestDef[] = SUBJECTS.flatMap((s) =>
  s.tests.map((questions, i) => ({
    slug: `hp-patwari-${s.slug}-${i + 1}`,
    title: `HP Patwari ${s.name} Test ${i + 1}`,
    titleHi: `एचपी पटवारी ${s.nameHi} टेस्ट ${i + 1}`,
    type: "SECTIONAL" as const,
    durationSec: 25 * 60,
    instructions: SUBJECT_INSTRUCTIONS(s.name),
    sections: [{ name: s.name, nameHi: s.nameHi }],
    questions,
  })),
);

export const PATWARI_TESTS: TestDef[] = [...mocks, ...subjectTests];

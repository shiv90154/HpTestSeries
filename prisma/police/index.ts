// Every HP Police Constable test that is seeded: 9 full mocks followed by 12 subject tests (2 per subject).

import { mock1 } from "./mock1";
import { mock2 } from "./mock2";
import { mock3 } from "./mock3";
import { mock4 } from "./mock4";
import { mock5 } from "./mock5";
import { mock6 } from "./mock6";
import { mock7 } from "./mock7";
import { mock8 } from "./mock8";
import { mock9 } from "./mock9";
import { english1, english2 } from "./sectional/english";
import { gk1, gk2 } from "./sectional/gk";
import { hindi1, hindi2 } from "./sectional/hindi";
import { hpGk1, hpGk2 } from "./sectional/hp-gk";
import { maths1, maths2 } from "./sectional/maths";
import { reasoning1, reasoning2 } from "./sectional/reasoning";
import { SECTIONS, type PoliceQuestion, type TestDef } from "./types";

const MOCK_INSTRUCTIONS =
  "Full-length HP Police Constable mock: 100 questions, 100 marks, 90 minutes. Each correct answer gives 1 mark and each wrong " +
  "answer deducts 0.25 marks. Sections: Himachal GK (25), General Knowledge (25), Reasoning (20), Numerical Ability (15) and " +
  "Hindi & English (15). The paper is set at a level slightly above the real exam, so treat it as tough practice. " +
  "You can switch between Hindi and English at any time.";

const SUBJECT_INSTRUCTIONS = (subject: string) =>
  `Subject test: 25 questions, 25 marks, 25 minutes. Each correct answer gives 1 mark and each wrong answer deducts 0.25 marks. ` +
  `This test covers ${subject} only, set slightly above the real exam level. You can switch between Hindi and English at any time.`;

const mocks: TestDef[] = [mock1, mock2, mock3, mock4, mock5, mock6, mock7, mock8, mock9].map((questions, i) => ({
  slug: `hp-police-constable-full-mock-${i + 1}`,
  title: `HP Police Constable Full Mock Test ${i + 1}`,
  titleHi: `एचपी पुलिस कांस्टेबल फुल मॉक टेस्ट ${i + 1}`,
  type: "MOCK",
  durationSec: 90 * 60,
  // Only the first mock is a free taste of the series; everything else must be bought.
  demoPercent: i === 0 ? 50 : 0,
  instructions: MOCK_INSTRUCTIONS,
  sections: SECTIONS.map((s) => ({ name: s.name, nameHi: s.nameHi })),
  questions,
}));

const SUBJECTS: { slug: string; name: string; nameHi: string; tests: [PoliceQuestion[], PoliceQuestion[]] }[] = [
  { slug: "hp-gk", name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान", tests: [hpGk1, hpGk2] },
  { slug: "gk", name: "General Knowledge", nameHi: "सामान्य ज्ञान", tests: [gk1, gk2] },
  { slug: "reasoning", name: "Reasoning", nameHi: "तर्कशक्ति", tests: [reasoning1, reasoning2] },
  { slug: "maths", name: "Numerical Ability", nameHi: "संख्यात्मक योग्यता", tests: [maths1, maths2] },
  { slug: "hindi", name: "Hindi", nameHi: "हिंदी", tests: [hindi1, hindi2] },
  { slug: "english", name: "English", nameHi: "अंग्रेज़ी", tests: [english1, english2] },
];

const subjectTests: TestDef[] = SUBJECTS.flatMap((s) =>
  s.tests.map((questions, i) => ({
    slug: `hp-police-constable-${s.slug}-${i + 1}`,
    title: `HP Police Constable ${s.name} Test ${i + 1}`,
    titleHi: `एचपी पुलिस कांस्टेबल ${s.nameHi} टेस्ट ${i + 1}`,
    type: "SECTIONAL" as const,
    durationSec: 25 * 60,
    instructions: SUBJECT_INSTRUCTIONS(s.name),
    sections: [{ name: s.name, nameHi: s.nameHi }],
    questions,
  })),
);

export const POLICE_TESTS: TestDef[] = [...mocks, ...subjectTests];

// Every HP Panchayat Secretary test that is seeded: full mocks followed by subject tests, one per syllabus area.

import { mock1 } from "./mock1";
import { mock2 } from "./mock2";
import { mock3 } from "./mock3";
import { mock4 } from "./mock4";
import { mock5 } from "./mock5";
import { gk1, gk2 } from "../patwari/sectional/gk";
import { hpGk1 } from "../patwari/sectional/hp-gk";
import { hpGkNew } from "./sectional/hp-gk";
import { panchayatiRaj1 } from "./sectional/panchayati-raj";
import { schemesAccounts1 } from "./sectional/schemes-accounts";
import { scienceNew } from "./sectional/science";
import { socialScienceNew } from "./sectional/social-science";
import { SECTIONS, type PanchayatQuestion, type TestDef } from "./types";

const MOCK_INSTRUCTIONS =
  "Full-length HP Panchayat Secretary mock on the HPRCA pattern: 120 questions, 120 marks, 90 minutes. Each correct answer gives 1 mark and " +
  "each wrong answer deducts 0.25 marks. Sections: Himachal GK & Current Affairs (25), Social Science (20), Everyday Science (10), " +
  "Reasoning & Mathematics (20), Hindi & English (20) and Panchayati Raj, Rural Development & Computer (25). The paper is set at a level " +
  "slightly above the real exam, so treat it as tough practice. You can switch between Hindi and English at any time.";

const SUBJECT_INSTRUCTIONS = (subject: string) =>
  `Subject test: 25 questions, 25 marks, 25 minutes. Each correct answer gives 1 mark and each wrong answer deducts 0.25 marks. ` +
  `This test covers ${subject} only, set slightly above the real exam level. You can switch between Hindi and English at any time.`;

const mocks: TestDef[] = [mock1, mock2, mock3, mock4, mock5].map((questions, i) => ({
  slug: `hp-panchayat-secretary-full-mock-${i + 1}`,
  title: `HP Panchayat Secretary Full Mock Test ${i + 1}`,
  titleHi: `एचपी पंचायत सचिव फुल मॉक टेस्ट ${i + 1}`,
  type: "MOCK",
  durationSec: 90 * 60,
  // Only the first mock is a free taste of the series; everything else must be bought.
  demoPercent: i === 0 ? 50 : 0,
  instructions: MOCK_INSTRUCTIONS,
  sections: SECTIONS.map((s) => ({ name: s.name, nameHi: s.nameHi })),
  questions,
}));

/** Up to `n` questions from an existing Patwari test that match `keep`, to top a subject test up to 25 (at most 40% may be borrowed). */
const borrow = (from: PanchayatQuestion[], keep: (x: PanchayatQuestion) => boolean, n: number) => from.filter(keep).sort((a, b) => Number(b.d === "H") - Number(a.d === "H")).slice(0, n);
const isTopic = (...subjects: string[]) => (x: PanchayatQuestion) => subjects.includes(x.topic);

const SUBJECTS: { slug: string; name: string; nameHi: string; tests: PanchayatQuestion[][] }[] = [
  { slug: "panchayati-raj", name: "Panchayati Raj", nameHi: "पंचायती राज", tests: [panchayatiRaj1] },
  { slug: "schemes-accounts", name: "Rural Development Schemes & Panchayat Accounts", nameHi: "ग्रामीण विकास योजनाएँ एवं पंचायत लेखा", tests: [schemesAccounts1] },
  { slug: "hp-gk", name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान", tests: [[...hpGkNew, ...borrow(hpGk1, (x) => x.topic !== "personalities", 9)]] },
  {
    slug: "science",
    name: "Everyday Science",
    nameHi: "दैनिक विज्ञान",
    tests: [[...scienceNew, ...borrow([...gk1, ...gk2], isTopic("general-science"), 9)]],
  },
  {
    slug: "social-science",
    name: "Social Science",
    nameHi: "सामाजिक विज्ञान",
    tests: [[...socialScienceNew, ...borrow([...gk1, ...gk2], isTopic("indian-history", "indian-geography", "indian-polity", "indian-economy"), 7)]],
  },
];

const subjectTests: TestDef[] = SUBJECTS.flatMap((s) =>
  s.tests.map((questions, i) => ({
    slug: `hp-panchayat-secretary-${s.slug}-${i + 1}`,
    title: `HP Panchayat Secretary ${s.name} Test ${i + 1}`,
    titleHi: `एचपी पंचायत सचिव ${s.nameHi} टेस्ट ${i + 1}`,
    type: "SECTIONAL" as const,
    durationSec: 25 * 60,
    instructions: SUBJECT_INSTRUCTIONS(s.name),
    sections: [{ name: s.name, nameHi: s.nameHi }],
    questions,
  })),
);

export const PANCHAYAT_SECRETARY_TESTS: TestDef[] = [...mocks, ...subjectTests];

// Delhi Police Constable (Executive) mock test series, written fresh to the SSC computer-based test pattern:
//   100 questions, 100 marks, 90 minutes, 0.25 marks off per wrong answer, in four parts:
//   General Awareness & Current Affairs (50), Reasoning (25), Numerical Ability (15), Computer Fundamentals (10).
// The series holds 5 full mocks, 5 subject tests (25 questions each) and 2 previous-year-pattern papers. The pattern
// can change between recruitments, so every test's instructions say to check the notification. The previous-year-pattern
// papers copy the mix of topics and the level of past papers; they are NOT reproductions of the actual papers.
// Question `s` is the index into DELHI_POLICE_SECTIONS. Adding a test = adding its file and one entry below.

import type { PatwariQuestion, TestDef } from "../patwari/types";
import type { SeriesSeed } from "../seed-series";
import { mock1 } from "./mock1";
import { mock2 } from "./mock2";
import { mock3 } from "./mock3";
import { mock4 } from "./mock4";
import { mock5 } from "./mock5";
import { pyqStyle1 } from "./pyq-style1";
import { pyqStyle2 } from "./pyq-style2";
import { ga1, ga2 } from "./sectional-ga";
import { computer1, maths1, reasoning1 } from "./sectional-other";

export const DELHI_POLICE_SECTIONS = [
  { name: "General Awareness & Current Affairs", nameHi: "सामान्य जागरूकता एवं समसामयिकी", count: 50 },
  { name: "Reasoning", nameHi: "तर्कशक्ति", count: 25 },
  { name: "Numerical Ability", nameHi: "संख्यात्मक योग्यता", count: 15 },
  { name: "Computer Fundamentals", nameHi: "कंप्यूटर की मूल बातें", count: 10 },
] as const;

const BILINGUAL = "Questions, options and solutions are in Hindi and English; switch at any time.";
const MARKING = "Each correct answer gives 1 mark and each wrong answer deducts 0.25 marks; unanswered questions carry no penalty.";
const CHECK = "The exam pattern can change with each recruitment, so always read the latest notification.";

/** "at exam level" or, when at least 30% of the questions are hard, "slightly above exam level". */
function level(qs: PatwariQuestion[]): string {
  return qs.filter((x) => x.d === "H").length >= qs.length * 0.3 ? "slightly above exam level" : "at exam level";
}

const sectionSummary = (qs: PatwariQuestion[]) => DELHI_POLICE_SECTIONS.map((s, i) => `${s.name} (${qs.filter((x) => x.s === i).length})`).join(", ");

const MOCKS: PatwariQuestion[][] = [mock1, mock2, mock3, mock4, mock5];

const mocks: TestDef[] = MOCKS.map((questions, i) => ({
  slug: `delhi-police-constable-full-mock-${i + 1}`,
  title: `Delhi Police Constable Full Mock Test ${i + 1}`,
  titleHi: `दिल्ली पुलिस कांस्टेबल फुल मॉक टेस्ट ${i + 1}`,
  type: "MOCK" as const,
  durationSec: 90 * 60,
  // The first mock is a free taste of the series; everything else must be bought.
  isFree: i === 0,
  instructions:
    `Full-length Delhi Police Constable (Executive) mock in the SSC computer-based test format: 100 questions, 100 marks, 90 minutes. ${MARKING} ` +
    `Sections: ${sectionSummary(questions)}. Every question is written fresh and the paper is set ${level(questions)}. ${BILINGUAL} ${CHECK}`,
  sections: DELHI_POLICE_SECTIONS.map((s) => ({ name: s.name, nameHi: s.nameHi })),
  questions,
}));

const SUBJECT_TESTS: { slug: string; name: string; nameHi: string; questions: PatwariQuestion[] }[] = [
  { slug: "general-awareness-1", name: "General Awareness & Current Affairs Test 1", nameHi: "सामान्य जागरूकता एवं समसामयिकी टेस्ट 1", questions: ga1 },
  { slug: "general-awareness-2", name: "General Awareness & Current Affairs Test 2", nameHi: "सामान्य जागरूकता एवं समसामयिकी टेस्ट 2", questions: ga2 },
  { slug: "reasoning-1", name: "Reasoning Test 1", nameHi: "तर्कशक्ति टेस्ट 1", questions: reasoning1 },
  { slug: "numerical-ability-1", name: "Numerical Ability Test 1", nameHi: "संख्यात्मक योग्यता टेस्ट 1", questions: maths1 },
  { slug: "computer-fundamentals-1", name: "Computer Fundamentals Test 1", nameHi: "कंप्यूटर की मूल बातें टेस्ट 1", questions: computer1 },
];

const subjectTests: TestDef[] = SUBJECT_TESTS.map((t) => ({
  slug: `delhi-police-constable-${t.slug}`,
  title: `Delhi Police Constable ${t.name}`,
  titleHi: `दिल्ली पुलिस कांस्टेबल ${t.nameHi}`,
  type: "SECTIONAL" as const,
  durationSec: 25 * 60,
  instructions:
    `Subject test: 25 questions, 25 marks, 25 minutes. ${MARKING} The test covers one part of the Delhi Police Constable paper only. ` +
    `Every question is written fresh and the test is set ${level(t.questions)}. ${BILINGUAL} ${CHECK}`,
  sections: [{ name: t.name.replace(/ Test \d+$/, ""), nameHi: t.nameHi.replace(/ टेस्ट \d+$/, "") }],
  questions: t.questions,
}));

const pyqStyleTests: TestDef[] = [pyqStyle1, pyqStyle2].map((questions, i) => ({
  slug: `delhi-police-constable-pyq-style-paper-${i + 1}`,
  title: `Delhi Police Constable Previous-Year-Pattern Practice Paper ${i + 1}`,
  titleHi: `दिल्ली पुलिस कांस्टेबल पिछले वर्षों के पैटर्न पर अभ्यास प्रश्न-पत्र ${i + 1}`,
  type: "MOCK" as const,
  durationSec: 90 * 60,
  instructions:
    `Practice paper in the Delhi Police Constable (Executive) format: 100 questions, 100 marks, 90 minutes. ${MARKING} ` +
    `It follows the topic mix and level of past Delhi Police Constable papers, but the papers are not reproductions of any real question paper: every question is written fresh. ` +
    `Sections: ${sectionSummary(questions)}. The paper is set ${level(questions)}. ${BILINGUAL} ${CHECK}`,
  sections: DELHI_POLICE_SECTIONS.map((s) => ({ name: s.name, nameHi: s.nameHi })),
  questions,
}));

export const DELHI_POLICE_TESTS: TestDef[] = [...mocks, ...subjectTests, ...pyqStyleTests];

const title = "Delhi Police Constable Mock Test Series";
const titleHi = "दिल्ली पुलिस कांस्टेबल मॉक टेस्ट सीरीज़";

export const DELHI_POLICE_SERIES: (SeriesSeed & { key: string })[] = [
  {
    key: "delhi-police-constable",
    label: "Delhi Police Constable seed",
    bodySlug: "delhi-police",
    examSlug: "constable",
    tests: DELHI_POLICE_TESTS,
    series: {
      slug: "delhi-police-constable-mock-test-series",
      title,
      titleHi,
      description:
        "Delhi Police Constable (Executive) mock tests in the SSC computer-based test format: 100 questions, 90 minutes, 0.25 negative marking, covering " +
        "general awareness and current affairs, reasoning, numerical ability and computer fundamentals. Every question has a detailed solution in Hindi and English.",
    },
    product: { slug: "delhi-police-constable-mock-series", title, titleHi, priceInPaise: 299_00, validityDays: 180 },
  },
];

/** Every question in the series, for the freshness checks in the tests. */
export const DELHI_POLICE_QUESTIONS: PatwariQuestion[] = DELHI_POLICE_TESTS.flatMap((t) => t.questions);

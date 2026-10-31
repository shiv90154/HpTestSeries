// SSC CHSL Tier 1 mock test series, written fresh to the Tier 1 pattern (docs/SSC-TEST-SERIES-PLAN.md §4.2):
//   100 questions, 200 marks, 60 minutes, 0.50 marks off per wrong answer, in four parts of 25:
//   General Intelligence & Reasoning, General Awareness, Quantitative Aptitude, English Language.
// ⚠ Check the figures against the current notice on ssc.gov.in before publishing; every test's instructions say so too.
// Question `s` is the index into CHSL_SECTIONS. Adding a test = adding its file and one entry in MOCKS below.
// The product is seeded inactive until the first 6 mocks exist (plan §3, Phase 1); switch it on in /admin/products.

import type { PatwariQuestion, TestDef } from "../../patwari/types";
import type { SeriesSeed } from "../../seed-series";
import { mock1 } from "./mock1";
import { mock2 } from "./mock2";

export const CHSL_SECTIONS = [
  { name: "General Intelligence & Reasoning", nameHi: "सामान्य बुद्धिमत्ता एवं तर्कशक्ति", count: 25 },
  { name: "General Awareness", nameHi: "सामान्य जागरूकता", count: 25 },
  { name: "Quantitative Aptitude", nameHi: "मात्रात्मक अभिक्षमता", count: 25 },
  { name: "English Language", nameHi: "अंग्रेज़ी भाषा", count: 25 },
] as const;

const MARKING = "Each correct answer gives 2 marks and each wrong answer deducts 0.50 marks; unanswered questions carry no penalty.";
const CHECK = "The exam pattern can change with each notification, so always read the latest notice on ssc.gov.in. This is a private practice test, not affiliated with the Staff Selection Commission.";

/** "at exam level" or, when at least 30% of the questions are hard, "slightly above exam level". */
const level = (qs: PatwariQuestion[]) => (qs.filter((x) => x.d === "H").length >= qs.length * 0.3 ? "slightly above exam level" : "at exam level");
const sectionSummary = (qs: PatwariQuestion[]) => CHSL_SECTIONS.map((s, i) => `${s.name} (${qs.filter((x) => x.s === i).length})`).join(", ");

const MOCKS: PatwariQuestion[][] = [mock1, mock2];

export const CHSL_TESTS: TestDef[] = MOCKS.map((questions, i) => ({
  slug: `ssc-chsl-tier-1-full-mock-${i + 1}`,
  title: `SSC CHSL Tier 1 Full Mock Test ${i + 1}`,
  titleHi: `एसएससी सीएचएसएल टियर 1 फुल मॉक टेस्ट ${i + 1}`,
  type: "MOCK" as const,
  durationSec: 60 * 60,
  // The first mock is a free taste of the series; everything else must be bought.
  isFree: i === 0,
  marksCorrect: 2,
  marksWrong: 0.5,
  instructions:
    `Full-length SSC CHSL Tier 1 mock in the computer-based test format: 100 questions, 200 marks, 60 minutes. ${MARKING} ` +
    `Sections: ${sectionSummary(questions)}. Every question is written fresh and the paper is set ${level(questions)}. ` +
    `Questions, options and solutions are in Hindi and English (the English section is in English only); switch at any time. ${CHECK}`,
  sections: CHSL_SECTIONS.map((s) => ({ name: s.name, nameHi: s.nameHi })),
  questions,
}));

/** Every question in the series, for the freshness checks in the tests. */
export const CHSL_QUESTIONS: PatwariQuestion[] = CHSL_TESTS.flatMap((t) => t.questions);

const title = "SSC CHSL Tier 1 Mock Test Series";
const titleHi = "एसएससी सीएचएसएल टियर 1 मॉक टेस्ट सीरीज़";

export const CHSL_SERIES: (SeriesSeed & { key: string })[] = [
  {
    key: "ssc-chsl-tier-1",
    label: "SSC CHSL seed",
    bodySlug: "ssc",
    examSlug: "chsl",
    tests: CHSL_TESTS,
    series: {
      slug: "ssc-chsl-tier-1-mock-test-series",
      title,
      titleHi,
      description:
        "SSC CHSL Tier 1 mock tests in the computer-based test format: 100 questions, 60 minutes, 0.50 negative marking, covering reasoning, general awareness, " +
        "quantitative aptitude and English. Every question has a detailed solution in Hindi and English.",
    },
    product: { slug: "ssc-chsl-tier-1-mock-series", title, titleHi, priceInPaise: 99_00, validityDays: 180, isActive: false },
  },
];

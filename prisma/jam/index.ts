// IIT JAM free mocks, one per test paper: Physics (PH), Chemistry (CY), Mathematics (MA), Mathematical Statistics (MS),
// Biotechnology (BT), Biological Sciences (BL) and Geology (GG). The body is national, so every site shows them.
//
// The real paper has 60 questions in 3 hours for 100 marks, in three sections: 30 single-answer MCQs (negative marking of
// one-third of the question's marks), 10 multiple-select questions and 20 numerical-answer questions (no negative marking).
// Our tests take one correct option per question, so these mocks are the MCQ part only: 30 questions in 90 minutes,
// 1 mark each and 0.33 off a wrong answer. The instructions say so. Each exam is one series; its product is created
// hidden until there are paid mocks to sell (switch it on in /admin/products). To add a mock, append to a subject's `mocks`.

import type { PatwariQuestion, TestDef } from "../patwari/types";
import type { SeriesSeed } from "../seed-series";
import { jamBiologicalSciencesMock1 } from "./biological-sciences";
import { jamBiotechnologyMock1 } from "./biotechnology";
import { jamChemistryMock1 } from "./chemistry";
import { jamGeologyMock1 } from "./geology";
import { jamMathematicsMock1 } from "./mathematics";
import { jamPhysicsMock1 } from "./physics";
import { jamPhysicsMock2, jamPhysicsMock3, jamPhysicsMock4 } from "./physics-more";
import { jamPhysicsMock9, jamPhysicsMock10, jamPhysicsMock11, jamPhysicsMock12 } from "./physics-more3";
import { jamPhysicsMock5, jamPhysicsMock6, jamPhysicsMock7, jamPhysicsMock8 } from "./physics-more2";
import { jamStatisticsMock1 } from "./statistics";

type Subject = {
  key: string;
  examSlug: string;
  name: string;
  nameHi: string;
  code: string;
  /** What the paper covers, for the series description. */
  covers: string;
  mocks: PatwariQuestion[][];
};

const SUBJECTS: Subject[] = [
  {
    key: "jam-physics",
    examSlug: "physics",
    name: "Physics",
    nameHi: "भौतिकी",
    code: "PH",
    covers: "mathematical methods, mechanics, electromagnetism, thermal and statistical physics, waves and optics, quantum and modern physics, and electronics",
    mocks: [jamPhysicsMock1, jamPhysicsMock2, jamPhysicsMock3, jamPhysicsMock4, jamPhysicsMock5, jamPhysicsMock6, jamPhysicsMock7, jamPhysicsMock8, jamPhysicsMock9, jamPhysicsMock10, jamPhysicsMock11, jamPhysicsMock12],
  },
  {
    key: "jam-chemistry",
    examSlug: "chemistry",
    name: "Chemistry",
    nameHi: "रसायन विज्ञान",
    code: "CY",
    covers: "physical, organic and inorganic chemistry",
    mocks: [jamChemistryMock1],
  },
  {
    key: "jam-mathematics",
    examSlug: "mathematics",
    name: "Mathematics",
    nameHi: "गणित",
    code: "MA",
    covers: "real analysis, calculus, vector calculus, linear algebra, differential equations and abstract algebra",
    mocks: [jamMathematicsMock1],
  },
  {
    key: "jam-mathematical-statistics",
    examSlug: "mathematical-statistics",
    name: "Mathematical Statistics",
    nameHi: "गणितीय सांख्यिकी",
    code: "MS",
    covers: "calculus and linear algebra, probability, random variables and distributions, estimation and testing of hypotheses",
    mocks: [jamStatisticsMock1],
  },
  {
    key: "jam-biotechnology",
    examSlug: "biotechnology",
    name: "Biotechnology",
    nameHi: "जैव प्रौद्योगिकी",
    code: "BT",
    covers: "biochemistry, cell and molecular biology, genetics, microbiology and immunology, plant and animal biology, with chemistry, physics and mathematics",
    mocks: [jamBiotechnologyMock1],
  },
  {
    key: "jam-biological-sciences",
    examSlug: "biological-sciences",
    name: "Biological Sciences",
    nameHi: "जीव विज्ञान",
    code: "BL",
    covers: "cell biology and biochemistry, genetics and molecular biology, physiology, ecology and evolution, plant biology, with chemistry, mathematics and physics",
    mocks: [jamBiologicalSciencesMock1],
  },
  {
    key: "jam-geology",
    examSlug: "geology",
    name: "Geology",
    nameHi: "भूविज्ञान",
    code: "GG",
    covers: "mineralogy and petrology, structural geology and tectonics, stratigraphy and palaeontology, geomorphology, hydrology and economic geology",
    mocks: [jamGeologyMock1],
  },
];

/** Rupees for the paid mocks. Series with only a free mock stay hidden until they have paid mocks (switch on in /admin/products). */
const PRICE_RUPEES = 179;
const MINUTES = 90;

/** "set at exam level" or, when at least 30% of the questions are hard, "slightly above exam level". */
function level(qs: PatwariQuestion[]): string {
  return qs.filter((x) => x.d === "H").length >= qs.length * 0.3 ? "slightly above exam level" : "at exam level";
}

function instructions(s: Subject, qs: PatwariQuestion[]): string {
  return (
    `IIT JAM ${s.name} (${s.code}) mock: ${qs.length} multiple-choice questions, ${qs.length} marks, ${MINUTES} minutes. ` +
    "Each correct answer gives 1 mark and each wrong answer deducts 0.33 (one-third), as for the MCQs of the real paper. Unanswered questions carry no penalty. " +
    "The real JAM paper has 60 questions in 3 hours for 100 marks and also has multiple-select and numerical-answer questions (no negative marking); " +
    "those formats are not part of this mock, which covers the MCQ part. " +
    `Every question is written fresh and the paper is set ${level(qs)}. IIT JAM is held in English, so the Hindi view shows the same text. ` +
    "Check the official JAM information brochure for the current syllabus and pattern."
  );
}

export const JAM_SERIES: (SeriesSeed & { key: string })[] = SUBJECTS.map((s) => {
  const tests: TestDef[] = s.mocks.map((questions, i) => ({
    slug: i === 0 ? `${s.key}-free-mock-1` : `${s.key}-mock-${i + 1}`,
    title: `IIT JAM ${s.name} ${i === 0 ? "Free " : ""}Mock Test ${i + 1}`,
    titleHi: `आईआईटी जैम ${s.nameHi} ${i === 0 ? "फ्री " : ""}मॉक टेस्ट ${i + 1}`,
    type: "MOCK",
    durationSec: MINUTES * 60,
    // The first mock is a free taste of the series; the rest must be bought.
    isFree: i === 0,
    marksCorrect: 1,
    marksWrong: 0.33,
    instructions: instructions(s, questions),
    sections: [{ name: `${s.name} (${s.code})`, nameHi: `${s.nameHi} (${s.code})` }],
    questions,
  }));
  const title = `IIT JAM ${s.name} Mock Test Series`;
  const titleHi = `आईआईटी जैम ${s.nameHi} मॉक टेस्ट सीरीज़`;
  return {
    key: s.key,
    label: `IIT JAM ${s.name} seed`,
    bodySlug: "iit-jam",
    examSlug: s.examSlug,
    tests,
    series: {
      slug: `${s.key}-mock-test-series`,
      title,
      titleHi,
      description: `Mock tests for the IIT JAM ${s.name} (${s.code}) paper covering ${s.covers}. Every question has a detailed solution.`,
    },
    product: { slug: `${s.key}-mock-series`, title, titleHi, priceInPaise: PRICE_RUPEES * 100, validityDays: 180, isActive: s.mocks.length > 1 },
  };
});

/** Every question in these series, for the freshness checks in the tests. */
export const JAM_QUESTIONS: PatwariQuestion[] = SUBJECTS.flatMap((s) => s.mocks.flat());

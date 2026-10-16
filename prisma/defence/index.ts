// UPSC NDA & NA, UPSC CDS and AFCAT: national defence entries that many Himachal aspirants sit. Every paper is written
// fresh to the published pattern, with the real marking:
//   NDA   Paper I Mathematics 120 Q / 300 marks (+2.5, −0.83) and Paper II GAT 150 Q / 600 marks (+4, −1.33), 150 min each
//   CDS   English, General Knowledge (120 Q each) and Elementary Mathematics (100 Q), 100 marks and 120 min each
//   AFCAT 100 Q / 300 marks (+3, −1), 120 min; the official section split is not published, so ours is stated
// UPSC scores the 120-question CDS papers out of 100 (0.83 a question), which our two-decimal marks cannot add up to,
// so those papers give 1 mark a question and the instructions say how to convert. Each exam is one series whose first
// paper is free. Question `s` is the index into the paper's sections. To add a set, append papers (slugs number on).

import type { PatwariQuestion, TestDef } from "../patwari/types";
import type { SeriesSeed } from "../seed-series";
import { afcatMock1 } from "./afcat-mock1";
import { afcatMock2 } from "./afcat-mock2";
import { cdsEnglishMock1 } from "./cds-english-mock1";
import { ndaGatMock1 } from "./nda-gat-mock1";
import { ndaMathsMock1 } from "./nda-maths-mock1";

type Sec = { name: string; nameHi: string };

type Paper = {
  slug: string;
  title: string;
  titleHi: string;
  minutes: number;
  marksCorrect: number;
  marksWrong: number;
  sections: Sec[];
  questions: PatwariQuestion[];
  /** What the paper is, its size and its marking, in one or two sentences. */
  about: string;
  /** How the two languages work in this paper. */
  language: string;
};

type DefenceExam = {
  key: string;
  bodySlug: string;
  examSlug: string;
  name: string;
  nameHi: string;
  price: number;
  description: string;
  papers: Paper[];
};

export const AFCAT_SECTIONS: Sec[] = [
  { name: "General Awareness", nameHi: "सामान्य जागरूकता" },
  { name: "Verbal Ability in English", nameHi: "अंग्रेज़ी शाब्दिक योग्यता" },
  { name: "Numerical Ability", nameHi: "संख्यात्मक योग्यता" },
  { name: "Reasoning & Military Aptitude", nameHi: "तर्कशक्ति एवं सैन्य अभिरुचि" },
];

const BILINGUAL = "Questions, options and solutions are in Hindi and English; switch at any time.";
const ENGLISH_PAPER =
  "As in the real paper, the English questions and options stay in English; the Hindi view gives the instructions and solutions in Hindi.";

const afcatPaper = (n: number, questions: PatwariQuestion[]): Paper => ({
  slug: `afcat-full-mock-${n}`,
  title: `AFCAT Full Mock Test ${n}`,
  titleHi: `एफ़कैट फुल मॉक टेस्ट ${n}`,
  minutes: 120,
  marksCorrect: 3,
  marksWrong: 1,
  sections: AFCAT_SECTIONS,
  questions,
  about:
    "Full-length AFCAT online test: 100 questions, 300 marks, 120 minutes, as in the real exam. Each correct answer gives 3 marks and each wrong answer deducts 1. " +
    `Sections: ${AFCAT_SECTIONS.map((sec, i) => `${sec.name} (${questions.filter((x) => x.s === i).length})`).join(", ")}. The IAF does not publish a section split; this one is ours. ` +
    "The Engineering Knowledge Test (EKT) for technical branches is not included.",
  language:
    "The real AFCAT is set in English only. Here every question also has a Hindi version and every solution is in both languages; the verbal ability questions stay in English.",
});

const ndaMathsPaper = (n: number, questions: PatwariQuestion[]): Paper => ({
  slug: `nda-maths-mock-${n}`,
  title: `NDA Paper I (Mathematics) Mock Test ${n}`,
  titleHi: `एनडीए पेपर I (गणित) मॉक टेस्ट ${n}`,
  minutes: 150,
  marksCorrect: 2.5,
  marksWrong: 0.83,
  sections: [{ name: "Mathematics", nameHi: "गणित" }],
  questions,
  about:
    "Full-length NDA Paper I (Mathematics): 120 questions, 300 marks, 2½ hours, as in the UPSC paper. Each correct answer gives 2.5 marks and each wrong answer " +
    "deducts 0.83 (one-third of the marks). UPSC sets the paper on an OMR sheet; here you take it online with the same marking.",
  language: BILINGUAL,
});

const ndaGatPaper = (n: number, questions: PatwariQuestion[]): Paper => ({
  slug: `nda-gat-mock-${n}`,
  title: `NDA Paper II (GAT) Mock Test ${n}`,
  titleHi: `एनडीए पेपर II (सामान्य योग्यता परीक्षण) मॉक टेस्ट ${n}`,
  minutes: 150,
  marksCorrect: 4,
  marksWrong: 1.33,
  sections: [
    { name: "Part A: English", nameHi: "भाग A: अंग्रेज़ी" },
    { name: "Part B: General Knowledge", nameHi: "भाग B: सामान्य ज्ञान" },
  ],
  questions,
  about:
    "Full-length NDA Paper II (General Ability Test): 150 questions, 600 marks, 2½ hours, as in the UPSC paper: Part A English (50 questions, 200 marks) and " +
    "Part B General Knowledge (100 questions, 400 marks). Each correct answer gives 4 marks and each wrong answer deducts 1.33 (one-third). " +
    "UPSC sets the paper on an OMR sheet; here you take it online with the same marking.",
  language: `Part A: ${ENGLISH_PAPER} Part B: ${BILINGUAL}`,
});

/** UPSC marks each CDS paper out of 100; the 120-question papers are scored 1 a question here (see the note at the top). */
const cdsPaper = (key: "english" | "gk" | "maths", n: number, questions: PatwariQuestion[]): Paper => {
  const name = { english: "English", gk: "General Knowledge", maths: "Elementary Mathematics" }[key];
  const nameHi = { english: "अंग्रेज़ी", gk: "सामान्य ज्ञान", maths: "प्रारंभिक गणित" }[key];
  const scaled = questions.length !== 100;
  return {
    slug: `cds-${key}-mock-${n}`,
    title: `CDS ${name} Mock Test ${n}`,
    titleHi: `सीडीएस ${nameHi} मॉक टेस्ट ${n}`,
    minutes: 120,
    marksCorrect: 1,
    marksWrong: 0.33,
    sections: [{ name, nameHi }],
    questions,
    about:
      `Full-length CDS ${name} paper: ${questions.length} questions in 2 hours, as in the UPSC paper. ` +
      (scaled
        ? `UPSC marks this paper out of 100 (0.83 a question) and deducts one-third of a question's marks for a wrong answer. Here each correct answer gives 1 mark and each wrong answer deducts 0.33, so multiply your score by 5/6 to get the UPSC mark out of 100. `
        : "Each correct answer gives 1 mark and each wrong answer deducts 0.33 (one-third), so the paper is out of 100 as in UPSC. ") +
      "UPSC sets the paper on an OMR sheet; here you take it online with the same marking.",
    language: key === "english" ? ENGLISH_PAPER : BILINGUAL,
  };
};

const EXAMS: DefenceExam[] = [
  {
    key: "nda",
    bodySlug: "upsc",
    examSlug: "nda",
    name: "NDA",
    nameHi: "एनडीए",
    price: 99,
    description:
      "Full-length NDA & NA mock tests with the UPSC marking: Paper I Mathematics (120 questions, 300 marks) and Paper II General Ability Test " +
      "(English and general knowledge, 150 questions, 600 marks).",
    papers: [ndaMathsPaper(1, ndaMathsMock1), ndaGatPaper(1, ndaGatMock1)],
  },
  {
    key: "cds",
    bodySlug: "upsc",
    examSlug: "cds",
    name: "CDS",
    nameHi: "सीडीएस",
    price: 99,
    description:
      "Full-length CDS mock tests with the UPSC marking: English, General Knowledge and Elementary Mathematics papers " +
      "(120, 120 and 100 questions, 2 hours each), for IMA, INA, AFA and OTA aspirants.",
    papers: [cdsPaper("english", 1, cdsEnglishMock1)],
  },
  {
    key: "afcat",
    bodySlug: "iaf",
    examSlug: "afcat",
    name: "AFCAT",
    nameHi: "एफ़कैट",
    price: 99,
    description:
      "Full-length AFCAT mock tests in the online exam format (100 questions, 300 marks, +3/−1): general awareness with defence GK, " +
      "verbal ability in English, numerical ability, and reasoning & military aptitude.",
    papers: [afcatPaper(1, afcatMock1), afcatPaper(2, afcatMock2)],
  },
];

/** "set at exam level" or, when at least 30% of the questions are hard, "slightly above exam level". */
function level(qs: PatwariQuestion[]): string {
  return qs.filter((x) => x.d === "H").length >= qs.length * 0.3 ? "slightly above exam level" : "at exam level";
}

function instructions(p: Paper): string {
  return `${p.about} Unanswered questions carry no penalty. Every question is written fresh and the paper is set ${level(p.questions)}. ${p.language}`;
}

export const DEFENCE_SERIES: (SeriesSeed & { key: string })[] = EXAMS.map((e) => {
  const tests: TestDef[] = e.papers.map((p, i) => ({
    slug: p.slug,
    title: p.title,
    titleHi: p.titleHi,
    type: "MOCK",
    durationSec: p.minutes * 60,
    // The first paper is a free taste of the series; the rest must be bought.
    isFree: i === 0,
    marksCorrect: p.marksCorrect,
    marksWrong: p.marksWrong,
    instructions: instructions(p),
    sections: p.sections,
    questions: p.questions,
  }));
  const title = `${e.name} Mock Test Series`;
  const titleHi = `${e.nameHi} मॉक टेस्ट सीरीज़`;
  return {
    key: e.key,
    label: `${e.name} seed`,
    bodySlug: e.bodySlug,
    examSlug: e.examSlug,
    tests,
    series: {
      slug: `${e.key}-mock-test-series`,
      title,
      titleHi,
      description: `${e.description} Every question has a detailed solution in Hindi and English.`,
    },
    product: { slug: `${e.key}-mock-series`, title, titleHi, priceInPaise: e.price * 100, validityDays: 180 },
  };
});

/** Every question in these series, for the freshness checks in the tests. */
export const DEFENCE_QUESTIONS: PatwariQuestion[] = EXAMS.flatMap((e) => e.papers.flatMap((p) => p.questions));

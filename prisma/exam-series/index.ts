// Paid mock series for exams that had no series of their own (most only had a free sample in prisma/upcoming-free):
// two full mocks each, the first one free. General sections come from the shared bank (./bank); only the exam-specific
// sections (pedagogy, forestry, law, nursing, banking, library science) are written fresh in ./fresh. None of these patterns is fully
// published by the recruiting body, so the section split is ours and the instructions say so.
// Adding an exam = adding an entry to EXAMS (at the end, so earlier exams keep their bank picks).

import type { PatwariQuestion, TestDef } from "../patwari/types";
import type { SeriesSeed } from "../seed-series";
import { fresh, subject, take, topic, type Pick } from "./bank";
import { banking } from "./fresh/banking";
import { forestry } from "./fresh/forestry";
import { jbtPedagogy } from "./fresh/jbt-pedagogy";
import { law } from "./fresh/law";
import { libraryScience } from "./fresh/library-science";
import { nursingCommunity, nursingFundamentals, nursingMedSurg } from "./fresh/nursing";
import { tetCdp } from "./fresh/tet-cdp";
import { tgtPedagogy } from "./fresh/tgt-pedagogy";
import { CLERK_MOCKS, HC_SECTIONALS, PROCESS_SERVER_MOCKS, STENO_MOCKS } from "../high-court";
import { HP_TET_JBT_MOCKS, HP_TET_JBT_SECTIONALS } from "../hp-tet";
import { TGT_ARTS_MOCKS, TGT_ARTS_SECTIONS, TGT_MEDICAL_MOCKS, TGT_MEDICAL_SECTIONS, TGT_NON_MEDICAL_MOCKS, TGT_NON_MEDICAL_SECTIONS } from "../hp-tet-tgt";
import { PGIMER_MOCKS, PGIMER_SECTIONS } from "../pgimer";

type Part = { n: number; pick: Pick } | PatwariQuestion[][];
type Section = { name: string; nameHi: string; parts: Part[] };

type ExamDef = {
  bodySlug: string;
  examSlug: string;
  stageSlug?: string;
  /** Test/series slug stem, e.g. "hprca-clerk". */
  slug: string;
  name: string;
  nameHi: string;
  minutes: number;
  marksWrong?: number;
  /** Price of the series in rupees. */
  price: number;
  description: string;
  sections: Section[];
  /** Full mocks 3, 4, … written wholly fresh (question `s` = index into `sections`), for exams the bank cannot stretch to. */
  extraMocks?: PatwariQuestion[][];
  /** Further tests in the series, e.g. sectional tests shared by several series (a test is seeded once, by slug). */
  extraTests?: TestDef[];
};

const hpGk = subject("hp-gk");
const gs = subject("general-studies");
const science = topic("general-studies", "general-science");
const reasoning = subject("reasoning");
const maths = subject("quant");
const english = subject("english");
const hindi = subject("hindi");
const computer = subject("computer");

const S = (name: string, nameHi: string, ...parts: Part[]): Section => ({
  name,
  nameHi,
  parts,
});
const from = (n: number, pick: Pick): Part => ({ n, pick });

const EXAMS: ExamDef[] = [
  {
    bodySlug: "hprca",
    examSlug: "clerk",
    slug: "hprca-clerk",
    name: "HPRCA Clerk",
    nameHi: "एचपीआरसीए क्लर्क",
    minutes: 120,
    price: 99,
    description: "Full-length HPRCA Clerk mock tests: Himachal GK, general studies, reasoning, maths, Hindi, English and computer.",
    sections: [
      S("Himachal GK", "हिमाचल सामान्य ज्ञान", from(30, hpGk)),
      S("General Studies", "सामान्य अध्ययन", from(25, gs)),
      S("Reasoning", "तर्कशक्ति", from(20, reasoning)),
      S("Mathematics", "गणित", from(20, maths)),
      S("Hindi & English", "हिंदी एवं अंग्रेज़ी", from(8, english), from(7, hindi)),
      S("Computer", "कंप्यूटर", from(10, computer)),
    ],
  },
  {
    bodySlug: "hprca",
    examSlug: "jbt",
    slug: "hprca-jbt",
    name: "HPRCA JBT Teacher",
    nameHi: "एचपीआरसीए जेबीटी शिक्षक",
    minutes: 120,
    price: 99,
    description: "Full-length HPRCA JBT mock tests: child development & pedagogy, Himachal GK, general studies, maths, Hindi, English and reasoning.",
    sections: [
      S("Child Development & Pedagogy", "बाल विकास एवं शिक्षाशास्त्र", jbtPedagogy),
      S("Himachal GK", "हिमाचल सामान्य ज्ञान", from(20, hpGk)),
      S("General Studies", "सामान्य अध्ययन", from(15, gs)),
      S("Mathematics", "गणित", from(15, maths)),
      S("Hindi & English", "हिंदी एवं अंग्रेज़ी", from(8, english), from(7, hindi)),
      S("Reasoning", "तर्कशक्ति", from(10, reasoning)),
    ],
  },
  {
    bodySlug: "hprca",
    examSlug: "tgt",
    slug: "hprca-tgt",
    name: "HPRCA TGT Teacher",
    nameHi: "एचपीआरसीए टीजीटी शिक्षक",
    minutes: 120,
    price: 99,
    description:
      "Full-length HPRCA TGT mock tests for the common part of the paper: pedagogy, Himachal GK, general studies, reasoning, Hindi and English. " +
      "The discipline subject paper (Arts, Medical, Non-Medical) is not covered.",
    sections: [
      S("Pedagogy", "शिक्षाशास्त्र", tgtPedagogy),
      S("Himachal GK", "हिमाचल सामान्य ज्ञान", from(25, hpGk)),
      S("General Studies", "सामान्य अध्ययन", from(25, gs)),
      S("Reasoning", "तर्कशक्ति", from(15, reasoning)),
      S("Hindi & English", "हिंदी एवं अंग्रेज़ी", from(8, english), from(7, hindi)),
    ],
  },
  {
    bodySlug: "hpbose",
    examSlug: "hp-tet",
    stageSlug: "jbt",
    slug: "hp-tet-jbt",
    name: "HP TET (JBT)",
    nameHi: "एचपी टेट (जेबीटी)",
    minutes: 150,
    marksWrong: 0,
    price: 99,
    description: "Full-length HP TET JBT mock tests: child development & pedagogy, English, Hindi, maths and EVS & general awareness.",
    sections: [
      S("Child Development & Pedagogy", "बाल विकास एवं शिक्षाशास्त्र", tetCdp),
      S("English", "अंग्रेज़ी", from(30, english)),
      S("Hindi", "हिंदी", from(30, hindi)),
      S("Mathematics", "गणित", from(30, maths)),
      S("EVS & General Awareness", "पर्यावरण अध्ययन एवं सामान्य जागरूकता", from(20, gs), from(10, hpGk)),
    ],
    extraMocks: HP_TET_JBT_MOCKS,
    extraTests: HP_TET_JBT_SECTIONALS,
  },
  {
    bodySlug: "hprca",
    examSlug: "forest-guard",
    slug: "hprca-forest-guard",
    name: "HPRCA Forest Guard",
    nameHi: "एचपीआरसीए वन रक्षक",
    minutes: 120,
    price: 99,
    description: "Full-length HP Forest Guard mock tests: Himachal GK, general studies, forestry & environment, reasoning, maths, Hindi and English.",
    sections: [
      S("Himachal GK", "हिमाचल सामान्य ज्ञान", from(25, hpGk)),
      S("General Studies", "सामान्य अध्ययन", from(20, gs)),
      S("Forestry & Environment", "वानिकी एवं पर्यावरण", forestry),
      S("Reasoning", "तर्कशक्ति", from(15, reasoning)),
      S("Mathematics", "गणित", from(10, maths)),
      S("Hindi & English", "हिंदी एवं अंग्रेज़ी", from(5, english), from(5, hindi)),
    ],
  },
  {
    bodySlug: "hp-police",
    examSlug: "sub-inspector",
    slug: "hp-police-si",
    name: "HP Police Sub-Inspector",
    nameHi: "एचपी पुलिस सब-इंस्पेक्टर",
    minutes: 120,
    price: 99,
    description: "Full-length HP Police SI mock tests: Himachal GK, general studies, reasoning, maths, Hindi, English and criminal law.",
    sections: [
      S("Himachal GK", "हिमाचल सामान्य ज्ञान", from(20, hpGk)),
      S("General Studies", "सामान्य अध्ययन", from(25, gs)),
      S("Reasoning", "तर्कशक्ति", from(15, reasoning)),
      S("Mathematics", "गणित", from(10, maths)),
      S("Hindi & English", "हिंदी एवं अंग्रेज़ी", from(8, english), from(7, hindi)),
      S("Law & Police Procedure", "विधि एवं पुलिस प्रक्रिया", law),
    ],
  },
  {
    bodySlug: "hp-high-court",
    examSlug: "clerk",
    slug: "hp-high-court-clerk",
    name: "HP High Court Clerk",
    nameHi: "एचपी हाई कोर्ट क्लर्क",
    minutes: 120,
    price: 99,
    description: "Full-length HP High Court Clerk mock tests: general knowledge with Himachal GK, English, Hindi, reasoning, maths and computer.",
    extraMocks: CLERK_MOCKS,
    extraTests: HC_SECTIONALS,
    sections: [
      S("General Knowledge & Himachal GK", "सामान्य ज्ञान एवं हिमाचल सामान्य ज्ञान", from(10, hpGk), from(20, gs)),
      S("English", "अंग्रेज़ी", from(20, english)),
      S("Hindi", "हिंदी", from(15, hindi)),
      S("Reasoning", "तर्कशक्ति", from(15, reasoning)),
      S("Mathematics", "गणित", from(10, maths)),
      S("Computer", "कंप्यूटर", from(10, computer)),
    ],
  },
  {
    bodySlug: "hprca",
    examSlug: "staff-nurse",
    slug: "hprca-staff-nurse",
    name: "HPRCA Staff Nurse",
    nameHi: "एचपीआरसीए स्टाफ नर्स",
    minutes: 120,
    price: 99,
    description:
      "Full-length HP Staff Nurse mock tests: fundamentals & anatomy, medical-surgical nursing, community, child health & midwifery, " +
      "general awareness with Himachal GK, reasoning and English.",
    sections: [
      S("Fundamentals & Anatomy", "नर्सिंग के मूल सिद्धांत एवं शरीर रचना", nursingFundamentals),
      S("Medical-Surgical Nursing", "मेडिकल-सर्जिकल नर्सिंग", nursingMedSurg),
      S("Community, Child Health & Midwifery", "सामुदायिक, शिशु स्वास्थ्य एवं प्रसूति नर्सिंग", nursingCommunity),
      S("General Awareness & Himachal GK", "सामान्य जागरूकता एवं हिमाचल सामान्य ज्ञान", from(15, hpGk), from(10, science)),
      S("Reasoning & English", "तर्कशक्ति एवं अंग्रेज़ी", from(8, reasoning), from(7, english)),
    ],
  },
  // English is nearly used up in the bank, so these papers lean on Hindi, computer and GK instead (see bank.ts).
  {
    bodySlug: "hpscb",
    examSlug: "clerk",
    slug: "hpscb-clerk",
    name: "HPSCB Clerk",
    nameHi: "एचपीएससीबी क्लर्क",
    minutes: 90,
    price: 99,
    description: "Full-length HP State Cooperative Bank Clerk mock tests: Himachal GK, general and banking awareness, reasoning, maths, English and computer.",
    sections: [
      S("Himachal GK", "हिमाचल सामान्य ज्ञान", from(15, hpGk)),
      S("General & Banking Awareness", "सामान्य एवं बैंकिंग जागरूकता", from(10, gs), banking),
      S("Reasoning", "तर्कशक्ति", from(20, reasoning)),
      S("Numerical Ability", "संख्यात्मक अभियोग्यता", from(20, maths)),
      S("English & Computer", "अंग्रेज़ी एवं कंप्यूटर", from(5, english), from(15, computer)),
    ],
  },
  {
    bodySlug: "hp-high-court",
    examSlug: "process-server",
    slug: "hp-high-court-process-server",
    name: "HP High Court Process Server",
    nameHi: "एचपी हाई कोर्ट प्रोसेस सर्वर",
    minutes: 120,
    price: 99,
    description: "Full-length HP High Court Process Server mock tests: Himachal GK, general studies, reasoning, maths, Hindi and English.",
    extraMocks: PROCESS_SERVER_MOCKS,
    extraTests: HC_SECTIONALS,
    sections: [
      S("Himachal GK", "हिमाचल सामान्य ज्ञान", from(25, hpGk)),
      S("General Studies", "सामान्य अध्ययन", from(30, gs)),
      S("Reasoning", "तर्कशक्ति", from(15, reasoning)),
      S("Mathematics", "गणित", from(15, maths)),
      S("Hindi & English", "हिंदी एवं अंग्रेज़ी", from(10, hindi), from(5, english)),
    ],
  },
  {
    bodySlug: "hp-high-court",
    examSlug: "stenographer",
    slug: "hp-high-court-stenographer",
    name: "HP High Court Stenographer",
    nameHi: "एचपी हाई कोर्ट आशुलिपिक",
    minutes: 120,
    price: 99,
    description:
      "Full-length HP High Court Stenographer mock tests for the written paper: English, Hindi, general knowledge with Himachal GK, reasoning and computer. " +
      "The shorthand and typing skill test is not covered.",
    extraMocks: STENO_MOCKS,
    extraTests: HC_SECTIONALS,
    sections: [
      S("English", "अंग्रेज़ी", from(20, english)),
      S("Hindi", "हिंदी", from(15, hindi)),
      S("General Knowledge & Himachal GK", "सामान्य ज्ञान एवं हिमाचल सामान्य ज्ञान", from(10, hpGk), from(20, gs)),
      S("Reasoning", "तर्कशक्ति", from(15, reasoning)),
      S("Computer", "कंप्यूटर", from(20, computer)),
    ],
  },
  {
    bodySlug: "hprca",
    examSlug: "steno-typist",
    slug: "hprca-steno-typist",
    name: "HPRCA Steno Typist",
    nameHi: "एचपीआरसीए स्टेनो टाइपिस्ट",
    minutes: 120,
    price: 99,
    description:
      "Full-length HPRCA Steno Typist mock tests for the written paper: Himachal GK, general studies, English, Hindi, reasoning and computer. " +
      "The shorthand and typing skill test is not covered.",
    sections: [
      S("Himachal GK", "हिमाचल सामान्य ज्ञान", from(25, hpGk)),
      S("General Studies", "सामान्य अध्ययन", from(25, gs)),
      S("English", "अंग्रेज़ी", from(10, english)),
      S("Hindi", "हिंदी", from(10, hindi)),
      S("Reasoning", "तर्कशक्ति", from(15, reasoning)),
      S("Computer", "कंप्यूटर", from(15, computer)),
    ],
  },
  {
    bodySlug: "hprca",
    examSlug: "joa-library",
    slug: "hprca-joa-library",
    name: "HPRCA JOA Library",
    nameHi: "एचपीआरसीए जेओए लाइब्रेरी",
    minutes: 120,
    price: 99,
    description: "Full-length HPRCA JOA Library mock tests: library & information science, Himachal GK, general studies, reasoning, Hindi and computer.",
    sections: [
      S("Library & Information Science", "पुस्तकालय एवं सूचना विज्ञान", libraryScience),
      S("Himachal GK", "हिमाचल सामान्य ज्ञान", from(20, hpGk)),
      S("General Studies", "सामान्य अध्ययन", from(20, gs)),
      S("Reasoning", "तर्कशक्ति", from(10, reasoning)),
      S("Hindi & Computer", "हिंदी एवं कंप्यूटर", from(5, hindi), from(15, computer)),
    ],
  },
  // Written wholly fresh in prisma/pgimer: mocks 1–2 go through the sections, mocks 3+ are extra mocks.
  {
    bodySlug: "pgimer",
    examSlug: "nursing-officer",
    slug: "pgimer-nursing-officer",
    name: "PGIMER Nursing Officer",
    nameHi: "पीजीआईएमईआर नर्सिंग ऑफिसर",
    minutes: 100,
    price: 99,
    description:
      "Full-length PGIMER Nursing Officer mock tests in the CBT format: fundamentals, anatomy and physiology, medical-surgical nursing " +
      "and pharmacology, child health and midwifery, community and mental health, nursing management and general knowledge.",
    sections: PGIMER_SECTIONS.map((sec, i) => S(sec.name, sec.nameHi, PGIMER_MOCKS.slice(0, 2).map((m) => m.filter((x) => x.s === i)))),
    extraMocks: PGIMER_MOCKS.slice(2),
  },
  // Written wholly fresh in prisma/hp-tet-tgt: mocks 1–2 go through the sections, mocks 3+ are extra mocks.
  {
    bodySlug: "hpbose",
    examSlug: "hp-tet",
    stageSlug: "tgt-arts",
    slug: "hp-tet-tgt-arts",
    name: "HP TET (TGT Arts)",
    nameHi: "एचपी टेट (टीजीटी कला)",
    minutes: 150,
    marksWrong: 0,
    price: 99,
    description:
      "Full-length HP TET TGT Arts mock tests: child development and pedagogy, Hindi, English, history and civics, " +
      "geography, economics and Himachal GK.",
    sections: TGT_ARTS_SECTIONS.map((sec, i) => S(sec.name, sec.nameHi, TGT_ARTS_MOCKS.slice(0, 2).map((m) => m.filter((x) => x.s === i)))),
    extraMocks: TGT_ARTS_MOCKS.slice(2),
  },
  {
    bodySlug: "hpbose",
    examSlug: "hp-tet",
    stageSlug: "tgt-non-medical",
    slug: "hp-tet-tgt-non-medical",
    name: "HP TET (TGT Non-Medical)",
    nameHi: "एचपी टेट (टीजीटी नॉन-मेडिकल)",
    minutes: 150,
    marksWrong: 0,
    price: 99,
    description:
      "Full-length HP TET TGT Non-Medical mock tests: child development and pedagogy, Hindi, English, mathematics, " +
      "physics and chemistry.",
    sections: TGT_NON_MEDICAL_SECTIONS.map((sec, i) => S(sec.name, sec.nameHi, TGT_NON_MEDICAL_MOCKS.slice(0, 2).map((m) => m.filter((x) => x.s === i)))),
    extraMocks: TGT_NON_MEDICAL_MOCKS.slice(2),
  },
  {
    bodySlug: "hpbose",
    examSlug: "hp-tet",
    stageSlug: "tgt-medical",
    slug: "hp-tet-tgt-medical",
    name: "HP TET (TGT Medical)",
    nameHi: "एचपी टेट (टीजीटी मेडिकल)",
    minutes: 150,
    marksWrong: 0,
    price: 99,
    description:
      "Full-length HP TET TGT Medical mock tests: child development and pedagogy, Hindi, English, biology, " +
      "physics and chemistry.",
    sections: TGT_MEDICAL_SECTIONS.map((sec, i) => S(sec.name, sec.nameHi, TGT_MEDICAL_MOCKS.slice(0, 2).map((m) => m.filter((x) => x.s === i)))),
    extraMocks: TGT_MEDICAL_MOCKS.slice(2),
  },
];

const MOCKS = 2;

function mockQuestions(e: ExamDef, i: number): PatwariQuestion[] {
  return e.sections.flatMap((sec, si) => {
    const s = si as PatwariQuestion["s"];
    return sec.parts.flatMap((p) => (Array.isArray(p) ? fresh(s, p[i]) : take(s, p.n, p.pick, `${e.slug} mock ${i + 1} ${sec.name}`)));
  });
}

function instructions(e: ExamDef, qs: PatwariQuestion[]): string {
  const split = e.sections.map((sec, i) => `${sec.name} (${qs.filter((x) => x.s === i).length})`).join(", ");
  const marking = e.marksWrong === 0 ? "There is no negative marking" : "Each wrong answer deducts 0.25 marks";
  // Later exams draw from a bank whose hard questions earlier exams already took, so say only what is true
  const level = qs.filter((x) => x.d === "H").length >= qs.length * 0.3 ? "slightly above exam level" : "at exam level";
  return (
    `Full-length ${e.name} mock: ${qs.length} questions, ${qs.length} marks, ${e.minutes} minutes. Each correct answer gives 1 mark. ` +
    `${marking}. Sections: ${split}. The official section split is not published; this one is ours and the paper is set ${level}. ` +
    "You can switch between Hindi and English at any time."
  );
}

export type ExamSeriesSeed = SeriesSeed & { key: string };

export const EXAM_SERIES: ExamSeriesSeed[] = EXAMS.map((e) => {
  const mocks = [...Array.from({ length: MOCKS }, (_, i) => mockQuestions(e, i)), ...(e.extraMocks ?? [])];
  const tests: TestDef[] = mocks.map((questions, i) => {
    return {
      slug: `${e.slug}-full-mock-${i + 1}`,
      title: `${e.name} Full Mock Test ${i + 1}`,
      titleHi: `${e.nameHi} फुल मॉक टेस्ट ${i + 1}`,
      type: "MOCK",
      durationSec: e.minutes * 60,
      // The first mock is a free taste of the series; the rest must be bought.
      isFree: i === 0,
      marksWrong: e.marksWrong,
      instructions: instructions(e, questions),
      sections: e.sections.map(({ name, nameHi }) => ({ name, nameHi })),
      questions,
    };
  });
  tests.push(...(e.extraTests ?? []));
  const title = `${e.name} Mock Test Series`;
  const titleHi = `${e.nameHi} मॉक टेस्ट सीरीज़`;
  return {
    key: e.slug,
    label: `${e.name} seed`,
    bodySlug: e.bodySlug,
    examSlug: e.examSlug,
    stageSlug: e.stageSlug,
    tests,
    series: {
      slug: `${e.slug}-mock-test-series`,
      title,
      titleHi,
      description: `${e.description} Every question has a detailed solution in Hindi and English.`,
    },
    product: {
      slug: `${e.slug}-mock-series`,
      title,
      titleHi,
      priceInPaise: e.price * 100,
      validityDays: 180,
    },
  };
});

/** Products that bundle several of the series above. */
export const EXAM_PACKS: { slug: string; title: string; titleHi: string; priceInPaise: number; validityDays: number; seriesSlugs: string[] }[] = [
  {
    slug: "hp-high-court-pack",
    title: "HP High Court Pack (Process Server, Stenographer, Clerk)",
    titleHi: "एचपी हाई कोर्ट पैक (प्रोसेस सर्वर, आशुलिपिक, क्लर्क)",
    priceInPaise: 199_00,
    validityDays: 180,
    seriesSlugs: ["hp-high-court-process-server", "hp-high-court-stenographer", "hp-high-court-clerk"].map((s) => `${s}-mock-test-series`),
  },
];

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
import { CLERK_MOCKS, HC_SECTIONALS, PROCESS_SERVER_MOCKS, PROCESS_SERVER_SCREENING_TESTS, STENO_MOCKS } from "../high-court";
import { HP_TET_JBT_MOCKS, HP_TET_JBT_SECTIONALS } from "../hp-tet";
import { TGT_2026_COMMON, TGT_ARTS_2026, TGT_MEDICAL_2026, TGT_NON_MEDICAL_2026 } from "../hp-tet-tgt";
import { LT_MOCKS, LT_SECTIONALS, LT_SECTIONS, SHASTRI_MOCKS, SHASTRI_SECTIONALS, SHASTRI_SECTIONS } from "../hp-tet-lang";
import { PGT_SUBJECTS } from "../hp-pgt";
import { HPAS_MOCKS, HPAS_SECTIONS } from "../hpas-series";
import { HPRCA_CLERK_MOCKS, HPRCA_CLERK_SECTIONS } from "../hprca-clerk";
import { PGIMER_MOCKS, PGIMER_SECTIONS } from "../pgimer";
import { DEFENCE_SERIES } from "../defence";
import { DELHI_POLICE_SERIES } from "../delhi-police";

/** Bank picks, fresh questions per mock, or one set shared by several exams' mock N (picked once, on first use). */
type Part = { n: number; pick: Pick } | PatwariQuestion[][] | { shared: (mock: number) => PatwariQuestion[] };
type Section = { name: string; nameHi: string; parts: Part[] };

type ExamDef = {
  bodySlug: string;
  examSlug: string;
  stageSlug?: string;
  /** Test/series slug stem, e.g. "hprca-clerk". */
  slug: string;
  /** Stem for the test slugs when it differs from `slug`, e.g. after a pattern change replaced the first set of tests. */
  testSlug?: string;
  /** Full mocks built from `sections` (default 2). */
  mocks?: number;
  /** Where the section split comes from, when the recruiting body publishes it; the instructions then say so. */
  officialSplit?: string;
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

/**
 * HP TET TGT Section II (general awareness incl. Himachal Pradesh, 30 questions) is the same for every stream, so mock N of
 * each stream shares one set: 20 Himachal GK and 10 general studies from the bank, picked on first use.
 */
const awarenessSets: PatwariQuestion[][] = [];
const awarenessGs = topic("general-studies", "indian-history", "indian-polity", "indian-geography", "indian-economy", "general-science");
const tgtAwareness = (mock: number): PatwariQuestion[] =>
  (awarenessSets[mock] ??= [...take(1, 20, hpGk, `HP TET TGT awareness ${mock + 1} Himachal GK`), ...take(1, 10, awarenessGs, `HP TET TGT awareness ${mock + 1} GS`)]);

const S = (name: string, nameHi: string, ...parts: Part[]): Section => ({
  name,
  nameHi,
  parts,
});
const from = (n: number, pick: Pick): Part => ({ n, pick });

const EXAMS: ExamDef[] = [
  // Written wholly fresh in prisma/hprca-clerk on the 2026 pattern (120 questions, 90 minutes, no maths): mocks 1–2 go
  // through the sections, mocks 3+ are extra mocks. The first two bank-built mocks (hprca-clerk-full-mock-N) are retired.
  {
    bodySlug: "hprca",
    examSlug: "clerk",
    slug: "hprca-clerk",
    testSlug: "hprca-clerk-2026",
    name: "HPRCA Clerk",
    nameHi: "एचपीआरसीए क्लर्क",
    minutes: 90,
    price: 99,
    description:
      "Full-length HPRCA Clerk (Job Trainee) mock tests on the 2026 pattern: Himachal GK and current affairs, general knowledge " +
      "and social science, everyday science, logical reasoning, General English and Hindi, and computer word processing.",
    sections: HPRCA_CLERK_SECTIONS.map((sec, i) => S(sec.name, sec.nameHi, HPRCA_CLERK_MOCKS.slice(0, 2).map((m) => m.filter((x) => x.s === i)))),
    extraMocks: HPRCA_CLERK_MOCKS.slice(2),
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
    price: 149,
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
    price: 149,
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
    price: 149,
    description: "Full-length HP High Court Process Server mock tests: Himachal GK, general studies, reasoning, maths, Hindi and English.",
    extraMocks: PROCESS_SERVER_MOCKS,
    extraTests: [...PROCESS_SERVER_SCREENING_TESTS, ...HC_SECTIONALS],
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
    price: 149,
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
    price: 149,
    description:
      "Full-length PGIMER Nursing Officer mock tests in the CBT format: fundamentals, anatomy and physiology, medical-surgical nursing " +
      "and pharmacology, child health and midwifery, community and mental health, nursing management and general knowledge.",
    sections: PGIMER_SECTIONS.map((sec, i) => S(sec.name, sec.nameHi, PGIMER_MOCKS.slice(0, 2).map((m) => m.filter((x) => x.s === i)))),
    extraMocks: PGIMER_MOCKS.slice(2),
  },
  // Written wholly fresh in prisma/hpas-series: mocks 1–2 go through the sections, mocks 3+ are extra mocks.
  {
    bodySlug: "hppsc",
    examSlug: "hpas",
    slug: "hpas",
    name: "HPAS Prelims",
    nameHi: "एचपीएएस प्रारंभिक परीक्षा",
    minutes: 120,
    price: 99,
    description:
      "Full-length HPAS prelims mock tests in the 100-question General Studies format: Himachal GK, Indian history and culture, " +
      "polity and governance, geography and environment, economy, and science and technology.",
    sections: HPAS_SECTIONS.map((sec, i) => S(sec.name, sec.nameHi, HPAS_MOCKS.slice(0, 2).map((m) => m.filter((x) => x.s === i)))),
    extraMocks: HPAS_MOCKS.slice(2),
  },
  // (HP TET TGT Arts, Non-Medical and Medical moved to the end of this list when they switched to the official HPBOSE split.)
  // Written wholly fresh in prisma/hp-tet-lang: mocks 1–2 go through the sections, mocks 3+ are extra mocks.
  {
    bodySlug: "hpbose",
    examSlug: "hp-tet",
    stageSlug: "tgt-sanskrit",
    slug: "hp-tet-shastri",
    name: "HP TET (Shastri)",
    nameHi: "एचपी टेट (शास्त्री)",
    minutes: 150,
    marksWrong: 0,
    price: 99,
    description:
      "Full-length HP TET Shastri (Sanskrit) mock tests: child development and pedagogy, Hindi, English, Sanskrit grammar, " +
      "Sanskrit literature and Sanskrit teaching.",
    sections: SHASTRI_SECTIONS.map((sec, i) => S(sec.name, sec.nameHi, SHASTRI_MOCKS.slice(0, 2).map((m) => m.filter((x) => x.s === i)))),
    extraMocks: SHASTRI_MOCKS.slice(2),
    extraTests: SHASTRI_SECTIONALS,
  },
  {
    bodySlug: "hpbose",
    examSlug: "hp-tet",
    stageSlug: "language-teacher",
    slug: "hp-tet-language-teacher",
    name: "HP TET (Language Teacher)",
    nameHi: "एचपी टेट (भाषा अध्यापक)",
    minutes: 150,
    marksWrong: 0,
    price: 99,
    description:
      "Full-length HP TET Language Teacher (Hindi) mock tests: child development and pedagogy, Hindi grammar, Hindi literature, " +
      "poetics and Hindi teaching, and English.",
    sections: LT_SECTIONS.map((sec, i) => S(sec.name, sec.nameHi, LT_MOCKS.slice(0, 2).map((m) => m.filter((x) => x.s === i)))),
    extraMocks: LT_MOCKS.slice(2),
    extraTests: LT_SECTIONALS,
  },
  // Written wholly fresh in prisma/hp-pgt, one series per subject: mocks 1–2 go through the sections, mocks 3+ are extra mocks.
  ...PGT_SUBJECTS.map(
    (p): ExamDef => ({
      bodySlug: "hprca",
      examSlug: "pgt-lecturer",
      stageSlug: p.slug,
      slug: `hp-pgt-${p.slug}`,
      name: `HP PGT (${p.name})`,
      nameHi: `एचपी पीजीटी (${p.nameHi})`,
      minutes: 120,
      price: 99,
      description:
        `Full-length HP PGT / Lecturer (School New) ${p.name} mock tests: pedagogy and teaching aptitude, Himachal GK and general studies, ` +
        `${p.covers} at post-graduate level.`,
      sections: p.sections.map((sec, i) => S(sec.name, sec.nameHi, p.mocks.slice(0, 2).map((m) => m.filter((x) => x.s === i)))),
      extraMocks: p.mocks.slice(2),
    }),
  ),
  // HP TET TGT on the official HPBOSE split (November 2026 prospectus). It replaced the first TGT tests, which used our
  // own split, so its tests take a new slug stem; the series and product keep theirs. Kept last: its Section II picks
  // come from the bank after every other exam has taken its questions.
  {
    bodySlug: "hpbose",
    examSlug: "hp-tet",
    stageSlug: "tgt-arts",
    slug: "hp-tet-tgt-arts",
    testSlug: "hp-tet-tgt-arts-2026",
    mocks: 3,
    officialSplit: "HPBOSE TET prospectus (November 2026)",
    name: "HP TET (TGT Arts)",
    nameHi: "एचपी टेट (टीजीटी कला)",
    minutes: 150,
    marksWrong: 0,
    price: 99,
    description:
      "Full-length HP TET TGT Arts mock tests on the official HPBOSE pattern: child development and pedagogy, general " +
      "awareness and Himachal Pradesh, English literature and grammar, and social studies.",
    sections: [
      S(TGT_2026_COMMON.pedagogy.name, TGT_2026_COMMON.pedagogy.nameHi, TGT_ARTS_2026.pedagogy),
      S(TGT_2026_COMMON.awareness.name, TGT_2026_COMMON.awareness.nameHi, { shared: tgtAwareness }),
      S("English Literature & Grammar", "अंग्रेज़ी साहित्य एवं व्याकरण", TGT_ARTS_2026.english),
      S("Social Studies", "सामाजिक अध्ययन", TGT_ARTS_2026.socialStudies),
    ],
  },
  {
    bodySlug: "hpbose",
    examSlug: "hp-tet",
    stageSlug: "tgt-non-medical",
    slug: "hp-tet-tgt-non-medical",
    testSlug: "hp-tet-tgt-non-medical-2026",
    mocks: 3,
    officialSplit: "HPBOSE TET prospectus (November 2026)",
    name: "HP TET (TGT Non-Medical)",
    nameHi: "एचपी टेट (टीजीटी नॉन-मेडिकल)",
    minutes: 150,
    marksWrong: 0,
    price: 99,
    description:
      "Full-length HP TET TGT Non-Medical mock tests on the official HPBOSE pattern: child development and pedagogy, " +
      "general awareness and Himachal Pradesh, mathematics, and physics and chemistry.",
    sections: [
      S(TGT_2026_COMMON.pedagogy.name, TGT_2026_COMMON.pedagogy.nameHi, TGT_NON_MEDICAL_2026.pedagogy),
      S(TGT_2026_COMMON.awareness.name, TGT_2026_COMMON.awareness.nameHi, { shared: tgtAwareness }),
      S("Mathematics", "गणित", TGT_NON_MEDICAL_2026.mathematics),
      S("Physics & Chemistry", "भौतिक विज्ञान एवं रसायन विज्ञान", TGT_NON_MEDICAL_2026.physicsChemistry),
    ],
  },
  {
    bodySlug: "hpbose",
    examSlug: "hp-tet",
    stageSlug: "tgt-medical",
    slug: "hp-tet-tgt-medical",
    testSlug: "hp-tet-tgt-medical-2026",
    mocks: 3,
    officialSplit: "HPBOSE TET prospectus (November 2026)",
    name: "HP TET (TGT Medical)",
    nameHi: "एचपी टेट (टीजीटी मेडिकल)",
    minutes: 150,
    marksWrong: 0,
    price: 99,
    description:
      "Full-length HP TET TGT Medical mock tests on the official HPBOSE pattern: child development and pedagogy, " +
      "general awareness and Himachal Pradesh, botany and zoology, and chemistry.",
    sections: [
      S(TGT_2026_COMMON.pedagogy.name, TGT_2026_COMMON.pedagogy.nameHi, TGT_MEDICAL_2026.pedagogy),
      S(TGT_2026_COMMON.awareness.name, TGT_2026_COMMON.awareness.nameHi, { shared: tgtAwareness }),
      S("Botany & Zoology", "वनस्पति विज्ञान एवं प्राणि विज्ञान", TGT_MEDICAL_2026.botanyZoology),
      S("Chemistry", "रसायन विज्ञान", TGT_MEDICAL_2026.chemistry),
    ],
  },
];

const MOCKS = 2;

function mockQuestions(e: ExamDef, i: number): PatwariQuestion[] {
  return e.sections.flatMap((sec, si) => {
    const s = si as PatwariQuestion["s"];
    return sec.parts.flatMap((p) =>
      Array.isArray(p) ? fresh(s, p[i]) : "shared" in p ? fresh(s, p.shared(i)) : take(s, p.n, p.pick, `${e.slug} mock ${i + 1} ${sec.name}`),
    );
  });
}

function instructions(e: ExamDef, qs: PatwariQuestion[]): string {
  const split = e.sections.map((sec, i) => `${sec.name} (${qs.filter((x) => x.s === i).length})`).join(", ");
  const marking = e.marksWrong === 0 ? "There is no negative marking" : "Each wrong answer deducts 0.25 marks";
  // Later exams draw from a bank whose hard questions earlier exams already took, so say only what is true
  const level = qs.filter((x) => x.d === "H").length >= qs.length * 0.3 ? "slightly above exam level" : "at exam level";
  return (
    `Full-length ${e.name} mock: ${qs.length} questions, ${qs.length} marks, ${e.minutes} minutes. Each correct answer gives 1 mark. ` +
    `${marking}. Sections: ${split}. ` +
    (e.officialSplit ? `The sections follow the ${e.officialSplit}; the paper is set ${level}. ` : `The official section split is not published; this one is ours and the paper is set ${level}. `) +
    "You can switch between Hindi and English at any time."
  );
}

export type ExamSeriesSeed = SeriesSeed & { key: string };

const BANK_SERIES: ExamSeriesSeed[] = EXAMS.map((e) => {
  const mocks = [...Array.from({ length: e.mocks ?? MOCKS }, (_, i) => mockQuestions(e, i)), ...(e.extraMocks ?? [])];
  const tests: TestDef[] = mocks.map((questions, i) => {
    return {
      slug: `${e.testSlug ?? e.slug}-full-mock-${i + 1}`,
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

// NDA, CDS and AFCAT have their own paper-wise marking and instructions, so they are built in prisma/defence;
// Delhi Police Constable is written fresh to the SSC pattern in prisma/delhi-police.
export const EXAM_SERIES: ExamSeriesSeed[] = [...BANK_SERIES, ...DEFENCE_SERIES, ...DELHI_POLICE_SERIES];

/** Products that bundle several of the series above. */
export const EXAM_PACKS: { slug: string; title: string; titleHi: string; priceInPaise: number; validityDays: number; seriesSlugs: string[] }[] = [
  {
    slug: "hp-high-court-pack",
    title: "HP High Court Pack (Process Server, Stenographer, Clerk)",
    titleHi: "एचपी हाई कोर्ट पैक (प्रोसेस सर्वर, आशुलिपिक, क्लर्क)",
    priceInPaise: 299_00,
    validityDays: 180,
    seriesSlugs: ["hp-high-court-process-server", "hp-high-court-stenographer", "hp-high-court-clerk"].map((s) => `${s}-mock-test-series`),
  },
];

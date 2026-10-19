// HP TET (TGT): graduate-level mocks for the Arts, Non-Medical and Medical streams, every one written fresh to the TET
// pattern (150 questions, 150 marks, 150 minutes, no negative marking; the section split is ours). Each stream has the same
// first three sections (pedagogy and the two languages) and two subject sections. Question `s` is the index into the
// stream's sections. Mocks 1–2 go through the sections in prisma/exam-series/index.ts, mocks 3+ are extra mocks.

import type { PatwariQuestion } from "../patwari/types";
import { artsMock1 } from "./arts-mock1";
import { biology2026Mock1 } from "./biology-2026-1";
import { biology2026Mock2 } from "./biology-2026-2";
import { biology2026Mock3 } from "./biology-2026-3";
import { chemistry2026Mock1 } from "./chemistry-2026-1";
import { chemistry2026Mock2 } from "./chemistry-2026-2";
import { chemistry2026Mock3 } from "./chemistry-2026-3";
import { artsMock2 } from "./arts-mock2";
import { artsMock3 } from "./arts-mock3";
import { medicalMock1 } from "./medical-mock1";
import { medicalMock2 } from "./medical-mock2";
import { medicalMock3 } from "./medical-mock3";
import { nonMedicalMock1 } from "./nonmedical-mock1";
import { nonMedicalMock2 } from "./nonmedical-mock2";
import { nonMedicalMock3 } from "./nonmedical-mock3";

type Sec = { name: string; nameHi: string };

const COMMON: Sec[] = [
  { name: "Child Development & Pedagogy", nameHi: "बाल विकास एवं शिक्षाशास्त्र" },
  { name: "Language I: Hindi", nameHi: "भाषा I: हिंदी" },
  { name: "Language II: English", nameHi: "भाषा II: अंग्रेज़ी" },
];

export const TGT_ARTS_SECTIONS: Sec[] = [
  ...COMMON,
  { name: "History & Civics", nameHi: "इतिहास एवं नागरिक शास्त्र" },
  { name: "Geography, Economics & Himachal GK", nameHi: "भूगोल, अर्थशास्त्र एवं हिमाचल सामान्य ज्ञान" },
];

export const TGT_ARTS_MOCKS: PatwariQuestion[][] = [artsMock1, artsMock2, artsMock3];

// ── The official split (HPBOSE TET prospectus, November 2026, section 13) ──
// Section I (30) child development & pedagogy and Section II (30) general awareness incl. Himachal Pradesh are common to
// every stream; Sections III and IV are the stream's subjects. There is no Hindi section. The mocks below reuse the
// questions written above, regrouped into the official sections; Section II comes from the shared bank (exam-series).

const bySection = (mocks: PatwariQuestion[][], ...sections: number[]) => mocks.map((m) => m.filter((x) => sections.includes(x.s)));

export const TGT_2026_COMMON = {
  pedagogy: { name: "Child Development & Pedagogy", nameHi: "बाल विकास एवं शिक्षाशास्त्र" },
  awareness: { name: "General Awareness & Himachal Pradesh", nameHi: "सामान्य जागरूकता एवं हिमाचल प्रदेश" },
};

/** TGT Arts: pedagogy 30, general awareness 30, English 30, social studies 60 (history & civics plus geography & economics). */
export const TGT_ARTS_2026 = {
  pedagogy: bySection(TGT_ARTS_MOCKS, 0),
  english: bySection(TGT_ARTS_MOCKS, 2),
  socialStudies: bySection(TGT_ARTS_MOCKS, 3, 4),
};


export const TGT_NON_MEDICAL_SECTIONS: Sec[] = [
  ...COMMON,
  { name: "Mathematics", nameHi: "गणित" },
  { name: "Physics & Chemistry", nameHi: "भौतिक विज्ञान एवं रसायन विज्ञान" },
];

export const TGT_NON_MEDICAL_MOCKS: PatwariQuestion[][] = [nonMedicalMock1, nonMedicalMock2, nonMedicalMock3];

export const TGT_MEDICAL_SECTIONS: Sec[] = [
  ...COMMON,
  { name: "Biology", nameHi: "जीव विज्ञान" },
  { name: "Physics & Chemistry", nameHi: "भौतिक विज्ञान एवं रसायन विज्ञान" },
];

export const TGT_MEDICAL_MOCKS: PatwariQuestion[][] = [medicalMock1, medicalMock2, medicalMock3];

// The science streams need more of their big subject than the first mocks had. Mock N's 30 extra chemistry questions
// (./chemistry-2026-N) are split: the first NM_EXTRA_CHEMISTRY[N] go to Non-Medical, the rest to Medical. Non-Medical
// also takes the physics questions of medical mock N, since the Medical paper has no physics.
export const CHEMISTRY_2026 = [chemistry2026Mock1, chemistry2026Mock2, chemistry2026Mock3];
export const BIOLOGY_2026 = [biology2026Mock1, biology2026Mock2, biology2026Mock3];
const NM_EXTRA_CHEMISTRY = [17, 17, 15];
const ofSubject = (m: PatwariQuestion[], section: number, subject: string) => m.filter((x) => x.s === section && x.subject === subject);

/** TGT Non-Medical: pedagogy 30, general awareness 30, mathematics 30, physics & chemistry 60. */
export const TGT_NON_MEDICAL_2026 = {
  pedagogy: bySection(TGT_NON_MEDICAL_MOCKS, 0),
  mathematics: bySection(TGT_NON_MEDICAL_MOCKS, 3),
  physicsChemistry: TGT_NON_MEDICAL_MOCKS.map((m, i) => [
    ...m.filter((x) => x.s === 4),
    ...ofSubject(TGT_MEDICAL_MOCKS[i], 4, "physics"),
    ...CHEMISTRY_2026[i].slice(0, NM_EXTRA_CHEMISTRY[i]),
  ]),
};

/** TGT Medical: pedagogy 30, general awareness 30, botany & zoology 60, chemistry 30. */
export const TGT_MEDICAL_2026 = {
  pedagogy: bySection(TGT_MEDICAL_MOCKS, 0),
  botanyZoology: TGT_MEDICAL_MOCKS.map((m, i) => [...m.filter((x) => x.s === 3), ...BIOLOGY_2026[i]]),
  chemistry: TGT_MEDICAL_MOCKS.map((m, i) => [...ofSubject(m, 4, "chemistry"), ...CHEMISTRY_2026[i].slice(NM_EXTRA_CHEMISTRY[i])]),
};

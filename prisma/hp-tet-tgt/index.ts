// HP TET (TGT): graduate-level mocks for the Arts, Non-Medical and Medical streams, every one written fresh to the TET
// pattern (150 questions, 150 marks, 150 minutes, no negative marking; the section split is ours). Each stream has the same
// first three sections (pedagogy and the two languages) and two subject sections. Question `s` is the index into the
// stream's sections. Mocks 1–2 go through the sections in prisma/exam-series/index.ts, mocks 3+ are extra mocks.

import type { PatwariQuestion } from "../patwari/types";
import { artsMock1 } from "./arts-mock1";
import { artsMock2 } from "./arts-mock2";
import { nonMedicalMock1 } from "./nonmedical-mock1";
import { nonMedicalMock2 } from "./nonmedical-mock2";

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

export const TGT_ARTS_MOCKS: PatwariQuestion[][] = [artsMock1, artsMock2];

export const TGT_NON_MEDICAL_SECTIONS: Sec[] = [
  ...COMMON,
  { name: "Mathematics", nameHi: "गणित" },
  { name: "Physics & Chemistry", nameHi: "भौतिक विज्ञान एवं रसायन विज्ञान" },
];

export const TGT_NON_MEDICAL_MOCKS: PatwariQuestion[][] = [nonMedicalMock1, nonMedicalMock2];

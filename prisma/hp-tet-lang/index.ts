// HP TET (Shastri) and HP TET (Language Teacher — Hindi): mocks written fresh to the TET pattern (150 questions,
// 150 marks, 150 minutes, no negative marking; the section split is ours). Question `s` is the index into the
// series' sections. Mocks 1–2 go through the sections in prisma/exam-series/index.ts, mocks 3+ are extra mocks.

import type { PatwariQuestion } from "../patwari/types";
import { ltMock1 } from "./lt-mock1";
import { ltMock2 } from "./lt-mock2";
import { shastriMock1 } from "./shastri-mock1";
import { shastriMock2 } from "./shastri-mock2";

type Sec = { name: string; nameHi: string };

const CDP: Sec = { name: "Child Development & Pedagogy", nameHi: "बाल विकास एवं शिक्षाशास्त्र" };

export const SHASTRI_SECTIONS: Sec[] = [
  CDP,
  { name: "Language I: Hindi", nameHi: "भाषा I: हिंदी" },
  { name: "Language II: English", nameHi: "भाषा II: अंग्रेज़ी" },
  { name: "Sanskrit Grammar", nameHi: "संस्कृत व्याकरण" },
  { name: "Sanskrit Literature & Teaching", nameHi: "संस्कृत साहित्य एवं शिक्षण" },
];

export const SHASTRI_MOCKS: PatwariQuestion[][] = [shastriMock1, shastriMock2];

export const LT_SECTIONS: Sec[] = [
  CDP,
  { name: "Hindi Grammar", nameHi: "हिंदी व्याकरण" },
  { name: "Hindi Literature", nameHi: "हिंदी साहित्य" },
  { name: "Poetics & Hindi Teaching", nameHi: "काव्यशास्त्र एवं हिंदी शिक्षण" },
  { name: "English", nameHi: "अंग्रेज़ी" },
];

export const LT_MOCKS: PatwariQuestion[][] = [ltMock1, ltMock2];

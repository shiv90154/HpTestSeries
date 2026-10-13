// HPAS (HPPSC) prelims paid series: the free 30-question mocks live in prisma/hpas; these are full-length 100-question
// General Studies mocks written fresh. The published prelims paper is a 100-question General Studies paper; the section
// split below is ours. Question `s` is the index into HPAS_SECTIONS.

import type { PatwariQuestion } from "../patwari/types";
import { hpasMock1 } from "./mock1";
import { hpasMock2 } from "./mock2";
import { hpasMock3 } from "./mock3";

export const HPAS_SECTIONS = [
  { name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान" },
  { name: "Indian History & Culture", nameHi: "भारतीय इतिहास एवं संस्कृति" },
  { name: "Polity & Governance", nameHi: "राजव्यवस्था एवं शासन" },
  { name: "Geography & Environment", nameHi: "भूगोल एवं पर्यावरण" },
  { name: "Indian Economy", nameHi: "भारतीय अर्थव्यवस्था" },
  { name: "Science & Technology", nameHi: "विज्ञान एवं प्रौद्योगिकी" },
];

/** Full mocks 1, 2, 3, … in order. */
export const HPAS_MOCKS: PatwariQuestion[][] = [hpasMock1, hpasMock2, hpasMock3];

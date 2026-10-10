// HP TET (JBT): fresh full mocks 3, 4, … (sections as in prisma/exam-series/index.ts: Child Development & Pedagogy,
// English, Hindi, Mathematics, EVS & General Awareness). Mocks 1–2 are bank-built there.

import type { PatwariQuestion } from "../patwari/types";
import { jbtMock3 } from "./jbt-mock3";
import { jbtMock4 } from "./jbt-mock4";
import { jbtMock5 } from "./jbt-mock5";

export const HP_TET_JBT_MOCKS: PatwariQuestion[][] = [jbtMock3, jbtMock4, jbtMock5];

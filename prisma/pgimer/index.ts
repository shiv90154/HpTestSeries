// PGIMER Nursing Officer: after the High Court posts, the exam page that brings the most search clicks (GSC, Oct 2026).
// Every mock is written fresh to the published CBT format (100 questions, 100 marks, 100 minutes, 0.25 off per wrong answer);
// the section split is ours. Question `s` is the index into PGIMER_SECTIONS.

import type { PatwariQuestion } from "../patwari/types";
import { pgimerMock1 } from "./mock1";
import { pgimerMock2 } from "./mock2";

export const PGIMER_SECTIONS = [
  { name: "Fundamentals of Nursing, Anatomy & Physiology", nameHi: "नर्सिंग के मूल सिद्धांत, शरीर रचना एवं क्रिया विज्ञान" },
  { name: "Medical-Surgical Nursing & Pharmacology", nameHi: "मेडिकल-सर्जिकल नर्सिंग एवं फ़ार्माकोलॉजी" },
  { name: "Child Health, Obstetrics & Midwifery", nameHi: "शिशु स्वास्थ्य, प्रसूति एवं मिडवाइफ़री" },
  { name: "Community Health, Mental Health & Nursing Management", nameHi: "सामुदायिक स्वास्थ्य, मानसिक स्वास्थ्य एवं नर्सिंग प्रबंधन" },
  { name: "General Knowledge", nameHi: "सामान्य ज्ञान" },
];

/** Full mocks 1, 2, 3, … in order. */
export const PGIMER_MOCKS: PatwariQuestion[][] = [pgimerMock1, pgimerMock2];

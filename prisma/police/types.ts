// HP Police Constable tests reuse the Patwari question shape and builder; only the full-mock sections differ.

export { balanceAnswers, q, type Opts, type PatwariQuestion as PoliceQuestion, type TestDef } from "../patwari/types";

export const SECTIONS = [
  { name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान", count: 25 },
  { name: "General Knowledge", nameHi: "सामान्य ज्ञान", count: 25 },
  { name: "Reasoning", nameHi: "तर्कशक्ति", count: 20 },
  { name: "Numerical Ability", nameHi: "संख्यात्मक योग्यता", count: 15 },
  { name: "Hindi & English", nameHi: "हिंदी एवं अंग्रेज़ी", count: 15 },
] as const;

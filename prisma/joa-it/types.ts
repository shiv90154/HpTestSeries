// HP JOA IT tests reuse the Patwari question shape and builder; only the full-mock sections differ.
// HPRCA pattern (Post Code 26001): 120 MCQs, 120 marks, 90 minutes. 85 subject questions (Computer + Mathematics)
// and 35 general-awareness questions. The split inside those two groups is not published; the one below is ours.

export { balanceAnswers, q, type PatwariQuestion as JoaItQuestion, type TestDef } from "../patwari/types";

export const SECTIONS = [
  { name: "Computer", nameHi: "कंप्यूटर", count: 65 },
  { name: "Mathematics", nameHi: "गणित", count: 20 },
  { name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान", count: 8 },
  { name: "General Knowledge & Science", nameHi: "सामान्य ज्ञान एवं विज्ञान", count: 9 },
  { name: "Reasoning", nameHi: "तर्कशक्ति", count: 8 },
  { name: "Hindi & English", nameHi: "हिंदी एवं अंग्रेज़ी", count: 10 },
] as const;

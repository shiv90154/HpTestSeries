// HP Panchayat Secretary tests reuse the Patwari question shape and builder; only the full-mock sections differ.
// HPRCA pattern (Post Code 26005): 120 MCQs, 120 marks, 90 minutes on GK (incl. HP GK & current affairs), everyday science,
// logical reasoning, social science, General English & Hindi, and the subject of the post. The split is not published; the one below is ours.

export { balanceAnswers, q, type PatwariQuestion as PanchayatQuestion, type TestDef } from "../patwari/types";

export const SECTIONS = [
  { name: "Himachal GK & Current Affairs", nameHi: "हिमाचल सामान्य ज्ञान एवं समसामयिकी", count: 25 },
  { name: "Social Science", nameHi: "सामाजिक विज्ञान", count: 20 },
  { name: "Everyday Science", nameHi: "दैनिक विज्ञान", count: 10 },
  { name: "Reasoning & Mathematics", nameHi: "तर्कशक्ति एवं गणित", count: 20 },
  { name: "Hindi & English", nameHi: "हिंदी एवं अंग्रेज़ी", count: 20 },
  { name: "Panchayati Raj, Rural Development & Computer", nameHi: "पंचायती राज, ग्रामीण विकास एवं कंप्यूटर", count: 25 },
] as const;

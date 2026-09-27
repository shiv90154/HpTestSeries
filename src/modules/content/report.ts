// Student error reports on questions (BLUEPRINT: "Report question" is part of the MVP). Pure + client-safe.

import { z } from "zod";

export const REPORT_REASONS = ["WRONG_ANSWER", "TYPO", "TRANSLATION", "OTHER"] as const;
export type ReportReason = (typeof REPORT_REASONS)[number];

export const REPORT_REASON_LABEL: Record<ReportReason, { en: string; hi: string }> = {
  WRONG_ANSWER: { en: "Answer is wrong", hi: "उत्तर गलत है" },
  TYPO: { en: "Mistake in question or options", hi: "प्रश्न या विकल्पों में गलती" },
  TRANSLATION: { en: "Hindi / English translation problem", hi: "हिंदी / अंग्रेज़ी अनुवाद में गलती" },
  OTHER: { en: "Something else", hi: "कुछ और" },
};

export const MAX_REPORT_NOTE = 500;
/** Per user per 24 hours — generous for honest use, stops a flood. */
export const MAX_REPORTS_PER_DAY = 30;

export const reportSchema = z
  .object({
    questionId: z.string().min(1).max(64),
    reason: z.enum(REPORT_REASONS),
    note: z.string().trim().max(MAX_REPORT_NOTE),
  })
  // "Something else" is useless to the content team without a description.
  .refine((r) => r.reason !== "OTHER" || r.note.length >= 5, { message: "note-required", path: ["note"] });

export type ReportInput = z.infer<typeof reportSchema>;

export type ReportError = "login" | "invalid" | "note-required" | "not-found" | "rate-limited";

export const REPORT_ERROR_TEXT: Record<ReportError, { en: string; hi: string }> = {
  login: { en: "Please log in to report a question.", hi: "प्रश्न की रिपोर्ट करने के लिए लॉग इन करें।" },
  invalid: { en: "Please choose a reason.", hi: "कृपया कारण चुनें।" },
  "note-required": { en: "Please describe the problem in a few words.", hi: "कृपया समस्या कुछ शब्दों में लिखें।" },
  "not-found": { en: "This question can no longer be reported.", hi: "इस प्रश्न की अब रिपोर्ट नहीं की जा सकती।" },
  "rate-limited": { en: "You have sent many reports today. Please try again tomorrow.", hi: "आज आप बहुत रिपोर्ट भेज चुके हैं। कृपया कल फिर प्रयास करें।" },
};

export function validateReport(raw: unknown): { ok: true; value: ReportInput } | { ok: false; error: ReportError } {
  const p = reportSchema.safeParse(raw);
  if (p.success) return { ok: true, value: p.data };
  return { ok: false, error: p.error.issues.some((i) => i.message === "note-required") ? "note-required" : "invalid" };
}

import type { ExamPattern, ExamSeo, Faq } from "../../src/modules/content/exam-content";

/**
 * Public copy for one exam page (hub, /syllabus, /exam-pattern). It is seeded by prisma/seed-content.ts, which only fills
 * what is still empty, so edits made later in /admin/exams survive a deploy. Keep it to facts that outlive one notification;
 * anything dated says so ("in the 2026 drive") and points the reader to the official notification.
 */
export type ExamPage = {
  /** Markdown. At least 600 characters: the seed replaces shorter descriptions, which is how the old one-paragraph text is recognised. */
  description?: string;
  /** Markdown with ### headings: the hub shows the headings as an outline and /syllabus shows everything. */
  syllabus?: string;
  /** Exam-specific questions only; the page adds the generic free / Hindi / CBT answers itself. */
  faqs?: Faq[];
  /** Title and description for Google. `{year}` in the title is replaced at render time. */
  seo: ExamSeo;
  /** Only when the pattern is known from the notification; gives the exam its own /exam-pattern page. */
  pattern?: ExamPattern;
};

export type ExamPages = Record<string, ExamPage>;

/** A draft blog post seeded by prisma/seed-content.ts; `exams` are "bodySlug/examSlug" keys. */
export type PostSeed = {
  slug: string;
  title: string;
  titleHi?: string;
  excerpt: string;
  category: "NOTIFICATION" | "SYLLABUS" | "EXAM_PATTERN" | "CUTOFF" | "STRATEGY" | "CURRENT_AFFAIRS";
  exams: string[];
  content: string;
  faqs?: Faq[];
  /** Search-result title (max 70 characters) when the headline is longer than that. */
  seoTitle?: string;
  /** Search-result description (max 170 characters). */
  seoDescription?: string;
};

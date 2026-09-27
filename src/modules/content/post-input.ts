import { z } from "zod";
import { faqListSchema } from "./exam-content";

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export const POST_CATEGORIES = [
  "NOTIFICATION",
  "SYLLABUS",
  "EXAM_PATTERN",
  "EXAM_DATE",
  "ADMIT_CARD",
  "RESULT",
  "CUTOFF",
  "STRATEGY",
  "CURRENT_AFFAIRS",
] as const;
export type PostCategory = (typeof POST_CATEGORIES)[number];

/** Label, Hindi label and landing-page copy per category. `slug` is the /blog/category/<slug> segment. */
export const CATEGORY_META: Record<PostCategory, { slug: string; label: string; labelHi: string; heading: string; blurb: string }> = {
  NOTIFICATION: {
    slug: "notification",
    label: "Notifications",
    labelHi: "भर्ती अधिसूचना",
    heading: "HP Govt Job Notifications",
    blurb: "Latest Himachal Pradesh government recruitment notifications — HPRCA, HPPSC, HP Police, Patwari and more, with eligibility and how to apply.",
  },
  SYLLABUS: {
    slug: "syllabus",
    label: "Syllabus",
    labelHi: "पाठ्यक्रम",
    heading: "HP Exam Syllabus",
    blurb: "Topic-wise syllabus for Himachal government exams in Hindi and English, with what to study first.",
  },
  EXAM_PATTERN: {
    slug: "exam-pattern",
    label: "Exam Pattern",
    labelHi: "परीक्षा पैटर्न",
    heading: "HP Exam Pattern",
    blurb: "Number of questions, marks, time and negative marking for every major Himachal Pradesh exam.",
  },
  EXAM_DATE: {
    slug: "exam-date",
    label: "Exam Dates",
    labelHi: "परीक्षा तिथि",
    heading: "HP Exam Dates",
    blurb: "Exam calendar and date updates for HPRCA, HPPSC, HP Police, HP TET and other Himachal exams.",
  },
  ADMIT_CARD: {
    slug: "admit-card",
    label: "Admit Card",
    labelHi: "प्रवेश पत्र",
    heading: "HP Exam Admit Cards",
    blurb: "When and how to download admit cards for Himachal Pradesh government exams.",
  },
  RESULT: {
    slug: "result",
    label: "Results",
    labelHi: "परिणाम",
    heading: "HP Exam Results",
    blurb: "Result updates and merit list news for Himachal government recruitment exams.",
  },
  CUTOFF: {
    slug: "cutoff",
    label: "Cutoff",
    labelHi: "कट ऑफ",
    heading: "HP Exam Cutoff Marks",
    blurb: "Previous year cutoff and qualifying marks for Himachal exams, category-wise.",
  },
  STRATEGY: {
    slug: "strategy",
    label: "Preparation Tips",
    labelHi: "तैयारी रणनीति",
    heading: "HP Exam Preparation Strategy",
    blurb: "How to prepare for Himachal government exams — study plans, important topics and mock test strategy.",
  },
  CURRENT_AFFAIRS: {
    slug: "current-affairs",
    label: "HP Current Affairs",
    labelHi: "हिमाचल समसामयिकी",
    heading: "Himachal Current Affairs",
    blurb: "Himachal Pradesh current affairs for HPAS, HPRCA, HP Police and Patwari exams.",
  },
};

export function categoryFromSlug(slug: string): PostCategory | null {
  return POST_CATEGORIES.find((c) => CATEGORY_META[c].slug === slug) ?? null;
}

const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || /^https:\/\//.test(v) || v.startsWith("/"), "Cover image must be an https:// URL or a /path");

export const postSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(3, "URL is required")
    .max(100, "URL is too long")
    .regex(SLUG_RE, "URL may only use lowercase letters, digits and single hyphens"),
  title: z.string().trim().min(10, "Title should be at least 10 characters").max(160, "Title is too long"),
  titleHi: z.string().trim().max(160, "Hindi title is too long"),
  excerpt: z.string().trim().min(30, "Excerpt should be at least 30 characters").max(300, "Excerpt is too long"),
  content: z.string().trim().min(100, "Content is too short").max(100_000, "Content is too long"),
  coverImage: optionalUrl,
  category: z.enum(POST_CATEGORIES),
  seoTitle: z.string().trim().max(70, "SEO title should be at most 70 characters"),
  seoDescription: z.string().trim().max(170, "SEO description should be at most 170 characters"),
  faqs: faqListSchema,
  examIds: z.array(z.string()).max(20),
});

export type PostInput = z.infer<typeof postSchema>;

type Result<T> = { ok: true; value: T } | { ok: false; errors: string[] };

export function validatePost(raw: unknown): Result<PostInput> {
  const p = postSchema.safeParse(raw);
  if (p.success) return { ok: true, value: p.data };
  return { ok: false, errors: [...new Set(p.error.issues.map((i) => i.message))] };
}

/** Rough reading time for the post header — ~200 words a minute, Hindi and English alike. */
export function readingMinutes(markdown: string): number {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

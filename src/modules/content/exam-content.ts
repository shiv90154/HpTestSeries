import { z } from "zod";

// Shapes of the JSON columns on Exam (and Post.faqs). Pure, so the admin form, the service
// and the public pages all read the same thing. Parsers are lenient: bad JSON renders nothing.

export const faqSchema = z.object({
  q: z.string().trim().min(5, "Each FAQ needs a question").max(200, "FAQ question is too long"),
  a: z.string().trim().min(5, "Each FAQ needs an answer").max(2000, "FAQ answer is too long"),
});
export type Faq = z.infer<typeof faqSchema>;
export const faqListSchema = z.array(faqSchema).max(20, "At most 20 FAQs");

export const patternSchema = z.object({
  sections: z
    .array(
      z.object({
        name: z.string().trim().min(1, "Pattern section name is required").max(80),
        questions: z.number().int().min(0).max(1000).nullable(),
        marks: z.number().min(0).max(10_000).nullable(),
      }),
    )
    .max(20),
  durationMin: z.number().int().min(0).max(1000).nullable(),
  negativeMarking: z.string().trim().max(120),
  note: z.string().trim().max(500),
});
export type ExamPattern = z.infer<typeof patternSchema>;

export const seoSchema = z.object({
  title: z.string().trim().max(70, "SEO title should be at most 70 characters"),
  description: z.string().trim().max(170, "SEO description should be at most 170 characters"),
});
export type ExamSeo = z.infer<typeof seoSchema>;

export const examInputSchema = z.object({
  nameHi: z.string().trim().max(120),
  description: z.string().trim().max(10_000, "Description is too long"),
  syllabus: z.string().trim().max(50_000, "Syllabus is too long"),
  pattern: patternSchema,
  faqs: faqListSchema,
  seo: seoSchema,
  isActive: z.boolean(),
});
export type ExamInput = z.infer<typeof examInputSchema>;

type Result<T> = { ok: true; value: T } | { ok: false; errors: string[] };

export function validateExam(raw: unknown): Result<ExamInput> {
  const p = examInputSchema.safeParse(raw);
  if (p.success) return { ok: true, value: p.data };
  return { ok: false, errors: [...new Set(p.error.issues.map((i) => i.message))] };
}

const slugField = z
  .string()
  .trim()
  .toLowerCase()
  .min(2, "Slug is required")
  .max(60)
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Slug can only have lowercase letters, numbers and hyphens");

/** New exam: either an existing body (bodyId) or a new one (newBody). Content is filled in on the edit page. */
export const newExamSchema = z
  .object({
    name: z.string().trim().min(2, "Exam name is required").max(120),
    slug: slugField,
    bodyId: z.string().trim(),
    newBody: z.object({ name: z.string().trim().max(120), slug: z.string().trim().toLowerCase().max(60) }),
  })
  .superRefine((v, ctx) => {
    if (v.bodyId) return;
    if (!v.newBody.name) ctx.addIssue({ code: "custom", message: "Pick a conducting body or enter a new one" });
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(v.newBody.slug)) {
      ctx.addIssue({ code: "custom", message: "Body slug can only have lowercase letters, numbers and hyphens" });
    }
  });
export type NewExamInput = z.infer<typeof newExamSchema>;

export function validateNewExam(raw: unknown): Result<NewExamInput> {
  const p = newExamSchema.safeParse(raw);
  if (p.success) return { ok: true, value: p.data };
  return { ok: false, errors: [...new Set(p.error.issues.map((i) => i.message))] };
}

export function parseFaqs(json: unknown): Faq[] {
  const p = faqListSchema.safeParse(json);
  return p.success ? p.data : [];
}

export function parsePattern(json: unknown): ExamPattern | null {
  const p = patternSchema.safeParse(json);
  if (!p.success) return null;
  const v = p.data;
  return v.sections.length || v.durationMin || v.negativeMarking || v.note ? v : null;
}

export function parseSeo(json: unknown): ExamSeo {
  const p = seoSchema.safeParse(json);
  return p.success ? p.data : { title: "", description: "" };
}

export const emptyPattern: ExamPattern = { sections: [], durationMin: null, negativeMarking: "", note: "" };

/** schema.org FAQPage node for rich results. Answers are plain text (markdown stripped lightly). */
export function faqPageJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: stripMarkdown(f.a) },
    })),
  };
}

export function stripMarkdown(text: string): string {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`#>]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

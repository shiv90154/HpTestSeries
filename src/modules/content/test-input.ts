// Test builder input: metadata + structure validation and publish checks. Pure, so unit-tested.

import { z } from "zod";
import { MAX_DEMO_PERCENT } from "@/modules/assessment/demo";

export const TEST_TYPES = ["MOCK", "PYQ", "SECTIONAL", "TOPIC", "DAILY"] as const;
export const TYPE_LABEL: Record<(typeof TEST_TYPES)[number], string> = {
  MOCK: "Full mock",
  PYQ: "Previous year paper",
  SECTIONAL: "Sectional",
  TOPIC: "Topic test",
  DAILY: "Daily quiz",
};

export const MAX_SECTIONS = 20;
export const MAX_TEST_QUESTIONS = 500;

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** "HP GK Mock Test 1 (2026)" → "hp-gk-mock-test-1-2026". Non-Latin text (Hindi) is dropped. */
export function slugify(text: string): string {
  return text
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/, "");
}

export const testMetaSchema = z.object({
  title: z.string().trim().min(3, "Title is required").max(160, "Title is too long"),
  titleHi: z.string().trim().max(160, "Hindi title is too long"),
  slug: z
    .string()
    .trim()
    .max(80, "URL is too long")
    .regex(SLUG_RE, "URL may only use lowercase letters, digits and single hyphens (e.g. joa-it-mock-1)"),
  type: z.enum(TEST_TYPES),
  examId: z.string().nullable(),
  durationMin: z.number().int("Duration must be whole minutes").min(1, "Duration must be at least 1 minute").max(600, "Duration is too long"),
  isFree: z.boolean(),
  /** Paid tests: share of every section that anyone can try for free. 0 = no free demo. */
  demoPercent: z
    .number()
    .int("Demo share must be a whole number")
    .min(0, "Demo share cannot be negative")
    .max(MAX_DEMO_PERCENT, `Demo share can be at most ${MAX_DEMO_PERCENT}%, so something stays locked`),
  instructions: z.string().trim().max(5000, "Instructions are too long"),
});

export type TestMetaInput = z.infer<typeof testMetaSchema>;

const marks = z.number().min(0, "Marks cannot be negative").max(100, "Marks are too large");

export const testStructureSchema = z.object({
  sections: z
    .array(
      z.object({
        name: z.string().trim().min(1, "Every section needs a name").max(100, "Section name is too long"),
        nameHi: z.string().trim().max(100, "Section name is too long"),
        marksCorrect: marks.refine((n) => n > 0, "Marks for a correct answer must be more than 0"),
        marksWrong: marks,
        questionIds: z.array(z.string().min(1)).max(MAX_TEST_QUESTIONS),
      }),
    )
    .min(1, "Add at least one section")
    .max(MAX_SECTIONS, `At most ${MAX_SECTIONS} sections`),
});

export type TestStructureInput = z.infer<typeof testStructureSchema>;

type Result<T> = { ok: true; value: T } | { ok: false; errors: string[] };

function issues(e: z.ZodError): string[] {
  return [...new Set(e.issues.map((i) => i.message))];
}

export function validateTestMeta(raw: unknown): Result<TestMetaInput> {
  const p = testMetaSchema.safeParse(raw);
  return p.success ? { ok: true, value: p.data } : { ok: false, errors: issues(p.error) };
}

export function validateTestStructure(raw: unknown): Result<TestStructureInput> {
  const p = testStructureSchema.safeParse(raw);
  if (!p.success) return { ok: false, errors: issues(p.error) };
  const all = p.data.sections.flatMap((s) => s.questionIds);
  if (all.length > MAX_TEST_QUESTIONS) return { ok: false, errors: [`A test can have at most ${MAX_TEST_QUESTIONS} questions`] };
  if (new Set(all).size !== all.length) return { ok: false, errors: ["A question appears more than once in this test"] };
  return { ok: true, value: p.data };
}

export type PublishCheckSection = {
  name: string;
  questions: { id: string; status: string; correctOptions: number; preview: string }[];
};

/** Everything that must be true before students can see the test. Empty = ready. */
export function publishProblems(sections: PublishCheckSection[]): string[] {
  const problems: string[] = [];
  if (sections.length === 0) problems.push("Add at least one section");
  for (const s of sections) {
    if (s.questions.length === 0) problems.push(`Section "${s.name}" has no questions`);
    for (const q of s.questions) {
      if (q.status !== "PUBLISHED") problems.push(`Not published yet (${q.status.toLowerCase().replace("_", " ")}): "${q.preview}"`);
      if (q.correctOptions !== 1) problems.push(`Needs exactly one correct option: "${q.preview}"`);
    }
  }
  return problems;
}

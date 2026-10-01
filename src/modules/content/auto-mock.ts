// Auto free-mock input: validation and the "which subject gets how many questions" suggestion. Pure, so unit-tested.

import { z } from "zod";
import type { ExamPattern } from "./exam-content";
import { MAX_TEST_QUESTIONS, slugify } from "./test-input";

export const autoMockSchema = z.object({
  rows: z.array(z.object({ subjectId: z.string().min(1), count: z.number().int().min(0).max(MAX_TEST_QUESTIONS) })).max(40),
  durationMin: z.number().int().min(1, "Duration is required").max(600),
  marksWrong: z.number().min(0).max(5),
  publish: z.boolean(),
});
export type AutoMockInput = z.infer<typeof autoMockSchema>;

type Result = { ok: true; value: AutoMockInput } | { ok: false; errors: string[] };

export function validateAutoMock(raw: unknown): Result {
  const p = autoMockSchema.safeParse(raw);
  if (!p.success) return { ok: false, errors: [...new Set(p.error.issues.map((i) => i.message))] };
  const rows = p.data.rows.filter((r) => r.count > 0);
  const total = rows.reduce((n, r) => n + r.count, 0);
  if (!total) return { ok: false, errors: ["Choose at least one question"] };
  if (total > MAX_TEST_QUESTIONS) return { ok: false, errors: [`A test can have at most ${MAX_TEST_QUESTIONS} questions`] };
  if (new Set(rows.map((r) => r.subjectId)).size !== rows.length) return { ok: false, errors: ["A subject is listed twice"] };
  return { ok: true, value: { ...p.data, rows } };
}

/** Pre-fills counts from the exam's pattern: a pattern row ("Himachal GK") is matched to a subject by name. */
export function suggestCounts(pattern: ExamPattern | null, subjects: { id: string; name: string }[]): Map<string, number> {
  const out = new Map<string, number>();
  for (const row of pattern?.sections ?? []) {
    if (!row.questions) continue;
    const key = slugify(row.name);
    const s = subjects.find((x) => {
      const n = slugify(x.name);
      return !out.has(x.id) && n !== "" && key !== "" && (n === key || key.includes(n) || n.includes(key));
    });
    if (s) out.set(s.id, row.questions);
  }
  return out;
}

export function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

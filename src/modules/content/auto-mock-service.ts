import "server-only";
import { db } from "@/lib/db";
import { shuffle, suggestCounts, validateAutoMock } from "./auto-mock";
import { parsePattern } from "./exam-content";
import { publishTest } from "./test-service";

type Fail = { ok: false; errors: string[] };

/** Published questions of a subject that no free mock of this exam uses yet, so each generated mock is fresh. */
function pool(subjectId: string, examId: string) {
  return {
    status: "PUBLISHED" as const,
    topics: { some: { topic: { subjectId } } },
    testQuestions: { none: { test: { examId, isFree: true } } },
  };
}

export async function getAutoMockPlan(examId: string) {
  const exam = await db.exam.findUnique({
    where: { id: examId },
    select: { pattern: true, _count: { select: { tests: { where: { isFree: true, type: "MOCK" } } } } },
  });
  if (!exam) return null;
  const subjects = await db.subject.findMany({ orderBy: { order: "asc" }, select: { id: true, name: true } });
  const withCounts = await Promise.all(subjects.map(async (s) => ({ ...s, available: await db.question.count({ where: pool(s.id, examId) }) })));
  const pattern = parsePattern(exam.pattern);
  const suggested = suggestCounts(pattern, subjects);
  return {
    existing: exam._count.tests,
    durationMin: pattern?.durationMin ?? null,
    subjects: withCounts.filter((s) => s.available > 0).map((s) => ({ ...s, suggested: Math.min(suggested.get(s.id) ?? 0, s.available) })),
  };
}

export type GenerateResult = { ok: true; id: string; slug: string; published: boolean; warnings: string[] } | Fail;

/** Builds a free full mock for the exam from the question bank: random unused published questions, one section per subject. */
export async function generateFreeMock(examId: string, raw: unknown, actorId: string): Promise<GenerateResult> {
  const v = validateAutoMock(raw);
  if (!v.ok) return v;
  const x = v.value;
  const exam = await db.exam.findUnique({ where: { id: examId }, select: { name: true, slug: true, body: { select: { slug: true } } } });
  if (!exam) return { ok: false, errors: ["Exam not found"] };
  const subjects = await db.subject.findMany({ where: { id: { in: x.rows.map((r) => r.subjectId) } }, select: { id: true, name: true, nameHi: true } });
  const subjectById = new Map(subjects.map((s) => [s.id, s]));

  const used = new Set<string>();
  const sections: { name: string; nameHi: string | null; ids: string[] }[] = [];
  const errors: string[] = [];
  for (const r of x.rows) {
    const s = subjectById.get(r.subjectId);
    if (!s) {
      errors.push("A chosen subject no longer exists");
      continue;
    }
    const candidates = await db.question.findMany({ where: { ...pool(r.subjectId, examId), id: { notIn: [...used] } }, select: { id: true }, take: 5000 });
    if (candidates.length < r.count) {
      errors.push(`${s.name}: only ${candidates.length} unused published questions, you asked for ${r.count}`);
      continue;
    }
    const ids = shuffle(candidates).slice(0, r.count).map((c) => c.id);
    ids.forEach((id) => used.add(id));
    sections.push({ name: s.name, nameHi: s.nameHi, ids });
  }
  if (errors.length) return { ok: false, errors };

  let num = (await db.test.count({ where: { examId, isFree: true, type: "MOCK" } })) + 1;
  const base = `${exam.body.slug}-${exam.slug}-free-mock`;
  while (await db.test.findUnique({ where: { slug: `${base}-${num}` }, select: { id: true } })) num++;
  const slug = `${base}-${num}`;

  const test = await db.$transaction(
    async (tx) => {
      const t = await tx.test.create({
        select: { id: true, sections: { select: { id: true, order: true } } },
        data: {
          slug,
          title: `${exam.name} Free Mock Test ${num}`,
          type: "MOCK",
          examId,
          durationSec: x.durationMin * 60,
          isFree: true,
          status: "DRAFT",
          sections: { create: sections.map((s, order) => ({ name: s.name, nameHi: s.nameHi, order, marksCorrect: 1, marksWrong: x.marksWrong })) },
        },
      });
      const sectionId = new Map(t.sections.map((s) => [s.order, s.id]));
      await tx.testQuestion.createMany({
        data: sections.flatMap((s, si) => s.ids.map((questionId, order) => ({ testId: t.id, sectionId: sectionId.get(si)!, questionId, order }))),
      });
      await tx.auditLog.create({ data: { actorId, entity: "test", entityId: t.id, action: "auto-generate", diff: { questions: used.size } } });
      return t;
    },
    { timeout: 30_000, maxWait: 10_000 },
  );

  if (!x.publish) return { ok: true, id: test.id, slug, published: false, warnings: [] };
  const pub = await publishTest(test.id, actorId);
  return pub.ok ? { ok: true, id: test.id, slug, published: true, warnings: [] } : { ok: true, id: test.id, slug, published: false, warnings: pub.errors };
}

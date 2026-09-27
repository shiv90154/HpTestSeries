import "server-only";
import { randomUUID } from "node:crypto";
import { db } from "@/lib/db";
import type { Prisma } from "@/generated/prisma/client";
import { parseQuestionCsv, type ImportLookups, type ImportParseResult, type ParsedQuestion } from "./question-import";

export type ImportPreview = {
  fatal: string | null;
  totalRows: number;
  /** valid and not already in the bank */
  newCount: number;
  errors: ImportParseResult["errors"];
  /** valid rows whose text already exists in the bank (skipped on import) */
  existing: { row: number; preview: string }[];
  sample: { row: number; preview: string; options: number; langs: string }[];
};

async function loadLookups(): Promise<ImportLookups> {
  const [topics, exams] = await Promise.all([
    db.topic.findMany({ select: { id: true, slug: true, subject: { select: { slug: true } } } }),
    db.exam.findMany({ select: { id: true, slug: true, body: { select: { slug: true } } } }),
  ]);
  return {
    topics: new Map(topics.map((t) => [`${t.subject.slug}/${t.slug}`, t.id])),
    exams: new Map(exams.map((e) => [`${e.body.slug}/${e.slug}`, e.id])),
    currentYear: new Date().getFullYear(),
  };
}

async function splitExisting(questions: ParsedQuestion[]) {
  const hashes = [...new Set(questions.map((q) => q.textHash))];
  const found = hashes.length
    ? await db.question.findMany({ where: { textHash: { in: hashes } }, select: { textHash: true } })
    : [];
  const existingHashes = new Set(found.map((f) => f.textHash));
  return {
    fresh: questions.filter((q) => !existingHashes.has(q.textHash)),
    existing: questions.filter((q) => existingHashes.has(q.textHash)),
  };
}

export async function previewQuestionImport(csvText: string): Promise<ImportPreview> {
  const parsed = parseQuestionCsv(csvText, await loadLookups());
  const { fresh, existing } = await splitExisting(parsed.questions);
  return {
    fatal: parsed.fatal,
    totalRows: parsed.totalRows,
    newCount: fresh.length,
    errors: parsed.errors,
    existing: existing.map((q) => ({ row: q.row, preview: q.preview })),
    sample: fresh.slice(0, 5).map((q) => ({
      row: q.row,
      preview: q.preview,
      options: q.options.length,
      langs: q.contents.map((c) => c.lang).join(" + "),
    })),
  };
}

export type ImportCommitResult =
  | { ok: true; created: number; skippedExisting: number; skippedInvalid: number }
  | { ok: false; error: string };

/**
 * Re-parses and re-validates the file (never trusts a client-side preview), skips invalid rows and
 * questions already in the bank, then inserts everything else as DRAFT in one transaction.
 */
export async function commitQuestionImport(csvText: string, actorId: string, fileName: string): Promise<ImportCommitResult> {
  const parsed = parseQuestionCsv(csvText, await loadLookups());
  if (parsed.fatal) return { ok: false, error: parsed.fatal };

  const { fresh, existing } = await splitExisting(parsed.questions);
  if (fresh.length === 0) return { ok: false, error: "Nothing to import: every valid row already exists in the question bank." };

  // IDs are generated here so the whole batch is five bulk inserts instead of ~16 round trips per question.
  const questionRows: Prisma.QuestionCreateManyInput[] = [];
  const contentRows: Prisma.QuestionContentCreateManyInput[] = [];
  const topicRows: Prisma.QuestionTopicCreateManyInput[] = [];
  const optionRows: Prisma.QuestionOptionCreateManyInput[] = [];
  const optionContentRows: Prisma.QuestionOptionContentCreateManyInput[] = [];

  for (const q of fresh) {
    const questionId = randomUUID();
    questionRows.push({
      id: questionId,
      difficulty: q.difficulty,
      status: "DRAFT",
      sourceType: q.sourceType,
      sourceExamId: q.sourceExamId,
      sourceYear: q.sourceYear,
      textHash: q.textHash,
      createdById: actorId,
    });
    for (const c of q.contents) contentRows.push({ questionId, ...c });
    topicRows.push({ questionId, topicId: q.topicId });
    q.options.forEach((texts, order) => {
      const optionId = randomUUID();
      optionRows.push({ id: optionId, questionId, order, isCorrect: order === q.correctIndex });
      for (const t of texts) optionContentRows.push({ optionId, ...t });
    });
  }

  await db.$transaction(
    async (tx) => {
      await tx.question.createMany({ data: questionRows });
      await tx.questionContent.createMany({ data: contentRows });
      await tx.questionTopic.createMany({ data: topicRows });
      await tx.questionOption.createMany({ data: optionRows });
      await tx.questionOptionContent.createMany({ data: optionContentRows });
      await tx.auditLog.create({
        data: {
          actorId,
          entity: "question",
          entityId: "bulk-import",
          action: "import",
          diff: { fileName, created: fresh.length, skippedExisting: existing.length, skippedInvalid: parsed.errors.length },
        },
      });
    },
    { timeout: 30_000, maxWait: 10_000 },
  );

  return { ok: true, created: fresh.length, skippedExisting: existing.length, skippedInvalid: parsed.errors.length };
}

import "server-only";
import { db } from "@/lib/db";
import type { ContentStatus, Prisma } from "@/generated/prisma/client";
import { validateQuestionInput } from "./question-input";
import type { QuestionInput } from "./question-shape";

export type SaveQuestionResult = { ok: true; id: string } | { ok: false; errors: string[] };

/** Loads a question in the editor's input shape, plus what the editor needs to show around it. */
export async function getQuestionForEdit(id: string) {
  const q = await db.question.findUnique({
    where: { id },
    include: {
      contents: true,
      options: { orderBy: { order: "asc" }, include: { contents: true } },
      topics: { select: { topicId: true }, take: 1 },
      testQuestions: { select: { test: { select: { id: true, title: true, status: true } } } },
      reports: { where: { status: "OPEN" }, orderBy: { createdAt: "desc" }, select: { id: true, reason: true, note: true, createdAt: true } },
      createdBy: { select: { name: true } },
      reviewedBy: { select: { name: true } },
    },
  });
  if (!q) return null;

  const content = (lang: string) => q.contents.find((c) => c.lang === lang);
  const input: QuestionInput = {
    topicId: q.topics[0]?.topicId ?? "",
    difficulty: q.difficulty,
    sourceType: q.sourceType,
    sourceExamId: q.sourceExamId,
    sourceYear: q.sourceYear,
    correctIndex: q.options.findIndex((o) => o.isCorrect),
    langs: { en: !!content("en"), hi: !!content("hi") },
    stem: { en: content("en")?.stem ?? "", hi: content("hi")?.stem ?? "" },
    explanation: { en: content("en")?.explanation ?? "", hi: content("hi")?.explanation ?? "" },
    options: q.options.map((o) => ({
      en: o.contents.find((c) => c.lang === "en")?.text ?? "",
      hi: o.contents.find((c) => c.lang === "hi")?.text ?? "",
    })),
  };

  return {
    id: q.id,
    status: q.status,
    input,
    tests: q.testQuestions.map((t) => t.test),
    reports: q.reports,
    createdBy: q.createdBy?.name ?? null,
    reviewedBy: q.reviewedBy?.name ?? null,
    updatedAt: q.updatedAt,
  };
}

/**
 * Creates or updates a question and sets its status. Options are updated in place by position so their
 * IDs (which saved attempt answers point at) survive an edit; removing options from a question that is
 * already in a test is refused for the same reason.
 */
export async function saveQuestion(args: {
  id: string | null;
  raw: unknown;
  status: ContentStatus;
  actorId: string;
}): Promise<SaveQuestionResult> {
  const v = validateQuestionInput(args.raw, { currentYear: new Date().getFullYear() });
  if (!v.ok) return v;
  const q = v.question;

  const [topic, exam, duplicate] = await Promise.all([
    db.topic.findUnique({ where: { id: q.topicId }, select: { id: true } }),
    q.sourceExamId ? db.exam.findUnique({ where: { id: q.sourceExamId }, select: { id: true } }) : null,
    db.question.findFirst({
      where: { textHash: q.textHash, ...(args.id && { NOT: { id: args.id } }) },
      select: { id: true },
    }),
  ]);
  const errors: string[] = [];
  if (!topic) errors.push("Choose a valid topic");
  if (q.sourceExamId && !exam) errors.push("Choose a valid exam for this PYQ");
  if (duplicate) errors.push(`A question with the same text already exists (id ${duplicate.id})`);
  if (errors.length) return { ok: false, errors };

  const fields = {
    difficulty: q.difficulty,
    sourceType: q.sourceType,
    sourceExamId: q.sourceExamId,
    sourceYear: q.sourceYear,
    textHash: q.textHash,
    status: args.status,
    ...(args.status === "PUBLISHED" && { reviewedById: args.actorId }),
  };

  if (!args.id) {
    const created = await db.question.create({
      select: { id: true },
      data: {
        ...fields,
        createdById: args.actorId,
        contents: { create: q.contents },
        topics: { create: [{ topicId: q.topicId }] },
        options: {
          create: q.options.map((texts, order) => ({
            order,
            isCorrect: order === q.correctIndex,
            contents: { create: texts },
          })),
        },
      },
    });
    await db.auditLog.create({
      data: { actorId: args.actorId, entity: "question", entityId: created.id, action: "create", diff: { status: args.status } },
    });
    return { ok: true, id: created.id };
  }

  const id = args.id;
  const existing = await db.question.findUnique({
    where: { id },
    select: {
      status: true,
      options: { orderBy: { order: "asc" }, select: { id: true, order: true, isCorrect: true } },
      _count: { select: { testQuestions: true } },
    },
  });
  if (!existing) return { ok: false, errors: ["This question no longer exists"] };
  if (q.options.length < existing.options.length && existing._count.testQuestions > 0) {
    return {
      ok: false,
      errors: [
        `This question is used in ${existing._count.testQuestions} test(s), so options cannot be removed (students' saved answers point at them). You can still edit option text.`,
      ],
    };
  }

  const oldCorrect = existing.options.findIndex((o) => o.isCorrect);
  await db.$transaction(
    async (tx) => {
      await tx.question.update({ where: { id }, data: fields });

      await tx.questionContent.deleteMany({ where: { questionId: id } });
      await tx.questionContent.createMany({ data: q.contents.map((c) => ({ questionId: id, ...c })) });

      await tx.questionTopic.deleteMany({ where: { questionId: id } });
      await tx.questionTopic.create({ data: { questionId: id, topicId: q.topicId } });

      const byOrder = new Map(existing.options.map((o) => [o.order, o.id]));
      for (const [order, texts] of q.options.entries()) {
        const optionId = byOrder.get(order);
        if (optionId) {
          await tx.questionOption.update({ where: { id: optionId }, data: { isCorrect: order === q.correctIndex } });
          await tx.questionOptionContent.deleteMany({ where: { optionId } });
          await tx.questionOptionContent.createMany({ data: texts.map((t) => ({ optionId, ...t })) });
        } else {
          await tx.questionOption.create({
            data: { questionId: id, order, isCorrect: order === q.correctIndex, contents: { create: texts } },
          });
        }
      }
      await tx.questionOption.deleteMany({ where: { questionId: id, order: { gte: q.options.length } } });

      const diff: Prisma.InputJsonObject = {
        status: { from: existing.status, to: args.status },
        ...(oldCorrect !== q.correctIndex && { correctIndex: { from: oldCorrect, to: q.correctIndex } }),
      };
      await tx.auditLog.create({ data: { actorId: args.actorId, entity: "question", entityId: id, action: "update", diff } });
    },
    { timeout: 20_000, maxWait: 10_000 },
  );
  return { ok: true, id };
}

/** Bulk status change. Returns how many questions actually changed. */
export async function setQuestionStatus(where: Prisma.QuestionWhereInput, status: ContentStatus, actorId: string): Promise<number> {
  const res = await db.question.updateMany({
    where: { ...where, status: { not: status } },
    data: { status, ...(status === "PUBLISHED" && { reviewedById: actorId }) },
  });
  if (res.count > 0) {
    await db.auditLog.create({
      data: { actorId, entity: "question", entityId: "bulk", action: "status", diff: { to: status, count: res.count } },
    });
  }
  return res.count;
}

/** Only unused drafts can be deleted; anything that was ever in a test is archived instead. */
export async function deleteQuestion(id: string, actorId: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const q = await db.question.findUnique({ where: { id }, select: { status: true, _count: { select: { testQuestions: true } } } });
  if (!q) return { ok: true };
  if (q._count.testQuestions > 0) return { ok: false, error: "This question is used in a test. Archive it instead." };
  if (q.status === "PUBLISHED") return { ok: false, error: "Published questions cannot be deleted. Archive it instead." };
  await db.$transaction([
    db.question.delete({ where: { id } }),
    db.auditLog.create({ data: { actorId, entity: "question", entityId: id, action: "delete" } }),
  ]);
  return { ok: true };
}


// Free Paper I mock for the Punjab Police Constable exam (pbtestseries.in). Idempotent: questions are matched by text
// hash and the test by slug (an existing test is left as it is, so admin edits survive). There is no paid series yet.

import type { PrismaClient } from "../src/generated/prisma/client";
import { POLICE_FREE_TEST } from "./pb-police";
import { upsertQuestion } from "./seed-series";

export async function seedPbPoliceFree(db: PrismaClient) {
  const def = POLICE_FREE_TEST;
  if (await db.test.findUnique({ where: { slug: def.slug }, select: { id: true } })) return { createdTests: 0 };

  const exam = await db.exam.findFirst({ where: { slug: "constable", body: { slug: "punjab-police" } }, select: { id: true } });
  if (!exam) {
    console.warn("Punjab Police seed: exam punjab-police/constable was deleted in admin, skipping");
    return { createdTests: 0 };
  }

  const topics = await db.topic.findMany({ select: { id: true, slug: true, subject: { select: { slug: true } } } });
  const topicId = new Map(topics.map((t) => [`${t.subject.slug}/${t.slug}`, t.id]));
  const questionIds: string[] = [];
  for (const q of def.questions) questionIds.push(await upsertQuestion(db, "Punjab Police seed", q, topicId));

  await db.$transaction(async (tx) => {
    const t = await tx.test.create({
      select: { id: true, sections: { select: { id: true, order: true } } },
      data: {
        slug: def.slug,
        title: def.title,
        titleHi: def.titleHi,
        type: "MOCK",
        examId: exam.id,
        durationSec: def.durationSec,
        isFree: true,
        status: "PUBLISHED",
        publishedAt: new Date(),
        instructions: def.instructions,
        sections: { create: def.sections.map((s, order) => ({ name: s.name, nameHi: s.nameHi, order, marksCorrect: 1, marksWrong: def.marksWrong ?? 0.25 })) },
      },
    });
    const sectionId = new Map(t.sections.map((s) => [s.order, s.id]));
    const perSection = new Map<number, number>();
    await tx.testQuestion.createMany({
      data: def.questions.map((q, i) => {
        const order = perSection.get(q.s) ?? 0;
        perSection.set(q.s, order + 1);
        return { testId: t.id, sectionId: sectionId.get(q.s)!, questionId: questionIds[i], order };
      }),
    });
  });
  return { createdTests: 1 };
}

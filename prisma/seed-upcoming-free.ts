// Free sample mock for each "launching soon" exam (see prisma/upcoming-free). Idempotent: questions are matched by
// text hash, tests by slug (existing tests are left as they are).

import type { PrismaClient } from "../src/generated/prisma/client";
import { upsertQuestion } from "./seed-series";
import { UPCOMING_FREE_TESTS } from "./upcoming-free";

export async function seedUpcomingFree(db: PrismaClient) {
  const topics = await db.topic.findMany({ select: { id: true, slug: true, subject: { select: { slug: true } } } });
  const topicId = new Map(topics.map((t) => [`${t.subject.slug}/${t.slug}`, t.id]));

  let createdTests = 0;
  for (const def of UPCOMING_FREE_TESTS) {
    if (await db.test.findUnique({ where: { slug: def.slug }, select: { id: true } })) continue;

    const exam = await db.exam.findFirst({ where: { slug: def.examSlug, body: { slug: def.bodySlug } }, select: { id: true } });
    if (!exam) {
      console.warn(`Upcoming-exam seed: exam ${def.bodySlug}/${def.examSlug} was deleted in admin, skipping`);
      continue;
    }

    const questionIds: string[] = [];
    for (const q of def.questions) questionIds.push(await upsertQuestion(db, "Upcoming-exam seed", q, topicId));

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
          sections: { create: def.sections.map((s, order) => ({ name: s.name, nameHi: s.nameHi, order, marksCorrect: 1, marksWrong: 0.25 })) },
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
    createdTests++;
  }
  return { createdTests };
}

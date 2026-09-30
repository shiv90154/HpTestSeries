// Free HPAS mock tests (no purchase needed), listed under the HPPSC HPAS exam on /tests.
// Idempotent: questions are matched by text hash, tests by slug (existing tests are left as they are).

import type { PrismaClient } from "../src/generated/prisma/client";
import { HPAS_FREE_SECTIONS, HPAS_FREE_TESTS } from "./hpas";
import { upsertQuestion } from "./seed-series";

export async function seedHpasFree(db: PrismaClient) {
  const exam = await db.exam.findFirst({ where: { slug: "hpas", body: { slug: "hppsc" } }, select: { id: true } });
  if (!exam) throw new Error("HPAS seed: exam hppsc/hpas is missing");

  const topics = await db.topic.findMany({ select: { id: true, slug: true, subject: { select: { slug: true } } } });
  const topicId = new Map(topics.map((t) => [`${t.subject.slug}/${t.slug}`, t.id]));

  let createdTests = 0;
  for (const def of HPAS_FREE_TESTS) {
    if (await db.test.findUnique({ where: { slug: def.slug }, select: { id: true } })) continue;

    const questionIds: string[] = [];
    for (const q of def.questions) questionIds.push(await upsertQuestion(db, "HPAS seed", q, topicId));

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
          sections: {
            create: HPAS_FREE_SECTIONS.map((s, order) => ({ name: s.name, nameHi: s.nameHi, order, marksCorrect: 1, marksWrong: 0.25 })),
          },
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

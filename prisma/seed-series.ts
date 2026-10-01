// Seeds one code-defined test series (tests, one series, one paid product) for an exam. Idempotent: questions
// are matched by text hash; tests, the series and the product by slug, and are only created when missing so
// later edits in the admin panel (price, questions) are kept; series/product titles follow the code. Used by the Patwari and Police seeds.

import type { PrismaClient } from "../src/generated/prisma/client";
import { questionTextHash } from "../src/modules/content/text-hash";
import { balanceAnswers, type Diff, type PatwariQuestion, type TestDef } from "./patwari/types";

export type SeriesSeed = {
  /** Used in error messages, e.g. "Patwari seed". */
  label: string;
  bodySlug: string;
  examSlug: string;
  tests: TestDef[];
  series: { slug: string; title: string; titleHi: string; description: string };
  product: { slug: string; title: string; titleHi: string; priceInPaise: number; validityDays: number };
};

const DIFFICULTY: Record<Diff, "EASY" | "MEDIUM" | "HARD"> = { E: "EASY", M: "MEDIUM", H: "HARD" };

export async function upsertQuestion(db: PrismaClient, label: string, q: PatwariQuestion, topicId: Map<string, string>): Promise<string> {
  const textHash = questionTextHash(q.en[0]);
  const existing = await db.question.findFirst({ where: { textHash }, select: { id: true } });
  if (existing) return existing.id;

  const tId = topicId.get(`${q.subject}/${q.topic}`);
  if (!tId) throw new Error(`${label}: unknown topic ${q.subject}/${q.topic}`);

  const created = await db.question.create({
    data: {
      difficulty: DIFFICULTY[q.d],
      status: "PUBLISHED",
      textHash,
      contents: {
        create: [
          { lang: "en", stem: q.en[0], explanation: q.en[2] },
          { lang: "hi", stem: q.hi[0], explanation: q.hi[2] },
        ],
      },
      topics: { create: [{ topicId: tId }] },
      options: {
        create: q.en[1].map((text, order) => ({
          order,
          isCorrect: order === q.a,
          contents: { create: [{ lang: "en", text }, { lang: "hi", text: q.hi[1][order] }] },
        })),
      },
    },
    select: { id: true },
  });
  return created.id;
}

export async function seedSeries(db: PrismaClient, cfg: SeriesSeed) {
  const exam = await db.exam.findFirst({
    where: { slug: cfg.examSlug, body: { slug: cfg.bodySlug } },
    select: { id: true },
  });
  if (!exam) {
    console.warn(`${cfg.label}: exam ${cfg.bodySlug}/${cfg.examSlug} was deleted in admin, skipping`);
    return { createdTests: 0 };
  }

  const topics = await db.topic.findMany({ select: { id: true, slug: true, subject: { select: { slug: true } } } });
  const topicId = new Map(topics.map((t) => [`${t.subject.slug}/${t.slug}`, t.id]));

  const testIds: string[] = [];
  let createdTests = 0;

  for (const def of cfg.tests) {
    const existing = await db.test.findUnique({ where: { slug: def.slug }, select: { id: true } });
    if (existing) {
      testIds.push(existing.id);
      continue;
    }

    const questions = balanceAnswers(def.questions);
    const questionIds: string[] = [];
    for (const q of questions) questionIds.push(await upsertQuestion(db, cfg.label, q, topicId));

    const test = await db.$transaction(async (tx) => {
      const t = await tx.test.create({
        select: { id: true, sections: { select: { id: true, order: true } } },
        data: {
          slug: def.slug,
          title: def.title,
          titleHi: def.titleHi,
          type: def.type,
          examId: exam.id,
          durationSec: def.durationSec,
          isFree: false,
          demoPercent: def.demoPercent ?? 0,
          status: "PUBLISHED",
          publishedAt: new Date(),
          instructions: def.instructions,
          sections: {
            create: def.sections.map((s, order) => ({ name: s.name, nameHi: s.nameHi, order, marksCorrect: 1, marksWrong: 0.25 })),
          },
        },
      });
      const sectionId = new Map(t.sections.map((s) => [s.order, s.id]));
      const perSection = new Map<number, number>();
      await tx.testQuestion.createMany({
        data: questions.map((q, i) => {
          const order = perSection.get(q.s) ?? 0;
          perSection.set(q.s, order + 1);
          return { testId: t.id, sectionId: sectionId.get(q.s)!, questionId: questionIds[i], order };
        }),
      });
      return t;
    });
    testIds.push(test.id);
    createdTests++;
  }

  const series = await db.testSeries.upsert({
    where: { slug: cfg.series.slug },
    // Titles describe what the series contains, so they follow the code when tests are added; price etc. stay as edited
    update: { title: cfg.series.title, titleHi: cfg.series.titleHi, description: cfg.series.description },
    create: { ...cfg.series, examId: exam.id, status: "PUBLISHED" },
    select: { id: true },
  });
  await db.seriesTest.createMany({
    data: testIds.map((testId, order) => ({ seriesId: series.id, testId, order })),
    skipDuplicates: true,
  });

  const product = await db.product.upsert({
    where: { slug: cfg.product.slug },
    update: { title: cfg.product.title, titleHi: cfg.product.titleHi },
    create: { ...cfg.product, kind: "SERIES", isActive: true },
    select: { id: true },
  });
  await db.productItem.createMany({ data: [{ productId: product.id, seriesId: series.id }], skipDuplicates: true });

  return { createdTests };
}

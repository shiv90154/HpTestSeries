// HP Patwari mock test series: 3 full mocks (100 questions each) and 14 subject tests (25 questions each),
// all in one series and one paid product. Idempotent: questions are matched by text hash; tests, the series
// and the product by slug, and are only created when missing so later edits in the admin panel (price,
// titles, questions) are kept. Adding a new test = adding it to prisma/patwari/index.ts.

import type { PrismaClient } from "../src/generated/prisma/client";
import { questionTextHash } from "../src/modules/content/text-hash";
import { PATWARI_TESTS } from "./patwari";
import { balanceAnswers, type Diff, type PatwariQuestion } from "./patwari/types";

export const PATWARI_SERIES_SLUG = "hp-patwari-mock-test-series";
export const PATWARI_PRODUCT_SLUG = "hp-patwari-mock-series";
const PRICE_IN_PAISE = 199_00; // ₹199 for the whole series
const VALIDITY_DAYS = 180;

const DIFFICULTY: Record<Diff, "EASY" | "MEDIUM" | "HARD"> = { E: "EASY", M: "MEDIUM", H: "HARD" };

async function upsertQuestion(db: PrismaClient, q: PatwariQuestion, topicId: Map<string, string>): Promise<string> {
  const textHash = questionTextHash(q.en[0]);
  const existing = await db.question.findFirst({ where: { textHash }, select: { id: true } });
  if (existing) return existing.id;

  const tId = topicId.get(`${q.subject}/${q.topic}`);
  if (!tId) throw new Error(`Patwari seed: unknown topic ${q.subject}/${q.topic}`);

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

export async function seedPatwari(db: PrismaClient) {
  const exam = await db.exam.findFirst({
    where: { slug: "patwari", body: { slug: "hp-revenue" } },
    select: { id: true },
  });
  if (!exam) throw new Error("Patwari seed: exam hp-revenue/patwari is missing");

  const topics = await db.topic.findMany({ select: { id: true, slug: true, subject: { select: { slug: true } } } });
  const topicId = new Map(topics.map((t) => [`${t.subject.slug}/${t.slug}`, t.id]));

  const testIds: string[] = [];
  let createdTests = 0;

  for (const def of PATWARI_TESTS) {
    const existing = await db.test.findUnique({ where: { slug: def.slug }, select: { id: true } });
    if (existing) {
      testIds.push(existing.id);
      continue;
    }

    const questions = balanceAnswers(def.questions);
    const questionIds: string[] = [];
    for (const q of questions) questionIds.push(await upsertQuestion(db, q, topicId));

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
    where: { slug: PATWARI_SERIES_SLUG },
    update: {},
    create: {
      slug: PATWARI_SERIES_SLUG,
      examId: exam.id,
      title: "HP Patwari Mock Test Series (3 Full Mocks + 14 Subject Tests)",
      titleHi: "एचपी पटवारी मॉक टेस्ट सीरीज़ (3 फुल मॉक + 14 विषय-वार टेस्ट)",
      description:
        "Three full-length, exam-level HP Patwari mock tests (100 questions each) plus 14 subject-wise tests of 25 questions: " +
        "Himachal GK, General Knowledge, Reasoning, Mathematics, Hindi, English and Revenue & Computer, two tests each. " +
        "Every question has a detailed solution in Hindi and English.",
      status: "PUBLISHED",
    },
    select: { id: true },
  });
  await db.seriesTest.createMany({
    data: testIds.map((testId, order) => ({ seriesId: series.id, testId, order })),
    skipDuplicates: true,
  });

  const product = await db.product.upsert({
    where: { slug: PATWARI_PRODUCT_SLUG },
    update: {},
    create: {
      slug: PATWARI_PRODUCT_SLUG,
      title: "HP Patwari Mock Test Series — 3 Full Mocks + 14 Subject Tests",
      titleHi: "एचपी पटवारी मॉक टेस्ट सीरीज़ — 3 फुल मॉक + 14 विषय-वार टेस्ट",
      kind: "SERIES",
      priceInPaise: PRICE_IN_PAISE,
      validityDays: VALIDITY_DAYS,
      isActive: true,
    },
    select: { id: true },
  });
  await db.productItem.createMany({ data: [{ productId: product.id, seriesId: series.id }], skipDuplicates: true });

  return { createdTests };
}

// Sells every previous-year paper as one ₹29 pack. Re-run it after adding PYQ tests in the admin panel:
//   npx tsx prisma/seed-pyq.ts
// Idempotent: each exam that has paid PYQ tests gets a "Previous Year Papers" series (created once, tests
// linked as they appear), and the pack product covers all those series. Price and title are only set on
// creation, so later edits in the admin panel are kept.

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

export const PYQ_PRODUCT_SLUG = "previous-year-papers";
const PRICE_IN_PAISE = 29_00;
const VALIDITY_DAYS = 365;

export async function seedPyq(db: PrismaClient) {
  const tests = await db.test.findMany({
    where: { type: "PYQ", isFree: false, examId: { not: null } },
    select: { id: true, examId: true, exam: { select: { slug: true, name: true } } },
    orderBy: { createdAt: "asc" },
  });

  const product = await db.product.upsert({
    where: { slug: PYQ_PRODUCT_SLUG },
    update: {},
    create: {
      slug: PYQ_PRODUCT_SLUG,
      title: "All Previous Year Papers — Every Himachal Exam",
      titleHi: "सभी पिछले वर्ष के प्रश्न पत्र — हर हिमाचल परीक्षा",
      kind: "PACK",
      priceInPaise: PRICE_IN_PAISE,
      validityDays: VALIDITY_DAYS,
      isActive: true,
    },
    select: { id: true },
  });

  const byExam = new Map<string, typeof tests>();
  for (const t of tests) byExam.set(t.examId!, [...(byExam.get(t.examId!) ?? []), t]);

  for (const [examId, list] of byExam) {
    const exam = list[0].exam!;
    const series = await db.testSeries.upsert({
      where: { slug: `${exam.slug}-previous-year-papers` },
      update: {},
      create: {
        slug: `${exam.slug}-previous-year-papers`,
        examId,
        title: `${exam.name} Previous Year Papers`,
        description: `Past ${exam.name} question papers as full CBT tests, with solutions.`,
        status: "PUBLISHED",
      },
      select: { id: true },
    });
    await db.seriesTest.createMany({ data: list.map((t, order) => ({ seriesId: series.id, testId: t.id, order })), skipDuplicates: true });
    await db.productItem.createMany({ data: [{ productId: product.id, seriesId: series.id }], skipDuplicates: true });
  }
  return { exams: byExam.size, papers: tests.length };
}

if (process.argv[1]?.endsWith("seed-pyq.ts")) {
  const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
  seedPyq(db)
    .then((r) => console.log(`PYQ pack ready: ${r.papers} paper(s) across ${r.exams} exam(s)`))
    .finally(() => db.$disconnect());
}

// Sells every previous-year paper as one pack per site (hp: previous-year-papers, pb: previous-year-papers-pb, ...).
// Re-run it after adding PYQ tests in the admin panel:
//   npx tsx prisma/seed-pyq.ts
// Idempotent: each exam that has paid PYQ tests gets a "Previous Year Papers" series (created once, tests linked as they
// appear), and each site's pack covers the series of the exams that site shows. A site with no paper gets no pack, so
// nothing empty is ever on sale. Price and title are only set on creation, so later edits in the admin panel are kept;
// the one exception is the old ₹29 price, which is raised to the current one.

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { PYQ_PRICE_PAISE, pyqProductSlug } from "../src/modules/commerce/pyq";
import { SITES } from "../src/sites";
import { SITE_CODES } from "../src/sites/types";

const VALIDITY_DAYS = 365;
const OLD_PRICE_IN_PAISE = 29_00;

export async function seedPyq(db: PrismaClient) {
  const tests = await db.test.findMany({
    where: { type: "PYQ", isFree: false, examId: { not: null } },
    select: { id: true, examId: true, exam: { select: { slug: true, name: true, body: { select: { sites: true } } } } },
    orderBy: { createdAt: "asc" },
  });

  const byExam = new Map<string, typeof tests>();
  for (const t of tests) byExam.set(t.examId!, [...(byExam.get(t.examId!) ?? []), t]);

  const seriesOfExam = new Map<string, string>();
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
    seriesOfExam.set(examId, series.id);
  }

  let packs = 0;
  for (const code of SITE_CODES) {
    const examIds = [...byExam].filter(([, list]) => list[0].exam!.body.sites.some((s) => s === code || s === "*")).map(([id]) => id);
    if (examIds.length === 0) continue;
    const slug = pyqProductSlug(code);
    const adj = SITES[code].stateAdj;
    const product = await db.product.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        title: `All Previous Year Papers — Every ${adj} Exam`,
        titleHi: code === "hp" ? "सभी पिछले वर्ष के प्रश्न पत्र — हर हिमाचल परीक्षा" : `सभी पिछले वर्ष के प्रश्न पत्र — ${SITES[code].stateAdjHi} की हर परीक्षा`,
        kind: "PACK",
        priceInPaise: PYQ_PRICE_PAISE,
        validityDays: VALIDITY_DAYS,
        isActive: true,
      },
      select: { id: true },
    });
    await db.product.updateMany({ where: { id: product.id, priceInPaise: OLD_PRICE_IN_PAISE }, data: { priceInPaise: PYQ_PRICE_PAISE } });
    await db.productItem.createMany({ data: examIds.map((e) => ({ productId: product.id, seriesId: seriesOfExam.get(e)! })), skipDuplicates: true });
    packs++;
  }
  return { exams: byExam.size, papers: tests.length, packs };
}

if (process.argv[1]?.endsWith("seed-pyq.ts")) {
  const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
  seedPyq(db)
    .then((r) => console.log(`PYQ packs ready: ${r.packs} pack(s), ${r.papers} paper(s) across ${r.exams} exam(s)`))
    .finally(() => db.$disconnect());
}

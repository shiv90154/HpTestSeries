// Paid series for exams that had no series of their own (see prisma/exam-series), and the packs that bundle them.
// Idempotent: tests by slug, series and products by slug.

import type { PrismaClient } from "../src/generated/prisma/client";
import { EXAM_PACKS, EXAM_SERIES } from "./exam-series";
import { seedSeries } from "./seed-series";

// A test shared by several series belongs to the exam of the series seeded first, so the busiest exam goes first.
const FIRST = "hp-high-court-process-server";

export async function seedExamSeries(db: PrismaClient) {
  let createdTests = 0;
  const ordered = [...EXAM_SERIES].sort((a, b) => Number(b.key === FIRST) - Number(a.key === FIRST));
  for (const cfg of ordered) createdTests += (await seedSeries(db, cfg)).createdTests;

  for (const pack of EXAM_PACKS) {
    const series = await db.testSeries.findMany({ where: { slug: { in: pack.seriesSlugs } }, select: { id: true } });
    if (series.length === 0) continue;
    const { slug, title, titleHi, priceInPaise, validityDays } = pack;
    const product = await db.product.upsert({
      where: { slug: pack.slug },
      // Price stays as edited in the admin panel; the title follows the code
      update: { title: pack.title, titleHi: pack.titleHi },
      create: { slug, title, titleHi, priceInPaise, validityDays, kind: "PACK", isActive: true },
      select: { id: true },
    });
    await db.productItem.createMany({ data: series.map((s) => ({ productId: product.id, seriesId: s.id })), skipDuplicates: true });
  }
  return { createdTests };
}

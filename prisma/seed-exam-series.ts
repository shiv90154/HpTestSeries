// Paid two-mock series for exams that so far only had a free sample (see prisma/exam-series). Idempotent per test slug.

import type { PrismaClient } from "../src/generated/prisma/client";
import { EXAM_SERIES } from "./exam-series";
import { seedSeries } from "./seed-series";

export async function seedExamSeries(db: PrismaClient) {
  let createdTests = 0;
  for (const cfg of EXAM_SERIES) createdTests += (await seedSeries(db, cfg)).createdTests;
  return { createdTests };
}

// Seeds the HP JOA (IT) previous-year papers (type PYQ) and links them into the Rs 29 PYQ pack.
//   npx tsx prisma/seed-joa-it-pyq.ts

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { JOA_IT_PYQ } from "./joa-it-pyq";
import { seedPyqPapers } from "./seed-pyq-papers";

export const seedJoaItPyq = (db: PrismaClient) =>
  seedPyqPapers(db, { label: "JOA IT PYQ seed", bodySlug: "hprca", examSlug: "joa-it", papers: JOA_IT_PYQ });

if (process.argv[1]?.endsWith("seed-joa-it-pyq.ts")) {
  const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
  seedJoaItPyq(db)
    .then((r) => console.log(`JOA IT PYQ: ${r.created} new paper(s); pack has ${r.papers} paper(s) across ${r.exams} exam(s)`))
    .finally(() => db.$disconnect());
}

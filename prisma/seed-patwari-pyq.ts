// Seeds the HP Patwari previous-year papers (type PYQ) and links them into the Rs 29 PYQ pack.
//   npx tsx prisma/seed-patwari-pyq.ts

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { PATWARI_PYQ } from "./patwari-pyq";
import { seedPyqPapers } from "./seed-pyq-papers";

export const seedPatwariPyq = (db: PrismaClient) =>
  seedPyqPapers(db, { label: "Patwari PYQ seed", bodySlug: "hp-revenue", examSlug: "patwari", papers: PATWARI_PYQ });

if (process.argv[1]?.endsWith("seed-patwari-pyq.ts")) {
  const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
  seedPatwariPyq(db)
    .then((r) => console.log(`Patwari PYQ: ${r.created} new paper(s); pack has ${r.papers} paper(s) across ${r.exams} exam(s)`))
    .finally(() => db.$disconnect());
}

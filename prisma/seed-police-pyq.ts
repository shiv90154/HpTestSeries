// Seeds the HP Police Constable previous-year papers (type PYQ) and links them into the Rs 29 PYQ pack.
//   npx tsx prisma/seed-police-pyq.ts

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { POLICE_PYQ } from "./police-pyq";
import { seedPyqPapers } from "./seed-pyq-papers";

export const seedPoliceStandalonePyq = (db: PrismaClient) =>
  seedPyqPapers(db, { label: "Police PYQ seed", bodySlug: "hp-police", examSlug: "constable", papers: POLICE_PYQ });

if (process.argv[1]?.endsWith("seed-police-pyq.ts")) {
  const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
  seedPoliceStandalonePyq(db)
    .then((r) => console.log(`Police PYQ: ${r.created} new paper(s); pack has ${r.papers} paper(s) across ${r.exams} exam(s)`))
    .finally(() => db.$disconnect());
}

// One-off: swaps the Himachal GK section of the live HP Free Mock 1 for the harder set now in prisma/seed-demo.ts.
// The seed leaves an existing test alone, so a change to the questions in code never reaches this test by itself.
//   npx tsx prisma/upgrade-hp-free-mock.ts          shows what would change
//   npx tsx prisma/upgrade-hp-free-mock.ts --apply  does it
// Attempts keep their answers by question id, so results of attempts taken before the swap show the old questions only
// where the result page reads them from the attempt; a result page that rebuilds from the test would no longer match.

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { ensureDemoQuestions, HP_FREE_MOCK } from "./seed-demo";

const apply = process.argv.includes("--apply");
const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

async function main() {
  const test = await db.test.findUnique({
    where: { slug: HP_FREE_MOCK.slug },
    select: { id: true, sections: { where: { order: 0 }, select: { id: true } }, _count: { select: { attempts: true } } },
  });
  const sectionId = test?.sections[0]?.id;
  if (!test || !sectionId) throw new Error(`${HP_FREE_MOCK.slug} not found, nothing to upgrade`);

  const gk = HP_FREE_MOCK.questions.filter((q) => q.section === 0);
  const current = await db.testQuestion.findMany({ where: { testId: test.id, sectionId }, select: { questionId: true } });
  console.log(`${HP_FREE_MOCK.slug}: ${current.length} Himachal GK questions now, ${gk.length} in code; ${test._count.attempts} attempt(s) so far.`);
  if (!apply) return console.log("Dry run. Re-run with --apply to swap them.");

  const ids = await ensureDemoQuestions(db, gk);
  await db.$transaction([
    db.testQuestion.deleteMany({ where: { testId: test.id, sectionId } }),
    db.testQuestion.createMany({ data: ids.map((questionId, order) => ({ testId: test.id, sectionId, questionId, order })) }),
  ]);
  console.log("Swapped.");
}

main().finally(() => db.$disconnect());

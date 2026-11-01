// One-off: puts the harder Himachal GK set (prisma/seed-demo.ts) on the live HP Free Mock 1.
// The seed leaves an existing test alone, so a change to the questions in code never reaches it by itself, and swapping
// the questions inside the live test would break old results: a result page re-grades the stored answers against the
// test's current questions. So the old test is archived under a new slug (its attempts and results stay exactly as
// they were) and the new test is created on the original slug, which the site config, posts and links all point to.
//   npx tsx prisma/upgrade-hp-free-mock.ts          shows what would change
//   npx tsx prisma/upgrade-hp-free-mock.ts --apply  does it

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { HP_FREE_MOCK, seedFreeMock } from "./seed-demo";

const apply = process.argv.includes("--apply");
const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
const OLD_SLUG = `${HP_FREE_MOCK.slug}-v1`;

async function main() {
  const old = await db.test.findUnique({ where: { slug: HP_FREE_MOCK.slug }, select: { id: true, status: true, _count: { select: { attempts: true } } } });
  if (!old) throw new Error(`${HP_FREE_MOCK.slug} not found, nothing to upgrade`);
  if (await db.test.findUnique({ where: { slug: OLD_SLUG }, select: { id: true } })) return console.log(`${OLD_SLUG} already exists: this was done before, nothing to do.`);

  console.log(`${HP_FREE_MOCK.slug} has ${old._count.attempts} attempt(s). It becomes ${OLD_SLUG} (archived, results untouched) and a new ${HP_FREE_MOCK.slug} is created.`);
  if (!apply) return console.log("Dry run. Re-run with --apply to do it.");

  await db.test.update({ where: { id: old.id }, data: { slug: OLD_SLUG, status: "ARCHIVED" } });
  await seedFreeMock(db, HP_FREE_MOCK);
  const created = await db.test.findUnique({ where: { slug: HP_FREE_MOCK.slug }, select: { status: true, isFree: true, _count: { select: { questions: true } } } });
  console.log(`New ${HP_FREE_MOCK.slug}: ${created?._count.questions} questions, ${created?.status}, free=${created?.isFree}.`);
}

main().finally(() => db.$disconnect());

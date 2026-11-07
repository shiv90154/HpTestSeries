// Copy one blog post from prisma/exam-pages into the database, overwriting the live copy. The seed only creates posts
// that are missing, so an exam date or admit card update made in the source file needs this to reach the site.
// Usage: npx tsx scripts/sync-post.ts <slug>
// The page cache refreshes within the hour; saving the post once in /admin/blog refreshes it at once.

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { NOTIFICATION_POSTS, PUNJAB_POSTS, RAJASTHAN_POSTS } from "../prisma/exam-pages";

const slug = process.argv[2];
const p = [...NOTIFICATION_POSTS, ...PUNJAB_POSTS, ...RAJASTHAN_POSTS].find((x) => x.slug === slug);
if (!p) {
  console.error(slug ? `No post with slug "${slug}" in prisma/exam-pages.` : "Usage: npx tsx scripts/sync-post.ts <slug>");
  process.exit(1);
}

const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

async function main() {
  const post = p!;
  const site = post.site ?? "hp";
  const existing = await db.post.findFirst({ where: { slug: post.slug, site }, select: { id: true } });
  if (!existing) throw new Error(`"${post.slug}" is not in the database yet; the seed creates it on the next deploy.`);
  const examIds = [];
  for (const key of post.exams) {
    const [bodySlug, examSlug] = key.split("/");
    const e = await db.exam.findFirst({ where: { slug: examSlug, body: { slug: bodySlug } }, select: { id: true } });
    if (e) examIds.push({ id: e.id });
  }
  await db.post.update({
    where: { id: existing.id },
    data: {
      title: post.title,
      titleHi: post.titleHi ?? null,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      faqs: post.faqs ?? [],
      seoTitle: post.seoTitle ?? null,
      seoDescription: post.seoDescription ?? null,
      exams: { set: examIds },
    },
  });
  console.log(`Updated "${post.slug}" (${site}).`);
}

main()
  .catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());

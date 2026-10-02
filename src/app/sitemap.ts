import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { LEGAL_LINKS } from "@/lib/business";
import { site } from "@/lib/site";
import { hasBodyPage } from "@/modules/catalog/body-info";
import { getAllPostSlugs, getCatalog, getExamSubPages, getExamsWithTests } from "@/modules/catalog/queries";
import { liveTestWhere } from "@/modules/catalog/visibility";
import { CATEGORY_META } from "@/modules/content/post-input";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [exams, withTests, catalog, tests, posts] = await Promise.all([
    getExamSubPages(),
    getExamsWithTests(),
    getCatalog(),
    db.test.findMany({ where: liveTestWhere(), select: { slug: true, updatedAt: true } }),
    getAllPostSlugs(),
  ]);
  const latestPost = posts.reduce<Date | undefined>((d, p) => (!d || p.updatedAt > d ? p.updatedAt : d), undefined);
  // Only categories that have posts — empty listing pages are thin content.
  const categories = [...new Set(posts.map((p) => p.category))];
  return [
    { url: site.url, changeFrequency: "daily", priority: 1 },
    { url: `${site.url}/exams`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/tests`, changeFrequency: "daily", priority: 0.9 },
    { url: `${site.url}/previous-year-papers`, changeFrequency: "weekly", priority: 0.8 },
    ...exams.map((e) => ({ url: `${site.url}/${e.body}/${e.exam}`, lastModified: e.updatedAt, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...catalog.filter(hasBodyPage).map((b) => ({ url: `${site.url}/${b.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
    // The SEO sub-pages exist only for exams that have the content: syllabus text, a known pattern, previous year papers.
    ...exams.flatMap((e) =>
      [
        e.syllabus && "syllabus",
        e.pattern && "exam-pattern",
        e.pyq && "previous-year-papers",
      ]
        .filter((page): page is string => !!page)
        .map((page) => ({ url: `${site.url}/${e.body}/${e.exam}/${page}`, lastModified: e.updatedAt, changeFrequency: "weekly" as const, priority: 0.7 })),
    ),
    ...withTests.map((e) => ({ url: `${site.url}/${e.body}/${e.exam}/tests`, lastModified: e.updatedAt, changeFrequency: "weekly" as const, priority: 0.8 })),
    { url: `${site.url}/himachal`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${site.url}/blog`, lastModified: latestPost, changeFrequency: "daily" as const, priority: 0.8 },
    ...categories.map((c) => ({ url: `${site.url}/blog/category/${CATEGORY_META[c].slug}`, changeFrequency: "weekly" as const, priority: 0.5 })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.updatedAt, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...LEGAL_LINKS.map((l) => ({ url: `${site.url}${l.href}`, changeFrequency: "yearly" as const, priority: 0.3 })),
    ...tests.map((t) => ({ url: `${site.url}/tests/${t.slug}`, lastModified: t.updatedAt, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}

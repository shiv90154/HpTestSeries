import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { LEGAL_LINKS } from "@/lib/business";
import { site } from "@/lib/site";
import { getAllExamParams } from "@/modules/catalog/queries";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [exams, tests] = await Promise.all([
    getAllExamParams(),
    db.test.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
  ]);
  return [
    { url: site.url, changeFrequency: "daily", priority: 1 },
    { url: `${site.url}/exams`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/tests`, changeFrequency: "daily", priority: 0.9 },
    ...exams.map((e) => ({ url: `${site.url}/${e.body}/${e.exam}`, lastModified: e.updatedAt, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...LEGAL_LINKS.map((l) => ({ url: `${site.url}${l.href}`, changeFrequency: "yearly" as const, priority: 0.3 })),
    ...tests.map((t) => ({ url: `${site.url}/tests/${t.slug}`, lastModified: t.updatedAt, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}

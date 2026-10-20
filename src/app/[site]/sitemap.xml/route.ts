import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { LEGAL_LINKS } from "@/lib/business";
import { metadataResponse } from "@/lib/metadata-route";
import { getSite, PRIMARY_SITE, type SiteConfig } from "@/sites";
import { hasBodyPage } from "@/modules/catalog/body-info";
import { getAllPostSlugs, getCatalog, getExamSubPages, getExamsWithTests } from "@/modules/catalog/queries";
import { canonicalSiteCode, liveTestWhere, testOnSite } from "@/modules/catalog/visibility";
import { CATEGORY_META } from "@/modules/content/post-input";
import { siteStaticParams } from "@/sites";

export const revalidate = 3600;

// Route handlers do not inherit the layout's site list, so each prerenders every site itself.
export const generateStaticParams = siteStaticParams;

async function sitemap(site: SiteConfig): Promise<MetadataRoute.Sitemap> {
  // A site in soft launch is noindex; listing its pages would only invite crawls.
  if (!site.launched) return [];
  const onSite = { AND: [liveTestWhere(), testOnSite(site.code)] };
  const [allExams, allWithTests, allCatalog, siteTests, posts, liveTests] = await Promise.all([
    getExamSubPages(site.code),
    getExamsWithTests(site.code),
    getCatalog(site.code),
    db.test.findMany({ where: onSite, select: { slug: true, updatedAt: true, site: true, exam: { select: { body: { select: { sites: true } } } } } }),
    getAllPostSlugs(site.code),
    db.test.count({ where: { ...onSite, liveStartsAt: { not: null } } }),
  ]);
  // Pages whose canonical copy is on another domain (national exams on a non-primary site) stay out of this sitemap.
  const owns = (sites: readonly string[]) => canonicalSiteCode(sites, PRIMARY_SITE.code) === site.code;
  const exams = allExams.filter((e) => owns(e.bodySites));
  const withTests = allWithTests.filter((e) => owns(e.bodySites));
  const catalog = allCatalog.filter((b) => owns(b.sites));
  const tests = siteTests.filter((t) => owns(t.exam ? t.exam.body.sites : [t.site]));
  const latest = (rows: { updatedAt: Date }[]) => rows.reduce<Date | undefined>((d, r) => (!d || r.updatedAt > d ? r.updatedAt : d), undefined);
  const latestPost = latest(posts);
  // The home page, /tests and /exams list tests, so they change whenever a live test is added or edited.
  const latestTest = latest(tests);
  // Only categories that have posts — empty listing pages are thin content.
  const categories = [...new Set(posts.map((p) => p.category))];
  return [
    { url: site.url, lastModified: latestTest, changeFrequency: "daily", priority: 1 },
    { url: `${site.url}/exams`, lastModified: latestTest, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/tests`, lastModified: latestTest, changeFrequency: "daily", priority: 0.9 },
    // /live lists scheduled live tests; with none it is an empty page, so it stays out until the first one.
    ...(liveTests > 0 ? [{ url: `${site.url}/live`, changeFrequency: "daily" as const, priority: 0.7 }] : []),
    { url: `${site.url}/pricing`, changeFrequency: "weekly", priority: 0.8 },
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
    { url: `${site.url}/${site.statePage.slug}`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${site.url}/blog`, lastModified: latestPost, changeFrequency: "daily" as const, priority: 0.8 },
    ...categories.map((c) => ({ url: `${site.url}/blog/category/${CATEGORY_META[c].slug}`, changeFrequency: "weekly" as const, priority: 0.5 })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.updatedAt, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...LEGAL_LINKS.map((l) => ({ url: `${site.url}${l.href}`, changeFrequency: "yearly" as const, priority: 0.3 })),
    ...tests.map((t) => ({ url: `${site.url}/tests/${t.slug}`, lastModified: t.updatedAt, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}

export async function GET(_req: Request, ctx: RouteContext<"/[site]/sitemap.xml">) {
  return metadataResponse("sitemap", await sitemap(getSite((await ctx.params).site)));
}

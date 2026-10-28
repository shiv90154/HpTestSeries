import "server-only";
import { cache } from "react";
import { db } from "@/lib/db";
import type { PostCategory } from "@/generated/prisma/enums";
import { planDemo } from "@/modules/assessment/demo";
import { getPackForExam, type PackOffer } from "@/modules/commerce/product-service";
import { parseFaqs, parsePattern, parseSeo } from "@/modules/content/exam-content";
import { getSite } from "@/sites";
import { examLabel } from "./labels";
import { bodyOnSite, examOnSite, liveTestWhere, testOnSite } from "./visibility";

export { bodyShortName, examLabel, examShortName } from "./labels";

export type CatalogExam = {
  slug: string;
  bodySlug: string;
  name: string;
  nameHi: string | null;
  description: string | null;
  href: string;
  /** live mock/subject tests; previous year papers are sold separately and are not counted here */
  testCount: number;
};

export type CatalogBody = {
  slug: string;
  name: string;
  nameHi: string | null;
  /** sites that show this body ("*" = all) */
  sites: string[];
  exams: CatalogExam[];
};

/** Bodies (with their active exams) shown on a site: its own and the national ones. */
export const getCatalog = cache(async (site: string): Promise<CatalogBody[]> => {
  const bodies = await db.examBody.findMany({
    where: bodyOnSite(site),
    orderBy: { order: "asc" },
    select: {
      slug: true,
      name: true,
      nameHi: true,
      sites: true,
      exams: {
        where: { isActive: true },
        orderBy: { order: "asc" },
        select: {
          slug: true,
          name: true,
          nameHi: true,
          description: true,
          _count: { select: { tests: { where: { ...liveTestWhere(), type: { not: "PYQ" } } } } },
        },
      },
    },
  });
  return bodies
    .filter((b) => b.exams.length > 0)
    .map((b) => ({
      slug: b.slug,
      name: b.name,
      nameHi: b.nameHi,
      sites: b.sites,
      exams: b.exams.map((e) => ({
        slug: e.slug,
        bodySlug: b.slug,
        name: e.name,
        nameHi: e.nameHi,
        description: e.description,
        href: `/${b.slug}/${e.slug}`,
        testCount: e._count.tests,
      })),
    }));
});

export type PublicTest = {
  slug: string;
  title: string;
  titleHi: string | null;
  type: string;
  isFree: boolean;
  durationMin: number;
  questionCount: number;
  totalMarks: number;
  examName: string | null;
  /** a paid test the admin has switched a free demo on for (and that has something left to lock) */
  hasDemo: boolean;
};

/** Live tests shown on a site; with examId, that exam's tests plus the site's exam-less tests (state GK). */
export async function getPublishedTests(site: string, filter: { examId?: string | null } = {}): Promise<PublicTest[]> {
  const tests = await db.test.findMany({
    where: {
      // With an exam: its tests plus the site's one free state GK mock, not every no-exam test (the GK mocks 2-5 live on
      // their own hub page and would otherwise crowd the top of every exam's free list).
      AND: [
        liveTestWhere(),
        testOnSite(site),
        ...(filter.examId !== undefined ? [{ OR: [{ examId: filter.examId }, { examId: null, slug: getSite(site).freeMockSlug }] }] : []),
      ],
    },
    orderBy: [{ isFree: "desc" }, { publishedAt: "desc" }],
    select: {
      slug: true,
      title: true,
      titleHi: true,
      type: true,
      isFree: true,
      demoPercent: true,
      durationSec: true,
      exam: { select: { name: true } },
      sections: { select: { marksCorrect: true, _count: { select: { questions: true } } } },
    },
  });
  return tests.map((t) => ({
    slug: t.slug,
    title: t.title,
    titleHi: t.titleHi,
    type: t.type,
    isFree: t.isFree,
    durationMin: Math.round(t.durationSec / 60),
    questionCount: t.sections.reduce((n, s) => n + s._count.questions, 0),
    totalMarks: t.sections.reduce((n, s) => n + s._count.questions * Number(s.marksCorrect), 0),
    examName: t.exam?.name ?? null,
    hasDemo: !t.isFree && planDemo(t.sections.map((s) => s._count.questions), t.demoPercent).available,
  }));
}

/** Cached per request so generateMetadata and the page itself share one set of queries. */
export const getExamPage = cache(async (site: string, bodySlug: string, examSlug: string) => {
  const exam = await db.exam.findFirst({
    where: { slug: examSlug, isActive: true, body: { slug: bodySlug, ...bodyOnSite(site) } },
    select: {
      id: true,
      slug: true,
      name: true,
      nameHi: true,
      description: true,
      syllabus: true,
      pattern: true,
      faqs: true,
      seo: true,
      updatedAt: true,
      body: { select: { slug: true, name: true, nameHi: true, sites: true } },
      stages: { orderBy: { order: "asc" }, select: { name: true, nameHi: true } },
    },
  });
  if (!exam) return null;
  const [tests, posts, offer] = await Promise.all([
    getPublishedTests(site, { examId: exam.id }),
    getPublishedPosts(site, { examId: exam.id, take: 6 }),
    getExamOffer(exam.id),
  ]);
  return {
    ...exam,
    pattern: parsePattern(exam.pattern),
    faqs: parseFaqs(exam.faqs),
    seo: parseSeo(exam.seo),
    tests,
    posts: posts.items,
    offer,
  };
});

export type ExamOffer = {
  slug: string;
  title: string;
  priceInPaise: number;
  validityDays: number | null;
  testCount: number;
  /** A cheaper-together pack that includes this exam's series, if one is on sale. */
  pack: PackOffer | null;
};

/** The cheapest series on sale for this exam, for the "buy" card on its page. Null while the exam has no paid series. */
export async function getExamOffer(examId: string): Promise<ExamOffer | null> {
  const p = await db.product.findFirst({
    where: { isActive: true, kind: "SERIES", items: { some: { series: { examId } } } },
    orderBy: { priceInPaise: "asc" },
    select: {
      slug: true,
      title: true,
      priceInPaise: true,
      validityDays: true,
      items: { select: { series: { select: { examId: true, _count: { select: { tests: { where: { test: liveTestWhere() } } } } } } } },
    },
  });
  if (!p) return null;
  const testCount = p.items.filter((i) => i.series.examId === examId).reduce((n, i) => n + i.series._count.tests, 0);
  const pack = await getPackForExam(examId);
  return { slug: p.slug, title: p.title, priceInPaise: p.priceInPaise, validityDays: p.validityDays, testCount, pack };
}

export type DirectoryExam = {
  href: string;
  bodySlug: string;
  slug: string;
  name: string;
  label: string;
  nameHi: string | null;
  /** live mocks and subject tests; previous year papers are counted apart */
  tests: number;
  papers: number;
  free: number;
  /** the free test the card's "Start free mock" button opens: a free mock if there is one */
  freeTestSlug: string | null;
  /** tests that went live in the last NEW_TEST_DAYS days */
  newTests: number;
  /** cheapest series on sale for this exam, and how many tests it unlocks */
  pricePaise: number | null;
  priceTests: number;
};

const NEW_TEST_DAYS = 14;

/** Every active exam with live tests, with what the /tests grid shows on its card. Unsorted. */
export async function getExamDirectory(site: string, now: Date = new Date()): Promise<DirectoryExam[]> {
  const live = liveTestWhere(now);
  const [exams, products] = await Promise.all([
    db.exam.findMany({
      where: { isActive: true, tests: { some: live }, ...examOnSite(site) },
      select: {
        id: true,
        slug: true,
        name: true,
        nameHi: true,
        body: { select: { slug: true } },
        tests: { where: live, orderBy: { createdAt: "asc" }, select: { slug: true, type: true, isFree: true, publishedAt: true, createdAt: true } },
      },
    }),
    db.product.findMany({
      where: { isActive: true, kind: "SERIES" },
      orderBy: { priceInPaise: "asc" },
      select: { priceInPaise: true, items: { select: { series: { select: { examId: true, _count: { select: { tests: { where: { test: live } } } } } } } } },
    }),
  ]);
  const newSince = now.getTime() - NEW_TEST_DAYS * 24 * 60 * 60 * 1000;
  return exams.map((e) => {
    const papers = e.tests.filter((t) => t.type === "PYQ").length;
    const free = e.tests.filter((t) => t.isFree);
    const freeTest = free.find((t) => t.type === "MOCK") ?? free.find((t) => t.type !== "PYQ") ?? free[0];
    // Products are cheapest first, so the first one that sells this exam's series is the price shown.
    const product = products.find((p) => p.items.some((i) => i.series.examId === e.id));
    return {
      href: `/${e.body.slug}/${e.slug}`,
      bodySlug: e.body.slug,
      slug: e.slug,
      name: e.name,
      label: examLabel(e.body.slug, e.name),
      nameHi: e.nameHi,
      tests: e.tests.length - papers,
      papers,
      free: free.length,
      freeTestSlug: freeTest?.slug ?? null,
      newTests: e.tests.filter((t) => (t.publishedAt ?? t.createdAt).getTime() >= newSince).length,
      pricePaise: product?.priceInPaise ?? null,
      priceTests: product ? product.items.filter((i) => i.series.examId === e.id).reduce((n, i) => n + i.series._count.tests, 0) : 0,
    };
  });
}

export async function getAllExamParams(site: string) {
  const exams = await db.exam.findMany({
    where: { isActive: true, ...examOnSite(site) },
    select: { slug: true, updatedAt: true, body: { select: { slug: true } } },
  });
  return exams.map((e) => ({ body: e.body.slug, exam: e.slug, updatedAt: e.updatedAt }));
}

/**
 * The extra SEO pages an exam can have, and which of them have real content: /syllabus needs a syllabus, /exam-pattern a
 * pattern and /previous-year-papers at least one live PYQ paper. A page without content is not generated or put in the sitemap.
 */
export async function getExamSubPages(site: string) {
  const exams = await db.exam.findMany({
    where: { isActive: true, ...examOnSite(site) },
    select: {
      slug: true,
      updatedAt: true,
      syllabus: true,
      pattern: true,
      body: { select: { slug: true, sites: true } },
      _count: { select: { tests: { where: { ...liveTestWhere(), type: "PYQ" } } } },
      tests: latestTestSelect(),
    },
  });
  return exams.map((e) => ({
    body: e.body.slug,
    bodySites: e.body.sites,
    exam: e.slug,
    updatedAt: lastChanged(e),
    syllabus: !!e.syllabus?.trim(),
    pattern: parsePattern(e.pattern) !== null,
    pyq: e._count.tests > 0,
  }));
}

/** Exams with at least one live test of their own: each gets a /tests page listing them. */
export async function getExamsWithTests(site: string) {
  const exams = await db.exam.findMany({
    where: { isActive: true, tests: { some: liveTestWhere() }, ...examOnSite(site) },
    select: { slug: true, updatedAt: true, body: { select: { slug: true, sites: true } }, tests: latestTestSelect() },
  });
  return exams.map((e) => ({ body: e.body.slug, bodySites: e.body.sites, exam: e.slug, updatedAt: lastChanged(e) }));
}

// Exam pages list the exam's tests, so for the sitemap they change whenever a live test is added or edited.
function latestTestSelect() {
  return { where: liveTestWhere(), orderBy: { updatedAt: "desc" as const }, take: 1, select: { updatedAt: true } };
}

function lastChanged(e: { updatedAt: Date; tests: { updatedAt: Date }[] }) {
  const t = e.tests[0]?.updatedAt;
  return t && t > e.updatedAt ? t : e.updatedAt;
}

/** The ### / ## headings of a markdown syllabus, for the "syllabus at a glance" list on the exam page. */
export function syllabusOutline(markdown: string | null): string[] {
  if (!markdown) return [];
  return [...markdown.matchAll(/^#{2,3}\s+(.+?)\s*$/gm)].map((m) => m[1].replace(/[*_`]/g, ""));
}

// ───────────────────────── Blog ─────────────────────────

export type PublicPostCard = {
  slug: string;
  title: string;
  titleHi: string | null;
  excerpt: string;
  category: PostCategory;
  coverImage: string | null;
  publishedAt: Date;
  updatedAt: Date;
};

const postCardSelect = {
  slug: true,
  title: true,
  titleHi: true,
  excerpt: true,
  category: true,
  coverImage: true,
  publishedAt: true,
  updatedAt: true,
} as const;

export const POSTS_PER_PAGE = 12;

/** A site's published posts; every post belongs to exactly one site. */
export async function getPublishedPosts(
  site: string,
  f: { category?: PostCategory; examId?: string; page?: number; take?: number; excludeSlug?: string } = {},
): Promise<{ items: PublicPostCard[]; total: number }> {
  const take = f.take ?? POSTS_PER_PAGE;
  const where = {
    status: "PUBLISHED" as const,
    site,
    ...(f.category && { category: f.category }),
    ...(f.examId && { exams: { some: { id: f.examId } } }),
    ...(f.excludeSlug && { slug: { not: f.excludeSlug } }),
  };
  const [items, total] = await Promise.all([
    db.post.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: ((f.page ?? 1) - 1) * take,
      take,
      select: postCardSelect,
    }),
    db.post.count({ where }),
  ]);
  return { items: items.map((p) => ({ ...p, publishedAt: p.publishedAt ?? p.updatedAt })), total };
}

export const getPost = cache(async (site: string, slug: string) => {
  const p = await db.post.findFirst({
    where: { slug, status: "PUBLISHED", site },
    select: {
      ...postCardSelect,
      id: true,
      content: true,
      seoTitle: true,
      seoDescription: true,
      faqs: true,
      author: { select: { name: true } },
      exams: {
        where: { isActive: true },
        select: { id: true, slug: true, name: true, syllabus: true, body: { select: { slug: true } } },
      },
    },
  });
  if (!p) return null;
  return {
    ...p,
    publishedAt: p.publishedAt ?? p.updatedAt,
    faqs: parseFaqs(p.faqs),
    exams: p.exams.map((e) => ({
      id: e.id,
      name: examLabel(e.body.slug, e.name),
      href: `/${e.body.slug}/${e.slug}`,
      syllabusHref: e.syllabus?.trim() ? `/${e.body.slug}/${e.slug}/syllabus` : null,
    })),
  };
});

/** Same-exam posts first, then same-category, for the "Related updates" block. */
export async function getRelatedPosts(site: string, post: { slug: string; category: PostCategory; exams: { id: string }[] }, take = 4) {
  const byExam = post.exams.length
    ? await db.post.findMany({
        where: { status: "PUBLISHED", site, slug: { not: post.slug }, exams: { some: { id: { in: post.exams.map((e) => e.id) } } } },
        orderBy: { publishedAt: "desc" },
        take,
        select: postCardSelect,
      })
    : [];
  const rest =
    byExam.length < take
      ? await db.post.findMany({
          where: { status: "PUBLISHED", site, category: post.category, slug: { notIn: [post.slug, ...byExam.map((p) => p.slug)] } },
          orderBy: { publishedAt: "desc" },
          take: take - byExam.length,
          select: postCardSelect,
        })
      : [];
  return [...byExam, ...rest].map((p) => ({ ...p, publishedAt: p.publishedAt ?? p.updatedAt }));
}

export async function getAllPostSlugs(site: string) {
  return db.post.findMany({ where: { status: "PUBLISHED", site }, select: { slug: true, updatedAt: true, category: true } });
}

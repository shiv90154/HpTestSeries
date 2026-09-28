import "server-only";
import { cache } from "react";
import { db } from "@/lib/db";
import type { PostCategory } from "@/generated/prisma/enums";
import { planDemo } from "@/modules/assessment/demo";
import { parseFaqs, parsePattern, parseSeo } from "@/modules/content/exam-content";
import { liveTestWhere } from "./visibility";

export type CatalogExam = {
  slug: string;
  bodySlug: string;
  name: string;
  nameHi: string | null;
  description: string | null;
  href: string;
  testCount: number;
};

export type CatalogBody = {
  slug: string;
  name: string;
  nameHi: string | null;
  exams: CatalogExam[];
};

export const getCatalog = cache(async (): Promise<CatalogBody[]> => {
  const bodies = await db.examBody.findMany({
    orderBy: { order: "asc" },
    select: {
      slug: true,
      name: true,
      nameHi: true,
      exams: {
        where: { isActive: true },
        orderBy: { order: "asc" },
        select: {
          slug: true,
          name: true,
          nameHi: true,
          description: true,
          _count: { select: { tests: { where: liveTestWhere() } } },
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

export async function getPublishedTests(filter: { examId?: string | null } = {}): Promise<PublicTest[]> {
  const tests = await db.test.findMany({
    where: {
      ...liveTestWhere(),
      ...(filter.examId !== undefined && { OR: [{ examId: filter.examId }, { examId: null }] }),
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

export async function getExamPage(bodySlug: string, examSlug: string) {
  const exam = await db.exam.findFirst({
    where: { slug: examSlug, isActive: true, body: { slug: bodySlug } },
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
      body: { select: { slug: true, name: true, nameHi: true } },
      stages: { orderBy: { order: "asc" }, select: { name: true, nameHi: true } },
    },
  });
  if (!exam) return null;
  const [tests, posts] = await Promise.all([getPublishedTests({ examId: exam.id }), getPublishedPosts({ examId: exam.id, take: 6 })]);
  return {
    ...exam,
    pattern: parsePattern(exam.pattern),
    faqs: parseFaqs(exam.faqs),
    seo: parseSeo(exam.seo),
    tests,
    posts: posts.items,
  };
}

export async function getAllExamParams() {
  const exams = await db.exam.findMany({
    where: { isActive: true },
    select: { slug: true, updatedAt: true, body: { select: { slug: true } } },
  });
  return exams.map((e) => ({ body: e.body.slug, exam: e.slug, updatedAt: e.updatedAt }));
}

/** SEO label: "HPRCA JOA IT", "HPPSC HPAS", "HP Police Constable", "HP TET", "HP Patwari". */
export function examLabel(bodySlug: string, name: string): string {
  if (bodySlug === "hprca" || bodySlug === "hppsc") return `${bodySlug.toUpperCase()} ${name}`;
  return name.startsWith("HP ") ? name : `HP ${name}`;
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

export async function getPublishedPosts(
  f: { category?: PostCategory; examId?: string; page?: number; take?: number; excludeSlug?: string } = {},
): Promise<{ items: PublicPostCard[]; total: number }> {
  const take = f.take ?? POSTS_PER_PAGE;
  const where = {
    status: "PUBLISHED" as const,
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

export const getPost = cache(async (slug: string) => {
  const p = await db.post.findFirst({
    where: { slug, status: "PUBLISHED" },
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
        select: { id: true, slug: true, name: true, body: { select: { slug: true } } },
      },
    },
  });
  if (!p) return null;
  return {
    ...p,
    publishedAt: p.publishedAt ?? p.updatedAt,
    faqs: parseFaqs(p.faqs),
    exams: p.exams.map((e) => ({ id: e.id, name: examLabel(e.body.slug, e.name), href: `/${e.body.slug}/${e.slug}` })),
  };
});

/** Same-exam posts first, then same-category, for the "Related updates" block. */
export async function getRelatedPosts(post: { slug: string; category: PostCategory; exams: { id: string }[] }, take = 4) {
  const byExam = post.exams.length
    ? await db.post.findMany({
        where: { status: "PUBLISHED", slug: { not: post.slug }, exams: { some: { id: { in: post.exams.map((e) => e.id) } } } },
        orderBy: { publishedAt: "desc" },
        take,
        select: postCardSelect,
      })
    : [];
  const rest =
    byExam.length < take
      ? await db.post.findMany({
          where: { status: "PUBLISHED", category: post.category, slug: { notIn: [post.slug, ...byExam.map((p) => p.slug)] } },
          orderBy: { publishedAt: "desc" },
          take: take - byExam.length,
          select: postCardSelect,
        })
      : [];
  return [...byExam, ...rest].map((p) => ({ ...p, publishedAt: p.publishedAt ?? p.updatedAt }));
}

export async function getAllPostSlugs() {
  return db.post.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true, category: true } });
}

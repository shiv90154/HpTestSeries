import "server-only";
import { cache } from "react";
import { db } from "@/lib/db";

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
          _count: { select: { tests: { where: { status: "PUBLISHED" } } } },
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
};

export async function getPublishedTests(filter: { examId?: string | null } = {}): Promise<PublicTest[]> {
  const tests = await db.test.findMany({
    where: {
      status: "PUBLISHED",
      ...(filter.examId !== undefined && { OR: [{ examId: filter.examId }, { examId: null }] }),
    },
    orderBy: [{ isFree: "desc" }, { publishedAt: "desc" }],
    select: {
      slug: true,
      title: true,
      titleHi: true,
      type: true,
      isFree: true,
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
      body: { select: { slug: true, name: true, nameHi: true } },
      stages: { orderBy: { order: "asc" }, select: { name: true, nameHi: true } },
    },
  });
  if (!exam) return null;
  const tests = await getPublishedTests({ examId: exam.id });
  return { ...exam, tests };
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

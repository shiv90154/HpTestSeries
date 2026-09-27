import "server-only";
import { db } from "@/lib/db";
import { emptyPattern, parseFaqs, parsePattern, parseSeo, validateExam, type ExamInput } from "./exam-content";

type Fail = { ok: false; errors: string[] };

export async function listExamsForAdmin() {
  const exams = await db.exam.findMany({
    orderBy: [{ body: { order: "asc" } }, { order: "asc" }],
    select: {
      id: true,
      slug: true,
      name: true,
      isActive: true,
      description: true,
      syllabus: true,
      faqs: true,
      updatedAt: true,
      body: { select: { slug: true, name: true } },
      _count: { select: { tests: { where: { status: "PUBLISHED" } }, posts: { where: { status: "PUBLISHED" } } } },
    },
  });
  return exams.map((e) => ({
    id: e.id,
    name: e.name,
    href: `/${e.body.slug}/${e.slug}`,
    bodyName: e.body.name,
    isActive: e.isActive,
    // Rough SEO health: Google wants unique, substantial copy on every hub page.
    words: countWords(`${e.description ?? ""} ${e.syllabus ?? ""}`),
    faqCount: parseFaqs(e.faqs).length,
    testCount: e._count.tests,
    postCount: e._count.posts,
    updatedAt: e.updatedAt,
  }));
}

export async function getExamForEdit(id: string): Promise<({ id: string; name: string; href: string } & ExamInput) | null> {
  const e = await db.exam.findUnique({ where: { id }, include: { body: { select: { slug: true } } } });
  if (!e) return null;
  return {
    id: e.id,
    name: e.name,
    href: `/${e.body.slug}/${e.slug}`,
    nameHi: e.nameHi ?? "",
    description: e.description ?? "",
    syllabus: e.syllabus ?? "",
    pattern: parsePattern(e.pattern) ?? emptyPattern,
    faqs: parseFaqs(e.faqs),
    seo: parseSeo(e.seo),
    isActive: e.isActive,
  };
}

export async function updateExam(id: string, raw: unknown, actorId: string): Promise<{ ok: true } | Fail> {
  const v = validateExam(raw);
  if (!v.ok) return v;
  const x = v.value;
  await db.exam.update({
    where: { id },
    data: {
      nameHi: x.nameHi || null,
      description: x.description || null,
      syllabus: x.syllabus || null,
      pattern: x.pattern,
      faqs: x.faqs,
      seo: x.seo,
      isActive: x.isActive,
    },
  });
  await db.auditLog.create({ data: { actorId, entity: "exam", entityId: id, action: "update" } });
  return { ok: true };
}

export async function listExamOptions(): Promise<{ id: string; label: string }[]> {
  const exams = await db.exam.findMany({
    orderBy: [{ body: { order: "asc" } }, { order: "asc" }],
    select: { id: true, name: true, body: { select: { slug: true } } },
  });
  return exams.map((e) => ({ id: e.id, label: `${e.body.slug.toUpperCase()} · ${e.name}` }));
}

export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

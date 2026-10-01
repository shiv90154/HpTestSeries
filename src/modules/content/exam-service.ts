import "server-only";
import { db } from "@/lib/db";
import { EXAM_TOMBSTONE_ENTITY, emptyPattern, parseFaqs, parsePattern, parseSeo, validateExam, validateNewExam, type ExamInput } from "./exam-content";

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

export async function getExamForEdit(id: string): Promise<({ id: string; href: string } & ExamInput) | null> {
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
      name: x.name,
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

/**
 * Deletes an exam that nothing hangs off. Tests, series, questions and posts keep a hard reference to their exam,
 * so those must be moved or deleted first (or the exam simply hidden). A marker is left so the seed does not recreate it.
 */
export async function deleteExam(id: string, actorId: string): Promise<{ ok: true } | Fail> {
  const e = await db.exam.findUnique({
    where: { id },
    select: { slug: true, name: true, body: { select: { slug: true } }, _count: { select: { tests: true, series: true, pyqQuestions: true, posts: true } } },
  });
  if (!e) return { ok: false, errors: ["Exam not found"] };
  const used = [
    [e._count.tests, "test"],
    [e._count.series, "test series"],
    [e._count.pyqQuestions, "question"],
    [e._count.posts, "blog post"],
  ] as const;
  const blockers = used.filter(([n]) => n > 0).map(([n, what]) => `${n} ${what}${n === 1 ? "" : "s"}`);
  if (blockers.length) {
    return { ok: false, errors: [`Cannot delete — still used by ${blockers.join(", ")}. Remove or move those first, or untick "Visible on the site" to hide the exam instead.`] };
  }
  await db.$transaction([
    db.exam.delete({ where: { id } }),
    db.auditLog.create({ data: { actorId, entity: EXAM_TOMBSTONE_ENTITY, entityId: `${e.body.slug}/${e.slug}`, action: "delete", diff: { name: e.name } } }),
  ]);
  return { ok: true };
}

export async function listExamBodies() {
  return db.examBody.findMany({ orderBy: { order: "asc" }, select: { id: true, name: true, slug: true } });
}

/** Creates a hidden exam with empty content; the admin fills it in on the edit page, then makes it visible. */
export async function createExam(raw: unknown, actorId: string): Promise<{ ok: true; id: string } | Fail> {
  const v = validateNewExam(raw);
  if (!v.ok) return v;
  const x = v.value;

  let bodyId = x.bodyId;
  if (bodyId) {
    if (!(await db.examBody.findUnique({ where: { id: bodyId }, select: { id: true } }))) {
      return { ok: false, errors: ["Conducting body not found"] };
    }
  } else {
    if (await db.examBody.findUnique({ where: { slug: x.newBody.slug }, select: { id: true } })) {
      return { ok: false, errors: [`A body with slug "${x.newBody.slug}" already exists — pick it from the list`] };
    }
    const last = await db.examBody.aggregate({ _max: { order: true } });
    const body = await db.examBody.create({ data: { name: x.newBody.name, slug: x.newBody.slug, order: (last._max.order ?? 0) + 1 } });
    bodyId = body.id;
  }

  if (await db.exam.findUnique({ where: { bodyId_slug: { bodyId, slug: x.slug } }, select: { id: true } })) {
    return { ok: false, errors: ["This body already has an exam with that slug"] };
  }
  const last = await db.exam.aggregate({ where: { bodyId }, _max: { order: true } });
  const exam = await db.exam.create({
    data: { bodyId, slug: x.slug, name: x.name, pattern: emptyPattern, faqs: [], seo: { title: "", description: "" }, isActive: false, order: (last._max.order ?? 0) + 1 },
  });
  await db.auditLog.create({ data: { actorId, entity: "exam", entityId: exam.id, action: "create" } });
  return { ok: true, id: exam.id };
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

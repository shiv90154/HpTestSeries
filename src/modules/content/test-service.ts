import "server-only";
import { db } from "@/lib/db";
import type { ContentStatus, Difficulty, Prisma, SourceType } from "@/generated/prisma/client";
import { liveWindowProblems, parseIstLocal, toIstLocal } from "@/modules/assessment/live";
import { publishProblems, validateTestMeta, validateTestStructure, type TestMetaInput } from "./test-input";

type Fail = { ok: false; errors: string[] };

// ─────────────── Question bank (picker) ───────────────

export type BankQuestion = {
  id: string;
  preview: string;
  langs: string;
  status: ContentStatus;
  difficulty: Difficulty;
  topic: string | null;
  pyq: string | null;
  usedIn: number;
};

const bankSelect = {
  id: true,
  status: true,
  difficulty: true,
  sourceYear: true,
  sourceExam: { select: { name: true } },
  contents: { select: { lang: true, stem: true } },
  topics: { take: 1, select: { topic: { select: { name: true, subject: { select: { name: true } } } } } },
  _count: { select: { testQuestions: true } },
} satisfies Prisma.QuestionSelect;

function toBank(q: Prisma.QuestionGetPayload<{ select: typeof bankSelect }>): BankQuestion {
  const en = q.contents.find((c) => c.lang === "en")?.stem;
  const hi = q.contents.find((c) => c.lang === "hi")?.stem;
  const topic = q.topics[0]?.topic;
  return {
    id: q.id,
    preview: (en ?? hi ?? "").slice(0, 180),
    langs: [en && "EN", hi && "HI"].filter(Boolean).join("+"),
    status: q.status,
    difficulty: q.difficulty,
    topic: topic ? `${topic.subject.name} › ${topic.name}` : null,
    pyq: q.sourceExam ? `${q.sourceExam.name} ${q.sourceYear ?? ""}`.trim() : null,
    usedIn: q._count.testQuestions,
  };
}

export type BankFilters = {
  q?: string;
  subjectId?: string;
  topicId?: string;
  difficulty?: Difficulty;
  status?: ContentStatus;
  source?: SourceType;
  sourceExamId?: string;
  unusedOnly?: boolean;
  excludeIds?: string[];
};

function bankWhere(f: BankFilters): Prisma.QuestionWhereInput {
  const q = f.q?.trim().slice(0, 200);
  return {
    status: f.status ?? { not: "ARCHIVED" },
    ...(f.difficulty && { difficulty: f.difficulty }),
    ...(f.source && { sourceType: f.source }),
    ...(f.sourceExamId && { sourceExamId: f.sourceExamId }),
    ...(f.topicId
      ? { topics: { some: { topicId: f.topicId } } }
      : f.subjectId && { topics: { some: { topic: { subjectId: f.subjectId } } } }),
    ...(q && { contents: { some: { stem: { contains: q, mode: "insensitive" } } } }),
    ...(f.unusedOnly && { testQuestions: { none: {} } }),
    ...(f.excludeIds?.length && { id: { notIn: f.excludeIds } }),
  };
}

export async function searchBank(f: BankFilters, take = 50): Promise<{ total: number; items: BankQuestion[] }> {
  const where = bankWhere(f);
  const [total, rows] = await Promise.all([
    db.question.count({ where }),
    db.question.findMany({ where, orderBy: { createdAt: "desc" }, take, select: bankSelect }),
  ]);
  return { total, items: rows.map(toBank) };
}

/** Random questions matching the filters (for "auto-pick N questions from a topic"). */
export async function randomPick(f: BankFilters, count: number): Promise<BankQuestion[]> {
  const ids = await db.question.findMany({ where: bankWhere(f), select: { id: true }, take: 5000 });
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  const picked = ids.slice(0, count).map((r) => r.id);
  const rows = await db.question.findMany({ where: { id: { in: picked } }, select: bankSelect });
  const byId = new Map(rows.map((r) => [r.id, toBank(r)]));
  return picked.map((id) => byId.get(id)!).filter(Boolean);
}

// ─────────────── Tests ───────────────

export async function listTests() {
  const tests = await db.test.findMany({
    orderBy: [{ status: "asc" }, { updatedAt: "desc" }],
    select: {
      id: true,
      slug: true,
      title: true,
      type: true,
      status: true,
      publishedAt: true,
      isFree: true,
      demoPercent: true,
      durationSec: true,
      updatedAt: true,
      exam: { select: { name: true } },
      _count: { select: { questions: true, attempts: true } },
    },
  });
  return tests;
}

export type BuilderSection = {
  name: string;
  nameHi: string;
  marksCorrect: number;
  marksWrong: number;
  questions: BankQuestion[];
};

export async function getTestForBuilder(id: string) {
  const t = await db.test.findUnique({
    where: { id },
    include: {
      sections: {
        orderBy: { order: "asc" },
        include: { questions: { orderBy: { order: "asc" }, include: { question: { select: bankSelect } } } },
      },
      prizes: { orderBy: { rank: "asc" } },
      _count: { select: { attempts: true } },
    },
  });
  if (!t) return null;
  const meta: TestMetaInput = {
    title: t.title,
    titleHi: t.titleHi ?? "",
    slug: t.slug,
    type: t.type,
    examId: t.examId,
    durationMin: Math.round(t.durationSec / 60),
    isFree: t.isFree,
    demoPercent: t.demoPercent,
    instructions: t.instructions ?? "",
    liveStartsAt: toIstLocal(t.liveStartsAt),
    liveEndsAt: toIstLocal(t.liveEndsAt),
    prizes: [1, 2, 3].map((rank) => {
      const p = t.prizes.find((x) => x.rank === rank);
      return { title: p?.title ?? "", productId: p?.productId ?? null };
    }),
  };
  const sections: BuilderSection[] = t.sections.map((s) => ({
    name: s.name,
    nameHi: s.nameHi ?? "",
    marksCorrect: Number(s.marksCorrect),
    marksWrong: Number(s.marksWrong),
    questions: s.questions.map((tq) => toBank(tq.question)),
  }));
  return { id: t.id, status: t.status, publishedAt: t.publishedAt, attempts: t._count.attempts, meta, sections };
}

function metaData(m: TestMetaInput) {
  return {
    title: m.title,
    titleHi: m.titleHi || null,
    slug: m.slug,
    type: m.type,
    examId: m.examId,
    durationSec: m.durationMin * 60,
    isFree: m.isFree,
    // A free test has nothing to sell, so a demo makes no sense for it.
    demoPercent: m.isFree ? 0 : m.demoPercent,
    instructions: m.instructions || null,
    liveStartsAt: parseIstLocal(m.liveStartsAt) ?? null,
    liveEndsAt: parseIstLocal(m.liveEndsAt) ?? null,
  };
}

/** Rank prizes follow the form: rows already awarded to a winner are never changed. */
async function savePrizes(testId: string, m: TestMetaInput) {
  const live = !!m.liveStartsAt && !!m.liveEndsAt;
  for (let rank = 1; rank <= 3; rank++) {
    const want = live ? m.prizes[rank - 1] : undefined;
    const existing = await db.livePrize.findUnique({ where: { testId_rank: { testId, rank } } });
    if (existing?.awardedAt) continue;
    if (!want?.title) {
      if (existing) await db.livePrize.delete({ where: { id: existing.id } });
    } else {
      await db.livePrize.upsert({
        where: { testId_rank: { testId, rank } },
        create: { testId, rank, title: want.title, productId: want.productId },
        update: { title: want.title, productId: want.productId },
      });
    }
  }
}

async function checkMetaRefs(m: TestMetaInput, selfId: string | null): Promise<string[]> {
  const [slugOwner, exam] = await Promise.all([
    db.test.findUnique({ where: { slug: m.slug }, select: { id: true } }),
    m.examId ? db.exam.findUnique({ where: { id: m.examId }, select: { id: true } }) : null,
  ]);
  const errors: string[] = [];
  if (slugOwner && slugOwner.id !== selfId) errors.push(`The URL "/tests/${m.slug}" is already used by another test`);
  if (m.examId && !exam) errors.push("Choose a valid exam");
  const starts = parseIstLocal(m.liveStartsAt);
  const ends = parseIstLocal(m.liveEndsAt);
  if (starts === null || ends === null) errors.push("Live window times are not valid");
  else errors.push(...liveWindowProblems(starts ?? null, ends ?? null, m.durationMin * 60));
  return errors;
}

export async function createTest(raw: unknown, actorId: string): Promise<{ ok: true; id: string } | Fail> {
  const v = validateTestMeta(raw);
  if (!v.ok) return v;
  const errors = await checkMetaRefs(v.value, null);
  if (errors.length) return { ok: false, errors };
  const t = await db.test.create({
    select: { id: true },
    data: {
      ...metaData(v.value),
      status: "DRAFT",
      sections: { create: [{ name: "General", order: 0, marksCorrect: 1, marksWrong: 0 }] },
    },
  });
  await savePrizes(t.id, v.value);
  await db.auditLog.create({ data: { actorId, entity: "test", entityId: t.id, action: "create" } });
  return { ok: true, id: t.id };
}

export async function updateTestMeta(id: string, raw: unknown, actorId: string): Promise<{ ok: true; slug: string } | Fail> {
  const v = validateTestMeta(raw);
  if (!v.ok) return v;
  const current = await db.test.findUnique({ where: { id }, select: { slug: true, status: true } });
  if (!current) return { ok: false, errors: ["This test no longer exists"] };
  // Students may have bookmarked or shared the link of a live test.
  if (current.status === "PUBLISHED" && v.value.slug !== current.slug) {
    return { ok: false, errors: ["The URL of a published test cannot be changed"] };
  }
  const errors = await checkMetaRefs(v.value, id);
  if (errors.length) return { ok: false, errors };
  await db.test.update({ where: { id }, data: metaData(v.value) });
  await savePrizes(id, v.value);
  await db.auditLog.create({ data: { actorId, entity: "test", entityId: id, action: "update-meta" } });
  return { ok: true, slug: v.value.slug };
}

/**
 * Replaces all sections and questions of a draft test. Only drafts are editable: published tests have
 * attempts whose section stats and answers point at the current structure.
 */
export async function saveTestStructure(id: string, raw: unknown, actorId: string): Promise<{ ok: true } | Fail> {
  const v = validateTestStructure(raw);
  if (!v.ok) return v;
  const test = await db.test.findUnique({ where: { id }, select: { status: true, _count: { select: { attempts: true } } } });
  if (!test) return { ok: false, errors: ["This test no longer exists"] };
  if (test.status !== "DRAFT" || test._count.attempts > 0) {
    return { ok: false, errors: ["Only draft tests can be changed. Unpublish it first, or duplicate it."] };
  }

  const ids = v.value.sections.flatMap((s) => s.questionIds);
  const found = await db.question.findMany({ where: { id: { in: ids } }, select: { id: true, status: true } });
  if (found.length !== ids.length) return { ok: false, errors: ["Some questions no longer exist. Reload the page."] };
  if (found.some((q) => q.status === "ARCHIVED")) return { ok: false, errors: ["Archived questions cannot be added to a test"] };

  await db.$transaction(
    async (tx) => {
      await tx.testQuestion.deleteMany({ where: { testId: id } });
      await tx.testSection.deleteMany({ where: { testId: id } });
      for (const [order, s] of v.value.sections.entries()) {
        const section = await tx.testSection.create({
          select: { id: true },
          data: { testId: id, order, name: s.name, nameHi: s.nameHi || null, marksCorrect: s.marksCorrect, marksWrong: s.marksWrong },
        });
        if (s.questionIds.length) {
          await tx.testQuestion.createMany({
            data: s.questionIds.map((questionId, qOrder) => ({ testId: id, sectionId: section.id, questionId, order: qOrder })),
          });
        }
      }
      await tx.test.update({ where: { id }, data: { updatedAt: new Date() } });
      await tx.auditLog.create({
        data: { actorId, entity: "test", entityId: id, action: "update-structure", diff: { sections: v.value.sections.length, questions: ids.length } },
      });
    },
    { timeout: 30_000, maxWait: 10_000 },
  );
  return { ok: true };
}

/** Latest a release can be scheduled ahead. */
const MAX_SCHEDULE_DAYS = 365;

/**
 * Publishes a draft now, or at `at` (a scheduled release: status PUBLISHED with a future publishedAt, which
 * the public queries treat as not live yet — see modules/catalog/visibility.ts).
 */
export async function publishTest(id: string, actorId: string, at?: Date): Promise<{ ok: true; slug: string } | Fail> {
  const now = new Date();
  if (at && (Number.isNaN(at.getTime()) || at <= now)) return { ok: false, errors: ["Pick a release time in the future"] };
  if (at && at.getTime() - now.getTime() > MAX_SCHEDULE_DAYS * 86_400_000) return { ok: false, errors: ["Releases can be scheduled up to a year ahead"] };
  const t = await db.test.findUnique({
    where: { id },
    select: {
      slug: true,
      status: true,
      publishedAt: true,
      sections: {
        orderBy: { order: "asc" },
        select: {
          name: true,
          questions: {
            orderBy: { order: "asc" },
            select: {
              question: {
                select: {
                  id: true,
                  status: true,
                  contents: { select: { lang: true, stem: true } },
                  _count: { select: { options: { where: { isCorrect: true } } } },
                },
              },
            },
          },
        },
      },
    },
  });
  if (!t) return { ok: false, errors: ["This test no longer exists"] };
  const problems = publishProblems(
    t.sections.map((s) => ({
      name: s.name,
      questions: s.questions.map(({ question: q }) => ({
        id: q.id,
        status: q.status,
        correctOptions: q._count.options,
        preview: (q.contents.find((c) => c.lang === "en") ?? q.contents[0])?.stem.slice(0, 70) ?? q.id,
      })),
    })),
  );
  if (problems.length) return { ok: false, errors: problems };
  // A draft can be published or scheduled; a scheduled test can be released early ("publish now").
  const scheduled = t.status === "PUBLISHED" && !!t.publishedAt && t.publishedAt > now;
  if (t.status !== "DRAFT" && !(scheduled && !at)) return { ok: false, errors: ["This test is already live"] };
  // Re-publishing keeps the original date (it orders "latest tests"), unless that date is a cancelled schedule.
  const publishedAt = at ?? (t.publishedAt && t.publishedAt <= now ? t.publishedAt : now);
  await db.test.update({ where: { id }, data: { status: "PUBLISHED", publishedAt } });
  await db.auditLog.create({
    data: { actorId, entity: "test", entityId: id, action: at ? "schedule" : "publish", ...(at && { diff: { at: at.toISOString() } }) },
  });
  return { ok: true, slug: t.slug };
}

/**
 * Hides a live test that students have already taken (it can't go back to draft: their results need it).
 * Retired tests leave every list and can't be started; past results still open.
 */
export async function retireTest(id: string, actorId: string): Promise<{ ok: true } | Fail> {
  const res = await db.test.updateMany({ where: { id, status: "PUBLISHED" }, data: { status: "ARCHIVED" } });
  if (res.count === 0) return { ok: false, errors: ["Only a published test can be retired"] };
  await db.auditLog.create({ data: { actorId, entity: "test", entityId: id, action: "retire" } });
  return { ok: true };
}

/** Puts a retired test back live. */
export async function restoreTest(id: string, actorId: string): Promise<{ ok: true } | Fail> {
  const res = await db.test.updateMany({ where: { id, status: "ARCHIVED" }, data: { status: "PUBLISHED" } });
  if (res.count === 0) return { ok: false, errors: ["Only a retired test can be restored"] };
  await db.auditLog.create({ data: { actorId, entity: "test", entityId: id, action: "restore" } });
  return { ok: true };
}

export async function unpublishTest(id: string, actorId: string): Promise<{ ok: true } | Fail> {
  const t = await db.test.findUnique({ where: { id }, select: { _count: { select: { attempts: true } } } });
  if (!t) return { ok: false, errors: ["This test no longer exists"] };
  if (t._count.attempts > 0) {
    return {
      ok: false,
      errors: [`${t._count.attempts} attempt(s) exist, so it can't go back to draft. Retire it to hide it from students (their results stay), or duplicate it to make a new version.`],
    };
  }
  await db.test.update({ where: { id }, data: { status: "DRAFT" } });
  await db.auditLog.create({ data: { actorId, entity: "test", entityId: id, action: "unpublish" } });
  return { ok: true };
}

export async function duplicateTest(id: string, actorId: string): Promise<{ ok: true; id: string } | Fail> {
  const t = await db.test.findUnique({
    where: { id },
    include: { sections: { orderBy: { order: "asc" }, include: { questions: { orderBy: { order: "asc" } } } } },
  });
  if (!t) return { ok: false, errors: ["This test no longer exists"] };

  const base = `${t.slug.replace(/-copy(-\d+)?$/, "")}-copy`.slice(0, 74);
  const taken = new Set((await db.test.findMany({ where: { slug: { startsWith: base } }, select: { slug: true } })).map((x) => x.slug));
  let slug = base;
  for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`;

  const copy = await db.$transaction(async (tx) => {
    const created = await tx.test.create({
      select: { id: true },
      data: {
        slug,
        title: `${t.title} (copy)`,
        titleHi: t.titleHi,
        type: t.type,
        examId: t.examId,
        stageId: t.stageId,
        durationSec: t.durationSec,
        instructions: t.instructions,
        isFree: t.isFree,
        demoPercent: t.demoPercent,
        status: "DRAFT",
      },
    });
    for (const s of t.sections) {
      const section = await tx.testSection.create({
        select: { id: true },
        data: { testId: created.id, order: s.order, name: s.name, nameHi: s.nameHi, marksCorrect: s.marksCorrect, marksWrong: s.marksWrong, durationSec: s.durationSec },
      });
      if (s.questions.length) {
        await tx.testQuestion.createMany({
          data: s.questions.map((q) => ({ testId: created.id, sectionId: section.id, questionId: q.questionId, order: q.order })),
        });
      }
    }
    await tx.auditLog.create({ data: { actorId, entity: "test", entityId: created.id, action: "duplicate", diff: { from: id } } });
    return created;
  });
  return { ok: true, id: copy.id };
}

export async function deleteTest(id: string, actorId: string): Promise<{ ok: true } | Fail> {
  const t = await db.test.findUnique({ where: { id }, select: { status: true, _count: { select: { attempts: true } } } });
  if (!t) return { ok: true };
  if (t.status === "PUBLISHED" || t._count.attempts > 0) return { ok: false, errors: ["Only unpublished tests without attempts can be deleted"] };
  await db.$transaction([
    db.test.delete({ where: { id } }),
    db.auditLog.create({ data: { actorId, entity: "test", entityId: id, action: "delete" } }),
  ]);
  return { ok: true };
}

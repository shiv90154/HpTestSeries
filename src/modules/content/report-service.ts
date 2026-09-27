import "server-only";
import { db } from "@/lib/db";
import { MAX_REPORTS_PER_DAY, validateReport, type ReportError } from "./report";

/** Files (or updates) a student's report. One open report per student per question. */
export async function submitQuestionReport(userId: string, raw: unknown): Promise<{ ok: true } | { ok: false; error: ReportError }> {
  const v = validateReport(raw);
  if (!v.ok) return v;
  const { questionId, reason, note } = v.value;

  // Only questions students can actually see (in a live test) can be reported.
  const [question, recent, existing] = await Promise.all([
    db.question.findFirst({ where: { id: questionId, testQuestions: { some: { test: { status: "PUBLISHED" } } } }, select: { id: true } }),
    db.questionReport.count({ where: { userId, createdAt: { gt: new Date(Date.now() - 24 * 3600 * 1000) } } }),
    db.questionReport.findFirst({ where: { userId, questionId, status: "OPEN" }, select: { id: true } }),
  ]);
  if (!question) return { ok: false, error: "not-found" };

  if (existing) {
    await db.questionReport.update({ where: { id: existing.id }, data: { reason, note: note || null } });
    return { ok: true };
  }
  if (recent >= MAX_REPORTS_PER_DAY) return { ok: false, error: "rate-limited" };
  await db.questionReport.create({ data: { userId, questionId, reason, note: note || null } });
  return { ok: true };
}

export type ReportQueueItem = {
  questionId: string;
  preview: string;
  questionStatus: string;
  reports: { id: string; reason: string; note: string | null; user: string; createdAt: Date }[];
};

/** Open reports grouped by question, most-reported first. */
export async function getReportQueue(): Promise<ReportQueueItem[]> {
  const rows = await db.questionReport.findMany({
    where: { status: "OPEN" },
    orderBy: { createdAt: "desc" },
    take: 1000,
    select: {
      id: true,
      reason: true,
      note: true,
      createdAt: true,
      user: { select: { name: true, phoneNumber: true } },
      question: { select: { id: true, status: true, contents: { select: { lang: true, stem: true } } } },
    },
  });
  const byQuestion = new Map<string, ReportQueueItem>();
  for (const r of rows) {
    let item = byQuestion.get(r.question.id);
    if (!item) {
      const c = r.question.contents.find((x) => x.lang === "en") ?? r.question.contents[0];
      item = { questionId: r.question.id, preview: c?.stem.slice(0, 200) ?? "", questionStatus: r.question.status, reports: [] };
      byQuestion.set(r.question.id, item);
    }
    item.reports.push({ id: r.id, reason: r.reason, note: r.note, user: r.user.name || r.user.phoneNumber || "Student", createdAt: r.createdAt });
  }
  return [...byQuestion.values()].sort((a, b) => b.reports.length - a.reports.length);
}

export async function countOpenReports(): Promise<number> {
  return db.questionReport.count({ where: { status: "OPEN" } });
}

/** Closes every open report on a question once the content team has acted on it. */
export async function resolveQuestionReports(questionId: string, status: "FIXED" | "REJECTED", actorId: string): Promise<number> {
  const res = await db.questionReport.updateMany({ where: { questionId, status: "OPEN" }, data: { status } });
  if (res.count > 0) {
    await db.auditLog.create({ data: { actorId, entity: "question", entityId: questionId, action: `reports-${status.toLowerCase()}`, diff: { count: res.count } } });
  }
  return res.count;
}

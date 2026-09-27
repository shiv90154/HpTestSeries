import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { db } from "@/lib/db";
import { ContentStatus } from "@/generated/prisma/enums";
import { can } from "@/modules/identity/permissions";
import { requirePermission } from "@/modules/identity/session";
import { StatusBadge } from "../ui";
import { bulkStatusAction } from "./actions";
import { BulkBar } from "./bulk-bar";
import { filterParams, parseQuestionFilters, questionListWhere } from "./filters";

export const metadata: Metadata = { title: "Questions" };

const PAGE_SIZE = 50;

export default async function QuestionsPage({ searchParams }: PageProps<"/admin/questions">) {
  const user = await requirePermission("content:edit");
  await connection();

  const sp = await searchParams;
  const filters = parseQuestionFilters(sp);
  const { status, subject, q } = filters;
  const page = Math.max(1, Number(sp.page) || 1);
  const msg = typeof sp.msg === "string" ? sp.msg.slice(0, 200) : null;
  const where = questionListWhere(filters);

  const [total, questions, subjects] = await Promise.all([
    db.question.count({ where }),
    db.question.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        status: true,
        difficulty: true,
        sourceType: true,
        sourceYear: true,
        contents: { select: { lang: true, stem: true } },
        topics: { select: { topic: { select: { name: true, subject: { select: { name: true } } } } } },
        _count: { select: { reports: { where: { status: "OPEN" } }, testQuestions: true } },
      },
    }),
    db.subject.findMany({ orderBy: { order: "asc" }, select: { slug: true, name: true } }),
  ]);

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageHref = (p: number) => {
    const params = filterParams(filters);
    params.set("page", String(p));
    return `/admin/questions?${params}`;
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">
          Questions <span className="text-base font-normal text-muted">({total.toLocaleString("en-IN")})</span>
        </h1>
        <div className="flex gap-2">
          <Link href="/admin/questions/import" className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium">
            Import CSV
          </Link>
          <Link href="/admin/questions/new" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            New question
          </Link>
        </div>
      </div>

      <form className="flex flex-wrap gap-2 text-sm" action="/admin/questions">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search question text (English or Hindi)"
          className="min-w-56 flex-1 rounded-lg border border-border bg-surface px-3 py-2"
        />
        <select name="subject" defaultValue={subject ?? ""} className="rounded-lg border border-border bg-surface px-3 py-2">
          <option value="">All subjects</option>
          {subjects.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
        <select name="status" defaultValue={status ?? ""} className="rounded-lg border border-border bg-surface px-3 py-2">
          <option value="">All statuses</option>
          {Object.values(ContentStatus).map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ").toLowerCase()}
            </option>
          ))}
        </select>
        <button className="rounded-lg border border-border bg-surface px-4 py-2 font-medium">Filter</button>
      </form>

      {msg && (
        <p role="status" className="rounded-xl border border-primary bg-primary-soft p-3 text-sm">
          {msg}
        </p>
      )}

      {questions.length === 0 ? (
        <p className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
          No questions match. <Link href="/admin/questions/new" className="text-primary underline">Write one</Link> or{" "}
          <Link href="/admin/questions/import" className="text-primary underline">import a CSV</Link>.
        </p>
      ) : (
        <form action={bulkStatusAction} className="space-y-3">
          {status && <input type="hidden" name="status" value={status} />}
          {subject && <input type="hidden" name="subject" value={subject} />}
          {q && <input type="hidden" name="q" value={q} />}
          <BulkBar canPublish={can(user.role, "content:publish")} total={total} filtered={!!(status || subject || q)} />
          <ul className="divide-y divide-border rounded-xl border border-border bg-surface">
            {questions.map((qn) => {
              const en = qn.contents.find((c) => c.lang === "en")?.stem;
              const hi = qn.contents.find((c) => c.lang === "hi")?.stem;
              const topic = qn.topics[0]?.topic;
              return (
                <li key={qn.id} className="flex gap-3 p-4 text-sm">
                  <input type="checkbox" name="ids" value={qn.id} aria-label="Select question" className="mt-1 shrink-0" />
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <Link href={`/admin/questions/${qn.id}`} className="line-clamp-2 hover:text-primary">
                      {en ?? hi}
                    </Link>
                    {en && hi && <p className="line-clamp-1 text-muted">{hi}</p>}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                      <StatusBadge status={qn.status} />
                      {topic && (
                        <span>
                          {topic.subject.name} › {topic.name}
                        </span>
                      )}
                      <span>{qn.difficulty.toLowerCase()}</span>
                      {qn.sourceType === "PYQ" && <span>PYQ {qn.sourceYear}</span>}
                      <span>{[en && "EN", hi && "HI"].filter(Boolean).join(" + ")}</span>
                      {qn._count.testQuestions > 0 && <span>in {qn._count.testQuestions} test(s)</span>}
                      {qn._count.reports > 0 && <span className="text-danger">{qn._count.reports} open report(s)</span>}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </form>
      )}

      {pages > 1 && (
        <nav className="flex items-center justify-between text-sm">
          {page > 1 ? <Link href={pageHref(page - 1)} className="text-primary">← Previous</Link> : <span />}
          <span className="text-muted">
            Page {page} of {pages}
          </span>
          {page < pages ? <Link href={pageHref(page + 1)} className="text-primary">Next →</Link> : <span />}
        </nav>
      )}
    </div>
  );
}

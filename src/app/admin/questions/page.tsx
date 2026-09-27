import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { db } from "@/lib/db";
import type { Prisma } from "@/generated/prisma/client";
import { ContentStatus } from "@/generated/prisma/enums";
import { requirePermission } from "@/modules/identity/session";

export const metadata: Metadata = { title: "Questions" };

const PAGE_SIZE = 50;

function one(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v || undefined;
}

export default async function QuestionsPage({ searchParams }: PageProps<"/admin/questions">) {
  await requirePermission("content:edit");
  await connection();

  const sp = await searchParams;
  const status = Object.values(ContentStatus).find((s) => s === one(sp.status));
  const subject = one(sp.subject);
  const q = one(sp.q)?.trim().slice(0, 200);
  const page = Math.max(1, Number(one(sp.page)) || 1);

  const where: Prisma.QuestionWhereInput = {
    ...(status && { status }),
    ...(subject && { topics: { some: { topic: { subject: { slug: subject } } } } }),
    ...(q && { contents: { some: { stem: { contains: q, mode: "insensitive" } } } }),
  };

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
        _count: { select: { reports: { where: { status: "OPEN" } } } },
      },
    }),
    db.subject.findMany({ orderBy: { order: "asc" }, select: { slug: true, name: true } }),
  ]);

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageHref = (p: number) => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (subject) params.set("subject", subject);
    if (q) params.set("q", q);
    params.set("page", String(p));
    return `/admin/questions?${params}`;
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">
          Questions <span className="text-base font-normal text-muted">({total.toLocaleString("en-IN")})</span>
        </h1>
        <Link href="/admin/questions/import" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Import CSV
        </Link>
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

      {questions.length === 0 ? (
        <p className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
          No questions match. <Link href="/admin/questions/import" className="text-primary underline">Import a CSV</Link> to get started.
        </p>
      ) : (
        <ul className="divide-y divide-border rounded-xl border border-border bg-surface">
          {questions.map((qn) => {
            const en = qn.contents.find((c) => c.lang === "en")?.stem;
            const hi = qn.contents.find((c) => c.lang === "hi")?.stem;
            const topic = qn.topics[0]?.topic;
            return (
              <li key={qn.id} className="space-y-1.5 p-4 text-sm">
                <p className="line-clamp-2">{en ?? hi}</p>
                {en && hi && <p className="line-clamp-1 text-muted">{hi}</p>}
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
                  <span className="font-medium text-foreground">{qn.status.replace("_", " ")}</span>
                  {topic && (
                    <span>
                      {topic.subject.name} › {topic.name}
                    </span>
                  )}
                  <span>{qn.difficulty.toLowerCase()}</span>
                  {qn.sourceType === "PYQ" && <span>PYQ {qn.sourceYear}</span>}
                  <span>{[en && "EN", hi && "HI"].filter(Boolean).join(" + ")}</span>
                  {qn._count.reports > 0 && <span className="text-danger">{qn._count.reports} open report(s)</span>}
                </div>
              </li>
            );
          })}
        </ul>
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

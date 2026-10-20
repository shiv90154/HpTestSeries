import Link from "next/link";
import { connection } from "next/server";
import { db } from "@/lib/db";
import { can } from "@/modules/identity/permissions";
import { requirePermission } from "@/modules/identity/session";
import { StatusBadge } from "../ui";
import { ListPanel } from "../table";
import { bulkStatusAction } from "./actions";
import { BulkBar } from "./bulk-bar";
import { filterParams, parseQuestionFilters, questionListWhere } from "./filters";

const PAGE_SIZE = 50;

export async function QuestionsListData({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const user = await requirePermission("content:edit");
  await connection();

  const filters = parseQuestionFilters(searchParams);
  const { status, subject, q } = filters;
  const page = Math.max(1, Number(searchParams.page) || 1);
  const where = questionListWhere(filters);

  const [total, questions] = await Promise.all([
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
  ]);

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageHref = (p: number) => {
    const params = filterParams(filters);
    params.set("page", String(p));
    return `/admin/questions?${params}`;
  };

  return (
    <>
      <p className="text-sm text-muted">{total.toLocaleString("en-IN")} question(s)</p>

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
          <ListPanel isEmpty={false} emptyMessage="">
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
          </ListPanel>
        </form>
      )}

      {pages > 1 && (
        <nav aria-label="Pagination" className="flex items-center justify-between text-sm">
          {page > 1 ? (
            <Link href={pageHref(page - 1)} className="text-primary">← Previous</Link>
          ) : (
            <span aria-hidden="true" />
          )}
          <span className="text-muted">
            Page {page} of {pages}
          </span>
          {page < pages ? (
            <Link href={pageHref(page + 1)} className="text-primary">Next →</Link>
          ) : (
            <span aria-hidden="true" />
          )}
        </nav>
      )}
    </>
  );
}

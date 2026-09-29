import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { ContentStatus } from "@/generated/prisma/enums";
import { requirePermission } from "@/modules/identity/session";
import { SkeletonListRow } from "@/components/skeleton";
import { parseQuestionFilters } from "./filters";
import { QuestionsListData } from "./questions-list-data";

export const metadata: Metadata = { title: "Questions" };

function QuestionsListSkeleton() {
  return (
    <ul className="divide-y divide-border rounded-xl border border-border bg-surface">
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonListRow key={i} />
      ))}
    </ul>
  );
}

export default async function QuestionsPage({ searchParams }: PageProps<"/admin/questions">) {
  await requirePermission("content:edit");

  const sp = await searchParams;
  const filters = parseQuestionFilters(sp);
  const { status, subject, q } = filters;
  const msg = typeof sp.msg === "string" ? sp.msg.slice(0, 200) : null;

  const subjects = await db.subject.findMany({ orderBy: { order: "asc" }, select: { slug: true, name: true } });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Questions</h1>
        <div className="flex gap-2">
          <Link href="/admin/questions/import" className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium">
            Import CSV
          </Link>
          <Link href="/admin/questions/new" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            New question
          </Link>
        </div>
      </div>

      <form className="flex flex-wrap gap-2 text-sm" action="/admin/questions" aria-label="Filter questions">
        <input
          name="q"
          aria-label="Search question text"
          defaultValue={q}
          placeholder="Search question text (English or Hindi)"
          className="min-w-56 flex-1 rounded-lg border border-border bg-surface px-3 py-2"
        />
        <select name="subject" aria-label="Subject" defaultValue={subject ?? ""} className="rounded-lg border border-border bg-surface px-3 py-2">
          <option value="">All subjects</option>
          {subjects.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
        <select name="status" aria-label="Status" defaultValue={status ?? ""} className="rounded-lg border border-border bg-surface px-3 py-2">
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

      <Suspense fallback={<QuestionsListSkeleton />}>
        <QuestionsListData searchParams={sp} />
      </Suspense>
    </div>
  );
}

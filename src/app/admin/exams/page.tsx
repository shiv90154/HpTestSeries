import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { listExamsForAdmin } from "@/modules/content/exam-service";
import { requirePermission } from "@/modules/identity/session";

export const metadata: Metadata = { title: "Exams" };

/** Google wants substantial, unique copy on each hub page; below this we flag it. */
const MIN_WORDS = 300;

export default async function ExamsAdminPage() {
  await requirePermission("content:edit");
  await connection();
  const exams = await listExamsForAdmin();

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">
          Exams <span className="text-base font-normal text-muted">({exams.length})</span>
        </h1>
        <p className="text-sm text-muted">
          Exam hub page content — description, pattern, syllabus, FAQs and SEO. Aim for {MIN_WORDS}+ unique words and 4+ FAQs per exam.
        </p>
      </div>

      <ul className="divide-y divide-border rounded-xl border border-border bg-surface">
        {exams.map((e) => (
          <li key={e.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 p-4 text-sm">
            <div className="min-w-0 flex-1">
              <Link href={`/admin/exams/${e.id}`} className="font-medium hover:text-primary">
                {e.name}
              </Link>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                <span>{e.bodyName}</span>
                {!e.isActive && <span className="rounded-md bg-surface-muted px-2 py-0.5 font-semibold">hidden</span>}
                <a href={e.href} target="_blank" rel="noreferrer" className="text-primary underline">
                  {e.href}
                </a>
              </div>
            </div>
            <span className="flex flex-wrap gap-2 text-xs">
              <Badge ok={e.words >= MIN_WORDS}>{e.words} words</Badge>
              <Badge ok={e.faqCount >= 4}>{e.faqCount} FAQs</Badge>
              <Badge ok={e.testCount > 0}>{e.testCount} tests</Badge>
              <Badge ok={e.postCount > 0}>{e.postCount} posts</Badge>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Badge({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return <span className={`rounded-md px-2 py-0.5 font-semibold ${ok ? "bg-success-soft text-success" : "bg-accent-soft text-accent-strong"}`}>{children}</span>;
}

import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { REPORT_REASON_LABEL, type ReportReason } from "@/modules/content/report";
import { getReportQueue } from "@/modules/content/report-service";
import { requirePermission } from "@/modules/identity/session";
import { StatusBadge } from "../ui";
import { resolveReportsAction } from "./actions";

export const metadata: Metadata = { title: "Reports" };

const reasonLabel = (r: string) => REPORT_REASON_LABEL[r as ReportReason]?.en ?? r;

export default async function ReportsPage() {
  await requirePermission("content:edit");
  await connection();
  const queue = await getReportQueue();

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">
          Question reports <span className="text-base font-normal text-muted">({queue.length} question{queue.length === 1 ? "" : "s"})</span>
        </h1>
        <p className="text-sm text-muted">
          Errors students found in solutions. Open the question, fix it, then mark the reports <b>Fixed</b> — or <b>Reject</b> them if
          the question was already right. Students’ result pages show the corrected question and score.
        </p>
      </div>

      {queue.length === 0 ? (
        <p className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">No open reports. 🎉</p>
      ) : (
        <ul className="space-y-3">
          {queue.map((item) => {
            const counts = new Map<string, number>();
            item.reports.forEach((r) => counts.set(r.reason, (counts.get(r.reason) ?? 0) + 1));
            return (
              <li key={item.questionId} className="space-y-3 rounded-xl border border-border bg-surface p-4 text-sm">
                <div className="flex flex-wrap items-start gap-3">
                  <span className="rounded-md bg-danger-soft px-2 py-0.5 text-xs font-semibold text-danger">
                    {item.reports.length} report{item.reports.length === 1 ? "" : "s"}
                  </span>
                  <Link href={`/admin/questions/${item.questionId}`} className="min-w-0 flex-1 font-medium hover:text-primary">
                    {item.preview}
                  </Link>
                  <StatusBadge status={item.questionStatus} />
                </div>
                <p className="text-xs text-muted">{[...counts].map(([r, n]) => `${reasonLabel(r)} × ${n}`).join(" · ")}</p>
                <ul className="space-y-1 border-l-2 border-border pl-3 text-muted">
                  {item.reports.slice(0, 10).map((r) => (
                    <li key={r.id}>
                      <span className="text-foreground">{reasonLabel(r.reason)}</span>
                      {r.note && <> — “{r.note}”</>}{" "}
                      <span className="text-xs">
                        · {r.user} · {r.createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: "Asia/Kolkata" })}
                      </span>
                    </li>
                  ))}
                  {item.reports.length > 10 && <li className="text-xs">…and {item.reports.length - 10} more</li>}
                </ul>
                <form action={resolveReportsAction} className="flex flex-wrap gap-2">
                  <input type="hidden" name="questionId" value={item.questionId} />
                  <Link href={`/admin/questions/${item.questionId}`} className="rounded-lg bg-primary px-3 py-1.5 font-medium text-primary-foreground">
                    Open & fix
                  </Link>
                  <button name="op" value="FIXED" className="rounded-lg border border-border px-3 py-1.5 font-medium text-success hover:border-success">
                    Mark fixed
                  </button>
                  <button name="op" value="REJECTED" className="rounded-lg border border-border px-3 py-1.5 font-medium text-muted hover:border-danger">
                    Reject (question is correct)
                  </button>
                </form>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { listSuspiciousAttempts } from "@/modules/assessment/integrity";
import { requirePermission } from "@/modules/identity/session";
import { Table } from "../table";
import { panel } from "../ui";
import { setFlaggedAction } from "./actions";

export const metadata: Metadata = { title: "Flagged attempts" };

const minutes = (sec: number) => `${Math.round(sec / 60)} min`;

export default async function FlaggedAttemptsPage({ searchParams }: PageProps<"/admin/attempts">) {
  await requirePermission("users:manage");
  await connection();
  const view = (await searchParams).view === "flagged" ? "flagged" : "all";
  const rows = await listSuspiciousAttempts(view);

  const tab = (v: "all" | "flagged", text: string) => (
    <Link
      href={v === "all" ? "/admin/attempts" : "/admin/attempts?view=flagged"}
      aria-current={view === v ? "page" : undefined}
      className={`rounded-lg px-3 py-1.5 text-sm font-medium ${view === v ? "bg-primary text-primary-foreground" : "bg-surface-muted text-muted"}`}
    >
      {text}
    </Link>
  );

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Flagged attempts</h1>
        <p className="text-sm text-muted">
          Attempts with tab switches, fullscreen exits or copy attempts recorded by the test engine. Attempts with 5 or more are
          flagged automatically. Flagged attempts don&apos;t count in ranks or leaderboards — unflag one to put it back.
        </p>
      </div>
      <div className="flex gap-2">
        {tab("all", "With violations")}
        {tab("flagged", "Flagged only")}
      </div>

      <Table
        caption="Attempts with recorded violations"
        rows={rows}
        rowKey={(r) => r.id}
        emptyMessage={view === "flagged" ? "No flagged attempts." : "No attempts with recorded violations. 🎉"}
        columns={[
          {
            header: "Student",
            render: (r) => (
              <div>
                <p className="font-medium">{r.student}</p>
                <p className="text-xs text-muted">{r.contact}</p>
              </div>
            ),
          },
          {
            header: "Test",
            render: (r) => (
              <div>
                <p>{r.testTitle}</p>
                <p className="text-xs text-muted">
                  {r.submittedAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })}
                  {!r.isFirst && " · re-attempt (not ranked anyway)"}
                </p>
              </div>
            ),
          },
          {
            header: "Score / time",
            align: "right",
            render: (r) => (
              <div className="tabular-nums">
                <p>
                  {r.score}/{r.maxScore}
                </p>
                <p className={`text-xs ${r.fast ? "font-semibold text-danger" : "text-muted"}`}>
                  {minutes(r.timeSpentSec)} of {minutes(r.durationSec)}
                  {r.fast && " · very fast"}
                </p>
              </div>
            ),
          },
          { header: "Violations", align: "center", render: (r) => <span className="tabular-nums font-semibold">{r.violations}</span> },
          {
            header: "Ranking",
            align: "right",
            render: (r) => (
              <form action={setFlaggedAction} className="flex items-center justify-end gap-2">
                <input type="hidden" name="attemptId" value={r.id} />
                <input type="hidden" name="flagged" value={r.flagged ? "false" : "true"} />
                <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${r.flagged ? "bg-danger-soft text-danger" : "bg-success-soft text-success"}`}>
                  {r.flagged ? "Excluded" : "Counted"}
                </span>
                <button className="rounded-lg border border-border px-2.5 py-1 text-xs font-medium hover:border-primary hover:text-primary">
                  {r.flagged ? "Unflag" : "Flag"}
                </button>
              </form>
            ),
          },
        ]}
      />
      {rows.length === 100 && <p className={`${panel} text-xs text-muted`}>Showing the latest 100.</p>}
    </div>
  );
}

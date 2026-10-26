import { ChevronRight, Clock, Trophy } from "lucide-react";
import Link from "next/link";
import type { RankedAttemptRow } from "@/modules/analytics/history";

const date = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
const time = (d: Date) => d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });

function minutes(sec: number): string {
  const m = Math.floor(sec / 60);
  return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m ${sec % 60}s`;
}

/** Submitted attempts, each opening its full analysis: cards on a phone, a table from `sm` (a sideways-scrolling table is painful on a phone). */
export function AttemptList({ rows, rankLabel }: { rows: RankedAttemptRow[]; rankLabel: string }) {
  return (
    <>
      <ul className="divide-y divide-border sm:hidden">
        {rows.map((r) => (
          <li key={r.id}>
            <Link href={`/results/${r.id}`} className="flex flex-col gap-2 px-5 py-3.5 active:bg-surface-muted">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium">{r.title}</p>
                  <p className="text-xs text-muted">
                    {date(r.submittedAt)}, {time(r.submittedAt)}
                    {!r.isFirst && " · re-attempt"}
                  </p>
                </div>
                <p className="shrink-0 text-right tabular-nums">
                  <b>{r.score}</b>
                  <span className="text-muted">/{r.maxScore}</span>
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-surface-muted px-2 py-1 font-medium tabular-nums">{r.accuracy}% accuracy</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-surface-muted px-2 py-1 font-medium tabular-nums">
                  <Clock className="size-3" aria-hidden /> {minutes(r.timeSpentSec)}
                </span>
                {r.rank && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-1 font-medium tabular-nums text-accent-ink">
                    <Trophy className="size-3" aria-hidden /> #{r.rank.rank}/{r.rank.total}
                  </span>
                )}
                <span className="ml-auto inline-flex items-center font-medium text-primary">
                  Analysis <ChevronRight className="size-3.5" aria-hidden />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-surface-muted text-left text-xs text-muted">
            <tr>
              <th className="px-5 py-2.5 font-medium">Test</th>
              <th className="px-5 py-2.5 text-right font-medium">Score</th>
              <th className="px-5 py-2.5 text-right font-medium">Accuracy</th>
              <th className="px-5 py-2.5 text-right font-medium">Time</th>
              <th className="px-5 py-2.5 text-right font-medium">{rankLabel} rank</th>
              <th className="px-5 py-2.5 font-medium" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-border">
                <td className="px-5 py-3">
                  <p className="font-medium">{r.title}</p>
                  <p className="text-xs text-muted">
                    {date(r.submittedAt)}, {time(r.submittedAt)}
                    {!r.isFirst && " · re-attempt"}
                  </p>
                </td>
                <td className="px-5 py-3 text-right tabular-nums">
                  <b>{r.score}</b>/{r.maxScore}
                  <p className="text-xs text-muted">{r.percent}%</p>
                </td>
                <td className="px-5 py-3 text-right tabular-nums">{r.accuracy}%</td>
                <td className="px-5 py-3 text-right tabular-nums">{minutes(r.timeSpentSec)}</td>
                <td className="px-5 py-3 text-right tabular-nums">
                  {r.rank ? (
                    <span className="inline-flex items-center gap-1">
                      <Trophy className="size-3.5 text-accent-ink" aria-hidden /> #{r.rank.rank}
                      <span className="text-muted">/{r.rank.total}</span>
                    </span>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                <td className="px-5 py-3 text-right">
                  <Link href={`/results/${r.id}`} className="font-medium text-primary">
                    Analysis
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

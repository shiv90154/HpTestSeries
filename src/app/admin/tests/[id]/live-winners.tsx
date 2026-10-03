import Link from "next/link";
import { getLiveStanding } from "@/modules/assessment/live-service";
import { panel } from "../../ui";
import { ConfirmWinners } from "./confirm-winners";

/** Live tests only: the standing after the window closes, and the button that gives out the prizes. */
export async function LiveWinners({ testId }: { testId: string }) {
  const s = await getLiveStanding(testId);
  if (!s) return null;
  const pendingPrizes = s.prizes.filter((p) => !p.awardedAt).length;

  return (
    <section className={`${panel} space-y-4`}>
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="mr-auto font-semibold">Live test — winners</h2>
        <Link href="/admin/attempts" className="text-sm text-primary hover:underline">
          Review flagged attempts
        </Link>
      </div>

      {s.state !== "ended" ? (
        <p className="text-sm text-muted">
          {s.state === "upcoming" ? "Not started yet." : "The window is open."} {s.taken} attempt{s.taken === 1 ? "" : "s"} so far. Winners can be confirmed after{" "}
          {s.endsAt.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" })} IST.
        </p>
      ) : (
        <>
          <p className="text-sm text-muted">
            {s.taken} submitted, {s.flagged} flagged for violations (not ranked). Check the top of the table and the flagged list before confirming — prizes cannot be taken back from here.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-muted">
                <tr>
                  <th className="py-1 pr-3">#</th>
                  <th className="py-1 pr-3">Student</th>
                  <th className="py-1 pr-3 text-right">Score</th>
                  <th className="py-1 pr-3 text-right">Time</th>
                  <th className="py-1 text-right">Violations</th>
                </tr>
              </thead>
              <tbody>
                {s.top.map((a, i) => (
                  <tr key={a.id} className="border-t border-border">
                    <td className="py-2 pr-3 tabular-nums">{i + 1}</td>
                    <td className="py-2 pr-3">
                      {a.user.name} <span className="text-xs text-muted">{a.user.email}</span>
                    </td>
                    <td className="py-2 pr-3 text-right tabular-nums">{Number(a.score ?? 0)}</td>
                    <td className="py-2 pr-3 text-right tabular-nums">{Math.round((a.timeSpentSec ?? 0) / 60)} min</td>
                    <td className="py-2 text-right tabular-nums">{a.violationCount}</td>
                  </tr>
                ))}
                {s.top.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-3 text-muted">No ranked attempts.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {s.prizes.length > 0 && (
        <ul className="space-y-1 text-sm">
          {s.prizes.map((p) => (
            <li key={p.id}>
              Rank {p.rank}: <strong>{p.title}</strong>
              {p.awardedAt ? (
                <span className="text-success"> — awarded to {p.winner?.name} ({p.winner?.email})</span>
              ) : (
                <span className="text-muted"> — not awarded yet</span>
              )}
            </li>
          ))}
        </ul>
      )}

      {s.state === "ended" && pendingPrizes > 0 && <ConfirmWinners testId={testId} />}
    </section>
  );
}

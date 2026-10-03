"use client";

import { ChevronRight, Trophy } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LiveCountdown } from "@/components/live-countdown";
import { btn, card } from "@/components/ui";

const when = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });
const MEDAL = ["🥇", "🥈", "🥉"];

/**
 * Live-test panel on the (cached) test page. The page itself is static, so the state — waiting, open or
 * over — is worked out in the browser from the window times and re-checked every few seconds.
 */
export function LiveBanner({
  live,
  prizes,
  slug,
}: {
  live: { startsAt: string; endsAt: string };
  prizes: { rank: number; title: string; winner: string | null }[];
  slug: string;
}) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 5000);
    return () => clearInterval(id);
  }, []);

  const start = new Date(live.startsAt).getTime();
  const end = new Date(live.endsAt).getTime();
  const state = now === null ? "loading" : now < start ? "upcoming" : now < end ? "open" : "ended";

  return (
    <section className={`${card} space-y-4 p-5 text-center`}>
      <p className="flex items-center justify-center gap-2 text-sm font-semibold text-danger">
        <span className="size-2 animate-pulse rounded-full bg-danger" aria-hidden /> Live window: {when(live.startsAt)} – {when(live.endsAt)} (IST)
      </p>

      {state === "upcoming" && (
        <>
          <p className="text-muted">Starts in</p>
          <LiveCountdown to={live.startsAt} refreshOnReach={false} />
          <p className="text-sm text-muted">One attempt per student. Results and the leaderboard open when the window closes.</p>
        </>
      )}
      {state === "open" && (
        <>
          <p className="font-medium">The test is live now. Join before {when(live.endsAt)} — latecomers get less time.</p>
          <Link href={`/tests/${slug}/attempt`} className={btn("primary", "lg")}>
            Join live test <ChevronRight className="size-5" />
          </Link>
        </>
      )}
      {state === "ended" && <p className="text-muted">This live test has ended. Results and the leaderboard are with students who took part.</p>}

      {prizes.length > 0 && (
        <div className="border-t border-border pt-4">
          <h2 className="mb-2 flex items-center justify-center gap-2 font-semibold">
            <Trophy className="size-4 text-accent-ink" aria-hidden /> Prizes for the top {prizes.length}
          </h2>
          <ul className="space-y-1 text-sm">
            {prizes.map((p) => (
              <li key={p.rank}>
                <span aria-hidden>{MEDAL[p.rank - 1] ?? "🏅"}</span> Rank {p.rank}: <strong>{p.title}</strong>
                {p.winner && <span className="text-muted"> — won by {p.winner}</span>}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-muted">Ties are broken by the earlier submission. Attempts flagged for cheating are not ranked.</p>
        </div>
      )}
    </section>
  );
}

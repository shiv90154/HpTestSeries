"use client";

import { History } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { btn } from "@/components/ui";
import type { MyTestResults } from "@/modules/analytics/history";

type Results = Omit<MyTestResults, "last"> & { last: Omit<MyTestResults["last"], "submittedAt"> & { submittedAt: string } };

/** "Your last score" for a student who has taken this test. The page is cached for everyone, so this asks the server after load. */
export function MyResults({ slug }: { slug: string }) {
  const [r, setR] = useState<Results | null>(null);

  useEffect(() => {
    let live = true;
    fetch(`/api/me/results?test=${encodeURIComponent(slug)}`)
      .then((res) => (res.ok ? (res.json() as Promise<{ results: Results | null }>) : { results: null }))
      .then((d) => live && setR(d.results))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [slug]);

  if (!r) return null;
  const on = new Date(r.last.submittedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
  return (
    <section aria-label="Your results on this test" className="flex flex-col gap-3 rounded-2xl border border-primary/30 bg-primary-soft p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="flex min-w-0 gap-3">
        <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
          <History className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-sm text-muted">You took this test on {on}</p>
          <p className="font-semibold tabular-nums">
            Last score {r.last.score}/{r.last.maxScore} · {r.last.accuracy}% accuracy
          </p>
          {r.count > 1 && (
            <p className="text-sm text-muted tabular-nums">
              Best {r.best.score}/{r.best.maxScore} across {r.count} attempts
            </p>
          )}
        </div>
      </div>
      <div className="flex shrink-0 flex-wrap gap-2">
        <Link href={`/results/${r.last.id}`} className={btn("primary", "sm")}>
          View analysis
        </Link>
        {r.count > 1 && (
          <Link href={`/results?test=${encodeURIComponent(slug)}`} className={btn("outline", "sm")}>
            All {r.count} attempts
          </Link>
        )}
      </div>
    </section>
  );
}

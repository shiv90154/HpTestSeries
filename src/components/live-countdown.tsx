"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

/**
 * Counts down to `to` (ISO time). The page is refreshed the moment it is reached, so a waiting room turns
 * into the exam (or a locked result into the result) without the student pressing anything.
 */
export function LiveCountdown({ to, refreshOnReach = true }: { to: string; refreshOnReach?: boolean }) {
  const router = useRouter();
  const target = new Date(to).getTime();
  // Start from null so server and client markup match; the first effect tick fills in the real time.
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    let done = false;
    const tick = () => {
      const remaining = target - Date.now();
      setLeft(remaining);
      if (remaining <= 0 && !done) {
        done = true;
        if (refreshOnReach) router.refresh();
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target, refreshOnReach, router]);

  const p = parts(left ?? 0);
  const cells: [number, string][] = [
    ...(p.d > 0 ? ([[p.d, "days"]] as [number, string][]) : []),
    [p.h, "hours"],
    [p.m, "min"],
    [p.s, "sec"],
  ];
  return (
    <div role="timer" aria-label="Time remaining" className="flex justify-center gap-3">
      {cells.map(([n, l]) => (
        <div key={l} className="min-w-14 rounded-xl bg-primary-soft px-3 py-2">
          <div className="text-2xl font-bold tabular-nums">{left === null ? "--" : String(n).padStart(2, "0")}</div>
          <div className="text-xs text-muted">{l}</div>
        </div>
      ))}
    </div>
  );
}

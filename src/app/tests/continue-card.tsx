"use client";

import { ArrowRight, History } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { btn } from "@/components/ui";
import type { LastAttempt } from "@/modules/assessment/service";

const ACTION_LABEL: Record<LastAttempt["action"], string> = {
  resume: "Resume test",
  result: "View result",
  retake: "Try again",
};

/** "Continue where you left off" for a signed-in student. The page is cached for everyone, so this asks the server after load. */
export function ContinueCard() {
  const [last, setLast] = useState<LastAttempt | null>(null);

  useEffect(() => {
    let live = true;
    fetch("/api/me/last-attempt")
      .then((r) => (r.ok ? (r.json() as Promise<{ last: LastAttempt | null }>) : { last: null }))
      .then((d) => live && setLast(d.last))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  if (!last) return null;
  return (
    <section aria-label="Continue where you left off" className="flex flex-col gap-3 rounded-2xl border border-primary/30 bg-primary-soft p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="flex min-w-0 gap-3">
        <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
          <History className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-sm text-muted">{last.action === "resume" ? "Your test is still running" : "You last took"}</p>
          <p className="truncate font-semibold">{last.testTitle}</p>
          {last.correct !== null && last.questions !== null && (
            <p className="text-sm text-muted">
              {last.correct} of {last.questions} correct
            </p>
          )}
        </div>
      </div>
      <div className="flex shrink-0 flex-wrap gap-2">
        <Link href={last.href} className={btn(last.action === "resume" ? "primary" : "outline", "sm")}>
          {ACTION_LABEL[last.action]}
        </Link>
        {last.exam && (
          <Link href={last.exam.href} className={btn(last.action === "resume" ? "outline" : "primary", "sm")}>
            Next {last.exam.label} test <ArrowRight className="size-4" aria-hidden />
          </Link>
        )}
      </div>
    </section>
  );
}

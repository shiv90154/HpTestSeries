"use client";

import { useRouter } from "next/navigation";

/** Narrows /results to one test's attempts; navigates on change, so there is no "apply" button. */
export function TestFilter({ tests, active }: { tests: { slug: string; title: string; attempts: number }[]; active?: string }) {
  const router = useRouter();
  return (
    <label className="flex w-full flex-col gap-1 text-sm sm:w-auto sm:min-w-72">
      <span className="text-xs font-medium text-muted">Show results for</span>
      <select
        value={active ?? ""}
        onChange={(e) => router.push(e.target.value ? `/results?test=${encodeURIComponent(e.target.value)}` : "/results")}
        className="h-11 rounded-lg border border-border bg-surface px-3 text-sm"
      >
        <option value="">All tests</option>
        {tests.map((t) => (
          <option key={t.slug} value={t.slug}>
            {t.title} ({t.attempts})
          </option>
        ))}
      </select>
    </label>
  );
}

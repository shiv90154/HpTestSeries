"use client";

import { Search, X } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { TestCard } from "@/components/test-card";
import type { PublicTest } from "@/modules/catalog/queries";

const TYPE_LABEL: Record<string, string> = { MOCK: "Full mocks", PYQ: "Previous year", SECTIONAL: "Sectional", TOPIC: "Topic tests", DAILY: "Daily quiz" };
const ACCESS = [
  ["", "All"],
  ["free", "Free"],
  ["paid", "Paid"],
] as const;

const chip = (active: boolean) =>
  `inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-colors ${
    active ? "border-primary bg-primary-soft text-primary" : "border-border bg-surface text-muted hover:text-foreground"
  }`;

/**
 * Search and filters for the test list. State lives in the URL (?exam=&type=&access=&q=) so a filtered list
 * can be shared and survives Back; it is written with history.replaceState, which Next keeps in sync
 * with useSearchParams without a server round trip.
 */
export function TestsBrowser({ tests }: { tests: PublicTest[] }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const exam = params.get("exam") ?? "";
  const type = params.get("type") ?? "";
  const access = params.get("access") ?? "";
  const [q, setQ] = useState(params.get("q") ?? "");

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
  }

  const exams = useMemo(() => [...new Set(tests.map((t) => t.examName).filter((e): e is string => !!e))].sort(), [tests]);
  const types = useMemo(() => Object.keys(TYPE_LABEL).filter((k) => tests.some((t) => t.type === k)), [tests]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return tests.filter(
      (t) =>
        // Tests without an exam (e.g. Himachal GK) are useful for every exam, so they stay in.
        (!exam || t.examName === exam || t.examName === null) &&
        (!type || t.type === type) &&
        (!access || (access === "free") === t.isFree) &&
        (!needle || t.title.toLowerCase().includes(needle) || (t.titleHi ?? "").includes(q.trim())),
    );
  }, [tests, exam, type, access, q]);

  const filtered = !!(exam || type || access || q.trim());

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <label className="relative block max-w-md">
          <span className="sr-only">Search tests</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setParam("q", e.target.value.trim());
            }}
            placeholder="Search tests, e.g. Patwari, GK, Reasoning"
            className="h-11 w-full rounded-xl border border-border bg-surface pl-9 pr-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary-soft"
          />
        </label>

        {exams.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Exam">
            <button type="button" className={chip(!exam)} onClick={() => setParam("exam", "")} aria-pressed={!exam}>
              All exams
            </button>
            {exams.map((e) => (
              <button key={e} type="button" className={chip(exam === e)} onClick={() => setParam("exam", exam === e ? "" : e)} aria-pressed={exam === e}>
                {e}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {types.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Test type">
              <button type="button" className={chip(!type)} onClick={() => setParam("type", "")} aria-pressed={!type}>
                All types
              </button>
              {types.map((k) => (
                <button key={k} type="button" className={chip(type === k)} onClick={() => setParam("type", type === k ? "" : k)} aria-pressed={type === k}>
                  {TYPE_LABEL[k]}
                </button>
              ))}
            </div>
          )}
          <div className="flex gap-2 pb-1" role="group" aria-label="Access">
            {ACCESS.map(([v, label]) => (
              <button key={label} type="button" className={chip(access === v)} onClick={() => setParam("access", v)} aria-pressed={access === v}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 text-sm text-muted">
        <p aria-live="polite">
          {shown.length} test{shown.length === 1 ? "" : "s"}
          {filtered && ` of ${tests.length}`}
        </p>
        {filtered && (
          <button
            type="button"
            className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
            onClick={() => {
              setQ("");
              window.history.replaceState(null, "", pathname);
            }}
          >
            <X className="size-4" /> Clear filters
          </button>
        )}
      </div>

      <TestGrid tests={shown} />
      {shown.length === 0 && tests.length > 0 && <p className="py-10 text-center text-muted">No tests match these filters.</p>}
    </div>
  );
}

export function TestGrid({ tests }: { tests: PublicTest[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tests.map((t) => (
        <TestCard key={t.slug} test={t} headingLevel={2} />
      ))}
    </div>
  );
}

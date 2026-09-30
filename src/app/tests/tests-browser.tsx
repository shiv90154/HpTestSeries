"use client";

import { Lock, LockOpen, Search, X } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useOwnedTests } from "@/components/my-access";
import { TestCard, TestRow } from "@/components/test-card";
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

const examTab = (active: boolean) =>
  `inline-flex h-12 shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border px-5 text-base font-semibold transition-colors ${
    active ? "border-primary bg-primary text-white" : "border-border bg-surface text-foreground hover:border-primary"
  }`;

/** "Patwari" -> "HP Patwari"; names that already carry the department (HP TET, JOA IT) are left alone. */
const examTitle = (name: string) => (/^(HP|JOA|HPAS)/.test(name) ? name : `HP ${name}`);

/**
 * Search and filters for the test list. State lives in the URL (?exam=&type=&access=&q=) so a filtered list
 * can be shared and survives Back; it is written with history.replaceState, which Next keeps in sync
 * with useSearchParams without a server round trip.
 */
export function TestsBrowser({ tests, examNames = [] }: { tests: PublicTest[]; examNames?: string[] }) {
  const owned = useOwnedTests();
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

  const exams = useMemo(
    () => [...new Set([...examNames, ...tests.map((t) => t.examName).filter((e): e is string => !!e)])],
    [tests, examNames],
  );
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

        {exams.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Exam">
            <button type="button" className={examTab(!exam)} onClick={() => setParam("exam", "")} aria-pressed={!exam}>
              All exams <span className="text-xs opacity-70">{tests.length}</span>
            </button>
            {exams.map((e) => (
              <button key={e} type="button" className={examTab(exam === e)} onClick={() => setParam("exam", exam === e ? "" : e)} aria-pressed={exam === e}>
                {examTitle(e)} <span className="text-xs opacity-70">{tests.filter((t) => t.examName === e).length}</span>
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

      {/* One card per exam, with that exam's tests inside it. Picking an exam tab shows just that card. */}
      {[...exams, null]
        .filter((e) => !exam || e === exam || e === null)
        .map((e) => {
          const group = shown.filter((t) => t.examName === e);
          const total = tests.filter((t) => t.examName === e).length;
          // An exam with no tests yet still gets its card, unless a filter is narrowing the list.
          if (group.length === 0 && (filtered || total > 0 || !e)) return null;
          const open = group.filter((t) => t.isFree || owned?.has(t.slug)).length;
          const locked = group.length - open;
          return (
            <section key={e ?? "general"} className="space-y-2 rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-xl font-bold">{e ? `${examTitle(e)} mock tests` : "General tests for all exams"}</h2>
                  <p className="text-sm text-muted">{group.length === total ? `${total} tests` : `${group.length} of ${total} tests`}</p>
                </div>
                {group.length > 0 && (
                  <div className="flex gap-2 text-xs font-semibold">
                    {open > 0 && (
                      <span className="flex items-center gap-1 rounded-md bg-success-soft px-2 py-1 text-success">
                        <LockOpen className="size-3" aria-hidden /> {open} unlocked
                      </span>
                    )}
                    {locked > 0 && (
                      <span className="flex items-center gap-1 rounded-md bg-accent-soft px-2 py-1 text-accent-ink">
                        <Lock className="size-3" aria-hidden /> {locked} locked
                      </span>
                    )}
                  </div>
                )}
              </div>
              {group.length > 0 ? (
                <TestList tests={group} expanded={!!exam || filtered} />
              ) : (
                <p className="rounded-xl bg-background px-4 py-6 text-center text-muted">Mock tests for this exam are coming soon.</p>
              )}
            </section>
          );
        })}
      {shown.length === 0 && tests.length > 0 && <p className="py-10 text-center text-muted">No tests match these filters.</p>}
    </div>
  );
}

const PREVIEW = 5;

/** The tests inside an exam card: a compact list, first few only until "Show all" (or a filter/exam tab) opens it. */
function TestList({ tests, expanded }: { tests: PublicTest[]; expanded: boolean }) {
  const [all, setAll] = useState(false);
  const visible = expanded || all ? tests : tests.slice(0, PREVIEW);
  return (
    <div>
      <ul className="divide-y divide-border">
        {visible.map((t) => (
          <TestRow key={t.slug} test={t} />
        ))}
      </ul>
      {visible.length < tests.length && (
        <button type="button" onClick={() => setAll(true)} className="mt-2 flex h-11 w-full items-center justify-center rounded-xl border border-border text-sm font-semibold text-primary hover:border-primary">
          Show all {tests.length} tests
        </button>
      )}
    </div>
  );
}

export function TestGrid({ tests, headingLevel = 2 }: { tests: PublicTest[]; headingLevel?: 2 | 3 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tests.map((t) => (
        <TestCard key={t.slug} test={t} headingLevel={headingLevel} />
      ))}
    </div>
  );
}

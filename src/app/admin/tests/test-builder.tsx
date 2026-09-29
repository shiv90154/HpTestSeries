"use client";

import { ArrowDown, ArrowUp, Plus, Shuffle, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { FREE_MOCK_SLUG } from "@/lib/site";
import type { Taxonomy } from "@/modules/content/taxonomy";
import type { BankQuestion, BuilderSection } from "@/modules/content/test-service";
import { ErrorList, StatusBadge, input as inputCls, label as labelCls, panel } from "../ui";
import {
  deleteTestAction,
  duplicateTestAction,
  publishTestAction,
  randomPickAction,
  restoreTestAction,
  retireTestAction,
  saveTestStructureAction,
  searchBankAction,
  unpublishTestAction,
} from "./actions";

type Props = {
  id: string;
  slug: string;
  status: string;
  attempts: number;
  /** set when the test is published with a future release time */
  scheduledFor: Date | null;
  initialSections: BuilderSection[];
  taxonomy: Taxonomy;
  canPublish: boolean;
};

type Filters = {
  q: string;
  subjectId: string;
  topicId: string;
  difficulty: string;
  status: string;
  source: string;
  sourceExamId: string;
  unusedOnly: boolean;
};

const emptyFilters: Filters = { q: "", subjectId: "", topicId: "", difficulty: "", status: "PUBLISHED", source: "", sourceExamId: "", unusedOnly: false };

const small = "rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium hover:border-primary disabled:opacity-50";
const iconBtn = "flex size-8 items-center justify-center rounded-lg text-muted hover:bg-surface-muted hover:text-foreground disabled:opacity-30";

export function TestBuilder({ id, slug, status, attempts, scheduledFor, initialSections, taxonomy, canPublish }: Props) {
  const router = useRouter();
  const [sections, setSections] = useState(initialSections);
  const [dirty, setDirty] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [results, setResults] = useState<{ total: number; items: BankQuestion[] } | null>(null);
  const [ticked, setTicked] = useState<Set<string>>(new Set());
  const [target, setTarget] = useState(0);
  const [randomCount, setRandomCount] = useState(10);
  const [scheduleAt, setScheduleAt] = useState<string | null>(null); // datetime-local value while picking a release time

  const editable = status === "DRAFT";
  const inTest = useMemo(() => new Set(sections.flatMap((s) => s.questions.map((q) => q.id))), [sections]);
  const totalQs = inTest.size;
  const totalMarks = sections.reduce((n, s) => n + s.questions.length * s.marksCorrect, 0);
  const notPublished = sections.flatMap((s) => s.questions).filter((q) => q.status !== "PUBLISHED").length;
  const topics = taxonomy.subjects.find((s) => s.id === filters.subjectId)?.topics ?? [];

  // Unsaved structure changes: warn before leaving the page.
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function update(fn: (s: BuilderSection[]) => BuilderSection[]) {
    setSections(fn);
    setDirty(true);
    setNotice(null);
  }

  const patchSection = (i: number, patch: Partial<BuilderSection>) => update((ss) => ss.map((s, j) => (j === i ? { ...s, ...patch } : s)));

  function move<T>(arr: T[], from: number, to: number): T[] {
    if (to < 0 || to >= arr.length) return arr;
    const copy = [...arr];
    const [x] = copy.splice(from, 1);
    copy.splice(to, 0, x);
    return copy;
  }

  function addToTarget(qs: BankQuestion[]) {
    const fresh = qs.filter((q) => !inTest.has(q.id));
    if (!fresh.length) return;
    const t = Math.min(target, sections.length - 1);
    update((ss) => ss.map((s, j) => (j === t ? { ...s, questions: [...s.questions, ...fresh] } : s)));
    setTicked(new Set());
    setNotice(`Added ${fresh.length} question${fresh.length === 1 ? "" : "s"} to “${sections[t].name}”. Remember to save.`);
  }

  function apiFilters() {
    return {
      ...filters,
      topicId: filters.topicId || undefined,
      subjectId: filters.subjectId || undefined,
      difficulty: filters.difficulty || undefined,
      status: filters.status || undefined,
      source: filters.source || undefined,
      sourceExamId: filters.sourceExamId || undefined,
      q: filters.q.trim() || undefined,
    };
  }

  function search() {
    setErrors([]);
    startTransition(async () => {
      setResults(await searchBankAction(apiFilters()));
      setTicked(new Set());
    });
  }

  function autoPick() {
    setErrors([]);
    startTransition(async () => {
      const picked = await randomPickAction({ ...apiFilters(), excludeIds: [...inTest] }, randomCount);
      if (!picked.length) setErrors(["No more questions match these filters."]);
      else addToTarget(picked);
    });
  }

  function run(fn: () => Promise<{ ok: true } | { ok: false; errors: string[] }>, done: string, after?: () => void) {
    setErrors([]);
    setNotice(null);
    startTransition(async () => {
      const res = await fn();
      if (!res.ok) return setErrors(res.errors);
      setNotice(done);
      after?.();
      router.refresh();
    });
  }

  const save = () =>
    run(
      () =>
        saveTestStructureAction(id, {
          sections: sections.map((s) => ({ name: s.name, nameHi: s.nameHi, marksCorrect: s.marksCorrect, marksWrong: s.marksWrong, questionIds: s.questions.map((q) => q.id) })),
        }),
      "Saved.",
      () => setDirty(false),
    );

  return (
    <div className="space-y-5">
      {/* Summary + lifecycle */}
      <div className={`${panel} flex flex-wrap items-center gap-3`}>
        {scheduledFor ? (
          <span className="inline-block rounded-md bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent-ink">
            scheduled · {scheduledFor.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })}
          </span>
        ) : (
          <StatusBadge status={status === "ARCHIVED" ? "RETIRED" : status} />
        )}
        <span className="text-sm">
          <b>{sections.length}</b> section{sections.length === 1 ? "" : "s"} · <b>{totalQs}</b> questions · <b>{totalMarks}</b> marks
          {attempts > 0 && <> · {attempts.toLocaleString("en-IN")} attempts</>}
        </span>
        {notPublished > 0 && <span className="text-sm text-accent-ink">{notPublished} question(s) not published yet</span>}
        <div className="ml-auto flex flex-wrap gap-2">
          {editable && (
            <button type="button" onClick={save} disabled={pending || !dirty} className="rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground disabled:opacity-50">
              {dirty ? "Save changes" : "Saved"}
            </button>
          )}
          {canPublish && editable && (
            <>
              <button
                type="button"
                disabled={pending || dirty}
                title={dirty ? "Save changes first" : undefined}
                onClick={() => run(() => publishTestAction(id), "Published. Students can see it now.")}
                className="rounded-lg bg-success px-4 py-1.5 text-sm font-medium text-white disabled:opacity-50"
              >
                Publish
              </button>
              <button type="button" disabled={pending || dirty} onClick={() => setScheduleAt(scheduleAt === null ? "" : null)} className={small}>
                Schedule…
              </button>
            </>
          )}
          {canPublish && scheduledFor && (
            <>
              <button
                type="button"
                disabled={pending}
                onClick={() => run(() => publishTestAction(id), "Released. Students can see it now.")}
                className="rounded-lg bg-success px-4 py-1.5 text-sm font-medium text-white disabled:opacity-50"
              >
                Release now
              </button>
              <button type="button" disabled={pending} onClick={() => run(() => unpublishTestAction(id), "Schedule cancelled. It is a draft again.")} className={small}>
                Cancel schedule
              </button>
            </>
          )}
          {status === "PUBLISHED" && !scheduledFor && (
            <a href={`/tests/${slug}`} target="_blank" className={small}>
              View live ↗
            </a>
          )}
          {canPublish && status === "PUBLISHED" && !scheduledFor && attempts === 0 && (
            <button
              type="button"
              disabled={pending}
              onClick={() => confirm("Hide this test from students and make it editable?") && run(() => unpublishTestAction(id), "Unpublished. It is a draft again.")}
              className={small}
            >
              Unpublish
            </button>
          )}
          {canPublish && status === "PUBLISHED" && !scheduledFor && attempts > 0 && (
            <button
              type="button"
              disabled={pending}
              onClick={() =>
                confirm(
                  `Retire this test? Students won't see it or be able to start it, but their past results stay available.${
                    slug === FREE_MOCK_SLUG ? "\n\nWARNING: this is the site's featured free mock — the Free Mock links in the header, footer and home page will stop working. Change FREE_MOCK_SLUG first." : ""
                  }`,
                ) &&
                run(() => retireTestAction(id), "Retired. It is hidden from students; past results still open.")
              }
              className={small}
            >
              Retire
            </button>
          )}
          {canPublish && status === "ARCHIVED" && (
            <button type="button" disabled={pending} onClick={() => run(() => restoreTestAction(id), "Restored. Students can see it again.")} className={small}>
              Restore
            </button>
          )}
          <button
            type="button"
            disabled={pending || dirty}
            onClick={() =>
              startTransition(async () => {
                const res = await duplicateTestAction(id);
                if (res.ok) router.push(`/admin/tests/${res.id}`);
                else setErrors(res.errors);
              })
            }
            className={small}
          >
            Duplicate
          </button>
          {editable && attempts === 0 && (
            <button
              type="button"
              disabled={pending}
              onClick={() =>
                confirm("Delete this test? Questions stay in the bank.") &&
                startTransition(async () => {
                  const res = await deleteTestAction(id);
                  if (res.ok) router.replace("/admin/tests");
                  else setErrors(res.errors);
                })
              }
              className={`${small} text-danger`}
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {scheduleAt !== null && editable && (
        <div className={`${panel} flex flex-wrap items-end gap-3`}>
          <div>
            <label className={labelCls} htmlFor="schedule-at">
              Release on (your local time)
            </label>
            <input id="schedule-at" type="datetime-local" className={inputCls} value={scheduleAt} onChange={(e) => setScheduleAt(e.target.value)} />
          </div>
          <button
            type="button"
            disabled={pending || !scheduleAt}
            onClick={() =>
              run(
                () => publishTestAction(id, new Date(scheduleAt).toISOString()),
                "Scheduled. It goes live at the chosen time (public pages refresh within about 10 minutes).",
                () => setScheduleAt(null),
              )
            }
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            Schedule release
          </button>
          <p className="basis-full text-xs text-muted">Students can&apos;t see or start the test before then. The test is locked for editing once scheduled.</p>
        </div>
      )}

      {!editable && (
        <p className="rounded-xl border border-border bg-surface-muted p-3 text-sm text-muted">
          {status === "ARCHIVED"
            ? "This test is retired: students can't see or start it, but their past results still open. Restore it to make it live again."
            : scheduledFor
              ? "Questions and sections of a scheduled test are locked. Cancel the schedule to make changes."
              : `Questions and sections of a published test are locked. ${attempts > 0 ? "Duplicate it to make a new version, or retire it to hide it." : "Unpublish it to make changes."}`}
        </p>
      )}
      <ErrorList errors={errors} />
      {notice && (
        <p role="status" className="rounded-xl border border-primary bg-primary-soft p-3 text-sm">
          {notice}
        </p>
      )}

      {/* Sections */}
      <fieldset disabled={!editable} className="space-y-4">
        {sections.map((s, i) => (
          <section key={i} className={`${panel} space-y-3`}>
            <div className="flex flex-wrap items-end gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary-soft text-sm font-semibold text-primary">{i + 1}</span>
              <div className="min-w-40 flex-1">
                <label className={labelCls} htmlFor={`sec-${i}-name`}>Section name</label>
                <input id={`sec-${i}-name`} className={inputCls} value={s.name} onChange={(e) => patchSection(i, { name: e.target.value })} />
              </div>
              <div className="min-w-40 flex-1">
                <label className={labelCls} htmlFor={`sec-${i}-hi`}>Hindi name</label>
                <input id={`sec-${i}-hi`} lang="hi" className={inputCls} value={s.nameHi} onChange={(e) => patchSection(i, { nameHi: e.target.value })} />
              </div>
              <div className="w-24">
                <label className={labelCls} htmlFor={`sec-${i}-plus`}>+ Correct</label>
                <input id={`sec-${i}-plus`} type="number" step="0.25" min={0} className={inputCls} value={s.marksCorrect} onChange={(e) => patchSection(i, { marksCorrect: Number(e.target.value) })} />
              </div>
              <div className="w-24">
                <label className={labelCls} htmlFor={`sec-${i}-minus`}>− Wrong</label>
                <input id={`sec-${i}-minus`} type="number" step="0.01" min={0} className={inputCls} value={s.marksWrong} onChange={(e) => patchSection(i, { marksWrong: Number(e.target.value) })} />
              </div>
              {editable && (
                <div className="flex">
                  <button type="button" className={iconBtn} aria-label="Move section up" disabled={i === 0} onClick={() => update((ss) => move(ss, i, i - 1))}>
                    <ArrowUp className="size-4" />
                  </button>
                  <button type="button" className={iconBtn} aria-label="Move section down" disabled={i === sections.length - 1} onClick={() => update((ss) => move(ss, i, i + 1))}>
                    <ArrowDown className="size-4" />
                  </button>
                  <button
                    type="button"
                    className={`${iconBtn} hover:text-danger`}
                    aria-label="Remove section"
                    disabled={sections.length === 1}
                    onClick={() => (!s.questions.length || confirm(`Remove “${s.name}” and its ${s.questions.length} question(s) from this test?`)) && update((ss) => ss.filter((_, j) => j !== i))}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              )}
            </div>

            {s.questions.length === 0 ? (
              <p className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted">No questions yet. Use the question bank below.</p>
            ) : (
              <ol className="divide-y divide-border rounded-lg border border-border">
                {s.questions.map((q, qi) => (
                  <li key={q.id} className="flex items-start gap-2 p-2 text-sm">
                    <span className="w-7 shrink-0 pt-1 text-right text-muted tabular-nums">{qi + 1}.</span>
                    <div className="min-w-0 flex-1">
                      <a href={`/admin/questions/${q.id}`} target="_blank" className="line-clamp-2 hover:text-primary">{q.preview}</a>
                      <QMeta q={q} />
                    </div>
                    {editable && (
                      <div className="flex shrink-0">
                        <button type="button" className={iconBtn} aria-label="Move up" disabled={qi === 0} onClick={() => patchSection(i, { questions: move(s.questions, qi, qi - 1) })}>
                          <ArrowUp className="size-4" />
                        </button>
                        <button type="button" className={iconBtn} aria-label="Move down" disabled={qi === s.questions.length - 1} onClick={() => patchSection(i, { questions: move(s.questions, qi, qi + 1) })}>
                          <ArrowDown className="size-4" />
                        </button>
                        <button type="button" className={`${iconBtn} hover:text-danger`} aria-label="Remove from test" onClick={() => patchSection(i, { questions: s.questions.filter((x) => x.id !== q.id) })}>
                          <X className="size-4" />
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            )}
          </section>
        ))}
        {editable && (
          <button
            type="button"
            className={`${small} flex items-center gap-1`}
            onClick={() => {
              const last = sections[sections.length - 1];
              update((ss) => [...ss, { name: `Section ${ss.length + 1}`, nameHi: "", marksCorrect: last?.marksCorrect ?? 1, marksWrong: last?.marksWrong ?? 0, questions: [] }]);
            }}
          >
            <Plus className="size-4" /> Add section
          </button>
        )}
      </fieldset>

      {/* Question bank picker */}
      {editable && (
        <section className={`${panel} space-y-4`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-semibold">Add from question bank</h2>
            <label className="flex items-center gap-2 whitespace-nowrap text-sm">
              Add to
              <select className={`${inputCls} w-auto`} value={Math.min(target, sections.length - 1)} onChange={(e) => setTarget(Number(e.target.value))}>
                {sections.map((s, i) => (
                  <option key={i} value={i}>{i + 1}. {s.name}</option>
                ))}
              </select>
            </label>
          </div>

          <form
            className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4"
            onSubmit={(e) => {
              e.preventDefault();
              search();
            }}
          >
            <input aria-label="Search text" className={`${inputCls} sm:col-span-2`} placeholder="Search text (English or Hindi)" value={filters.q} onChange={(e) => setFilters({ ...filters, q: e.target.value })} />
            <select aria-label="Subject" className={inputCls} value={filters.subjectId} onChange={(e) => setFilters({ ...filters, subjectId: e.target.value, topicId: "" })}>
              <option value="">All subjects</option>
              {taxonomy.subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <select aria-label="Topic" className={inputCls} value={filters.topicId} disabled={!filters.subjectId} onChange={(e) => setFilters({ ...filters, topicId: e.target.value })}>
              <option value="">All topics</option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            <select aria-label="Difficulty" className={inputCls} value={filters.difficulty} onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}>
              <option value="">Any difficulty</option>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>
            <select aria-label="Status" className={inputCls} value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
              <option value="PUBLISHED">Published only</option>
              <option value="">Any status (except archived)</option>
              <option value="IN_REVIEW">In review</option>
              <option value="DRAFT">Draft</option>
            </select>
            <select aria-label="Source" className={inputCls} value={filters.source} onChange={(e) => setFilters({ ...filters, source: e.target.value, sourceExamId: "" })}>
              <option value="">Original + PYQ</option>
              <option value="ORIGINAL">Original only</option>
              <option value="PYQ">PYQ only</option>
            </select>
            {filters.source === "PYQ" ? (
              <select aria-label="PYQ exam" className={inputCls} value={filters.sourceExamId} onChange={(e) => setFilters({ ...filters, sourceExamId: e.target.value })}>
                <option value="">Any exam</option>
                {taxonomy.exams.map((e) => (
                  <option key={e.id} value={e.id}>{e.body} — {e.name}</option>
                ))}
              </select>
            ) : (
              <span className="hidden lg:block" />
            )}
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={filters.unusedOnly} onChange={(e) => setFilters({ ...filters, unusedOnly: e.target.checked })} />
              Not used in any test yet
            </label>
            <div className="flex flex-wrap gap-2 sm:col-span-2 lg:col-span-4">
              <button disabled={pending} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50">
                Search
              </button>
              <span className="flex items-center gap-2 whitespace-nowrap text-sm">
                or pick
                <input type="number" min={1} max={200} aria-label="How many questions to pick at random" className={`${inputCls} w-20`} value={randomCount} onChange={(e) => setRandomCount(Number(e.target.value))} />
                at random
                <button type="button" disabled={pending || randomCount < 1} onClick={autoPick} className={`${small} flex items-center gap-1 whitespace-nowrap`}>
                  <Shuffle className="size-4" /> Auto-pick
                </button>
              </span>
            </div>
          </form>

          {results && (
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="text-muted">
                  {results.total.toLocaleString("en-IN")} match{results.total === 1 ? "" : "es"}
                  {results.total > results.items.length && ` (showing newest ${results.items.length}; narrow the filters)`}
                </span>
                <button
                  type="button"
                  className="text-primary"
                  onClick={() => setTicked(new Set(results.items.filter((q) => !inTest.has(q.id)).map((q) => q.id)))}
                >
                  Tick all
                </button>
                <button
                  type="button"
                  disabled={ticked.size === 0}
                  onClick={() => addToTarget(results.items.filter((q) => ticked.has(q.id)))}
                  className="ml-auto rounded-lg bg-primary px-4 py-1.5 font-medium text-primary-foreground disabled:opacity-50"
                >
                  Add {ticked.size || ""} ticked
                </button>
              </div>
              <ul className="max-h-[32rem] divide-y divide-border overflow-y-auto rounded-lg border border-border">
                {results.items.map((q) => {
                  const added = inTest.has(q.id);
                  return (
                    <li key={q.id} className={`flex items-start gap-3 p-2 text-sm ${added ? "opacity-50" : ""}`}>
                      <input
                        type="checkbox"
                        className="mt-1"
                        disabled={added}
                        checked={added || ticked.has(q.id)}
                        aria-label="Select question"
                        onChange={(e) =>
                          setTicked((t) => {
                            const n = new Set(t);
                            if (e.target.checked) n.add(q.id);
                            else n.delete(q.id);
                            return n;
                          })
                        }
                      />
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2">{q.preview}</p>
                        <QMeta q={q} extra={added ? "already in this test" : undefined} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function QMeta({ q, extra }: { q: BankQuestion; extra?: string }) {
  return (
    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
      {q.status !== "PUBLISHED" && <StatusBadge status={q.status} />}
      {q.topic && <span>{q.topic}</span>}
      <span>{q.difficulty.toLowerCase()}</span>
      {q.pyq && <span>PYQ {q.pyq}</span>}
      <span>{q.langs}</span>
      {q.usedIn > 0 && <span>used in {q.usedIn} test(s)</span>}
      {extra && <span className="font-medium">{extra}</span>}
    </div>
  );
}

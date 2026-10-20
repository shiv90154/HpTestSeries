"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ErrorList, input as inputCls, label as labelCls, panel } from "../../ui";
import { generateFreeMockAction } from "../actions";

type Plan = { existing: number; durationMin: number | null; subjects: { id: string; name: string; available: number; suggested: number }[] };

/** Builds a free full mock from the question bank: pick how many questions per subject, the server draws unused published ones at random. */
export function AutoMockPanel({ examId, plan }: { examId: string; plan: Plan }) {
  const router = useRouter();
  const [counts, setCounts] = useState<Record<string, number>>(() => Object.fromEntries(plan.subjects.map((s) => [s.id, s.suggested])));
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const [durationMin, setDurationMin] = useState(plan.durationMin ?? 0);
  const [marksWrong, setMarksWrong] = useState(0.25);
  const [publish, setPublish] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [done, setDone] = useState<{ id: string; published: boolean } | null>(null);
  const [pending, startTransition] = useTransition();

  function generate() {
    setErrors([]);
    setDone(null);
    startTransition(async () => {
      const res = await generateFreeMockAction(examId, {
        rows: plan.subjects.map((s) => ({ subjectId: s.id, count: counts[s.id] ?? 0 })),
        durationMin: durationMin || total,
        marksWrong,
        publish,
      });
      if (res.ok) {
        setDone(res);
        setErrors(res.warnings);
        router.refresh();
      } else setErrors(res.errors);
    });
  }

  return (
    <section className={`${panel} space-y-4`}>
      <div>
        <h2 className="font-semibold">Auto-create a free mock</h2>
        <p className="text-sm text-muted">
          Picks random published questions from the question bank, one section per subject. Questions already used in this exam&apos;s other free mocks are skipped, so every mock is different. {plan.existing} free mock{plan.existing === 1 ? "" : "s"} so far.
        </p>
      </div>
      {plan.subjects.length === 0 ? (
        <p className="text-sm text-muted">No unused published questions in the bank. Add or import questions first.</p>
      ) : (
        <fieldset disabled={pending} className="space-y-3">
          <div className="space-y-2">
            {plan.subjects.map((s) => (
              <div key={s.id} className="grid grid-cols-[1fr_90px] items-center gap-2">
                <label htmlFor={`am-${s.id}`} className="text-sm">
                  {s.name} <span className="text-muted">· {s.available} available</span>
                </label>
                <input
                  id={`am-${s.id}`}
                  type="number"
                  min={0}
                  max={s.available}
                  className={inputCls}
                  value={counts[s.id] ?? 0}
                  onChange={(e) => setCounts((p) => ({ ...p, [s.id]: Math.max(0, Math.min(s.available, Number(e.target.value) || 0)) }))}
                />
              </div>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className={labelCls} htmlFor="am-dur">Duration (minutes)</label>
              <input id="am-dur" type="number" min={1} className={inputCls} value={durationMin || ""} placeholder={String(total)} onChange={(e) => setDurationMin(Number(e.target.value) || 0)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="am-neg">Negative marks per wrong answer</label>
              <input id="am-neg" type="number" step="0.05" min={0} className={inputCls} value={marksWrong} onChange={(e) => setMarksWrong(Number(e.target.value) || 0)} />
            </div>
            <label className="flex items-end gap-2 pb-2 text-sm">
              <input type="checkbox" checked={publish} onChange={(e) => setPublish(e.target.checked)} />
              Publish immediately
            </label>
          </div>
          <button type="button" onClick={generate} disabled={pending || total === 0} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
            {pending ? "Creating…" : `Create free mock (${total} questions)`}
          </button>
        </fieldset>
      )}
      <ErrorList errors={errors} />
      {done && (
        <p role="status" className="text-sm text-success">
          Created {done.published ? "and published" : "as draft"}.{" "}
          <Link href={`/admin/tests/${done.id}`} className="underline">Open in test builder</Link>
        </p>
      )}
    </section>
  );
}

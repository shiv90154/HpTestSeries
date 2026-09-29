"use client";

import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { ExamInput, ExamPattern } from "@/modules/content/exam-content";
import { FaqEditor, SeoFields } from "../../seo-fields";
import { ErrorList, input as inputCls, label as labelCls, panel } from "../../ui";
import { updateExamAction } from "../actions";

const numOrNull = (v: string) => (v === "" ? null : Number(v));

export function ExamForm({ id, path, initial }: { id: string; path: string; initial: ExamInput }) {
  const router = useRouter();
  const [m, setM] = useState(initial);
  const [errors, setErrors] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof ExamInput>(k: K, v: ExamInput[K]) => setM((p) => ({ ...p, [k]: v }));
  const setPattern = (patch: Partial<ExamPattern>) => set("pattern", { ...m.pattern, ...patch });
  const setRow = (i: number, patch: Partial<ExamPattern["sections"][number]>) =>
    setPattern({ sections: m.pattern.sections.map((r, j) => (j === i ? { ...r, ...patch } : r)) });
  const words = `${m.description} ${m.syllabus}`.split(/\s+/).filter(Boolean).length;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);
    setNotice(null);
    startTransition(async () => {
      // Drop blank FAQ and pattern rows instead of failing validation on them.
      const res = await updateExamAction(id, {
        ...m,
        faqs: m.faqs.filter((f) => f.q.trim() || f.a.trim()),
        pattern: { ...m.pattern, sections: m.pattern.sections.filter((r) => r.name.trim()) },
      });
      if (res.ok) {
        setNotice("Saved — the public page updates within a minute.");
        router.refresh();
      } else setErrors(res.errors);
    });
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <fieldset disabled={pending} className="space-y-5">
        <section className={`${panel} space-y-4`}>
          <h2 className="font-semibold">About the exam</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="nameHi">Hindi name</label>
              <input id="nameHi" lang="hi" className={inputCls} value={m.nameHi} onChange={(e) => set("nameHi", e.target.value)} />
            </div>
            <label className="flex items-end gap-2 pb-2 text-sm">
              <input type="checkbox" checked={m.isActive} onChange={(e) => set("isActive", e.target.checked)} />
              Visible on the site
            </label>
          </div>
          <div>
            <label className={labelCls} htmlFor="description">
              Description (markdown) — {words} words incl. syllabus{" "}
              <span className={words >= 300 ? "text-success" : "text-accent-ink"}>{words >= 300 ? "✓ good length" : "· aim for 300+"}</span>
            </label>
            <textarea id="description" rows={10} className={`${inputCls} font-mono`} value={m.description} onChange={(e) => set("description", e.target.value)} />
          </div>
        </section>

        <section className={`${panel} space-y-4`}>
          <h2 className="font-semibold">Exam pattern</h2>
          <div className="space-y-2">
            {m.pattern.sections.map((r, i) => (
              <div key={i} className="grid grid-cols-[1fr_90px_90px_auto] gap-2">
                <input aria-label="Section" className={inputCls} value={r.name} placeholder="Himachal GK" onChange={(e) => setRow(i, { name: e.target.value })} />
                <input
                  aria-label="Questions"
                  type="number"
                  min={0}
                  className={inputCls}
                  value={r.questions ?? ""}
                  placeholder="Qs"
                  onChange={(e) => setRow(i, { questions: numOrNull(e.target.value) })}
                />
                <input
                  aria-label="Marks"
                  type="number"
                  min={0}
                  step="any"
                  className={inputCls}
                  value={r.marks ?? ""}
                  placeholder="Marks"
                  onChange={(e) => setRow(i, { marks: numOrNull(e.target.value) })}
                />
                <button
                  type="button"
                  aria-label="Remove row"
                  onClick={() => setPattern({ sections: m.pattern.sections.filter((_, j) => j !== i) })}
                  className="rounded-lg px-2 text-danger hover:bg-danger-soft"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setPattern({ sections: [...m.pattern.sections, { name: "", questions: null, marks: null }] })}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm hover:border-primary hover:text-primary"
            >
              <Plus className="size-4" /> Add section
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="duration">Duration (minutes)</label>
              <input
                id="duration"
                type="number"
                min={0}
                className={inputCls}
                value={m.pattern.durationMin ?? ""}
                onChange={(e) => setPattern({ durationMin: numOrNull(e.target.value) })}
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="negative">Negative marking</label>
              <input
                id="negative"
                className={inputCls}
                value={m.pattern.negativeMarking}
                placeholder="1/4 mark per wrong answer"
                onChange={(e) => setPattern({ negativeMarking: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className={labelCls} htmlFor="note">Note under the table</label>
            <input id="note" className={inputCls} value={m.pattern.note} onChange={(e) => setPattern({ note: e.target.value })} />
          </div>
        </section>

        <section className={`${panel} space-y-3`}>
          <h2 className="font-semibold">Syllabus (markdown)</h2>
          <p className="text-xs text-muted">Use ## headings per subject and - bullet lists. Tables work too.</p>
          <textarea aria-label="Syllabus (markdown)" rows={14} className={`${inputCls} font-mono`} value={m.syllabus} onChange={(e) => set("syllabus", e.target.value)} />
        </section>

        <section className={`${panel} space-y-3`}>
          <h2 className="font-semibold">FAQs</h2>
          <p className="text-xs text-muted">
            Shown above the 3 standard FAQs and sent to Google as FAQ structured data. Write the questions the way students search — Hinglish is fine.
          </p>
          <FaqEditor faqs={m.faqs} onChange={(faqs) => set("faqs", faqs)} />
        </section>

        <section className={`${panel} space-y-3`}>
          <h2 className="font-semibold">Search appearance</h2>
          <p className="text-xs text-muted">
            <code>{"{year}"}</code> is replaced with the current year.
          </p>
          <SeoFields
            title={m.seo.title}
            description={m.seo.description}
            fallbackTitle="<Exam> Mock Test {year} — Free Test Series in Hindi & English | HP Test Series"
            fallbackDescription="Free <exam> mock tests in a real CBT exam interface…"
            path={path}
            onChange={(seo) => set("seo", seo)}
          />
        </section>
      </fieldset>

      <ErrorList errors={errors} />
      {notice && <p role="status" className="text-sm text-success">{notice}</p>}

      <button disabled={pending} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50">
        {pending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}

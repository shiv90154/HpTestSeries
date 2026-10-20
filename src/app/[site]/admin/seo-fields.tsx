"use client";

import { Plus, Trash2 } from "lucide-react";
import type { Faq } from "@/modules/content/exam-content";
import { input as inputCls, label as labelCls } from "./ui";

/** SEO title/description inputs with a character count and a Google-style snippet preview. */
export function SeoFields({
  title,
  description,
  fallbackTitle,
  fallbackDescription,
  path,
  onChange,
}: {
  title: string;
  description: string;
  fallbackTitle: string;
  fallbackDescription: string;
  path: string;
  onChange: (v: { title: string; description: string }) => void;
}) {
  const shownTitle = title || fallbackTitle;
  const shownDesc = description || fallbackDescription;
  return (
    <div className="space-y-3">
      <div>
        <label className={labelCls} htmlFor="seoTitle">
          SEO title <Count n={title.length} max={60} /> <span className="font-normal">— leave blank for the default</span>
        </label>
        <input id="seoTitle" className={inputCls} value={title} placeholder={fallbackTitle} onChange={(e) => onChange({ title: e.target.value, description })} />
      </div>
      <div>
        <label className={labelCls} htmlFor="seoDescription">
          Meta description <Count n={description.length} max={160} />
        </label>
        <textarea
          id="seoDescription"
          rows={2}
          className={inputCls}
          value={description}
          placeholder={fallbackDescription}
          onChange={(e) => onChange({ title, description: e.target.value })}
        />
      </div>
      <div className="rounded-lg border border-border bg-background p-3">
        <p className="text-xs text-muted">Google preview</p>
        <p className="truncate text-xs text-success">hptestseries.in{path}</p>
        <p className="line-clamp-1 text-base text-[#1a0dab]">{shownTitle}</p>
        <p className="line-clamp-2 text-sm text-muted">{shownDesc}</p>
      </div>
    </div>
  );
}

function Count({ n, max }: { n: number; max: number }) {
  return <span className={`font-normal tabular-nums ${n > max ? "text-danger" : ""}`}>({n}/{max})</span>;
}

/** Editable list of Q&A pairs. Answers accept markdown. */
export function FaqEditor({ faqs, onChange }: { faqs: Faq[]; onChange: (faqs: Faq[]) => void }) {
  const update = (i: number, patch: Partial<Faq>) => onChange(faqs.map((f, j) => (j === i ? { ...f, ...patch } : f)));
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => (
        <div key={i} className="space-y-2 rounded-lg border border-border p-3">
          <div className="flex gap-2">
            <input
              aria-label={`FAQ ${i + 1} question`}
              className={inputCls}
              value={f.q}
              placeholder="HP Police constable exam pattern kya hai?"
              onChange={(e) => update(i, { q: e.target.value })}
            />
            <button
              type="button"
              aria-label="Remove FAQ"
              onClick={() => onChange(faqs.filter((_, j) => j !== i))}
              className="rounded-lg px-2 text-danger hover:bg-danger-soft"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
          <textarea
            aria-label={`FAQ ${i + 1} answer`}
            rows={3}
            className={inputCls}
            value={f.a}
            placeholder="Answer (markdown allowed)"
            onChange={(e) => update(i, { a: e.target.value })}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...faqs, { q: "", a: "" }])}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm hover:border-primary hover:text-primary"
      >
        <Plus className="size-4" /> Add FAQ
      </button>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { TYPE_LABEL, slugify, type TestMetaInput } from "@/modules/content/test-input";
import { ErrorList, input as inputCls, label as labelCls, panel } from "../ui";
import { createTestAction, updateTestMetaAction } from "./actions";

const DEMO_PRESETS = [20, 30, 40, 50, 60, 70, 80];

type Props = {
  id: string | null;
  initial: TestMetaInput;
  exams: { id: string; name: string; body: string }[];
  /** URL of a published test is fixed */
  slugLocked: boolean;
  readOnly?: boolean;
};

export function TestMetaForm({ id, initial, exams, slugLocked, readOnly }: Props) {
  const router = useRouter();
  const [m, setM] = useState(initial);
  const [slugTouched, setSlugTouched] = useState(!!id);
  const [errors, setErrors] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof TestMetaInput>(k: K, v: TestMetaInput[K]) => setM((p) => ({ ...p, [k]: v }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);
    setNotice(null);
    startTransition(async () => {
      if (!id) {
        const res = await createTestAction(m);
        if (res.ok) router.push(`/admin/tests/${res.id}`);
        else setErrors(res.errors);
      } else {
        const res = await updateTestMetaAction(id, m);
        if (res.ok) {
          setNotice("Details saved.");
          router.refresh();
        } else setErrors(res.errors);
      }
    });
  }

  return (
    <form onSubmit={submit} className={`${panel} space-y-4`}>
      <fieldset disabled={pending || readOnly} className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="title">Title (English)</label>
          <input
            id="title"
            className={inputCls}
            value={m.title}
            placeholder="HPRCA JOA IT Mock Test 1"
            onChange={(e) => {
              const title = e.target.value;
              setM((p) => ({ ...p, title, ...(!slugTouched && { slug: slugify(title) }) }));
            }}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="titleHi">Title (Hindi, optional)</label>
          <input id="titleHi" lang="hi" className={inputCls} value={m.titleHi} placeholder="जेओए आईटी मॉक टेस्ट 1" onChange={(e) => set("titleHi", e.target.value)} />
        </div>
        <div>
          <label className={labelCls} htmlFor="slug">Page URL</label>
          <div className="flex items-center rounded-lg border border-border bg-surface-muted text-sm">
            <span className="pl-3 text-muted">/tests/</span>
            <input
              id="slug"
              className="w-full rounded-r-lg bg-surface px-2 py-2 focus:outline-none disabled:bg-surface-muted"
              value={m.slug}
              disabled={slugLocked}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", e.target.value.toLowerCase());
              }}
            />
          </div>
          {slugLocked && <p className="mt-1 text-xs text-muted">The URL of a published test can’t change.</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="exam">Exam</label>
          <select id="exam" className={inputCls} value={m.examId ?? ""} onChange={(e) => set("examId", e.target.value || null)}>
            <option value="">Common (shown on every exam page)</option>
            {exams.map((e) => (
              <option key={e.id} value={e.id}>{e.body} — {e.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="type">Type</label>
          <select id="type" className={inputCls} value={m.type} onChange={(e) => set("type", e.target.value as TestMetaInput["type"])}>
            {Object.entries(TYPE_LABEL).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls} htmlFor="duration">Duration (minutes)</label>
            <input id="duration" type="number" min={1} className={inputCls} value={m.durationMin || ""} onChange={(e) => set("durationMin", Number(e.target.value))} />
          </div>
          <div>
            <span className={labelCls}>Access</span>
            <label className="flex h-9 items-center gap-2 text-sm">
              <input type="checkbox" checked={m.isFree} onChange={(e) => set("isFree", e.target.checked)} />
              Free for everyone
            </label>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="demo">Free demo (paid tests only)</label>
          <select
            id="demo"
            className={inputCls}
            value={m.isFree ? 0 : m.demoPercent}
            disabled={m.isFree}
            onChange={(e) => set("demoPercent", Number(e.target.value))}
          >
            <option value={0}>Off — only buyers can attempt this test</option>
            {[...new Set([...DEMO_PRESETS, m.demoPercent])]
              .filter((p) => p > 0)
              .sort((a, b) => a - b)
              .map((p) => (
                <option key={p} value={p}>
                  On — first {p}% of every section is free for anyone
                </option>
              ))}
          </select>
          <p className="mt-1 text-xs text-muted">
            {m.isFree
              ? "Free tests don't need a demo."
              : "When on, visitors get a “Try free demo” button, and a “Pay now” popup appears when the free part ends. Demos are not saved and never affect ranks. Keep it Off for tests you want people to pay for without trying."}
          </p>
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="instructions">Instructions (optional, shown before the test starts)</label>
          <textarea id="instructions" rows={3} className={inputCls} value={m.instructions} onChange={(e) => set("instructions", e.target.value)} />
        </div>
      </fieldset>

      <ErrorList errors={errors} />
      {notice && <p role="status" className="text-sm text-success">{notice}</p>}

      {!readOnly && (
        <button disabled={pending} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50">
          {pending ? "Saving…" : id ? "Save details" : "Create test & add questions"}
        </button>
      )}
    </form>
  );
}

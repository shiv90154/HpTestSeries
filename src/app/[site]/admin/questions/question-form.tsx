"use client";

import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { RichContent } from "@/components/rich-content";
import { ImageUploadButton, withImage } from "../image-upload-button";
import type { Taxonomy } from "@/modules/content/taxonomy";
import { MAX_OPTIONS, MIN_OPTIONS, emptyQuestionInput, type Lang, type QuestionInput } from "@/modules/content/question-shape";
import { ErrorList, input as inputCls, label as labelCls, panel } from "../ui";
import { deleteQuestionAction, saveQuestionAction } from "./actions";

type Props = {
  id: string | null;
  initial: QuestionInput;
  status: string | null;
  taxonomy: Taxonomy;
  canPublish: boolean;
  canDelete: boolean;
  /** options can't be removed once the question is in a test (attempt answers point at them) */
  lockedOptionCount: number;
};

const LETTERS = "ABCDE";
const LANG_LABEL: Record<Lang, string> = { en: "English", hi: "हिंदी (Hindi)" };

export function QuestionForm({ id, initial, status, taxonomy, canPublish, canDelete, lockedOptionCount }: Props) {
  const router = useRouter();
  const [q, setQ] = useState<QuestionInput>(initial);
  const [subjectId, setSubjectId] = useState(
    () => taxonomy.subjects.find((s) => s.topics.some((t) => t.id === initial.topicId))?.id ?? "",
  );
  const [errors, setErrors] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [previewLang, setPreviewLang] = useState<Lang>("en");

  const langs = (["en", "hi"] as const).filter((l) => q.langs[l]);
  const topics = taxonomy.subjects.find((s) => s.id === subjectId)?.topics ?? [];
  const readOnly = status === "PUBLISHED" && !canPublish;

  const set = <K extends keyof QuestionInput>(key: K, value: QuestionInput[K]) => setQ((prev) => ({ ...prev, [key]: value }));
  const setText = (field: "stem" | "explanation", lang: Lang, value: string) =>
    setQ((prev) => ({ ...prev, [field]: { ...prev[field], [lang]: value } }));
  const setOption = (i: number, lang: Lang, value: string) =>
    setQ((prev) => ({ ...prev, options: prev.options.map((o, j) => (j === i ? { ...o, [lang]: value } : o)) }));

  function removeOption(i: number) {
    setQ((prev) => ({
      ...prev,
      options: prev.options.filter((_, j) => j !== i),
      correctIndex: prev.correctIndex === i ? -1 : prev.correctIndex > i ? prev.correctIndex - 1 : prev.correctIndex,
    }));
  }

  function save(target: "DRAFT" | "IN_REVIEW" | "PUBLISHED", next = false) {
    setErrors([]);
    setNotice(null);
    startTransition(async () => {
      const res = await saveQuestionAction(id, q, target);
      if (!res.ok) {
        setErrors(res.errors);
        return;
      }
      if (next) {
        // Keep the classification so a batch on the same topic is quick to enter.
        const blank = emptyQuestionInput();
        setQ({ ...blank, topicId: q.topicId, difficulty: q.difficulty, sourceType: q.sourceType, sourceExamId: q.sourceExamId, sourceYear: q.sourceYear, langs: q.langs, options: q.options.map(() => ({ en: "", hi: "" })) });
        setNotice("Saved. Enter the next question.");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (!id) {
        router.replace(`/admin/questions/${res.id}?saved=1`);
      } else {
        setNotice("Saved.");
        router.refresh();
      }
    });
  }

  function remove() {
    if (!id || !confirm("Delete this question permanently?")) return;
    startTransition(async () => {
      const res = await deleteQuestionAction(id);
      if (res.ok) router.replace("/admin/questions?msg=Question%20deleted.");
      else setErrors([res.error]);
    });
  }

  const cols = langs.length === 2 ? "sm:grid-cols-2" : "";

  return (
    <div className="space-y-5">
      {readOnly && (
        <p className="rounded-xl border border-accent bg-accent-soft p-3 text-sm">
          This question is published. Only a reviewer can change it. Ask a reviewer to make the change.
        </p>
      )}
      {notice && (
        <p role="status" className="rounded-xl border border-primary bg-primary-soft p-3 text-sm">
          {notice}
        </p>
      )}

      <fieldset disabled={readOnly || pending} className="space-y-5">
        <section className={`${panel} grid gap-4 sm:grid-cols-2 lg:grid-cols-4`}>
          <div>
            <label className={labelCls} htmlFor="subject">Subject</label>
            <select
              id="subject"
              className={inputCls}
              value={subjectId}
              onChange={(e) => {
                setSubjectId(e.target.value);
                set("topicId", "");
              }}
            >
              <option value="">Choose…</option>
              {taxonomy.subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="topic">Topic</label>
            <select id="topic" className={inputCls} value={q.topicId} onChange={(e) => set("topicId", e.target.value)} disabled={!subjectId}>
              <option value="">Choose…</option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="difficulty">Difficulty</label>
            <select id="difficulty" className={inputCls} value={q.difficulty} onChange={(e) => set("difficulty", e.target.value as QuestionInput["difficulty"])}>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>
          </div>
          <div>
            <span className={labelCls}>Languages</span>
            <div className="flex h-9 items-center gap-4 text-sm">
              {(["en", "hi"] as const).map((l) => (
                <label key={l} className="flex items-center gap-1.5">
                  <input type="checkbox" checked={q.langs[l]} onChange={(e) => set("langs", { ...q.langs, [l]: e.target.checked })} />
                  {l === "en" ? "English" : "Hindi"}
                </label>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2 lg:col-span-4">
            <span className={labelCls}>Source</span>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <label className="flex items-center gap-1.5">
                <input type="radio" checked={q.sourceType === "ORIGINAL"} onChange={() => setQ({ ...q, sourceType: "ORIGINAL", sourceExamId: null, sourceYear: null })} />
                Original
              </label>
              <label className="flex items-center gap-1.5">
                <input type="radio" checked={q.sourceType === "PYQ"} onChange={() => set("sourceType", "PYQ")} />
                Previous year question (PYQ)
              </label>
              {q.sourceType === "PYQ" && (
                <>
                  <select aria-label="Exam" className={`${inputCls} w-auto`} value={q.sourceExamId ?? ""} onChange={(e) => set("sourceExamId", e.target.value || null)}>
                    <option value="">Which exam?</option>
                    {taxonomy.exams.map((e) => (
                      <option key={e.id} value={e.id}>{e.body} — {e.name}</option>
                    ))}
                  </select>
                  <input
                    aria-label="Year"
                    type="number"
                    placeholder="Year"
                    className={`${inputCls} w-28`}
                    value={q.sourceYear ?? ""}
                    onChange={(e) => set("sourceYear", e.target.value ? Number(e.target.value) : null)}
                  />
                </>
              )}
            </div>
          </div>
        </section>

        <section className={`${panel} space-y-5`}>
          <div className={`grid gap-4 ${cols}`}>
            {langs.map((l) => (
              <div key={l}>
                <div className="flex items-center justify-between gap-2">
                  <label className={labelCls} htmlFor={`stem-${l}`}>Question — {LANG_LABEL[l]}</label>
                  <ImageUploadButton onUploaded={(url) => setText("stem", l, withImage(q.stem[l], url))} />
                </div>
                <textarea id={`stem-${l}`} rows={4} lang={l} className={`${inputCls} font-reading`} value={q.stem[l]} onChange={(e) => setText("stem", l, e.target.value)} />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <span className={labelCls}>Options — tick the correct answer</span>
            {q.options.map((o, i) => (
              <div key={i} className="flex items-start gap-2">
                <label className={`flex h-9 w-12 shrink-0 cursor-pointer items-center justify-center gap-1 rounded-lg border text-sm font-semibold ${q.correctIndex === i ? "border-success bg-success-soft text-success" : "border-border"}`}>
                  <input type="radio" name="correct" className="sr-only" checked={q.correctIndex === i} onChange={() => set("correctIndex", i)} />
                  {LETTERS[i]}
                </label>
                <div className={`grid flex-1 gap-2 ${cols}`}>
                  {langs.map((l) => (
                    <input key={l} lang={l} aria-label={`Option ${LETTERS[i]} ${l}`} className={`${inputCls} font-reading`} value={o[l]} onChange={(e) => setOption(i, l, e.target.value)} />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => removeOption(i)}
                  disabled={q.options.length <= Math.max(MIN_OPTIONS, lockedOptionCount)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted hover:text-danger disabled:opacity-30"
                  aria-label={`Remove option ${LETTERS[i]}`}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
            {q.options.length < MAX_OPTIONS && (
              <button type="button" onClick={() => set("options", [...q.options, { en: "", hi: "" }])} className="flex items-center gap-1 text-sm font-medium text-primary">
                <Plus className="size-4" /> Add option
              </button>
            )}
          </div>

          <div className={`grid gap-4 ${cols}`}>
            {langs.map((l) => (
              <div key={l}>
                <div className="flex items-center justify-between gap-2">
                  <label className={labelCls} htmlFor={`exp-${l}`}>Explanation — {LANG_LABEL[l]} (optional, shown in solutions)</label>
                  <ImageUploadButton onUploaded={(url) => setText("explanation", l, withImage(q.explanation[l], url))} />
                </div>
                <textarea id={`exp-${l}`} rows={3} lang={l} className={`${inputCls} font-reading`} value={q.explanation[l]} onChange={(e) => setText("explanation", l, e.target.value)} />
              </div>
            ))}
          </div>
        </section>

        {langs.length > 0 && (
          <section className={`${panel} space-y-3`}>
            <div className="flex items-center justify-between">
              <span className={labelCls}>Preview — how the student will see this</span>
              {langs.length === 2 && (
                <div className="flex gap-1 text-xs">
                  {langs.map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setPreviewLang(l)}
                      className={`rounded-md px-2 py-1 font-medium ${previewLang === l ? "bg-primary text-primary-foreground" : "text-muted hover:bg-surface-muted"}`}
                    >
                      {LANG_LABEL[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {(() => {
              const l = langs.includes(previewLang) ? previewLang : langs[0];
              return (
                <div className="rounded-xl border border-border bg-surface p-4">
                  <RichContent text={q.stem[l]} className="text-base leading-relaxed" />
                  <ul className="mt-4 space-y-2 text-sm">
                    {q.options.map((o, i) => (
                      <li key={i} className={`flex items-start gap-2 rounded-lg border px-3 py-2 ${q.correctIndex === i ? "border-success bg-success-soft" : "border-border"}`}>
                        <span className="font-sans font-semibold text-muted">{LETTERS[i]}.</span>
                        <RichContent text={o[l]} className="flex-1" />
                      </li>
                    ))}
                  </ul>
                  {q.explanation[l] && (
                    <div className="mt-4 rounded-lg bg-primary-soft/60 p-3 text-sm">
                      <p className="mb-1 font-semibold text-primary">Explanation</p>
                      <RichContent text={q.explanation[l]} />
                    </div>
                  )}
                </div>
              );
            })()}
          </section>
        )}
      </fieldset>

      <ErrorList errors={errors} />

      {!readOnly && (
        <div className="sticky bottom-0 -mx-4 flex flex-wrap items-center gap-2 border-t border-border bg-background/95 px-4 py-3 backdrop-blur">
          <button type="button" disabled={pending} onClick={() => save("DRAFT")} className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium disabled:opacity-50">
            Save draft
          </button>
          {!canPublish && (
            <button type="button" disabled={pending} onClick={() => save("IN_REVIEW")} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50">
              Submit for review
            </button>
          )}
          {canPublish && (
            <button type="button" disabled={pending} onClick={() => save("PUBLISHED")} className="rounded-lg bg-success px-4 py-2 text-sm font-medium text-white disabled:opacity-50">
              {status === "PUBLISHED" ? "Save (stays published)" : "Publish"}
            </button>
          )}
          {!id && (
            <button type="button" disabled={pending} onClick={() => save(canPublish ? "PUBLISHED" : "IN_REVIEW", true)} className="rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary disabled:opacity-50">
              {canPublish ? "Publish & add next" : "Submit & add next"}
            </button>
          )}
          {pending && <span className="text-sm text-muted">Saving…</span>}
          {id && canDelete && (
            <button type="button" disabled={pending} onClick={remove} className="ml-auto text-sm font-medium text-danger disabled:opacity-50">
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}

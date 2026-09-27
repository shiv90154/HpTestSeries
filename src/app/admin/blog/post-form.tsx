"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Markdown } from "@/components/markdown";
import { CATEGORY_META, POST_CATEGORIES, readingMinutes, type PostInput } from "@/modules/content/post-input";
import { slugify } from "@/modules/content/test-input";
import { FaqEditor, SeoFields } from "../seo-fields";
import { ErrorList, input as inputCls, label as labelCls, panel } from "../ui";
import { createPostAction, deletePostAction, setPostPublishedAction, updatePostAction } from "./actions";

type Props = {
  id: string | null;
  status: string;
  canPublish: boolean;
  examOptions: { id: string; label: string }[];
  initial: PostInput;
};

const CONTENT_HINT = `## Notification overview
Short intro — kaunsi post, kitni vacancies, kab tak apply.

| Detail | Info |
|---|---|
| Posts | ... |
| Last date | ... |

## Eligibility
- Age: ...
- Qualification: ...

## Selection process
...

[Free mock test do](/tests/hp-gk-free-mock-1)`;

export function PostForm({ id, status, canPublish, examOptions, initial }: Props) {
  const router = useRouter();
  const [m, setM] = useState(initial);
  const [slugTouched, setSlugTouched] = useState(!!id);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [errors, setErrors] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof PostInput>(k: K, v: PostInput[K]) => setM((p) => ({ ...p, [k]: v }));
  const payload = () => ({ ...m, faqs: m.faqs.filter((f) => f.q.trim() || f.a.trim()) });
  const words = m.content.split(/\s+/).filter(Boolean).length;
  const published = status === "PUBLISHED";

  function toggleExam(examId: string) {
    set("examIds", m.examIds.includes(examId) ? m.examIds.filter((e) => e !== examId) : [...m.examIds, examId]);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);
    setNotice(null);
    startTransition(async () => {
      if (!id) {
        const res = await createPostAction(payload());
        if (res.ok) router.push(`/admin/blog/${res.id}`);
        else setErrors(res.errors);
      } else {
        const res = await updatePostAction(id, payload());
        if (res.ok) {
          setNotice("Saved.");
          router.refresh();
        } else setErrors(res.errors);
      }
    });
  }

  function togglePublish() {
    if (!id) return;
    setErrors([]);
    setNotice(null);
    startTransition(async () => {
      // Save first so what goes live is what's on screen.
      const saved = await updatePostAction(id, payload());
      if (!saved.ok) return setErrors(saved.errors);
      const res = await setPostPublishedAction(id, !published);
      if (res.ok) {
        setNotice(published ? "Moved back to draft." : "Published! Now ask Google to index it: GSC → URL Inspection → Request indexing.");
        router.refresh();
      } else setErrors(res.errors);
    });
  }

  function remove() {
    if (!id || !confirm(`Delete "${m.title}"? This can't be undone.`)) return;
    startTransition(async () => {
      const res = await deletePostAction(id);
      if (res.ok) router.push("/admin/blog");
      else setErrors(res.errors);
    });
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <fieldset disabled={pending} className="space-y-5">
        <section className={`${panel} grid gap-4 sm:grid-cols-2`}>
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="title">
              Title — put the main keyword first ({m.title.length}/160)
            </label>
            <input
              id="title"
              className={inputCls}
              value={m.title}
              placeholder="HP Police Constable Bharti 2026: Notification, Eligibility, Exam Pattern"
              onChange={(e) => {
                const title = e.target.value;
                setM((p) => ({ ...p, title, ...(!slugTouched && { slug: slugify(title) }) }));
              }}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="titleHi">Hindi title (optional)</label>
            <input id="titleHi" lang="hi" className={inputCls} value={m.titleHi} onChange={(e) => set("titleHi", e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="slug">URL</label>
            <div className="flex items-center rounded-lg border border-border bg-surface-muted text-sm">
              <span className="pl-3 text-muted">/blog/</span>
              <input
                id="slug"
                className="w-full rounded-r-lg bg-surface px-2 py-2 focus:outline-none"
                value={m.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set("slug", e.target.value.toLowerCase());
                }}
              />
            </div>
            {published && <p className="mt-1 text-xs text-accent-strong">Changing the URL of a published post breaks links Google already has.</p>}
          </div>
          <div>
            <label className={labelCls} htmlFor="category">Category</label>
            <select id="category" className={inputCls} value={m.category} onChange={(e) => set("category", e.target.value as PostInput["category"])}>
              {POST_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_META[c].label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="cover">Cover image URL (optional)</label>
            <input id="cover" className={inputCls} value={m.coverImage} placeholder="https://…" onChange={(e) => set("coverImage", e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="excerpt">
              Excerpt — 1–2 lines shown on cards and used as the meta description ({m.excerpt.length}/300)
            </label>
            <textarea id="excerpt" rows={2} className={inputCls} value={m.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <span className={labelCls}>Related exams — the post shows on these exam pages and links back to them</span>
            <div className="flex flex-wrap gap-2">
              {examOptions.map((e) => (
                <label
                  key={e.id}
                  className={`flex cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm ${
                    m.examIds.includes(e.id) ? "border-primary bg-primary-soft text-primary" : "border-border"
                  }`}
                >
                  <input type="checkbox" className="sr-only" checked={m.examIds.includes(e.id)} onChange={() => toggleExam(e.id)} />
                  {e.label}
                </label>
              ))}
            </div>
          </div>
        </section>

        <section className={`${panel} space-y-3`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-semibold">
              Content <span className="text-sm font-normal text-muted">· {words} words · {readingMinutes(m.content)} min read</span>
            </h2>
            <div className="flex rounded-lg border border-border p-0.5 text-sm">
              {(["write", "preview"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`rounded-md px-3 py-1 capitalize ${tab === t ? "bg-primary text-primary-foreground" : "text-muted"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted">
            Markdown: ## heading, - list, **bold**, [link](/tests/…), tables with | pipes |. Aim for 600+ words and link to at least one exam page and one free test.
          </p>
          {tab === "write" ? (
            <textarea
              rows={24}
              className={`${inputCls} font-mono`}
              value={m.content}
              placeholder={CONTENT_HINT}
              onChange={(e) => set("content", e.target.value)}
            />
          ) : (
            <div className="min-h-64 rounded-lg border border-border p-4">
              {m.content ? <Markdown text={m.content} /> : <p className="text-sm text-muted">Nothing to preview yet.</p>}
            </div>
          )}
        </section>

        <section className={`${panel} space-y-3`}>
          <h2 className="font-semibold">FAQs (optional)</h2>
          <p className="text-xs text-muted">Shown at the end of the post and sent to Google as FAQ structured data.</p>
          <FaqEditor faqs={m.faqs} onChange={(faqs) => set("faqs", faqs)} />
        </section>

        <section className={`${panel} space-y-3`}>
          <h2 className="font-semibold">Search appearance</h2>
          <SeoFields
            title={m.seoTitle}
            description={m.seoDescription}
            fallbackTitle={`${m.title || "Post title"} | HP Test Series`}
            fallbackDescription={m.excerpt || "The excerpt is used when this is blank."}
            path={`/blog/${m.slug}`}
            onChange={(v) => setM((p) => ({ ...p, seoTitle: v.title, seoDescription: v.description }))}
          />
        </section>
      </fieldset>

      <ErrorList errors={errors} />
      {notice && <p role="status" className="text-sm text-success">{notice}</p>}

      <div className="flex flex-wrap items-center gap-3">
        <button disabled={pending} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50">
          {pending ? "Saving…" : id ? "Save" : "Create draft"}
        </button>
        {id && canPublish && (
          <button
            type="button"
            onClick={togglePublish}
            disabled={pending}
            className={`rounded-lg px-5 py-2 text-sm font-medium disabled:opacity-50 ${published ? "border border-border" : "bg-success text-white"}`}
          >
            {published ? "Unpublish" : "Save & publish"}
          </button>
        )}
        {id && !canPublish && !published && <span className="text-xs text-muted">A reviewer or admin publishes posts.</span>}
        {id && published && (
          <a href={`/blog/${m.slug}`} target="_blank" rel="noreferrer" className="text-sm text-primary underline">
            View live
          </a>
        )}
        {id && (
          <button type="button" onClick={remove} disabled={pending} className="ml-auto rounded-lg px-4 py-2 text-sm font-medium text-danger hover:bg-danger-soft">
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

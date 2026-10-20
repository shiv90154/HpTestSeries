"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { slugify } from "@/modules/content/test-input";
import { ErrorList, input as inputCls, label as labelCls, panel } from "../../ui";
import { createExamAction } from "../actions";

const NEW_BODY = "__new__";

export function NewExamForm({ bodies }: { bodies: { id: string; name: string; slug: string }[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [bodyId, setBodyId] = useState(bodies[0]?.id ?? NEW_BODY);
  const [bodyName, setBodyName] = useState("");
  const [bodySlug, setBodySlug] = useState("");
  const [bodySlugTouched, setBodySlugTouched] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [pending, startTransition] = useTransition();

  const isNewBody = bodyId === NEW_BODY;
  const bodySlugShown = isNewBody ? bodySlug : (bodies.find((b) => b.id === bodyId)?.slug ?? "");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);
    startTransition(async () => {
      const res = await createExamAction({
        name,
        slug,
        bodyId: isNewBody ? "" : bodyId,
        newBody: { name: bodyName, slug: bodySlug },
      });
      if (res.ok) router.push(`/admin/exams/${res.id}`);
      else setErrors(res.errors);
    });
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <fieldset disabled={pending} className={`${panel} space-y-4`}>
        <div>
          <label className={labelCls} htmlFor="body">Conducting body</label>
          <select id="body" className={inputCls} value={bodyId} onChange={(e) => setBodyId(e.target.value)}>
            {bodies.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} (/{b.slug})
              </option>
            ))}
            <option value={NEW_BODY}>＋ New body…</option>
          </select>
        </div>

        {isNewBody && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="bodyName">New body name</label>
              <input
                id="bodyName"
                className={inputCls}
                value={bodyName}
                placeholder="HP Public Service Commission"
                onChange={(e) => {
                  setBodyName(e.target.value);
                  if (!bodySlugTouched) setBodySlug(slugify(e.target.value));
                }}
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="bodySlug">Body URL slug</label>
              <input
                id="bodySlug"
                className={inputCls}
                value={bodySlug}
                placeholder="hppsc"
                onChange={(e) => {
                  setBodySlug(e.target.value);
                  setBodySlugTouched(true);
                }}
              />
            </div>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="name">Exam name</label>
            <input
              id="name"
              className={inputCls}
              value={name}
              placeholder="Junior Office Assistant (IT)"
              onChange={(e) => {
                setName(e.target.value);
                if (!slugTouched) setSlug(slugify(e.target.value));
              }}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="slug">Exam URL slug</label>
            <input
              id="slug"
              className={inputCls}
              value={slug}
              placeholder="joa-it"
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugTouched(true);
              }}
            />
          </div>
        </div>
        <p className="text-xs text-muted">
          Public page: /{bodySlugShown || "<body>"}/{slug || "<exam>"} — the URL can’t be changed safely once the page is indexed.
        </p>
      </fieldset>

      <ErrorList errors={errors} />

      <button disabled={pending} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50">
        {pending ? "Creating…" : "Create exam"}
      </button>
    </form>
  );
}

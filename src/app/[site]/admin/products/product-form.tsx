"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { KIND_LABEL, PRODUCT_KINDS, slugify, type ProductInput } from "@/modules/commerce/product-input";
import { ErrorList, input as inputCls, label as labelCls, panel } from "../ui";
import { createProductAction, deleteProductAction, updateProductAction } from "./actions";

type Props = {
  id: string | null;
  initial: ProductInput;
  seriesOptions: { id: string; title: string; examName: string; testCount: number }[];
};

export function ProductForm({ id, initial, seriesOptions }: Props) {
  const router = useRouter();
  const [m, setM] = useState(initial);
  const [slugTouched, setSlugTouched] = useState(!!id);
  const [errors, setErrors] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof ProductInput>(k: K, v: ProductInput[K]) => setM((p) => ({ ...p, [k]: v }));

  function toggleSeries(seriesId: string) {
    set("seriesIds", m.seriesIds.includes(seriesId) ? m.seriesIds.filter((s) => s !== seriesId) : [...m.seriesIds, seriesId]);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);
    setNotice(null);
    startTransition(async () => {
      if (!id) {
        const res = await createProductAction(m);
        if (res.ok) router.push(`/admin/products/${res.id}`);
        else setErrors(res.errors);
      } else {
        const res = await updateProductAction(id, m);
        if (res.ok) {
          setNotice("Saved.");
          router.refresh();
        } else setErrors(res.errors);
      }
    });
  }

  function remove() {
    if (!id || !confirm(`Delete "${m.title}"? This can't be undone.`)) return;
    startTransition(async () => {
      const res = await deleteProductAction(id);
      if (res.ok) router.push("/admin/products");
      else setErrors(res.errors);
    });
  }

  return (
    <form onSubmit={submit} className={`${panel} space-y-4`}>
      <fieldset disabled={pending} className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="title">Title (English)</label>
          <input
            id="title"
            className={inputCls}
            value={m.title}
            placeholder="All-Access Pass — 2026"
            onChange={(e) => {
              const title = e.target.value;
              setM((p) => ({ ...p, title, ...(!slugTouched && { slug: slugify(title) }) }));
            }}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="titleHi">Title (Hindi, optional)</label>
          <input id="titleHi" lang="hi" className={inputCls} value={m.titleHi} onChange={(e) => set("titleHi", e.target.value)} />
        </div>
        <div>
          <label className={labelCls} htmlFor="slug">Buy page URL</label>
          <div className="flex items-center rounded-lg border border-border bg-surface-muted text-sm">
            <span className="pl-3 text-muted">/buy/</span>
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
        </div>
        <div>
          <label className={labelCls} htmlFor="kind">Kind</label>
          <select id="kind" className={inputCls} value={m.kind} onChange={(e) => set("kind", e.target.value as ProductInput["kind"])}>
            {PRODUCT_KINDS.map((k) => (
              <option key={k} value={k}>{KIND_LABEL[k]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="price">Price (₹)</label>
          <input
            id="price"
            type="number"
            min={1}
            className={inputCls}
            value={m.priceRupees || ""}
            onChange={(e) => set("priceRupees", Number(e.target.value))}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="validity">Validity (days from purchase)</label>
          <input
            id="validity"
            type="number"
            min={1}
            className={inputCls}
            value={m.validityDays || ""}
            onChange={(e) => set("validityDays", Number(e.target.value))}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="flex h-9 items-center gap-2 text-sm">
            <input type="checkbox" checked={m.isActive} onChange={(e) => set("isActive", e.target.checked)} />
            Active (visible and purchasable)
          </label>
        </div>

        {m.kind === "PASS" ? (
          <p className="rounded-lg border border-danger bg-danger-soft p-3 text-sm text-danger sm:col-span-2">
            An All-Access Pass opens <b>every paid test of every exam</b>, whichever series you pick elsewhere. To sell just one exam (JOA IT, Police,
            Patwari…), choose Series or Pack and tick only that series.
          </p>
        ) : (
          <div className="sm:col-span-2">
            <span className={labelCls}>Series included</span>
            {seriesOptions.length === 0 ? (
              <p className="text-sm text-muted">No test series exist yet — this product can&apos;t be sold until one does.</p>
            ) : (
              <div className="max-h-48 space-y-1 overflow-y-auto rounded-lg border border-border p-2">
                {seriesOptions.map((s) => (
                  <label key={s.id} className="flex items-center gap-2 rounded px-1 py-1 text-sm hover:bg-surface-muted">
                    <input type="checkbox" checked={m.seriesIds.includes(s.id)} onChange={() => toggleSeries(s.id)} />
                    {s.title} <span className="text-xs text-muted">({s.examName} · {s.testCount} tests)</span>
                  </label>
                ))}
              </div>
            )}
            <p className="mt-1.5 text-xs text-muted">
              Buyers get only the ticked series:{" "}
              <b>{seriesOptions.filter((s) => m.seriesIds.includes(s.id)).reduce((n, s) => n + s.testCount, 0)} tests</b>. Everything else stays locked for them.
            </p>
          </div>
        )}
      </fieldset>

      <ErrorList errors={errors} />
      {notice && <p role="status" className="text-sm text-success">{notice}</p>}

      <div className="flex items-center gap-3">
        <button disabled={pending} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50">
          {pending ? "Saving…" : id ? "Save changes" : "Create product"}
        </button>
        {id && (
          <button type="button" onClick={remove} disabled={pending} className="rounded-lg px-4 py-2 text-sm font-medium text-danger hover:bg-danger-soft">
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

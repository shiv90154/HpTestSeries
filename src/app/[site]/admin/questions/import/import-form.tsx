"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import type { ImportCommitResult, ImportPreview } from "@/modules/content/import-service";
import { commitImportAction, previewImportAction } from "./actions";

const MAX_ERRORS_SHOWN = 100;

export function ImportForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<ImportPreview | null>(null);
  const [result, setResult] = useState<ImportCommitResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function formData() {
    const fd = new FormData();
    if (file) fd.set("file", file);
    return fd;
  }

  function check() {
    setError(null);
    setResult(null);
    startTransition(async () => {
      const res = await previewImportAction(formData());
      if ("error" in res) {
        setPreview(null);
        setError(res.error);
      } else setPreview(res);
    });
  }

  function commit() {
    setError(null);
    startTransition(async () => {
      const res = await commitImportAction(formData());
      setResult(res);
      if (res.ok) setPreview(null);
    });
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="file"
          accept=".csv,text/csv"
          aria-label="Questions CSV file"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
            setPreview(null);
            setResult(null);
            setError(null);
          }}
          className="text-sm file:mr-3 file:rounded-lg file:border file:border-border file:bg-surface file:px-3 file:py-2"
        />
        <button
          type="button"
          onClick={check}
          disabled={!file || pending}
          className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium disabled:opacity-50"
        >
          {pending && !preview ? "Checking…" : "Check file"}
        </button>
      </div>

      {error && <p role="alert" className="text-sm text-danger">{error}</p>}

      {result && (
        <div role="status" className={`rounded-xl border p-4 text-sm ${result.ok ? "border-primary" : "border-danger text-danger"}`}>
          {result.ok ? (
            <>
              Imported <b>{result.created}</b> question{result.created === 1 ? "" : "s"} as Draft
              {result.skippedExisting > 0 && `, skipped ${result.skippedExisting} already in the bank`}
              {result.skippedInvalid > 0 && `, skipped ${result.skippedInvalid} invalid row(s)`}.{" "}
              <Link href="/admin/questions?status=DRAFT" className="text-primary underline">
                Review drafts
              </Link>
            </>
          ) : (
            result.error
          )}
        </div>
      )}

      {preview && (
        <div className="space-y-4">
          {preview.fatal ? (
            <p role="alert" className="rounded-xl border border-danger p-4 text-sm text-danger">
              {preview.fatal}
            </p>
          ) : (
            <>
              <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Stat label="Rows" value={preview.totalRows} />
                <Stat label="Ready to import" value={preview.newCount} highlight />
                <Stat label="Already in bank" value={preview.existing.length} />
                <Stat label="Rows with errors" value={preview.errors.length} danger={preview.errors.length > 0} />
              </dl>

              {preview.sample.length > 0 && (
                <section className="space-y-2">
                  <h2 className="text-sm font-medium">First questions to be imported</h2>
                  <ul className="divide-y divide-border rounded-xl border border-border bg-surface text-sm">
                    {preview.sample.map((s) => (
                      <li key={s.row} className="flex gap-3 p-3">
                        <span className="w-12 shrink-0 text-muted">#{s.row}</span>
                        <span className="flex-1">{s.preview}</span>
                        <span className="shrink-0 text-xs text-muted">
                          {s.langs} · {s.options} opts
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {preview.errors.length > 0 && (
                <section className="space-y-2">
                  <h2 className="text-sm font-medium text-danger">
                    Rows with errors (these will be skipped; fix them and import again)
                  </h2>
                  <ul className="max-h-96 divide-y divide-border overflow-y-auto rounded-xl border border-border bg-surface text-sm">
                    {preview.errors.slice(0, MAX_ERRORS_SHOWN).map((e) => (
                      <li key={e.row} className="flex gap-3 p-3">
                        <span className="w-12 shrink-0 text-muted">Row {e.row}</span>
                        <ul className="flex-1 list-disc pl-4 text-danger">
                          {e.messages.map((m) => (
                            <li key={m}>{m}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                  {preview.errors.length > MAX_ERRORS_SHOWN && (
                    <p className="text-xs text-muted">…and {preview.errors.length - MAX_ERRORS_SHOWN} more.</p>
                  )}
                </section>
              )}

              {preview.existing.length > 0 && (
                <details className="text-sm">
                  <summary className="cursor-pointer text-muted">
                    {preview.existing.length} row(s) already exist in the bank and will be skipped
                  </summary>
                  <ul className="mt-2 space-y-1 text-muted">
                    {preview.existing.slice(0, MAX_ERRORS_SHOWN).map((x) => (
                      <li key={x.row}>
                        Row {x.row}: {x.preview}
                      </li>
                    ))}
                  </ul>
                </details>
              )}

              <button
                type="button"
                onClick={commit}
                disabled={pending || preview.newCount === 0}
                className="rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground disabled:opacity-50"
              >
                {pending ? "Importing…" : `Import ${preview.newCount} question${preview.newCount === 1 ? "" : "s"}`}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, highlight, danger }: { label: string; value: number; highlight?: boolean; danger?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className={`mt-1 text-xl font-semibold tabular-nums ${highlight ? "text-primary" : ""} ${danger ? "text-danger" : ""}`}>
        {value.toLocaleString("en-IN")}
      </dd>
    </div>
  );
}

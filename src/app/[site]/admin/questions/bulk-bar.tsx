"use client";

import { useFormStatus } from "react-dom";

type Props = { canPublish: boolean; total: number; filtered: boolean };

/** Select-all + bulk status buttons. Lives inside the list's <form action={bulkStatusAction}>. */
export function BulkBar({ canPublish, total, filtered }: Props) {
  const { pending } = useFormStatus();

  function toggleAll(checked: boolean, el: HTMLElement) {
    el.closest("form")
      ?.querySelectorAll<HTMLInputElement>('input[name="ids"]')
      .forEach((c) => (c.checked = checked));
  }

  const b = "rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium hover:border-primary disabled:opacity-50";

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-surface-muted p-2 text-sm">
      <label className="flex items-center gap-2 px-2">
        <input type="checkbox" onChange={(e) => toggleAll(e.target.checked, e.target)} aria-label="Select all on this page" />
        All on page
      </label>
      <span className="text-muted">Ticked:</span>
      <button name="op" value="review" disabled={pending} className={b}>
        Send for review
      </button>
      {canPublish && (
        <>
          <button name="op" value="publish" disabled={pending} className={`${b} text-success`}>
            Publish
          </button>
          <button name="op" value="draft" disabled={pending} className={b}>
            Move to draft
          </button>
          <button name="op" value="archive" disabled={pending} className={`${b} text-danger`}>
            Archive
          </button>
          {filtered && total > 0 && (
            <button
              name="op"
              value="publish:all"
              disabled={pending}
              className={`${b} ml-auto`}
              onClick={(e) => {
                if (!confirm(`Publish all ${total} questions matching these filters?`)) e.preventDefault();
              }}
            >
              Publish all {total.toLocaleString("en-IN")} matching
            </button>
          )}
        </>
      )}
    </div>
  );
}

"use client";

import { useActionState } from "react";
import { btn } from "@/components/ui";
import { updateEmailPreferencesAction } from "./actions";

const box = "flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-surface p-3 text-sm";

export function EmailPrefsForm({ offers, reminders }: { offers: boolean; reminders: boolean }) {
  const [state, action, pending] = useActionState(updateEmailPreferencesAction, {});
  return (
    <form action={action} className="space-y-3" aria-label="Email settings">
      <label className={box}>
        <input type="checkbox" name="reminders" defaultChecked={reminders} className="mt-0.5 size-5 shrink-0 accent-primary" />
        <span>
          <b className="font-medium">Reminders about my purchases</b>
          <span className="block text-muted">For example, a week before your access ends.</span>
        </span>
      </label>
      <label className={box}>
        <input type="checkbox" name="offers" defaultChecked={offers} className="mt-0.5 size-5 shrink-0 accent-primary" />
        <span>
          <b className="font-medium">New mock tests, exam updates and offers</b>
          <span className="block text-muted">At most 4 a month.</span>
        </span>
      </label>
      <p className="text-xs text-muted">Login codes and result emails always come.</p>
      {state.ok && (
        <p role="status" className="text-sm text-success">
          Saved.
        </p>
      )}
      <button className={btn("outline")} disabled={pending}>
        {pending ? "Saving…" : "Save email settings"}
      </button>
    </form>
  );
}

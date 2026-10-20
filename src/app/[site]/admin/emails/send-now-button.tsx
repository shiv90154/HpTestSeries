"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { sendQueuedNowAction } from "./actions";

export function SendNowButton({ queued }: { queued: number }) {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [pending, startTransition] = useTransition();
  if (!queued) return null;
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            const res = await sendQueuedNowAction();
            if (res.ok) setMsg(`${res.sent} sent${res.left ? `, ${res.left} still waiting (daily limit or 3-day gap)` : ""}.`);
            router.refresh();
          })
        }
        className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium disabled:opacity-60"
      >
        {pending ? "Sending…" : `Send the ${queued} waiting now`}
      </button>
      {msg && (
        <span role="status" className="text-sm text-muted">
          {msg}
        </span>
      )}
    </div>
  );
}

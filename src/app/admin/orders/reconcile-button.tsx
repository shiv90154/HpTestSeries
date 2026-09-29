"use client";

import { useState, useTransition } from "react";
import { reconcileAction } from "./actions";

export function ReconcileButton() {
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  return (
    <div className="flex items-center gap-3 text-sm">
      <button
        disabled={pending}
        className="rounded-lg border border-border px-3 py-1.5 font-medium hover:border-primary disabled:opacity-60"
        onClick={() =>
          startTransition(async () => {
            const r = await reconcileAction();
            setMsg(`Checked ${r.checked} unpaid orders · recovered ${r.recovered}${r.errors ? ` · ${r.errors} errors` : ""}`);
          })
        }
      >
        {pending ? "Checking Razorpay…" : "Check for missed payments"}
      </button>
      {msg && <span role="status" className="text-muted">{msg}</span>}
    </div>
  );
}

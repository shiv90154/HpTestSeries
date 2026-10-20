"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { confirmWinnersAction } from "../actions";

export function ConfirmWinners({ testId }: { testId: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  return (
    <div className="space-y-2">
      <button
        disabled={pending}
        onClick={() => {
          if (!confirm("Award the prizes to the current top ranks? Free access is granted straight away.")) return;
          start(async () => {
            const res = await confirmWinnersAction(testId);
            setMsg(res.ok ? { ok: true, text: `${res.awarded} prize${res.awarded === 1 ? "" : "s"} awarded.` } : { ok: false, text: res.error });
            if (res.ok) router.refresh();
          });
        }}
        className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
      >
        {pending ? "Awarding…" : "Confirm winners & award prizes"}
      </button>
      {msg && (
        <p role="status" className={`text-sm ${msg.ok ? "text-success" : "text-danger"}`}>
          {msg.text}
        </p>
      )}
    </div>
  );
}

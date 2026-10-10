"use client";

import Link from "next/link";
import { useActionState } from "react";
import { btn } from "@/components/ui";
import { unsubscribeAction } from "./actions";

export function UnsubscribeForm({ u, c, t, what }: { u: string; c: string; t: string; what: string }) {
  const [state, action, pending] = useActionState(unsubscribeAction, {});
  if (state.ok) {
    return (
      <div role="status" className="space-y-3">
        <p className="font-semibold text-success">Done. You will not get {what} any more.</p>
        <p className="text-sm text-muted">
          Changed your mind? Turn them back on from your{" "}
          <Link href="/profile#email" className="font-medium text-primary hover:underline">
            profile
          </Link>
          .
        </p>
      </div>
    );
  }
  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="u" value={u} />
      <input type="hidden" name="c" value={c} />
      <input type="hidden" name="t" value={t} />
      {state.error && (
        <p role="alert" className="text-sm text-danger">
          {state.error}
        </p>
      )}
      <button className={btn("primary", "lg", "w-full")} disabled={pending}>
        {pending ? "Unsubscribing…" : "Unsubscribe"}
      </button>
    </form>
  );
}

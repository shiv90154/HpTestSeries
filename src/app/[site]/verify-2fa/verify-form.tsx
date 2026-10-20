"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { verifyTwoFactorAction } from "@/modules/identity/two-factor-actions";

export function VerifyForm({ next }: { next: string }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        startTransition(async () => {
          const res = await verifyTwoFactorAction(value);
          if (res.ok) {
            router.replace(next);
            router.refresh();
          } else setError(res.error);
        });
      }}
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        inputMode="text"
        autoComplete="one-time-code"
        autoFocus
        required
        aria-label="Authenticator or backup code"
        placeholder="123456"
        className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-center text-lg tracking-[0.3em] outline-none focus:border-primary focus:ring-4 focus:ring-primary-soft"
      />
      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
      <button disabled={pending} className="h-12 w-full rounded-xl bg-primary font-semibold text-primary-foreground disabled:opacity-60">
        {pending ? "Checking…" : "Verify"}
      </button>
    </form>
  );
}

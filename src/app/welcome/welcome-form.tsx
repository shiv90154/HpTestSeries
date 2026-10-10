"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { btn } from "@/components/ui";
import { HP_DISTRICTS } from "@/lib/districts";
import { saveWelcomeAction } from "./actions";

const field = "h-12 w-full rounded-xl border border-border bg-surface px-4 text-base outline-none focus:border-primary focus:ring-4 focus:ring-primary-soft";

export function WelcomeForm({ next, canEmail }: { next: string; canEmail: boolean }) {
  const router = useRouter();
  const [state, action, pending] = useActionState(saveWelcomeAction, {});

  useEffect(() => {
    if (!state.ok) return;
    router.replace(next);
    router.refresh();
  }, [state.ok, next, router]);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="welcome-name" className="mb-1.5 block text-sm font-medium">
          Your name
        </label>
        <input
          id="welcome-name"
          name="name"
          placeholder="e.g. Rahul Sharma"
          className={field}
          required
          minLength={2}
          maxLength={60}
          autoComplete="name"
          autoFocus
        />
      </div>
      <div>
        <label htmlFor="welcome-district" className="mb-1.5 block text-sm font-medium">
          District <span className="font-normal text-muted">(optional)</span>
        </label>
        <select id="welcome-district" name="district" defaultValue="" className={field}>
          <option value="">Select your district</option>
          {HP_DISTRICTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
          <option value="Outside HP">Outside HP</option>
        </select>
      </div>
      {canEmail && (
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-surface p-3 text-sm">
          <input type="checkbox" name="emailOffers" className="mt-0.5 size-5 shrink-0 accent-primary" />
          <span>
            Email me new mock tests, exam updates and offers <span className="text-muted">(at most 4 a month, unsubscribe any time)</span>
          </span>
        </label>
      )}
      {state.error && (
        <p role="alert" className="text-sm text-danger">
          {state.error}
        </p>
      )}
      <button className={btn("primary", "lg", "w-full")} disabled={pending || state.ok}>
        {pending || state.ok ? "Saving…" : "Continue"}
      </button>
      <Link href={next} replace className="flex min-h-11 items-center justify-center text-sm font-medium text-muted hover:text-primary">
        Skip for now
      </Link>
    </form>
  );
}

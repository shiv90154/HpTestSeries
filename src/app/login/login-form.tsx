"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { authClient } from "@/modules/identity/auth-client";
import { normalizeIndianMobile } from "@/modules/identity/permissions";

type Step = { kind: "phone" } | { kind: "code"; phone: string };

const inputClass =
  "h-12 w-full rounded-xl border border-border bg-surface px-4 text-base outline-none transition focus:border-primary focus:ring-4 focus:ring-primary-soft";
const buttonClass =
  "h-12 w-full rounded-xl bg-primary font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-strong disabled:opacity-60";

export function LoginForm({ next, googleEnabled }: { next: string; googleEnabled: boolean }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>({ kind: "phone" });
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function sendCode(phone: string) {
    const { error } = await authClient.phoneNumber.sendOtp({ phoneNumber: phone });
    if (error) throw new Error(error.status === 429 ? "Too many attempts. Try again in a few minutes." : "Could not send the code. Please try again.");
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      if (step.kind === "phone") {
        const phone = normalizeIndianMobile(value);
        if (!phone) throw new Error("Enter a valid 10-digit Indian mobile number.");
        await sendCode(phone);
        setStep({ kind: "code", phone });
        setValue("");
      } else {
        const { error } = await authClient.phoneNumber.verify({ phoneNumber: step.phone, code: value.trim() });
        if (error) throw new Error("That code is incorrect or has expired.");
        router.replace(next);
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-3">
        {step.kind === "phone" ? (
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Mobile number</span>
            <input
              className={inputClass}
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="98765 43210"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </label>
        ) : (
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Enter the 6-digit code sent to {step.phone}</span>
            <input
              className={`${inputClass} tracking-[0.5em]`}
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="\d{6}"
              maxLength={6}
              value={value}
              onChange={(e) => setValue(e.target.value.replace(/\D/g, ""))}
              autoFocus
              required
            />
          </label>
        )}

        {error && (
          <p role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}

        <button type="submit" className={buttonClass} disabled={pending}>
          {pending ? "Please wait…" : step.kind === "phone" ? "Send code" : "Verify and sign in"}
        </button>

        {step.kind === "code" && (
          <div className="flex justify-between text-sm">
            <button type="button" className="text-muted underline" onClick={() => setStep({ kind: "phone" })}>
              Change number
            </button>
            <button
              type="button"
              className="text-primary underline disabled:opacity-60"
              disabled={pending}
              onClick={async () => {
                setError(null);
                setPending(true);
                try {
                  await sendCode(step.phone);
                } catch (err) {
                  setError(err instanceof Error ? err.message : "Could not resend.");
                } finally {
                  setPending(false);
                }
              }}
            >
              Resend code
            </button>
          </div>
        )}
      </form>

      {googleEnabled && (
        <>
          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
          </div>
          <button
            type="button"
            className="h-12 w-full rounded-xl border border-border bg-surface font-semibold transition hover:border-primary"
            onClick={() => authClient.signIn.social({ provider: "google", callbackURL: next })}
          >
            Continue with Google
          </button>
        </>
      )}
    </div>
  );
}

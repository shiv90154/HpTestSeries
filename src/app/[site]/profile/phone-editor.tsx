"use client";

import { BadgeCheck, MessageSquareText, Pencil, Phone, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { btn } from "@/components/ui";
import { authClient } from "@/modules/identity/auth-client";
import { normalizeIndianMobile } from "@/modules/identity/permissions";
import { OtpInput } from "../login/otp-input";

type Step = { kind: "view" } | { kind: "enter" } | { kind: "code"; to: string };

const RESEND_AFTER = 30;
const field = "h-11 w-full rounded-xl border border-border bg-surface px-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary-soft";

const message = (status: number | undefined, text: string | undefined, fallback: string) =>
  status === 429 ? "Too many attempts. Try again in a few minutes." : text || fallback;

/** Add or change the mobile number. The new number is only saved after the student enters the SMS code sent to it. */
export function PhoneEditor({ phone, verified, enabled }: { phone: string | null; verified: boolean; enabled: boolean }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>({ kind: "view" });
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  function reset() {
    setStep({ kind: "view" });
    setValue("");
    setError(null);
    setWrong(false);
  }

  async function run(fn: () => Promise<void>) {
    setError(null);
    setPending(true);
    try {
      await fn();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setPending(false);
    }
  }

  async function sendCode(to: string) {
    const { error } = await authClient.phoneNumber.sendOtp({ phoneNumber: to });
    if (error) throw new Error(message(error.status, error.message, "Could not send the code. Please try again."));
    setCooldown(RESEND_AFTER);
  }

  async function verifyCode(to: string, code: string) {
    const { error } = await authClient.phoneNumber.verify({ phoneNumber: to, code, updatePhoneNumber: true });
    if (error) {
      setWrong(true);
      setValue("");
      const taken = /exist/i.test(error.message ?? "");
      throw new Error(taken ? "This number is already linked to another account." : message(error.status, undefined, "That code is incorrect or has expired."));
    }
    reset();
    setDone(true);
    router.refresh();
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    run(async () => {
      if (step.kind === "enter") {
        const to = normalizeIndianMobile(value);
        if (!to) throw new Error("Enter a valid 10-digit Indian mobile number.");
        if (to === phone) throw new Error("That is already your number.");
        await sendCode(to);
        setStep({ kind: "code", to });
        setValue("");
      } else if (step.kind === "code") {
        await verifyCode(step.to, value.trim());
      }
    });
  }

  if (step.kind === "view") {
    return (
      <div className="flex items-center gap-3">
        <Phone className="size-4 shrink-0 text-muted" />
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          <span className="sr-only">Phone</span>
          {phone ? <span>{phone}</span> : <span className="text-muted">Not linked</span>}
          {phone && verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2 py-0.5 text-xs font-medium text-success">
              <BadgeCheck className="size-3.5" /> Verified
            </span>
          )}
          {done && (
            <span role="status" className="text-xs font-medium text-success">
              Number updated
            </span>
          )}
        </div>
        {enabled ? (
          <button type="button" className={btn("outline", "sm", "shrink-0")} onClick={() => (setDone(false), setStep({ kind: "enter" }))}>
            {phone ? <Pencil className="size-3.5" /> : <Plus className="size-3.5" />} {phone ? "Change" : "Add number"}
          </button>
        ) : (
          <span className="shrink-0 text-xs text-muted">SMS verification coming soon</span>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-xl border border-border bg-surface-muted p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold">{phone ? "Change mobile number" : "Add mobile number"}</p>
        <button type="button" onClick={reset} className="text-muted hover:text-foreground" aria-label="Cancel">
          <X className="size-4" />
        </button>
      </div>

      {step.kind === "enter" ? (
        <label className="block space-y-1.5">
          <span className="text-xs font-medium text-muted">New mobile number</span>
          <div className="flex gap-2">
            <span className={`${field} flex w-auto items-center text-muted`}>+91</span>
            <input
              className={field}
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="98765 43210"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoFocus
              required
            />
          </div>
        </label>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
              <MessageSquareText className="size-5" />
            </span>
            <p className="min-w-0 text-sm text-muted">
              We sent a 6-digit code by SMS to <span className="font-semibold text-foreground">{step.to}</span>
            </p>
          </div>
          <OtpInput
            value={value}
            invalid={wrong}
            disabled={pending}
            label="6-digit verification code"
            onChange={(v) => {
              setWrong(false);
              setError(null);
              setValue(v);
            }}
            onComplete={(code) => run(() => verifyCode(step.to, code))}
          />
        </div>
      )}

      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button className={btn("primary")} disabled={pending || (step.kind === "code" && value.length < 6)}>
          {pending ? (step.kind === "enter" ? "Sending code…" : "Checking…") : step.kind === "enter" ? "Send code" : "Verify and save"}
        </button>
        {step.kind === "code" && (
          <>
            <button type="button" className="text-sm text-muted underline" onClick={() => (setStep({ kind: "enter" }), setValue(""), setError(null))}>
              Change number
            </button>
            <button
              type="button"
              className="text-sm font-medium text-primary underline disabled:text-muted disabled:no-underline"
              disabled={pending || cooldown > 0}
              onClick={() => run(async () => (await sendCode(step.to), setValue(""), setWrong(false)))}
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
            </button>
          </>
        )}
      </div>
    </form>
  );
}

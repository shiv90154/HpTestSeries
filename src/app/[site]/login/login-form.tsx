"use client";

import { Mail, MailCheck, MessageSquareText, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { authClient } from "@/modules/identity/auth-client";
import { normalizeIndianMobile, PLACEHOLDER_NAME } from "@/modules/identity/permissions";
import { OtpInput } from "./otp-input";

type Method = "email" | "phone";
type Step = { kind: "enter" } | { kind: "code"; to: string };

const inputClass =
  "h-12 w-full rounded-xl border border-border bg-surface px-4 text-base outline-none transition focus:border-primary focus:ring-4 focus:ring-primary-soft";
const buttonClass =
  "h-12 w-full rounded-xl bg-primary font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-strong disabled:opacity-60";

const RESEND_AFTER = 30; // seconds before "Resend" works again
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** One OTP flow, two channels. Error text comes from the server when it has a useful message. */
const channels = {
  email: {
    label: "Email address",
    placeholder: "you@gmail.com",
    inputProps: { type: "email", inputMode: "email", autoComplete: "email" } as const,
    normalize: (v: string) => {
      const email = v.trim().toLowerCase();
      return EMAIL_RE.test(email) && !email.endsWith(".invalid") ? email : null;
    },
    invalid: "Enter a valid email address.",
    send: (to: string) => authClient.emailOtp.sendVerificationOtp({ email: to, type: "sign-in" }),
    // Name is only used when the account is created; /welcome then asks for the real name.
    verify: (to: string, code: string) => authClient.signIn.emailOtp({ email: to, otp: code, name: PLACEHOLDER_NAME }),
    sentTo: "We emailed a 6-digit code to",
    hint: "Can’t find it? Check your Spam or Promotions folder.",
    change: "Change email",
  },
  phone: {
    label: "Mobile number",
    placeholder: "98765 43210",
    inputProps: { type: "tel", inputMode: "numeric", autoComplete: "tel-national" } as const,
    normalize: normalizeIndianMobile,
    invalid: "Enter a valid 10-digit Indian mobile number.",
    send: (to: string) => authClient.phoneNumber.sendOtp({ phoneNumber: to }),
    verify: (to: string, code: string) => authClient.phoneNumber.verify({ phoneNumber: to, code }),
    sentTo: "We sent a 6-digit code by SMS to",
    hint: null,
    change: "Change number",
  },
};

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

export function LoginForm({ next, googleEnabled, emailEnabled, phoneEnabled }: { next: string; googleEnabled: boolean; emailEnabled: boolean; phoneEnabled: boolean }) {
  const router = useRouter();
  const [method, setMethod] = useState<Method>(emailEnabled || !phoneEnabled ? "email" : "phone");
  const codeLogin = method === "email" ? emailEnabled : phoneEnabled;
  const [step, setStep] = useState<Step>({ kind: "enter" });
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const ch = channels[method];

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  function switchMethod(m: Method) {
    setMethod(m);
    setStep({ kind: "enter" });
    setValue("");
    setError(null);
    setNotice(null);
    setWrong(false);
  }

  async function sendCode(to: string) {
    const { error } = await ch.send(to);
    if (error) {
      throw new Error(error.status === 429 ? "Too many attempts. Try again in a few minutes." : error.message || "Could not send the code. Please try again.");
    }
    setCooldown(RESEND_AFTER);
  }

  async function verifyCode(to: string, code: string) {
    const { data, error } = await ch.verify(to, code);
    if (error) {
      setWrong(true);
      setValue("");
      throw new Error(error.status === 429 ? "Too many attempts. Try again in a few minutes." : "That code is incorrect or has expired.");
    }
    // New code accounts are called "Aspirant" (also on leaderboards) until the student gives their name.
    router.replace(data?.user.name === PLACEHOLDER_NAME ? `/welcome?next=${encodeURIComponent(next)}` : next);
    router.refresh();
  }

  async function run(fn: () => Promise<void>) {
    setError(null);
    setNotice(null);
    setPending(true);
    try {
      await fn();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setPending(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    run(async () => {
      if (step.kind === "enter") {
        const to = ch.normalize(value);
        if (!to) throw new Error(ch.invalid);
        await sendCode(to);
        setStep({ kind: "code", to });
        setValue("");
      } else {
        await verifyCode(step.to, value.trim());
      }
    });
  }

  return (
    <div className="space-y-6">
      {googleEnabled && (
        <>
          <button
            type="button"
            disabled={pending}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-surface font-semibold shadow-sm transition hover:border-primary disabled:opacity-60"
            onClick={() => run(async () => void (await authClient.signIn.social({ provider: "google", callbackURL: next, errorCallbackURL: "/login?error=google" })))}
          >
            <GoogleIcon /> Continue with Google
          </button>
          {codeLogin && (
          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="h-px flex-1 bg-border" /> or get a code by {method === "email" ? "email" : "SMS"} <span className="h-px flex-1 bg-border" />
          </div>
          )}
        </>
      )}

      {codeLogin && (
      <form onSubmit={onSubmit} className="space-y-3">
        {step.kind === "enter" ? (
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">{ch.label}</span>
            <input
              key={method}
              className={inputClass}
              {...ch.inputProps}
              placeholder={ch.placeholder}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </label>
        ) : (
          <div className="space-y-4 motion-safe:animate-[step-in_.25s_ease-out]">
            <div className="flex items-start gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                {method === "email" ? <MailCheck className="size-5" /> : <MessageSquareText className="size-5" />}
              </span>
              <div className="min-w-0">
                <p className="text-sm text-muted">{ch.sentTo}</p>
                <p className="truncate font-semibold">{step.to}</p>
              </div>
            </div>
            <OtpInput
              value={value}
              invalid={wrong}
              disabled={pending}
              label="6-digit login code"
              onChange={(v) => {
                setWrong(false);
                setError(null);
                setValue(v);
              }}
              onComplete={(code) => run(() => verifyCode(step.to, code))}
            />
            <p className="text-xs text-muted">The code works for {method === "email" ? 10 : 5} minutes. It signs you in automatically once all 6 digits are in.</p>
            {ch.hint && <p className="text-xs text-muted">{ch.hint}</p>}
          </div>
        )}

        {error && (
          <p role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}
        {notice && (
          <p role="status" className="text-sm text-success">
            {notice}
          </p>
        )}

        <button type="submit" className={buttonClass} disabled={pending || (step.kind === "code" && value.length < 6)}>
          {pending ? (step.kind === "enter" ? "Sending code…" : "Checking…") : step.kind === "enter" ? "Send code" : "Verify and sign in"}
        </button>

        {step.kind === "code" && (
          <div className="flex justify-between text-sm">
            <button type="button" className="text-muted underline" onClick={() => switchMethod(method)}>
              {ch.change}
            </button>
            <button
              type="button"
              className="font-medium text-primary underline disabled:text-muted disabled:no-underline"
              disabled={pending || cooldown > 0}
              onClick={() =>
                run(async () => {
                  await sendCode(step.to);
                  setValue("");
                  setWrong(false);
                  setNotice("A new code has been sent.");
                })
              }
            >
              {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
            </button>
          </div>
        )}
      </form>
      )}

      {emailEnabled && phoneEnabled && step.kind === "enter" && (
        <button
          type="button"
          onClick={() => switchMethod(method === "email" ? "phone" : "email")}
          className="flex w-full items-center justify-center gap-2 text-sm font-medium text-muted hover:text-primary"
        >
          {method === "email" ? <Smartphone className="size-4" /> : <Mail className="size-4" />}
          {method === "email" ? "Use mobile number instead" : "Use email instead"}
        </button>
      )}
    </div>
  );
}

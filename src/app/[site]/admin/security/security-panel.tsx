"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { confirmTwoFactorSetupAction, disableTwoFactorAction, startTwoFactorSetupAction } from "@/modules/identity/two-factor-actions";
import { input as inputCls, panel } from "../ui";

type Setup = { qr: string; secretUri: string; backupCodes: string[] };

export function SecurityPanel({ enabled }: { enabled: boolean }) {
  const router = useRouter();
  const [setup, setSetup] = useState<Setup | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const secret = setup ? new URL(setup.secretUri).searchParams.get("secret") : null;

  const btn = "rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60";

  if (enabled) {
    return (
      <div className={`${panel} space-y-3`}>
        <p className="text-sm font-medium text-success">Two-factor login is ON.</p>
        <p className="text-sm text-muted">To turn it off, enter a current code (or a backup code).</p>
        <div className="flex flex-wrap gap-2">
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" aria-label="Code" className={`${inputCls} max-w-40`} />
          <button
            disabled={pending || !code}
            className="rounded-lg border border-danger px-4 py-2 text-sm font-medium text-danger disabled:opacity-60"
            onClick={() =>
              startTransition(async () => {
                setError(null);
                const res = await disableTwoFactorAction(code);
                if (res.ok) {
                  setCode("");
                  router.refresh();
                } else setError(res.error);
              })
            }
          >
            Turn off
          </button>
        </div>
        {error && <p role="alert" className="text-sm text-danger">{error}</p>}
      </div>
    );
  }

  if (!setup) {
    return (
      <div className={`${panel} space-y-3`}>
        <p className="text-sm text-muted">Two-factor login is OFF.</p>
        <button
          disabled={pending}
          className={btn}
          onClick={() =>
            startTransition(async () => {
              setError(null);
              const res = await startTwoFactorSetupAction();
              if (res.ok) setSetup(res);
              else setError(res.error);
            })
          }
        >
          Turn on two-factor login
        </button>
        {error && <p role="alert" className="text-sm text-danger">{error}</p>}
      </div>
    );
  }

  return (
    <div className={`${panel} space-y-4`}>
      <ol className="list-decimal space-y-4 pl-5 text-sm">
        <li className="space-y-2">
          Scan this QR code with your authenticator app.
          {/* eslint-disable-next-line @next/next/no-img-element -- data URL, nothing to optimise */}
          <img src={setup.qr} alt="QR code for your authenticator app" width={220} height={220} className="rounded-lg border border-border" />
          {secret && (
            <p className="text-xs text-muted">
              Can&apos;t scan? Enter this key manually: <code className="break-all select-all">{secret}</code>
            </p>
          )}
        </li>
        <li className="space-y-2">
          Save these backup codes somewhere safe. Each works once if you lose your phone. <b>They are shown only now.</b>
          <pre className="select-all rounded-lg bg-surface-muted p-3 font-mono text-xs leading-6">{setup.backupCodes.join("\n")}</pre>
        </li>
        <li className="space-y-2">
          Enter the 6-digit code from the app to finish.
          <div className="flex flex-wrap gap-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              inputMode="numeric"
              maxLength={6}
              placeholder="123456"
              aria-label="6-digit code"
              className={`${inputCls} max-w-40`}
            />
            <button
              disabled={pending || code.length !== 6}
              className={btn}
              onClick={() =>
                startTransition(async () => {
                  setError(null);
                  const res = await confirmTwoFactorSetupAction(code);
                  if (res.ok) {
                    setSetup(null);
                    setCode("");
                    router.refresh();
                  } else setError(res.error);
                })
              }
            >
              Verify and turn on
            </button>
          </div>
          {error && <p role="alert" className="text-sm text-danger">{error}</p>}
        </li>
      </ol>
    </div>
  );
}

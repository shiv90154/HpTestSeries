"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { toast } from "sonner";
import { ResultView } from "@/components/result-view";
import { btn } from "@/components/ui";
import { readLangPref } from "@/lib/lang-pref";
import type { ResultData } from "@/modules/assessment/types";
import { claimGuestResultAction } from "./actions";

// Guest results live only in this browser tab (sessionStorage) until the student logs in and saves one.
function read(slug: string): string | null {
  try {
    return sessionStorage.getItem(`result:${slug}`);
  } catch {
    return null;
  }
}

export function GuestResult({ slug, loggedIn }: { slug: string; loggedIn: boolean }) {
  const router = useRouter();
  const raw = useSyncExternalStore(
    () => () => {},
    () => read(slug),
    () => undefined,
  );
  const data = useMemo(() => (raw ? (JSON.parse(raw) as ResultData) : null), [raw]);
  const [claimError, setClaimError] = useState<string | null>(null);
  const started = useRef(false); // effects run twice in dev; the claim must be sent once
  const saving = loggedIn && !!data?.claim && !claimError;

  // Logged in with a guest result in this tab (e.g. came back from the login page): save it to the account.
  useEffect(() => {
    if (!saving || !data?.claim || started.current) return;
    started.current = true;
    claimGuestResultAction(slug, data.claim).then(
      (res) => {
        if ("attemptId" in res) {
          try {
            sessionStorage.removeItem(`result:${slug}`);
          } catch {
            /* ignore */
          }
          toast.success("Result saved to your account");
          router.replace(`/results/${res.attemptId}`);
        } else setClaimError(res.error);
      },
      () => setClaimError("Couldn't save your result — check your internet connection and reload."),
    );
  }, [saving, data, slug, router]);

  if (raw === undefined) return <div className="flex-1" />;
  if (!data) {
    return (
      <main className="mx-auto max-w-md flex-1 space-y-4 px-4 py-20 text-center">
        <h1 className="text-xl font-semibold">No result found</h1>
        <p className="text-muted">Guest results are kept only until you close the tab. Take the test again to see a fresh result.</p>
        <Link href={`/tests/${slug}/attempt`} className={btn("primary")}>
          Start the test
        </Link>
      </main>
    );
  }
  if (saving) {
    return (
      <main className="grid flex-1 place-items-center px-4 py-20 text-center" aria-busy="true">
        <div>
          <div className="mx-auto size-10 animate-spin rounded-full border-4 border-primary-soft border-t-primary" />
          <p className="mt-4 font-semibold">Saving your result to your account…</p>
        </div>
      </main>
    );
  }
  return (
    <>
      {claimError && (
        <p role="alert" className="mx-auto mt-6 w-full max-w-5xl rounded-xl border border-danger bg-danger-soft px-4 py-3 text-sm text-danger">
          {claimError}
        </p>
      )}
      <ResultView data={data} isGuest loggedIn={loggedIn} defaultLang={readLangPref() ?? undefined} />
    </>
  );
}

"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ResultView } from "@/components/result-view";
import { btn } from "@/components/ui";
import { readLangPref } from "@/lib/lang-pref";
import type { ResultData } from "@/modules/assessment/types";

// Guest results live only in this browser tab (sessionStorage); nothing is stored on the server.
function read(slug: string): string | null {
  try {
    return sessionStorage.getItem(`result:${slug}`);
  } catch {
    return null;
  }
}

export function GuestResult({ slug, loggedIn }: { slug: string; loggedIn: boolean }) {
  const raw = useSyncExternalStore(
    () => () => {},
    () => read(slug),
    () => undefined,
  );

  if (raw === undefined) return <div className="flex-1" />;
  if (!raw) {
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
  return <ResultView data={JSON.parse(raw) as ResultData} isGuest loggedIn={loggedIn} defaultLang={readLangPref() ?? undefined} />;
}

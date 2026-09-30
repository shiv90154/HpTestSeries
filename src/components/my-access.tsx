"use client";

import { useEffect, useState, type ReactNode } from "react";

// The public test pages are cached and the same for everyone, so a student who already bought a test
// would still see "Unlock". These ask the server (never cached) which tests the visitor owns.

let inflight: Promise<Set<string>> | null = null;

/** One request no matter how many cards mount together; not kept afterwards, so a purchase shows up on the next visit. */
function loadOwned(): Promise<Set<string>> {
  inflight ??= fetch("/api/me/access")
    .then((r) => (r.ok ? (r.json() as Promise<{ tests: string[] }>) : { tests: [] }))
    .then((d) => new Set(d.tests))
    .catch(() => new Set<string>())
    .finally(() => setTimeout(() => (inflight = null), 0));
  return inflight;
}

/** Slugs of the paid tests the visitor has unlocked; null until known (and for logged-out visitors: an empty set). */
export function useOwnedTests(): Set<string> | null {
  const [owned, setOwned] = useState<Set<string> | null>(null);
  useEffect(() => {
    let live = true;
    loadOwned().then((s) => live && setOwned(s));
    return () => {
      live = false;
    };
  }, []);
  return owned;
}

/** Shows `owned` to a student who has unlocked this test, `children` (the buy prompt) to everyone else. */
export function OwnedGate({ slug, owned, children }: { slug: string; owned: ReactNode; children: ReactNode }) {
  return useOwnedTests()?.has(slug) ? owned : children;
}

export type StartCandidate = { slug: string; type: string; isFree: boolean; examName: string | null; hasDemo: boolean };

/**
 * Where the main button of an exam page sends an ad click, best first: a free test made for this exam; the free demo of one of its
 * paid mocks (a taste of what the series sells); any free test (the Himachal GK mock). Null when the site has no free test at all.
 */
export function startTest(tests: StartCandidate[], label: string): { href: string; label: string } | null {
  const ownFree = tests.find((t) => t.isFree && t.examName);
  if (ownFree) return { href: `/tests/${ownFree.slug}/attempt`, label: `Start free ${label} test` };
  const demo = tests.find((t) => t.examName && !t.isFree && t.hasDemo);
  if (demo) return { href: `/tests/${demo.slug}/demo`, label: `Try free ${label} demo` };
  const free = tests.find((t) => t.isFree);
  return free ? { href: `/tests/${free.slug}/attempt`, label: "Start free Himachal GK test" } : null;
}

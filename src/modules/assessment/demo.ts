// Free demo of a paid test: the first N% of every section is playable without paying, where N is the
// test's own `demoPercent` (set in the admin panel; 0 = no demo).
// Pure helpers only (no server imports) so the CBT client, the pages and the tests can share them.

/** Largest demo share an admin can set. The rest must stay locked or there would be nothing to buy. */
export const MAX_DEMO_PERCENT = 90;

/** Free questions in a section of `n` questions at `percent` (rounded up, so a 1-question section is fully free). */
export function demoCount(n: number, percent: number): number {
  if (percent <= 0) return 0;
  return Math.min(n, Math.ceil((n * Math.min(percent, MAX_DEMO_PERCENT)) / 100));
}

export type DemoPlan = {
  /** free questions per section, in order */
  free: number[];
  /** locked questions per section, in order */
  locked: number[];
  freeTotal: number;
  lockedTotal: number;
  /** true when there is something to try and something left to buy */
  available: boolean;
};

export function planDemo(sectionSizes: number[], percent: number): DemoPlan {
  const free = sectionSizes.map((n) => demoCount(n, percent));
  const locked = sectionSizes.map((n, i) => n - free[i]);
  const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);
  const freeTotal = sum(free);
  const lockedTotal = sum(locked);
  return { free, locked, freeTotal, lockedTotal, available: freeTotal > 0 && lockedTotal > 0 };
}

/** Demo time is the same share of the full duration as the share of questions, in whole minutes (at least 1). */
export function demoDurationSec(durationSec: number, freeTotal: number, total: number): number {
  if (total <= 0) return durationSec;
  return Math.max(60, Math.round((durationSec * freeTotal) / total / 60) * 60);
}

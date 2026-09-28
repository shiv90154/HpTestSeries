// Free demo of a paid test: the first half of every section is playable without paying.
// Pure helpers only (no server imports) so the CBT client and the tests can share them.

/** Share of each section that is free in the demo. */
export const DEMO_FRACTION = 0.5;

/** Free questions in a section of `n` questions (rounded up, so a 1-question section is fully free). */
export function demoCount(n: number): number {
  return Math.min(n, Math.ceil(n * DEMO_FRACTION));
}

export type DemoPlan = {
  /** free questions per section, in order */
  free: number[];
  /** locked questions per section, in order */
  locked: number[];
  freeTotal: number;
  lockedTotal: number;
};

export function planDemo(sectionSizes: number[]): DemoPlan {
  const free = sectionSizes.map(demoCount);
  const locked = sectionSizes.map((n, i) => n - free[i]);
  const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);
  return { free, locked, freeTotal: sum(free), lockedTotal: sum(locked) };
}

/** Demo time is the same share of the full duration as the share of questions, in whole minutes (at least 1). */
export function demoDurationSec(durationSec: number, freeTotal: number, total: number): number {
  if (total <= 0) return durationSec;
  return Math.max(60, Math.round((durationSec * freeTotal) / total / 60) * 60);
}

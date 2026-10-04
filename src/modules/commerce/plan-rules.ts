// Pure helpers for showing a plan's validity (no DB), kept separate so they are unit-testable.

const DAY = 86_400_000;

/** How much of the plan's validity window has passed, 0–100. A renewal that has not started yet is 0. */
export function planUsedPercent(startsAt: Date, expiresAt: Date, now: Date = new Date()): number {
  const total = expiresAt.getTime() - startsAt.getTime();
  if (total <= 0) return 100;
  const used = ((now.getTime() - startsAt.getTime()) / total) * 100;
  return Math.min(100, Math.max(0, Math.round(used)));
}

/** "12 days left", "Last day", "Ends today"-style wording for the days remaining. */
export function daysLeftLabel(expiresAt: Date, now: Date = new Date()): string {
  const days = Math.max(0, Math.ceil((expiresAt.getTime() - now.getTime()) / DAY));
  if (days <= 1) return "Last day";
  return `${days} days left`;
}

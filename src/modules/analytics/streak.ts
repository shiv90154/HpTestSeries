// Practice streak for the dashboard (pure, no DB): consecutive India-time days with at least one submitted test.

const IST_OFFSET_MS = 5.5 * 3_600_000;
const DAY_MS = 86_400_000;

/** yyyy-mm-dd of the instant as seen in India. */
export function istDayKey(d: Date): string {
  return new Date(d.getTime() + IST_OFFSET_MS).toISOString().slice(0, 10);
}

/**
 * Days in a row the student practised, counting back from today. A student who has not practised yet today
 * keeps yesterday's streak (they still have the day to extend it); a gap of a full day resets it to 0.
 */
export function currentStreak(submittedAt: Date[], now: Date = new Date()): number {
  const days = new Set(submittedAt.map(istDayKey));
  let cursor = now;
  if (!days.has(istDayKey(cursor))) cursor = new Date(now.getTime() - DAY_MS);
  let streak = 0;
  while (days.has(istDayKey(cursor))) {
    streak++;
    cursor = new Date(cursor.getTime() - DAY_MS);
  }
  return streak;
}

/** Tests submitted in the last 7 days. */
export function testsThisWeek(submittedAt: Date[], now: Date = new Date()): number {
  const since = now.getTime() - 7 * DAY_MS;
  return submittedAt.filter((d) => d.getTime() > since).length;
}

// Live tests: one shared window, one attempt each, nothing revealed until the window closes. Pure, so unit-tested.

export type LiveWindow = { liveStartsAt: Date | null; liveEndsAt: Date | null };

export type LiveState = "none" | "upcoming" | "open" | "ended";

export function isLiveTest(t: LiveWindow): boolean {
  return !!t.liveStartsAt && !!t.liveEndsAt;
}

export function liveState(t: LiveWindow, now: Date = new Date()): LiveState {
  if (!t.liveStartsAt || !t.liveEndsAt) return "none";
  if (now < t.liveStartsAt) return "upcoming";
  return now < t.liveEndsAt ? "open" : "ended";
}

/** Results, solutions, ranks and the leaderboard of a live test stay hidden until its window closes. */
export function resultsLocked(t: LiveWindow, now: Date = new Date()): boolean {
  const s = liveState(t, now);
  return s === "upcoming" || s === "open";
}

/** Everyone's clock stops at the window end, even if they joined late. */
export function liveDeadline(now: Date, durationSec: number, endsAt: Date): Date {
  return new Date(Math.min(now.getTime() + durationSec * 1000, endsAt.getTime()));
}

/** Admin input check: the window must be in the future-or-now, long enough for the test, and in order. */
export function liveWindowProblems(startsAt: Date | null, endsAt: Date | null, durationSec: number): string[] {
  if (!startsAt && !endsAt) return [];
  if (!startsAt || !endsAt) return ["Set both the start and the end time of the live window, or neither"];
  if (endsAt <= startsAt) return ["The live window must end after it starts"];
  if ((endsAt.getTime() - startsAt.getTime()) / 1000 < durationSec) return ["The live window must be at least as long as the test duration"];
  return [];
}

/** "2026-10-10T20:00" typed in an admin's datetime field is Indian time; "" means not set. Null when unreadable. */
export function parseIstLocal(v: string): Date | null | undefined {
  if (!v) return undefined;
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(v)) return null;
  const d = new Date(`${v}:00+05:30`);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** The inverse of `parseIstLocal`, for filling the admin's datetime field. */
export function toIstLocal(d: Date | null): string {
  if (!d) return "";
  return new Date(d.getTime() + 330 * 60_000).toISOString().slice(0, 16);
}

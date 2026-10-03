// "Recommended for you" on the dashboard. Pure, so unit-tested; the dashboard loads the inputs.

export type SuggestCandidate = {
  slug: string;
  examId: string | null;
  isFree: boolean;
  /** the student can open it right now: free, or covered by one of their plans */
  open: boolean;
  /** a live test sits in a fixed window; it is announced on its own card, never suggested as "a test to take" */
  isLive: boolean;
};

/**
 * Tests the student has not taken, best first: the exams they already practise (or have paid for) lead, then
 * general tests, then other exams; inside each group tests they can open come before locked ones. The input
 * order (free first, newest first) breaks every other tie.
 */
export function rankSuggestions<T extends SuggestCandidate>(candidates: T[], takenSlugs: Set<string>, preferredExamIds: string[]): T[] {
  const preferred = new Set(preferredExamIds);
  const group = (t: T) => (t.examId && preferred.has(t.examId) ? 0 : t.examId === null ? 1 : 2);
  return candidates
    .map((t, i) => ({ t, i }))
    .filter(({ t }) => !t.isLive && !takenSlugs.has(t.slug))
    .sort((a, b) => group(a.t) - group(b.t) || Number(b.t.open) - Number(a.t.open) || a.i - b.i)
    .map(({ t }) => t);
}

/** Exam ids ordered by how many of the given tests belong to each: the student's most-practised exam first. */
export function preferredExams(examIds: (string | null)[]): string[] {
  const counts = new Map<string, number>();
  for (const id of examIds) if (id) counts.set(id, (counts.get(id) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => id);
}

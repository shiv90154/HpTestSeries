// Pure grading logic — no DB access, so it is trivially unit-testable and cheap to run at submit.

export type AnswerEntry = {
  /** chosen option id; absent = skipped */
  o?: string;
  /** seconds spent on the question */
  t?: number;
  /** marked for review */
  m?: boolean;
};

export type Answers = Record<string, AnswerEntry>;

export type GradingQuestion = {
  id: string;
  correctOptionId: string;
  topicIds: string[];
};

export type GradingSection = {
  id: string;
  marksCorrect: number;
  /** positive number deducted for a wrong answer */
  marksWrong: number;
  questions: GradingQuestion[];
};

export type Tally = {
  score: number;
  correct: number;
  wrong: number;
  skipped: number;
  timeSpentSec: number;
};

export type GradeResult = Tally & {
  sectionStats: Record<string, Tally & { maxScore: number }>;
  topicStats: Record<string, { correct: number; wrong: number; skipped: number }>;
};

const round2 = (n: number) => Math.round(n * 100) / 100;

function emptyTally(): Tally {
  return { score: 0, correct: 0, wrong: 0, skipped: 0, timeSpentSec: 0 };
}

export function gradeAttempt(sections: GradingSection[], answers: Answers): GradeResult {
  const total = emptyTally();
  const sectionStats: GradeResult["sectionStats"] = {};
  const topicStats: GradeResult["topicStats"] = {};

  for (const section of sections) {
    const s = { ...emptyTally(), maxScore: round2(section.questions.length * section.marksCorrect) };

    for (const q of section.questions) {
      const a = answers[q.id];
      const time = Math.max(0, Math.floor(a?.t ?? 0));
      s.timeSpentSec += time;

      let outcome: "correct" | "wrong" | "skipped";
      if (!a?.o) outcome = "skipped";
      else if (a.o === q.correctOptionId) outcome = "correct";
      else outcome = "wrong";

      s[outcome] += 1;
      if (outcome === "correct") s.score += section.marksCorrect;
      if (outcome === "wrong") s.score -= section.marksWrong;

      for (const topicId of q.topicIds) {
        const t = (topicStats[topicId] ??= { correct: 0, wrong: 0, skipped: 0 });
        t[outcome] += 1;
      }
    }

    s.score = round2(s.score);
    sectionStats[section.id] = s;
    total.score += s.score;
    total.correct += s.correct;
    total.wrong += s.wrong;
    total.skipped += s.skipped;
    total.timeSpentSec += s.timeSpentSec;
  }

  total.score = round2(total.score);
  return { ...total, sectionStats, topicStats };
}

/**
 * Percentile = share of ranked candidates scoring strictly below this score.
 * `rank` is 1-based (1 + number of candidates with a higher score).
 */
export function percentileFromRank(rank: number, totalRanked: number): number {
  if (totalRanked <= 1) return 100;
  const below = totalRanked - rank;
  return round2((below / (totalRanked - 1)) * 100);
}

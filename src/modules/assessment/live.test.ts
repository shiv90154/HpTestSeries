import { describe, expect, it } from "vitest";
import { isLiveTest, liveDeadline, liveState, liveWindowProblems, resultsLocked } from "./live";

const at = (h: number) => new Date(Date.UTC(2026, 9, 10, h, 0, 0));
const win = { liveStartsAt: at(20), liveEndsAt: at(21) };

describe("liveState", () => {
  it("is none for a normal test", () => {
    expect(liveState({ liveStartsAt: null, liveEndsAt: null }, at(20))).toBe("none");
    expect(isLiveTest({ liveStartsAt: null, liveEndsAt: null })).toBe(false);
  });
  it("walks upcoming → open → ended", () => {
    expect(liveState(win, at(19))).toBe("upcoming");
    expect(liveState(win, at(20))).toBe("open");
    expect(liveState(win, new Date(at(21).getTime() - 1))).toBe("open");
    expect(liveState(win, at(21))).toBe("ended");
  });
});

describe("resultsLocked", () => {
  it("hides results before and during the window only", () => {
    expect(resultsLocked(win, at(19))).toBe(true);
    expect(resultsLocked(win, at(20))).toBe(true);
    expect(resultsLocked(win, at(21))).toBe(false);
    expect(resultsLocked({ liveStartsAt: null, liveEndsAt: null }, at(20))).toBe(false);
  });
});

describe("liveDeadline", () => {
  it("gives the full duration when there is room", () => {
    expect(liveDeadline(at(20), 1800, at(21)).getTime()).toBe(at(20).getTime() + 1800_000);
  });
  it("cuts a late joiner off at the window end", () => {
    const joined = new Date(at(21).getTime() - 600_000);
    expect(liveDeadline(joined, 1800, at(21)).getTime()).toBe(at(21).getTime());
  });
});

describe("liveWindowProblems", () => {
  it("accepts no window and a valid one", () => {
    expect(liveWindowProblems(null, null, 1800)).toEqual([]);
    expect(liveWindowProblems(at(20), at(21), 1800)).toEqual([]);
  });
  it("rejects half-set, reversed and too-short windows", () => {
    expect(liveWindowProblems(at(20), null, 1800)).toHaveLength(1);
    expect(liveWindowProblems(at(21), at(20), 1800)).toHaveLength(1);
    expect(liveWindowProblems(at(20), new Date(at(20).getTime() + 600_000), 1800)).toHaveLength(1);
  });
});

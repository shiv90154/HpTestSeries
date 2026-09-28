import { describe, expect, it } from "vitest";
import { competitionRanks, publicName } from "./leaderboard";

describe("publicName", () => {
  it("shows first name and last initial", () => {
    expect(publicName("Rahul Kumar Sharma")).toBe("Rahul S.");
    expect(publicName("  priya   thakur ")).toBe("priya T.");
  });
  it("keeps single names and falls back for blanks", () => {
    expect(publicName("Aspirant")).toBe("Aspirant");
    expect(publicName("   ")).toBe("Aspirant");
  });
});

describe("competitionRanks", () => {
  it("gives ties the same rank and skips the next ones", () => {
    expect(competitionRanks([90, 80, 80, 70, 70, 70, 60])).toEqual([1, 2, 2, 4, 4, 4, 7]);
  });
  it("handles empty and single lists", () => {
    expect(competitionRanks([])).toEqual([]);
    expect(competitionRanks([5])).toEqual([1]);
  });
});

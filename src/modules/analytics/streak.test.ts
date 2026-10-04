import { describe, expect, it } from "vitest";
import { currentStreak, istDayKey, testsThisWeek } from "./streak";

// 10:00 IST on the given date
const at = (day: string) => new Date(`${day}T04:30:00Z`);

describe("istDayKey", () => {
  it("uses the India date, not the UTC one", () => {
    expect(istDayKey(new Date("2026-10-04T20:00:00Z"))).toBe("2026-10-05"); // 01:30 IST next day
    expect(istDayKey(new Date("2026-10-04T10:00:00Z"))).toBe("2026-10-04");
  });
});

describe("currentStreak", () => {
  const now = at("2026-10-05");

  it("is 0 with no practice", () => {
    expect(currentStreak([], now)).toBe(0);
  });

  it("counts consecutive days including today", () => {
    expect(currentStreak([at("2026-10-05"), at("2026-10-04"), at("2026-10-03")], now)).toBe(3);
  });

  it("keeps yesterday's streak when today is still empty", () => {
    expect(currentStreak([at("2026-10-04"), at("2026-10-03")], now)).toBe(2);
  });

  it("resets after a missed day", () => {
    expect(currentStreak([at("2026-10-03"), at("2026-10-02")], now)).toBe(0);
  });

  it("stops at the first gap and counts a day once however many tests", () => {
    expect(currentStreak([at("2026-10-05"), at("2026-10-05"), at("2026-10-03")], now)).toBe(1);
  });
});

describe("testsThisWeek", () => {
  it("counts the last 7 days only", () => {
    const now = at("2026-10-10");
    expect(testsThisWeek([at("2026-10-09"), at("2026-10-04"), at("2026-10-02")], now)).toBe(2);
  });
});

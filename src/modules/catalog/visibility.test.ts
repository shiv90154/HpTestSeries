import { describe, expect, it } from "vitest";
import { isScheduled, liveTestWhere } from "./visibility";

const now = new Date("2026-09-28T10:00:00Z");

describe("test visibility", () => {
  it("live = published and publish time reached (or unset)", () => {
    expect(liveTestWhere(now)).toEqual({ status: "PUBLISHED", AND: [{ OR: [{ publishedAt: null }, { publishedAt: { lte: now } }] }] });
  });

  it("a published test with a future publish time is scheduled", () => {
    expect(isScheduled("PUBLISHED", new Date("2026-09-29T00:00:00Z"), now)).toBe(true);
    expect(isScheduled("PUBLISHED", new Date("2026-09-27T00:00:00Z"), now)).toBe(false);
    expect(isScheduled("PUBLISHED", null, now)).toBe(false);
    expect(isScheduled("DRAFT", new Date("2026-09-29T00:00:00Z"), now)).toBe(false);
  });
});

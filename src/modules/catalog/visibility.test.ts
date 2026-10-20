import { describe, expect, it } from "vitest";
import { ALL_SITES, bodyOnSite, bodyVisibleOn, canonicalSiteCode, isScheduled, liveTestWhere, testOnSite } from "./visibility";

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

describe("site visibility", () => {
  it("shows a body on its own sites and national bodies everywhere", () => {
    expect(bodyVisibleOn(["hp"], "hp")).toBe(true);
    expect(bodyVisibleOn(["hp"], "pb")).toBe(false);
    expect(bodyVisibleOn(["*"], "pb")).toBe(true);
    expect(bodyVisibleOn(["hp", "pb"], "pb")).toBe(true);
  });

  it("keeps the canonical of national and shared bodies on the primary site", () => {
    expect(canonicalSiteCode(["*"], "hp")).toBe("hp");
    expect(canonicalSiteCode(["hp", "pb"], "hp")).toBe("hp");
    expect(canonicalSiteCode(["pb"], "hp")).toBe("pb");
    expect(canonicalSiteCode(["pb", "hr"], "hp")).toBe("pb");
  });

  it("builds Prisma filters that include national bodies", () => {
    expect(bodyOnSite("pb")).toEqual({ sites: { hasSome: ["pb", ALL_SITES] } });
    expect(testOnSite("pb")).toEqual({ OR: [{ exam: { body: { sites: { hasSome: ["pb", "*"] } } } }, { examId: null, site: "pb" }] });
  });
});

import { describe, expect, it } from "vitest";
import { canAccessTest, type AccessEntitlement } from "./access";

const now = new Date("2026-09-27T12:00:00Z");
const past = new Date("2026-01-01T00:00:00Z");
const future = new Date("2027-01-01T00:00:00Z");

function ent(overrides: Partial<AccessEntitlement> & { product: AccessEntitlement["product"] }): AccessEntitlement {
  return { startsAt: past, expiresAt: future, revokedAt: null, ...overrides };
}

const paidTest = { isFree: false, seriesIds: ["joa-it-series"], sites: ["hp"] };

describe("canAccessTest", () => {
  it("allows free tests without entitlements", () => {
    expect(canAccessTest({ isFree: true, seriesIds: [], sites: ["hp"] }, [], now)).toBe(true);
  });

  it("denies paid tests without entitlements", () => {
    expect(canAccessTest(paidTest, [], now)).toBe(false);
  });

  it("allows a series or pack that includes the test", () => {
    const series = ent({ product: { kind: "SERIES", seriesIds: ["joa-it-series"], site: "hp" } });
    const pack = ent({ product: { kind: "PACK", seriesIds: ["clerk-series", "joa-it-series"], site: "hp" } });
    expect(canAccessTest(paidTest, [series], now)).toBe(true);
    expect(canAccessTest(paidTest, [pack], now)).toBe(true);
  });

  it("denies a product for a different series", () => {
    const other = ent({ product: { kind: "SERIES", seriesIds: ["clerk-series"], site: "hp" } });
    expect(canAccessTest(paidTest, [other], now)).toBe(false);
  });

  it("allows an all-access pass for any paid test its site shows, national ones included", () => {
    const pass = ent({ product: { kind: "PASS", seriesIds: [], site: "hp" } });
    expect(canAccessTest({ isFree: false, seriesIds: [], sites: ["hp"] }, [pass], now)).toBe(true);
    expect(canAccessTest({ isFree: false, seriesIds: [], sites: ["*"] }, [pass], now)).toBe(true);
    expect(canAccessTest({ isFree: false, seriesIds: [], sites: ["hp", "pb"] }, [pass], now)).toBe(true);
  });

  it("denies another state's pass", () => {
    const pbPass = ent({ product: { kind: "PASS", seriesIds: [], site: "pb" } });
    expect(canAccessTest(paidTest, [pbPass], now)).toBe(false);
  });

  it("denies expired, not-yet-started, and revoked entitlements", () => {
    const product = { kind: "PASS" as const, seriesIds: [], site: "hp" };
    expect(canAccessTest(paidTest, [ent({ product, expiresAt: past })], now)).toBe(false);
    expect(canAccessTest(paidTest, [ent({ product, startsAt: future })], now)).toBe(false);
    expect(canAccessTest(paidTest, [ent({ product, revokedAt: past })], now)).toBe(false);
  });
});

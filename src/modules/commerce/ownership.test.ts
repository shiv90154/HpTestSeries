import { describe, expect, it } from "vitest";
import { ownershipFor, renewalStart, type OwnedEntitlement, type OwnershipProduct } from "./ownership";

const now = new Date("2026-09-28T12:00:00Z");
const days = (n: number) => new Date(now.getTime() + n * 86_400_000);

const series: OwnershipProduct = { id: "p-series", kind: "SERIES", seriesIds: ["s1"], validUntil: null };
const pack: OwnershipProduct = { id: "p-pack", kind: "PACK", seriesIds: ["s1", "s2"], validUntil: null };
const pass: OwnershipProduct = { id: "p-pass", kind: "PASS", seriesIds: [], validUntil: null };

function ent(p: OwnershipProduct, expiresInDays: number, extra: Partial<OwnedEntitlement> = {}): OwnedEntitlement {
  return {
    productId: p.id,
    productTitle: p.id,
    startsAt: days(-30),
    expiresAt: days(expiresInDays),
    revokedAt: null,
    product: { kind: p.kind, seriesIds: p.seriesIds },
    ...extra,
  };
}

describe("ownershipFor", () => {
  it("is none with no entitlements", () => {
    expect(ownershipFor(series, [], now)).toEqual({ kind: "none" });
  });

  it("blocks buying the same product again while plenty of time is left", () => {
    expect(ownershipFor(series, [ent(series, 40)], now)).toMatchObject({ kind: "owned", via: "same", until: days(40) });
  });

  it("allows renewing the same product in its last week", () => {
    expect(ownershipFor(series, [ent(series, 5)], now)).toEqual({ kind: "renewable", until: days(5) });
  });

  it("never offers renewal of a fixed-end-date product", () => {
    expect(ownershipFor({ ...series, validUntil: days(5) }, [ent(series, 5)], now)).toMatchObject({ kind: "owned" });
  });

  it("counts an already-bought renewal that has not started yet", () => {
    const renewal = ent(series, 95, { startsAt: days(5) });
    expect(ownershipFor(series, [ent(series, 5), renewal], now)).toMatchObject({ kind: "owned", until: days(95) });
  });

  it("ignores revoked and expired entitlements", () => {
    expect(ownershipFor(series, [ent(series, 40, { revokedAt: days(-1) }), ent(series, -1)], now)).toEqual({ kind: "none" });
  });

  it("treats a series as owned when an active pass covers it", () => {
    expect(ownershipFor(series, [ent(pass, 60)], now)).toMatchObject({ kind: "owned", via: "pass" });
  });

  it("still lets a pass holder buy another pass", () => {
    expect(ownershipFor(pass, [ent({ ...pass, id: "other-pass" }, 60)], now)).toEqual({ kind: "none" });
  });

  it("allows a pack when only some of its series are owned", () => {
    expect(ownershipFor(pack, [ent(series, 60)], now)).toEqual({ kind: "none" });
  });

  it("blocks a pack whose every series is already owned, until the earliest one ends", () => {
    const s2: OwnershipProduct = { id: "p-s2", kind: "SERIES", seriesIds: ["s2"], validUntil: null };
    expect(ownershipFor(pack, [ent(series, 60), ent(s2, 20)], now)).toMatchObject({ kind: "owned", via: "series", until: days(20) });
  });
});

describe("renewalStart", () => {
  it("starts now without a current period", () => {
    expect(renewalStart("p", [], now)).toEqual(now);
  });

  it("starts when the current period of the same product ends", () => {
    const e = { productId: "p", expiresAt: days(5), revokedAt: null };
    expect(renewalStart("p", [e, { productId: "other", expiresAt: days(50), revokedAt: null }], now)).toEqual(days(5));
  });
});

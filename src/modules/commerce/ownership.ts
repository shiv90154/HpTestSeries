// "Does this student already have what they are about to buy?" — pure, so it can be unit tested.
// Callers load the product and the user's unrevoked, unexpired entitlements from the DB.

import { isEntitlementActive } from "./access";

/** A student may buy the same product again this close to its expiry; the new period starts when the old one ends. */
export const RENEW_WINDOW_DAYS = 7;

export type OwnershipProduct = {
  id: string;
  kind: "SERIES" | "PACK" | "PASS";
  /** series the product unlocks (ignored for PASS) */
  seriesIds: string[];
  /** fixed end date: buying again would not extend anything */
  validUntil: Date | null;
};

export type OwnedEntitlement = {
  productId: string;
  productTitle: string;
  startsAt: Date;
  expiresAt: Date;
  revokedAt: Date | null;
  product: { kind: "SERIES" | "PACK" | "PASS"; seriesIds: string[] };
};

export type Ownership =
  | { kind: "none" }
  /** Same product, ending within the renewal window: buying extends it from `until`. */
  | { kind: "renewable"; until: Date }
  /** Already covered — buying again would be wasted money. */
  | { kind: "owned"; until: Date; via: "same" | "pass" | "series"; viaTitle: string };

const DAY_MS = 86_400_000;

export function ownershipFor(product: OwnershipProduct, entitlements: OwnedEntitlement[], now: Date = new Date()): Ownership {
  const live = entitlements.filter((e) => !e.revokedAt && e.expiresAt > now);

  // The same product, including an already-bought renewal that hasn't started yet.
  const same = live.filter((e) => e.productId === product.id);
  if (same.length) {
    const last = same.reduce((a, b) => (b.expiresAt > a.expiresAt ? b : a));
    const renewable = !product.validUntil && last.expiresAt.getTime() - now.getTime() <= RENEW_WINDOW_DAYS * DAY_MS;
    return renewable ? { kind: "renewable", until: last.expiresAt } : { kind: "owned", until: last.expiresAt, via: "same", viaTitle: last.productTitle };
  }

  const active = live.filter((e) => isEntitlementActive(e, now));

  // Any pass covers every series. Buying a different pass stays allowed (e.g. a longer one).
  if (product.kind !== "PASS") {
    const pass = active.filter((e) => e.product.kind === "PASS").sort((a, b) => b.expiresAt.getTime() - a.expiresAt.getTime())[0];
    if (pass) return { kind: "owned", until: pass.expiresAt, via: "pass", viaTitle: pass.productTitle };

    // Every series of this pack/series is already unlocked by other purchases.
    if (product.seriesIds.length) {
      const coveredUntil = product.seriesIds.map((sid) => {
        const covering = active.filter((e) => e.product.kind !== "PASS" && e.product.seriesIds.includes(sid));
        return covering.length ? covering.reduce((a, b) => (b.expiresAt > a.expiresAt ? b : a)) : null;
      });
      if (coveredUntil.every(Boolean)) {
        const first = coveredUntil.reduce((a, b) => (b!.expiresAt < a!.expiresAt ? b : a))!;
        return { kind: "owned", until: first.expiresAt, via: "series", viaTitle: first.productTitle };
      }
    }
  }
  return { kind: "none" };
}

/** When a new purchase of `productId` starts: now, or when the student's current period of it ends. */
export function renewalStart(productId: string, entitlements: Pick<OwnedEntitlement, "productId" | "expiresAt" | "revokedAt">[], now: Date): Date {
  return entitlements
    .filter((e) => e.productId === productId && !e.revokedAt && e.expiresAt > now)
    .reduce((start, e) => (e.expiresAt > start ? e.expiresAt : start), now);
}

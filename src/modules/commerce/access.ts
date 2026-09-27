// Single source of truth for "can this user open this test?" (BLUEPRINT §17).
// Pure so it can be tested; callers load the inputs from the DB.

export type AccessTest = {
  isFree: boolean;
  /** ids of every series that contains this test */
  seriesIds: string[];
};

export type AccessEntitlement = {
  startsAt: Date;
  expiresAt: Date;
  revokedAt: Date | null;
  product: {
    kind: "SERIES" | "PACK" | "PASS";
    /** series covered by the product (ignored for PASS) */
    seriesIds: string[];
  };
};

export function isEntitlementActive(e: AccessEntitlement, now: Date): boolean {
  return !e.revokedAt && e.startsAt <= now && now < e.expiresAt;
}

export function canAccessTest(
  test: AccessTest,
  entitlements: AccessEntitlement[],
  now: Date = new Date(),
): boolean {
  if (test.isFree) return true;

  const testSeries = new Set(test.seriesIds);
  return entitlements.some(
    (e) =>
      isEntitlementActive(e, now) &&
      (e.product.kind === "PASS" || e.product.seriesIds.some((id) => testSeries.has(id))),
  );
}

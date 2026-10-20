// Single source of truth for "can this user open this test?" (BLUEPRINT §17).
// Pure so it can be tested; callers load the inputs from the DB.

export type AccessTest = {
  isFree: boolean;
  /** ids of every series that contains this test */
  seriesIds: string[];
  /** sites that show the test: its exam body's sites ("*" = all), or the test's own site when it has no exam */
  sites: readonly string[];
};

export type AccessEntitlement = {
  startsAt: Date;
  expiresAt: Date;
  revokedAt: Date | null;
  product: {
    kind: "SERIES" | "PACK" | "PASS";
    /** series covered by the product (ignored for PASS) */
    seriesIds: string[];
    /** the site a PASS belongs to */
    site: string;
  };
};

/** A PASS opens every test its own site shows (national tests included), never another state's. */
export function passCovers(passSite: string, testSites: readonly string[]): boolean {
  return testSites.includes("*") || testSites.includes(passSite);
}

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
      (e.product.kind === "PASS" ? passCovers(e.product.site, test.sites) : e.product.seriesIds.some((id) => testSeries.has(id))),
  );
}

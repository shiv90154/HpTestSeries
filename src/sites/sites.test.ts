import { describe, expect, it } from "vitest";
import { getSite, PRIMARY_SITE, siteFromHost, SITES } from ".";

describe("siteFromHost", () => {
  it("maps each domain, with or without www and a port", () => {
    expect(siteFromHost("hptestseries.in").code).toBe("hp");
    expect(siteFromHost("www.pbtestseries.in").code).toBe("pb");
    expect(siteFromHost("PBTESTSERIES.IN:443").code).toBe("pb");
    expect(siteFromHost("rjtestseries.in").code).toBe("rj");
    expect(siteFromHost("www.rjtestseries.in").code).toBe("rj");
  });

  it("maps <code>.localhost for local dev and plain localhost to the primary site", () => {
    expect(siteFromHost("pb.localhost:3000").code).toBe("pb");
    expect(siteFromHost("rj.localhost:3000").code).toBe("rj");
    expect(siteFromHost("localhost:3000").code).toBe(PRIMARY_SITE.code);
  });

  it("gives unknown or missing hosts the primary site", () => {
    expect(siteFromHost("evil.example").code).toBe(PRIMARY_SITE.code);
    expect(siteFromHost(null).code).toBe(PRIMARY_SITE.code);
  });
});

describe("site registry", () => {
  it("falls back to the primary site for unknown codes", () => {
    expect(getSite("xx")).toBe(PRIMARY_SITE);
    expect(getSite("pb")).toBe(SITES.pb);
  });

  it("gives every site its own domains, free mock and state page", () => {
    const all = Object.values(SITES);
    for (const key of ["freeMockSlug", "url", "name"] as const) {
      expect(new Set(all.map((s) => s[key])).size).toBe(all.length);
    }
    expect(new Set(all.flatMap((s) => s.domains)).size).toBe(all.flatMap((s) => s.domains).length);
    expect(new Set(all.map((s) => s.statePage.slug)).size).toBe(all.length);
  });

  it("keeps the theme colour and logo fill in step with the primary token", () => {
    for (const s of Object.values(SITES)) {
      expect(s.logo.fill).toBe(s.themeColor);
      if (s.theme.primary) expect(s.theme.primary).toBe(s.themeColor);
    }
  });
});

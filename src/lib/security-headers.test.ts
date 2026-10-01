import { describe, expect, it } from "vitest";
import { contentSecurityPolicy, securityHeaders } from "./security-headers";

describe("contentSecurityPolicy", () => {
  it("locks down framing, plugins and base/form targets", () => {
    const csp = contentSecurityPolicy(false);
    for (const d of ["default-src 'self'", "object-src 'none'", "base-uri 'self'", "form-action 'self'", "frame-ancestors 'none'"]) {
      expect(csp).toContain(d);
    }
  });

  it("allows Razorpay Checkout", () => {
    const csp = contentSecurityPolicy(false);
    expect(csp).toMatch(/script-src [^;]*https:\/\/checkout\.razorpay\.com/);
    expect(csp).toMatch(/script-src [^;]*https:\/\/cdn\.razorpay\.com/);
    expect(csp).toMatch(/frame-src [^;]*razorpay\.com/);
  });

  it("allows Google Analytics", () => {
    const csp = contentSecurityPolicy(false);
    expect(csp).toMatch(/script-src [^;]*https:\/\/www\.googletagmanager\.com/);
    expect(csp).toMatch(/connect-src [^;]*google-analytics\.com/);
  });

  it("only allows eval in development", () => {
    expect(contentSecurityPolicy(false)).not.toContain("unsafe-eval");
    expect(contentSecurityPolicy(true)).toContain("unsafe-eval");
  });
});

describe("securityHeaders", () => {
  it("sends HSTS in production only", () => {
    const has = (dev: boolean) => securityHeaders(dev).some((h) => h.key === "Strict-Transport-Security");
    expect(has(false)).toBe(true);
    expect(has(true)).toBe(false);
  });
});

import { describe, expect, it } from "vitest";
import { CLAIM_TTL_MS, canonicalJson, signClaim, verifyClaim, type ClaimPayload } from "./guest-claim";

const secret = "test-secret";
const now = 1_790_000_000_000;
const payload: ClaimPayload = { slug: "hp-gk-free-mock-1", answers: { q1: { o: "a", t: 12 }, q2: { t: 3, m: true } }, gradedAt: now, violations: 1 };

describe("guest result claims", () => {
  it("canonical JSON ignores key order", () => {
    expect(canonicalJson({ b: 1, a: { d: 2, c: 3 } })).toBe(canonicalJson({ a: { c: 3, d: 2 }, b: 1 }));
  });

  it("accepts the untouched payload", () => {
    expect(verifyClaim(payload, signClaim(payload, secret), secret, now + 1000)).toBe("ok");
  });

  it("still verifies after the answers went through JSON with a different key order", () => {
    const reordered = { ...payload, answers: { q2: { m: true, t: 3 }, q1: { t: 12, o: "a" } } };
    expect(verifyClaim(reordered, signClaim(payload, secret), secret, now)).toBe("ok");
  });

  it("rejects a changed answer (e.g. corrected after seeing the solutions)", () => {
    const token = signClaim(payload, secret);
    const tampered = { ...payload, answers: { ...payload.answers, q2: { t: 3, o: "b" } } };
    expect(verifyClaim(tampered, token, secret, now)).toBe("invalid");
  });

  it("rejects a lowered violation count, another test, or another secret", () => {
    const token = signClaim(payload, secret);
    expect(verifyClaim({ ...payload, violations: 0 }, token, secret, now)).toBe("invalid");
    expect(verifyClaim({ ...payload, slug: "other" }, token, secret, now)).toBe("invalid");
    expect(verifyClaim(payload, token, "other-secret", now)).toBe("invalid");
    expect(verifyClaim(payload, "short", secret, now)).toBe("invalid");
  });

  it("expires after the TTL", () => {
    const token = signClaim(payload, secret);
    expect(verifyClaim(payload, token, secret, now + CLAIM_TTL_MS + 1)).toBe("expired");
  });
});

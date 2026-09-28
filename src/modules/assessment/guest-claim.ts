// A guest's free-test result can be saved to their account after they log in. The server signs the
// exact answers at grading time — before any solution was shown — so a claim can't be edited into a
// better score afterwards. Pure (secret passed in) so it can be unit tested.

import { createHmac, timingSafeEqual } from "node:crypto";
import type { SubmittedAnswers } from "./types";

/** How long after grading a guest result can still be saved. */
export const CLAIM_TTL_MS = 24 * 3600 * 1000;

export type ClaimPayload = { slug: string; answers: SubmittedAnswers; gradedAt: number; violations: number };

/** JSON with sorted object keys, so the same data always signs the same way. */
export function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, v]) => v !== undefined)
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
    return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${canonicalJson(v)}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

export function signClaim(payload: ClaimPayload, secret: string): string {
  return createHmac("sha256", secret).update(`guest-claim:${canonicalJson(payload)}`).digest("base64url");
}

export function verifyClaim(payload: ClaimPayload, token: string, secret: string, now: number = Date.now()): "ok" | "expired" | "invalid" {
  const expected = Buffer.from(signClaim(payload, secret));
  const given = Buffer.from(token);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return "invalid";
  if (payload.gradedAt > now + 60_000 || now - payload.gradedAt > CLAIM_TTL_MS) return "expired";
  return "ok";
}

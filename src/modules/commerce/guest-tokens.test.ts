import { describe, expect, it } from "vitest";
import { parseClaimTokens, withClaimToken } from "./guest-tokens";

const a = "a".repeat(32);
const b = "B-_".repeat(10) + "xy";

describe("guest claim tokens", () => {
  it("reads nothing from a missing or empty cookie", () => {
    expect(parseClaimTokens(undefined)).toEqual([]);
    expect(parseClaimTokens("")).toEqual([]);
  });

  it("drops malformed entries", () => {
    expect(parseClaimTokens(`${a},short,${b},has space ${a}x,`)).toEqual([a, b]);
  });

  it("appends a new token and does not duplicate an existing one", () => {
    expect(withClaimToken(a, b)).toBe(`${a},${b}`);
    expect(withClaimToken(`${a},${b}`, a)).toBe(`${b},${a}`);
  });

  it("keeps only the newest tokens", () => {
    const many = Array.from({ length: 12 }, (_, i) => String(i).padStart(32, "0"));
    const cookie = many.reduce<string | undefined>((acc, t) => withClaimToken(acc, t), undefined);
    expect(parseClaimTokens(cookie)).toEqual(many.slice(-10));
  });
});

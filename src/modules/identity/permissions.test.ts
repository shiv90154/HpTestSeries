import { describe, expect, it } from "vitest";
import { can, isValidIndianMobile, normalizeIndianMobile } from "./permissions";

describe("can", () => {
  it("gives students no admin permissions", () => {
    expect(can("STUDENT", "admin:access")).toBe(false);
    expect(can(null, "admin:access")).toBe(false);
  });

  it("separates editing, publishing, support, and money", () => {
    expect(can("EDITOR", "content:edit")).toBe(true);
    expect(can("EDITOR", "content:publish")).toBe(false);
    expect(can("REVIEWER", "content:publish")).toBe(true);
    expect(can("SUPPORT", "users:manage")).toBe(true);
    expect(can("SUPPORT", "content:edit")).toBe(false);
    expect(can("REVIEWER", "commerce:manage")).toBe(false);
    expect(can("ADMIN", "commerce:manage")).toBe(true);
  });
});

describe("Indian mobile numbers", () => {
  it("validates E.164 +91 numbers", () => {
    expect(isValidIndianMobile("+919876543210")).toBe(true);
    expect(isValidIndianMobile("+915876543210")).toBe(false); // must start 6-9
    expect(isValidIndianMobile("9876543210")).toBe(false);
  });

  it("normalizes common input formats", () => {
    expect(normalizeIndianMobile("98765 43210")).toBe("+919876543210");
    expect(normalizeIndianMobile("098765-43210")).toBe("+919876543210");
    expect(normalizeIndianMobile("+91 98765 43210")).toBe("+919876543210");
    expect(normalizeIndianMobile("919876543210")).toBe("+919876543210");
    expect(normalizeIndianMobile("12345")).toBeNull();
    expect(normalizeIndianMobile("5876543210")).toBeNull();
  });
});

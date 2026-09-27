import { describe, expect, it } from "vitest";
import { safeNextPath } from "./site";

describe("safeNextPath", () => {
  it("keeps same-site relative paths", () => {
    expect(safeNextPath("/admin/questions?page=2")).toBe("/admin/questions?page=2");
    expect(safeNextPath(["/tests/abc", "/x"])).toBe("/tests/abc");
  });

  it("rejects external and protocol-relative targets", () => {
    expect(safeNextPath("https://evil.com")).toBe("/dashboard");
    expect(safeNextPath("//evil.com")).toBe("/dashboard");
    expect(safeNextPath("/\\evil.com")).toBe("/dashboard");
    expect(safeNextPath(undefined, "/")).toBe("/");
  });
});

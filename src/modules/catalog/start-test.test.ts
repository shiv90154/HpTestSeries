import { describe, expect, it } from "vitest";
import { startTest, type StartCandidate } from "./start-test";

const t = (slug: string, o: Partial<StartCandidate> = {}): StartCandidate => ({ slug, type: "MOCK", isFree: false, examName: "Patwari", hasDemo: false, ...o });
const generic = t("hp-gk-free-mock-1", { isFree: true, examName: null });

describe("startTest", () => {
  it("prefers a free test made for the exam", () => {
    const r = startTest([generic, t("patwari-demo-mock", { hasDemo: true }), t("patwari-free-1", { isFree: true })], "HP Patwari");
    expect(r).toEqual({ href: "/tests/patwari-free-1/attempt", label: "Start free HP Patwari test" });
  });

  it("then the free demo of one of the exam's paid mocks", () => {
    const r = startTest([generic, t("patwari-full-1"), t("patwari-full-2", { hasDemo: true })], "HP Patwari");
    expect(r).toEqual({ href: "/tests/patwari-full-2/demo", label: "Try free HP Patwari demo" });
  });

  it("then the Himachal GK mock, named as such so the button does not claim an exam test", () => {
    const r = startTest([generic, t("patwari-full-1")], "HP Patwari");
    expect(r).toEqual({ href: "/tests/hp-gk-free-mock-1/attempt", label: "Start free Himachal GK test" });
  });

  it("is null when there is no free test at all", () => {
    expect(startTest([t("patwari-full-1")], "HP Patwari")).toBeNull();
    expect(startTest([], "HP Patwari")).toBeNull();
  });
});

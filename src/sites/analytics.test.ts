import { describe, expect, it } from "vitest";
import { gaIdFor } from "./analytics";

describe("gaIdFor", () => {
  it("gives each site its own measurement ID", () => {
    const env = { GA_ID_HP: "G-HP1", GA_ID_PB: " G-PB2 " };
    expect(gaIdFor("hp", env)).toBe("G-HP1");
    expect(gaIdFor("pb", env)).toBe("G-PB2");
  });

  it("falls back to NEXT_PUBLIC_GA_ID for hp only", () => {
    const env = { NEXT_PUBLIC_GA_ID: "G-OLD" };
    expect(gaIdFor("hp", env)).toBe("G-OLD");
    expect(gaIdFor("pb", env)).toBeUndefined();
  });

  it("ignores empty or malformed values", () => {
    expect(gaIdFor("hp", { GA_ID_HP: "" })).toBeUndefined();
    expect(gaIdFor("hp", { GA_ID_HP: "G-1');alert(1)//" })).toBeUndefined();
  });
});

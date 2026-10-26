import { describe, expect, it } from "vitest";
import { gaIdFor, metaPixelIdFor } from "./analytics";

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

describe("metaPixelIdFor", () => {
  it("gives each site its own pixel", () => {
    const env = { META_PIXEL_HP: "123456789012345", META_PIXEL_PB: " 987654321098765 " };
    expect(metaPixelIdFor("hp", env)).toBe("123456789012345");
    expect(metaPixelIdFor("pb", env)).toBe("987654321098765");
    expect(metaPixelIdFor("rj", env)).toBeUndefined();
  });

  it("ignores empty or malformed values", () => {
    expect(metaPixelIdFor("hp", { META_PIXEL_HP: "" })).toBeUndefined();
    expect(metaPixelIdFor("hp", { META_PIXEL_HP: "1234567890');alert(1)//" })).toBeUndefined();
  });
});

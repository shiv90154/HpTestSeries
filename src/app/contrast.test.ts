import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Colour tokens live in globals.css. This fails when an edit makes text (or white text on a coloured fill)
// hard to read on the backgrounds it is actually used on: students read on cheap phones in bright daylight.
// WCAG 2.x AA needs 4.5:1 for normal-size text.

const AA = 4.5;
const css = readFileSync(new URL("./globals.css", import.meta.url), "utf8");
const root = css.match(/:root\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";

function token(name: string): string {
  const m = root.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) throw new Error(`--${name} is not a #rrggbb colour in globals.css`);
  return m[1];
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const PLAIN_BACKGROUNDS = ["background", "surface", "surface-muted"];

// text colour token -> the backgrounds it is used on
const textOn: Record<string, string[]> = {
  foreground: [...PLAIN_BACKGROUNDS, "primary-soft", "accent-soft", "success-soft", "danger-soft"],
  muted: [...PLAIN_BACKGROUNDS, "primary-soft"],
  primary: [...PLAIN_BACKGROUNDS, "primary-soft"],
  success: [...PLAIN_BACKGROUNDS, "success-soft"],
  danger: [...PLAIN_BACKGROUNDS, "danger-soft"],
  "accent-ink": [...PLAIN_BACKGROUNDS, "accent-soft"],
  "cbt-marked": ["surface"],
};

// solid fills that carry white text (buttons, palette buttons, badges)
const whiteOn = ["primary", "primary-strong", "success", "danger", "cbt-answered", "cbt-not-answered", "cbt-marked", "cbt-header", "cbt-submit", "cbt-submit-strong"];

describe("colour tokens meet WCAG AA", () => {
  for (const [fg, backgrounds] of Object.entries(textOn)) {
    for (const bg of backgrounds) {
      it(`${fg} text on ${bg}`, () => {
        expect(ratio(token(fg), token(bg))).toBeGreaterThanOrEqual(AA);
      });
    }
  }

  for (const bg of whiteOn) {
    it(`white text on ${bg}`, () => {
      expect(ratio("#ffffff", token(bg))).toBeGreaterThanOrEqual(AA);
    });
  }

  it("dark button text on the saffron accent fill and its hover fill", () => {
    expect(ratio("#1f1300", token("accent"))).toBeGreaterThanOrEqual(AA);
    expect(ratio("#1f1300", token("accent-strong"))).toBeGreaterThanOrEqual(AA);
  });

  it("footer copy (Tailwind slate-400) on the footer background", () => {
    expect(ratio("#90a1b9", "#0b1733")).toBeGreaterThanOrEqual(AA);
  });

  it("the previous, failing colours would be caught (sanity check of the maths)", () => {
    expect(ratio("#16a34a", "#e7f7ec")).toBeLessThan(AA); // old FREE badge
    expect(ratio("#d97706", "#fff4dc")).toBeLessThan(AA); // old PAID badge
    expect(ratio("#ffffff", "#22a447")).toBeLessThan(AA); // old Save & Next
  });
});

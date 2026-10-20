import type { CSSProperties } from "react";
import type { SiteConfig } from "./types";

/** A site's colour overrides as CSS custom properties for <html style>; globals.css holds the defaults (HP). */
export function themeStyle(s: SiteConfig): CSSProperties | undefined {
  const entries = Object.entries(s.theme);
  if (entries.length === 0) return undefined;
  return Object.fromEntries(entries.map(([k, v]) => [`--${k}`, v])) as CSSProperties;
}

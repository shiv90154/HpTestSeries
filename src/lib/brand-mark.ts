// The "answer bubble" logo mark: a selected CBT/OMR option with the site's landscape and a sun inside.
// One source for <LogoMark> (src/components/logo.tsx), the favicon (app/[site]/icon.svg) and generated
// images (apple-icon, app icons, OG images). The landscape's base is an arc of the inner circle (no
// clipPath), so several marks on one page never share SVG ids.
import type { SiteConfig } from "@/sites/types";

type Mark = Pick<SiteConfig["logo"], "fill" | "accent" | "landscape">;

const LANDSCAPES: Record<Mark["landscape"], (fill: string) => string> = {
  // Himalayan peaks
  peaks: (fill) => `<path d="M10.74 25.93 L15 19 L19.5 25 L23.5 20 L28.76 26.65 A11 11 0 0 1 10.74 25.93 Z" fill="${fill}"/>`,
  // Rolling fields with furrows
  fields: (fill) =>
    `<path d="M9.4 23.4 Q15 19.6 20 22 T30.6 22.6 A11 11 0 0 1 9.4 23.4 Z" fill="${fill}"/><path d="M12.6 27.6 Q20 24.2 27.4 27.6" fill="none" stroke="#fff" stroke-width="1.1" stroke-linecap="round"/>`,
  // Overlapping sand dunes with a ridge line
  dunes: (fill) =>
    `<path d="M9.2 22.2 Q13.5 18.6 18.5 21.6 Q24.5 17.8 30.8 22.2 A11 11 0 0 1 9.2 22.2 Z" fill="${fill}"/><path d="M11.4 26.2 Q17.5 22.6 23.5 25.4 Q26.4 24.2 28.8 25.6" fill="none" stroke="#fff" stroke-width="1.1" stroke-linecap="round"/>`,
};

/** Inner SVG of the mark on a 40×40 viewBox. */
export function brandMarkInner(m: Mark, { rounded = true }: { rounded?: boolean } = {}): string {
  return `<rect width="40" height="40" rx="${rounded ? 11 : 0}" fill="${m.fill}"/><circle cx="20" cy="20" r="14.5" fill="none" stroke="#fff" stroke-width="2.6"/><circle cx="20" cy="20" r="11" fill="#fff"/><circle cx="25.5" cy="14.5" r="2.6" fill="${m.accent}"/>${LANDSCAPES[m.landscape](m.fill)}`;
}

export function brandMarkSvg(m: Mark, opts?: { rounded?: boolean }): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">${brandMarkInner(m, opts)}</svg>`;
}

export function brandMarkDataUri(m: Mark, opts?: { rounded?: boolean }): string {
  return `data:image/svg+xml;base64,${Buffer.from(brandMarkSvg(m, opts)).toString("base64")}`;
}

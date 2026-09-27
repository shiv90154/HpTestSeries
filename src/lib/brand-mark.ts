// The "answer bubble" logo mark as an SVG string, for generated images (apple-icon, OG image).
// Keep in sync with <LogoMark> in src/components/logo.tsx and src/app/icon.svg.
export function brandMarkSvg({ rounded = true }: { rounded?: boolean } = {}): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="${rounded ? 11 : 0}" fill="#1e4fd8"/><circle cx="20" cy="20" r="14.5" fill="none" stroke="#fff" stroke-width="2.6"/><circle cx="20" cy="20" r="11" fill="#fff"/><circle cx="25.5" cy="14.5" r="2.6" fill="#f59e0b"/><path d="M10.74 25.93 L15 19 L19.5 25 L23.5 20 L28.76 26.65 A11 11 0 0 1 10.74 25.93 Z" fill="#1e4fd8"/></svg>`;
}

export function brandMarkDataUri(opts?: { rounded?: boolean }): string {
  return `data:image/svg+xml;base64,${Buffer.from(brandMarkSvg(opts)).toString("base64")}`;
}

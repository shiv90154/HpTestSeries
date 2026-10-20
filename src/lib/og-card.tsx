import { ImageResponse } from "next/og";
import type { SiteConfig } from "@/sites/types";
import { brandMarkDataUri } from "./brand-mark";

export const ogSize = { width: 1200, height: 630 };

/** 1200×630 social card in the site's brand style, for exam hubs and blog posts. English text only (the default OG font has no Devanagari). */
export function ogCard(site: SiteConfig, { kicker, title, footer }: { kicker: string; title: string; footer: string }) {
  const [dark, mid, light] = site.og.gradient;
  const fontSize = title.length > 70 ? 52 : title.length > 40 ? 62 : 72;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: `linear-gradient(135deg, ${dark} 0%, ${mid} 55%, ${light} 100%)`,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
          <img src={brandMarkDataUri(site.logo)} width={64} height={64} alt="" />
          <div style={{ fontSize: 34, fontWeight: 700, display: "flex" }}>
            {site.logo.initials}&nbsp;<span style={{ color: site.logo.accent }}>Test Series</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 600, color: site.logo.accent, textTransform: "uppercase", letterSpacing: 2 }}>{kicker}</div>
          <div style={{ display: "flex", fontSize, fontWeight: 800, lineHeight: 1.12, maxWidth: 1050 }}>{title}</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, opacity: 0.85 }}>{footer}</div>
      </div>
    ),
    ogSize,
  );
}

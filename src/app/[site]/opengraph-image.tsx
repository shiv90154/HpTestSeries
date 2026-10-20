import { ImageResponse } from "next/og";
import { brandMarkDataUri } from "@/lib/brand-mark";
import { getSite } from "@/sites";

export const alt = "Govt exam mock tests in real CBT format";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ site: string }> }) {
  const site = getSite((await params).site);
  const [dark, mid, light] = site.og.gradient;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: `linear-gradient(135deg, ${dark} 0%, ${mid} 55%, ${light} 100%)`,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
          <img src={brandMarkDataUri(site.logo)} width={76} height={76} alt="" />
          <div style={{ fontSize: 40, fontWeight: 700, display: "flex" }}>
            {site.logo.initials}&nbsp;<span style={{ color: site.logo.accent }}>Test Series</span>
          </div>
        </div>
        <div style={{ fontSize: 68, fontWeight: 800, marginTop: 28, lineHeight: 1.1, maxWidth: 950 }}>
          {`${site.stateAdj} govt exam mock tests in real CBT format`}
        </div>
        <div style={{ fontSize: 30, marginTop: 28, opacity: 0.85 }}>{site.og.exams}</div>
      </div>
    ),
    size,
  );
}

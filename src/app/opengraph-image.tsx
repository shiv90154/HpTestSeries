import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — Himachal govt exam mock tests in real CBT format`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "linear-gradient(135deg, #0b1f5c 0%, #133a9e 55%, #1e4fd8 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 700, display: "flex" }}>
          HP<span style={{ color: "#f59e0b" }}>Test</span>Series
        </div>
        <div style={{ fontSize: 68, fontWeight: 800, marginTop: 28, lineHeight: 1.1, maxWidth: 950 }}>
          Himachal govt exam mock tests in real CBT format
        </div>
        <div style={{ fontSize: 30, marginTop: 28, opacity: 0.85 }}>HPRCA · HPPSC · HP Police · HP TET · Patwari — Hindi & English</div>
      </div>
    ),
    size,
  );
}

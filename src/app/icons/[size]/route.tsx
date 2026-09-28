import { ImageResponse } from "next/og";
import { brandMarkDataUri } from "@/lib/brand-mark";
import { site } from "@/lib/site";

// PNG app icons for the web app manifest (Android needs 192 and 512; "maskable" keeps the mark inside
// the safe zone when the launcher crops it to a circle or squircle). Built once at build time.
export const dynamic = "force-static";

const ICONS = {
  "192": { px: 192, maskable: false },
  "512": { px: 512, maskable: false },
  "maskable-512": { px: 512, maskable: true },
} as const;

export function generateStaticParams() {
  return Object.keys(ICONS).map((size) => ({ size }));
}

export async function GET(_req: Request, ctx: RouteContext<"/icons/[size]">) {
  const { size } = await ctx.params;
  const icon = ICONS[size as keyof typeof ICONS];
  if (!icon) return new Response("Not found", { status: 404 });
  const mark = icon.maskable ? Math.round(icon.px * 0.72) : icon.px;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: site.themeColor }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
        <img src={brandMarkDataUri({ rounded: false })} width={mark} height={mark} alt="" />
      </div>
    ),
    { width: icon.px, height: icon.px },
  );
}

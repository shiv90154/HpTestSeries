import { ImageResponse } from "next/og";
import { brandMarkDataUri } from "@/lib/brand-mark";
import { getSite } from "@/sites";
import { siteStaticParams } from "@/sites";

const size = { width: 180, height: 180 };
export const dynamic = "force-static";

// Route handlers do not inherit the layout's site list, so each prerenders every site itself.
export const generateStaticParams = siteStaticParams;

// iOS rounds the corners itself, so the mark is drawn full-bleed here.
export async function GET(_req: Request, ctx: RouteContext<"/[site]/apple-icon">) {
  const site = getSite((await ctx.params).site);
  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img>
      <img src={brandMarkDataUri(site.logo, { rounded: false })} width={180} height={180} alt="" />
    ),
    size,
  );
}

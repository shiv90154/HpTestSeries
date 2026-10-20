import { brandMarkSvg } from "@/lib/brand-mark";
import { getSite } from "@/sites";
import { siteStaticParams } from "@/sites";

// The site's favicon. Linked from the root layout's metadata (icons), since a route handler is not picked up as
// an icon file convention.
export const dynamic = "force-static";

// Route handlers do not inherit the layout's site list, so each prerenders every site itself.
export const generateStaticParams = siteStaticParams;

export async function GET(_req: Request, ctx: RouteContext<"/[site]/icon.svg">) {
  const site = getSite((await ctx.params).site);
  return new Response(brandMarkSvg(site.logo), { headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=86400" } });
}

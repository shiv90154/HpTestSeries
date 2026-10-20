import type { MetadataRoute } from "next";
import { metadataResponse } from "@/lib/metadata-route";
import { getSite } from "@/sites";
import { siteStaticParams } from "@/sites";

// /login and /tests/*/{attempt,demo,result} carry a noindex meta tag and are linked from public pages, so they stay
// crawlable: a robots.txt block hides that tag from Google and leaves them "Indexed, though blocked by robots.txt".
const disallow = ["/admin", "/dashboard", "/api/", "/results/", "/preview/", "/orders/", "/profile", "/verify-2fa", "/welcome", "/refund-request"];

/** AI search and answer crawlers, named so the permission is explicit rather than implied by "*". Training-only crawlers (e.g. CCBot) are left out. */
const aiCrawlers = [
  "GPTBot", // OpenAI: training
  "OAI-SearchBot", // OpenAI: ChatGPT search results
  "ChatGPT-User", // OpenAI: a user's live ChatGPT request
  "ClaudeBot", // Anthropic: training
  "Claude-SearchBot", // Anthropic: search results
  "Claude-User", // Anthropic: a user's live Claude request
  "PerplexityBot", // Perplexity: search index
  "Perplexity-User", // Perplexity: a user's live request
  "Google-Extended", // Google: Gemini training and grounding opt-in
  "Applebot-Extended", // Apple: Apple Intelligence
];

export const dynamic = "force-static";

// Route handlers do not inherit the layout's site list, so each prerenders every site itself.
export const generateStaticParams = siteStaticParams;

function robots(site: { url: string; launched: boolean }): MetadataRoute.Robots {
  // A site in soft launch (src/sites) stays out of search entirely.
  if (!site.launched) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow }, { userAgent: aiCrawlers, allow: "/", disallow }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}

export async function GET(_req: Request, ctx: RouteContext<"/[site]/robots.txt">) {
  return metadataResponse("robots", robots(getSite((await ctx.params).site)));
}

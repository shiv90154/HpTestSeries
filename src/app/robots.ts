import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const disallow = ["/admin", "/dashboard", "/api/", "/results/", "/preview/", "/orders/", "/profile", "/verify-2fa", "/welcome", "/refund-request", "/login", "/tests/*/attempt", "/tests/*/demo", "/tests/*/result"];

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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow }, { userAgent: aiCrawlers, allow: "/", disallow }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}

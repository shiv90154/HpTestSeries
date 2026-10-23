// RSS 2.0 feed of published posts — for feed readers, Telegram/WhatsApp auto-posting bots and faster discovery.
import { getSite } from "@/sites";
import { getPublishedPosts } from "@/modules/catalog/queries";
import { categoryMeta } from "@/modules/content/post-input";
import { siteStaticParams } from "@/sites";

export const revalidate = 3600;

// Route handlers do not inherit the layout's site list, so each prerenders every site itself.
export const generateStaticParams = siteStaticParams;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET(_req: Request, ctx: RouteContext<"/[site]/blog/feed.xml">) {
  const site = getSite((await ctx.params).site);
  const { items } = await getPublishedPosts(site.code, { take: 50 });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(site.name)} — ${site.stateAdj} Govt Exam Updates</title>
<link>${site.url}/blog</link>
<atom:link href="${site.url}/blog/feed.xml" rel="self" type="application/rss+xml" />
<description>${esc(`${site.examList} notifications, syllabus, cutoff and exam dates.`)}</description>
<language>en-in</language>
${items[0] ? `<lastBuildDate>${items[0].updatedAt.toUTCString()}</lastBuildDate>` : ""}
${items
  .map(
    (p) => `<item>
<title>${esc(p.title)}</title>
<link>${site.url}/blog/${p.slug}</link>
<guid isPermaLink="true">${site.url}/blog/${p.slug}</guid>
<pubDate>${p.publishedAt.toUTCString()}</pubDate>
<category>${esc(categoryMeta(p.category, site.code).label)}</category>
<description>${esc(p.excerpt)}</description>
</item>`,
  )
  .join("\n")}
</channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}

// IndexNow ownership key, served at /indexnow-key.txt on every site (IndexNow accepts any same-host keyLocation).
// The key is public by design; scripts/indexnow.ts sends it with each ping. Bing, Yandex and others share submissions.
import { INDEXNOW_KEY } from "@/lib/indexnow";
import { siteStaticParams } from "@/sites";

export const dynamic = "force-static";

// Route handlers do not inherit the layout's site list, so each prerenders every site itself.
export const generateStaticParams = siteStaticParams;

export function GET() {
  return new Response(INDEXNOW_KEY, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

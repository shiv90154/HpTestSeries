// Tells Bing (and other IndexNow engines) which URLs exist or changed: `npm run indexnow -- hptestseries.in pbtestseries.in`.
// With no arguments it submits every launched site. Run after a deploy; each host's sitemap.xml is the URL source.
import { INDEXNOW_KEY } from "../src/lib/indexnow";

const hosts = process.argv.slice(2);
if (hosts.length === 0) hosts.push("hptestseries.in", "pbtestseries.in", "rjtestseries.in", "hrtestseries.in");

async function main() {
for (const host of hosts) {
  const xml = await (await fetch(`https://${host}/sitemap.xml`)).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (urls.length === 0) {
    console.log(`${host}: no URLs in sitemap, skipped`);
    continue;
  }
  // IndexNow takes up to 10,000 URLs per request.
  for (let i = 0; i < urls.length; i += 10000) {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host, key: INDEXNOW_KEY, keyLocation: `https://${host}/indexnow-key.txt`, urlList: urls.slice(i, i + 10000) }),
    });
    console.log(`${host}: ${urls.slice(i, i + 10000).length} URLs -> HTTP ${res.status}`);
  }
}
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

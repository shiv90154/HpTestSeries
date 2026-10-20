import type { MetadataRoute } from "next";
// Next's own serialiser for robots.txt, sitemap.xml and manifest files, so our per-site route handlers emit
// exactly what the file conventions did (those can't read the [site] segment).
import { resolveRouteData } from "next/dist/build/webpack/loaders/metadata/resolve-route-data";

const CONTENT_TYPES = { robots: "text/plain", sitemap: "application/xml", manifest: "application/manifest+json" } as const;

type Data = { robots: MetadataRoute.Robots; sitemap: MetadataRoute.Sitemap; manifest: MetadataRoute.Manifest };

export function metadataResponse<T extends keyof Data>(type: T, data: Data[T]): Response {
  return new Response(resolveRouteData(data, type), {
    headers: { "Content-Type": CONTENT_TYPES[type], "Cache-Control": "public, max-age=0, must-revalidate" },
  });
}

import { serializeJsonLd } from "@/lib/json-ld";

/** Renders schema.org structured data (escaped by serializeJsonLd). */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}

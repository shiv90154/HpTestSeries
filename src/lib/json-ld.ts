/**
 * Serialises schema.org data for an inline <script>. `<` becomes the JSON escape `\u003c`
 * so content (test titles, exam names) can never close the script tag.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

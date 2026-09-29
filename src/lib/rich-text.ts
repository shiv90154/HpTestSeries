// Question text is Markdown, but some exam answers ARE a Markdown symbol. An option that is just "#" (a hash
// sign, an Excel error prefix) parses as an empty heading and shows up blank; "-", "*" or "+" become an empty
// list bullet, ">" an empty quote, "1." an empty numbered list and "---" a horizontal rule. Students would see
// an option with nothing in it.

const LONE_MARKER = /^(#{1,6}|[-+*>]+|_{3,}|={2,}|\d{1,9}[.)])$/;

/** Escapes text that is nothing but a Markdown marker so it renders as typed. Any other text is returned untouched. */
export function escapeLoneMarker(text: string): string {
  const t = text.trim();
  if (!LONE_MARKER.test(t)) return text;
  return t.replace(/[#>*+_=-]/g, "\\$&").replace(/([.)])$/, "\\$1");
}

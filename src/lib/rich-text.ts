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

// Most questions are plain sentences. Those skip the Markdown parser (and KaTeX) entirely: RichContent renders them
// directly and loads the parser only for text that needs it, which keeps the exam page light on cheap phones.

/** Characters that can start Markdown syntax anywhere in a line, plus `$` (math) and `&` (HTML entities). */
const MARKDOWN_CHAR = /[*_`#[\]|<>$\\~&]/;
/** Line starts that make a block: indentation (code), list markers, setext underlines, numbered lists. */
const BLOCK_START = /^([ \t]|[-+=]|\d{1,9}[.)]([ \t]|$))/m;

/** Line endings as the Markdown parser sees them. */
export function normalizeNewlines(text: string): string {
  return text.replace(/\r\n?/g, "\n");
}

/** True when Markdown would render `text` as nothing but paragraphs and line breaks. */
export function isPlainText(text: string): boolean {
  const t = normalizeNewlines(text);
  return !MARKDOWN_CHAR.test(t) && !BLOCK_START.test(t);
}

/** Plain text split the way Markdown does: blank lines separate paragraphs, each line break is kept (remark-breaks). */
export function plainParagraphs(text: string): string[][] {
  return normalizeNewlines(text)
    .trim()
    .split(/\n(?:[ \t]*\n)+/)
    .filter(Boolean)
    .map((p) => p.split("\n").map((l) => l.trimEnd()));
}

/** Whether Markdown text needs KaTeX. */
export function hasMath(text: string): boolean {
  return text.includes("$");
}

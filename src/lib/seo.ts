/** Meta descriptions longer than about 160 characters are cut off in search results; trim at a word boundary and end with an ellipsis. */
export function clipDescription(text: string, max = 160): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:.—-]+$/, "")}…`;
}

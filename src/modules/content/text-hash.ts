import { createHash } from "node:crypto";

/**
 * Normalizes question text for duplicate detection: Unicode-normalized, lowercased,
 * with punctuation, markdown, and whitespace removed (letters, digits, and combining
 * marks are kept so Devanagari matras still count).
 */
export function normalizeForHash(text: string): string {
  return text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\p{M}]+/gu, "");
}

export function questionTextHash(stem: string): string {
  return createHash("sha256").update(normalizeForHash(stem)).digest("hex").slice(0, 32);
}

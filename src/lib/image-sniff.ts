// Identifies an uploaded image by its first bytes, not by the (client-controlled) name or MIME type.
// SVG is deliberately not accepted: it can carry script.

export type ImageKind = { ext: "png" | "jpg" | "webp" | "gif"; mime: string };

export function sniffImage(bytes: Uint8Array): ImageKind | null {
  const b = (i: number) => bytes[i];
  const ascii = (from: number, s: string) => [...s].every((c, i) => bytes[from + i] === c.charCodeAt(0));
  if (bytes.length >= 8 && b(0) === 0x89 && ascii(1, "PNG") && b(4) === 0x0d && b(5) === 0x0a && b(6) === 0x1a && b(7) === 0x0a) {
    return { ext: "png", mime: "image/png" };
  }
  if (bytes.length >= 3 && b(0) === 0xff && b(1) === 0xd8 && b(2) === 0xff) return { ext: "jpg", mime: "image/jpeg" };
  if (bytes.length >= 12 && ascii(0, "RIFF") && ascii(8, "WEBP")) return { ext: "webp", mime: "image/webp" };
  if (bytes.length >= 6 && (ascii(0, "GIF87a") || ascii(0, "GIF89a"))) return { ext: "gif", mime: "image/gif" };
  return null;
}

export const MIME_BY_EXT: Record<ImageKind["ext"], string> = { png: "image/png", jpg: "image/jpeg", webp: "image/webp", gif: "image/gif" };

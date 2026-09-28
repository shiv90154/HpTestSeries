import "server-only";
import { randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { MIME_BY_EXT, sniffImage, type ImageKind } from "./image-sniff";

// Images for questions and blog posts, stored on the app server's disk (a Docker volume in production,
// see deploy/docker-compose.yml) and served from /uploads/…. Swap for object storage (R2) if the app
// ever runs on more than one server.

export const MAX_UPLOAD_BYTES = 2 * 1024 * 1024;

const root = () => path.resolve(process.env.UPLOAD_DIR ?? path.join(process.cwd(), "uploads"));

/** Validates and stores an image; returns its public URL. */
export async function saveImageUpload(file: File): Promise<{ url: string } | { error: string }> {
  if (file.size === 0) return { error: "The file is empty." };
  if (file.size > MAX_UPLOAD_BYTES) return { error: "Images must be 2 MB or smaller — compress it and try again." };
  const bytes = new Uint8Array(await file.arrayBuffer());
  const kind = sniffImage(bytes);
  if (!kind) return { error: "Only PNG, JPEG, WebP or GIF images can be uploaded." };

  const now = new Date();
  const dir = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  const name = `${randomBytes(12).toString("hex")}.${kind.ext}`;
  await mkdir(path.join(root(), dir), { recursive: true });
  await writeFile(path.join(root(), dir, name), bytes, { flag: "wx" });
  return { url: `/uploads/${dir}/${name}` };
}

/** Reads a stored upload for serving. Only paths this module could have written are accepted. */
export async function readImageUpload(segments: string[]): Promise<{ bytes: Buffer; mime: string } | null> {
  const [year, month, name] = segments;
  if (segments.length !== 3 || !/^\d{4}$/.test(year) || !/^\d{2}$/.test(month) || !/^[a-f0-9]{24}\.(png|jpg|webp|gif)$/.test(name ?? "")) return null;
  try {
    const bytes = await readFile(path.join(root(), year, month, name));
    return { bytes, mime: MIME_BY_EXT[name.split(".").pop() as ImageKind["ext"]] };
  } catch {
    return null;
  }
}

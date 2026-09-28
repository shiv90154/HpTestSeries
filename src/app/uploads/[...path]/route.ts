import { readImageUpload } from "@/lib/uploads";

/** Serves uploaded question/blog images. Names are random and never reused, so they cache forever. */
export async function GET(_req: Request, ctx: RouteContext<"/uploads/[...path]">) {
  const { path } = await ctx.params;
  const file = await readImageUpload(path);
  if (!file) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(file.bytes), {
    headers: {
      "Content-Type": file.mime,
      "Cache-Control": "public, max-age=31536000, immutable",
      // Belt and braces: even a mislabelled file can't run as a page.
      "Content-Security-Policy": "default-src 'none'; sandbox",
    },
  });
}

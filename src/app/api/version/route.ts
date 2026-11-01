// The build this server is running. Open browsers compare it with the build they loaded (src/components/pwa) and offer
// "Update now" when it differs. NEXT_PUBLIC_APP_VERSION is inlined at build time (next.config.ts), like in the browser bundle.
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ version: process.env.NEXT_PUBLIC_APP_VERSION ?? null }, { headers: { "Cache-Control": "no-store" } });
}

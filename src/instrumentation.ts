import type { Instrumentation } from "next";

/**
 * Server-side errors (a Server Component render, a route handler, a server action) reach the browser as an
 * anonymous "Minified React error #441" in production, so the admin Errors page used to show nothing useful.
 * This records the real message and stack there, next to the client-reported ones.
 */
export const onRequestError: Instrumentation.onRequestError = async (err, request, context) => {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const { logError } = await import("@/lib/logger");
  const digest = typeof err === "object" && err !== null && "digest" in err ? String(err.digest) : undefined;
  const path = `${request.method} ${request.path.split("?")[0]} [${context.routeType}]${digest ? ` digest ${digest}` : ""}`;
  await logError(err, { path });
};

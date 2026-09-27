import "server-only";
import { db } from "@/lib/db";

// No external monitoring (Sentry etc.) is wired up — this is the whole error-visibility story:
// write to the server console (for whoever is tailing logs) and to the ErrorLog table (for the
// admin "Errors" page). Best-effort: a failure here must never mask the original error.
export async function logError(error: unknown, context?: { path?: string; userId?: string }): Promise<void> {
  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : undefined;
  console.error(`[error]${context?.path ? ` ${context.path}` : ""}`, error);
  try {
    await db.errorLog.create({
      data: { message: message.slice(0, 2000), stack: stack?.slice(0, 8000), path: context?.path, userId: context?.userId },
    });
  } catch (loggingError) {
    console.error("[error] failed to write to ErrorLog", loggingError);
  }
}

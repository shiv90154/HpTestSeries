"use server";

import { logError } from "@/lib/logger";
import { getCurrentUser } from "@/modules/identity/session";

export async function reportClientErrorAction(message: string, stack: string | undefined, path: string): Promise<void> {
  const user = await getCurrentUser().catch(() => null);
  const error = new Error(message);
  if (stack) error.stack = stack;
  await logError(error, { path, userId: user?.id });
}

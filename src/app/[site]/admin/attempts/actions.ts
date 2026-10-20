"use server";

import { revalidateSitePath } from "@/sites/revalidate";
import { setAttemptFlagged } from "@/modules/assessment/integrity";
import { requirePermission } from "@/modules/identity/session";

/** Form action: flag (hide from ranks) or unflag an attempt. */
export async function setFlaggedAction(formData: FormData): Promise<void> {
  const user = await requirePermission("users:manage");
  const attemptId = String(formData.get("attemptId") ?? "");
  const flagged = formData.get("flagged") === "true";
  if (!attemptId) return;
  await setAttemptFlagged(attemptId, flagged, user.id);
  revalidateSitePath("/admin/attempts");
}

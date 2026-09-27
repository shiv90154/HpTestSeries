"use server";

import { revalidatePath } from "next/cache";
import { resolveQuestionReports } from "@/modules/content/report-service";
import { requirePermission } from "@/modules/identity/session";

/** Form action: closes all open reports on one question as fixed or rejected. */
export async function resolveReportsAction(formData: FormData): Promise<void> {
  const user = await requirePermission("content:edit");
  const questionId = String(formData.get("questionId") ?? "");
  const op = formData.get("op");
  if (!questionId || (op !== "FIXED" && op !== "REJECTED")) return;
  await resolveQuestionReports(questionId, op, user.id);
  revalidatePath("/admin", "layout");
}

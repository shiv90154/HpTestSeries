"use server";

import type { ReportError } from "@/modules/content/report";
import { submitQuestionReport } from "@/modules/content/report-service";
import { getCurrentUser } from "@/modules/identity/session";

export async function reportQuestionAction(raw: unknown): Promise<{ ok: true } | { ok: false; error: ReportError }> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "login" };
  return submitQuestionReport(user.id, raw);
}

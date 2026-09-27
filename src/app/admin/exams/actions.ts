"use server";

import { revalidatePath } from "next/cache";
import { updateExam } from "@/modules/content/exam-service";
import { requirePermission } from "@/modules/identity/session";

type Result = { ok: true } | { ok: false; errors: string[] };

export async function updateExamAction(id: string, raw: unknown): Promise<Result> {
  const user = await requirePermission("content:edit");
  const res = await updateExam(id, raw, user.id);
  // Exam hubs, the exams list, footer, sitemap and llms.txt all read exam copy.
  if (res.ok) revalidatePath("/", "layout");
  return res;
}

"use server";

import { revalidatePath } from "next/cache";
import { generateFreeMock, type GenerateResult } from "@/modules/content/auto-mock-service";
import { createExam, deleteExam, updateExam } from "@/modules/content/exam-service";
import { requirePermission } from "@/modules/identity/session";

type Result = { ok: true } | { ok: false; errors: string[] };

export async function createExamAction(raw: unknown): Promise<{ ok: true; id: string } | { ok: false; errors: string[] }> {
  const user = await requirePermission("content:edit");
  const res = await createExam(raw, user.id);
  if (res.ok) revalidatePath("/", "layout");
  return res;
}

export async function updateExamAction(id: string, raw: unknown): Promise<Result> {
  const user = await requirePermission("content:edit");
  const res = await updateExam(id, raw, user.id);
  // Exam hubs, the exams list, footer, sitemap and llms.txt all read exam copy.
  if (res.ok) revalidatePath("/", "layout");
  return res;
}

export async function deleteExamAction(id: string): Promise<Result> {
  const user = await requirePermission("content:edit");
  const res = await deleteExam(id, user.id);
  if (res.ok) revalidatePath("/", "layout");
  return res;
}

export async function generateFreeMockAction(examId: string, raw: unknown): Promise<GenerateResult> {
  const user = await requirePermission("content:edit");
  const res = await generateFreeMock(examId, raw, user.id);
  if (res.ok) revalidatePath("/", "layout");
  return res;
}

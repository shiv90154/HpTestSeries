"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { deleteQuestion, saveQuestion, setQuestionStatus, type SaveQuestionResult } from "@/modules/content/question-service";
import { can } from "@/modules/identity/permissions";
import { requirePermission } from "@/modules/identity/session";
import { filterParams, parseQuestionFilters, questionListWhere } from "./filters";

const editorStatus = z.enum(["DRAFT", "IN_REVIEW", "PUBLISHED"]);

export async function saveQuestionAction(id: string | null, raw: unknown, statusRaw: string): Promise<SaveQuestionResult> {
  const user = await requirePermission("content:edit");
  const status = editorStatus.safeParse(statusRaw);
  if (!status.success) return { ok: false, errors: ["Unknown status"] };
  const canPublish = can(user.role, "content:publish");
  if (status.data === "PUBLISHED" && !canPublish) return { ok: false, errors: ["Only reviewers can publish. Submit it for review."] };

  let wasPublished = false;
  if (id) {
    const current = await db.question.findUnique({ where: { id }, select: { status: true } });
    if (!current) return { ok: false, errors: ["This question no longer exists"] };
    wasPublished = current.status === "PUBLISHED";
    if (wasPublished && !canPublish) return { ok: false, errors: ["Only reviewers can edit a published question"] };
  }

  const result = await saveQuestion({ id, raw, status: status.data, actorId: user.id });
  if (result.ok) {
    revalidatePath("/admin/questions");
    // A fix to a live question should reach students' test and result pages now, not after ISR expiry.
    if (wasPublished) revalidatePath("/", "layout");
  }
  return result;
}

export async function deleteQuestionAction(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const user = await requirePermission("content:edit");
  const result = await deleteQuestion(id, user.id);
  if (result.ok) revalidatePath("/admin/questions");
  return result;
}

const bulkOps = {
  review: { status: "IN_REVIEW", needsPublish: false, label: "sent for review" },
  publish: { status: "PUBLISHED", needsPublish: true, label: "published" },
  draft: { status: "DRAFT", needsPublish: true, label: "moved to draft" },
  archive: { status: "ARCHIVED", needsPublish: true, label: "archived" },
} as const;

/** Form action for the question list: applies a status to the ticked questions, or to every question matching the filters. */
export async function bulkStatusAction(formData: FormData): Promise<void> {
  const user = await requirePermission("content:edit");
  // "publish" applies to ticked questions; "publish:all" to every question matching the list filters.
  const [opKey, scope] = String(formData.get("op")).split(":");
  const op = bulkOps[opKey as keyof typeof bulkOps];
  const filters = parseQuestionFilters(formData);
  const back = filterParams(filters);
  if (!op) redirect(`/admin/questions?${back}`);

  if (op.needsPublish && !can(user.role, "content:publish")) {
    back.set("msg", "Only reviewers can do that.");
    redirect(`/admin/questions?${back}`);
  }

  const all = scope === "all";
  const ids = formData.getAll("ids").map(String).slice(0, 1000);
  if (!all && ids.length === 0) {
    back.set("msg", "Tick at least one question first.");
    redirect(`/admin/questions?${back}`);
  }

  const where = all ? questionListWhere(filters) : { id: { in: ids } };
  // Editors may only move drafts forward; everything else changes what students see.
  const scoped = op.needsPublish ? where : { AND: [where, { status: { in: ["DRAFT" as const, "IN_REVIEW" as const] } }] };
  const count = await setQuestionStatus(scoped, op.status, user.id);

  revalidatePath("/admin/questions");
  if (op.status !== "IN_REVIEW") revalidatePath("/", "layout");
  back.set("msg", `${count} question${count === 1 ? "" : "s"} ${op.label}.`);
  redirect(`/admin/questions?${back}`);
}

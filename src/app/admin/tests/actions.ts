"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  createTest,
  deleteTest,
  duplicateTest,
  publishTest,
  randomPick,
  restoreTest,
  retireTest,
  saveTestStructure,
  searchBank,
  unpublishTest,
  updateTestMeta,
  type BankFilters,
  type BankQuestion,
} from "@/modules/content/test-service";
import { db } from "@/lib/db";
import { awardLivePrizes } from "@/modules/assessment/live-service";
import { can } from "@/modules/identity/permissions";
import { requirePermission } from "@/modules/identity/session";

type Result<T = object> = ({ ok: true } & T) | { ok: false; errors: string[] };

/** Public test lists, exam hubs, home page and sitemap all show published tests. */
function refreshPublicPages() {
  revalidatePath("/", "layout");
}

export async function createTestAction(raw: unknown): Promise<Result<{ id: string }>> {
  const user = await requirePermission("content:edit");
  const res = await createTest(raw, user.id);
  if (res.ok) revalidatePath("/admin/tests");
  return res;
}

export async function updateTestMetaAction(id: string, raw: unknown): Promise<Result> {
  const user = await requirePermission("content:edit");
  const test = await db.test.findUnique({ where: { id }, select: { status: true } });
  const isPublished = test?.status === "PUBLISHED";
  // Editing what students see on a live test is a publishing decision.
  if (isPublished && !can(user.role, "content:publish")) return { ok: false, errors: ["Only reviewers can edit a published test"] };
  const res = await updateTestMeta(id, raw, user.id);
  if (res.ok) {
    revalidatePath("/admin/tests");
    if (isPublished) refreshPublicPages();
  }
  return res.ok ? { ok: true } : res;
}

export async function saveTestStructureAction(id: string, raw: unknown): Promise<Result> {
  const user = await requirePermission("content:edit");
  const res = await saveTestStructure(id, raw, user.id);
  if (res.ok) revalidatePath(`/admin/tests/${id}`);
  return res;
}

/** Publishes now, or schedules the release when `at` (an ISO time) is given. */
export async function publishTestAction(id: string, at?: string): Promise<Result> {
  const user = await requirePermission("content:publish");
  const res = await publishTest(id, user.id, at ? new Date(at) : undefined);
  if (res.ok) refreshPublicPages();
  return res.ok ? { ok: true } : res;
}

export async function unpublishTestAction(id: string): Promise<Result> {
  const user = await requirePermission("content:publish");
  const res = await unpublishTest(id, user.id);
  if (res.ok) refreshPublicPages();
  return res;
}

export async function retireTestAction(id: string): Promise<Result> {
  const user = await requirePermission("content:publish");
  const res = await retireTest(id, user.id);
  if (res.ok) refreshPublicPages();
  return res;
}

export async function restoreTestAction(id: string): Promise<Result> {
  const user = await requirePermission("content:publish");
  const res = await restoreTest(id, user.id);
  if (res.ok) refreshPublicPages();
  return res;
}

export async function confirmWinnersAction(id: string): Promise<{ ok: true; awarded: number } | { ok: false; error: string }> {
  const user = await requirePermission("content:publish");
  const res = await awardLivePrizes(z.string().min(1).max(64).parse(id), user.id);
  if (res.ok) {
    revalidatePath(`/admin/tests/${id}`);
    refreshPublicPages();
  }
  return res;
}

export async function duplicateTestAction(id: string): Promise<Result<{ id: string }>> {
  const user = await requirePermission("content:edit");
  const res = await duplicateTest(id, user.id);
  if (res.ok) revalidatePath("/admin/tests");
  return res;
}

export async function deleteTestAction(id: string): Promise<Result> {
  const user = await requirePermission("content:edit");
  const res = await deleteTest(id, user.id);
  if (res.ok) revalidatePath("/admin/tests");
  return res;
}

const filtersSchema = z.object({
  q: z.string().max(200).optional(),
  subjectId: z.string().optional(),
  topicId: z.string().optional(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional(),
  status: z.enum(["DRAFT", "IN_REVIEW", "PUBLISHED"]).optional(),
  source: z.enum(["ORIGINAL", "PYQ"]).optional(),
  sourceExamId: z.string().optional(),
  unusedOnly: z.boolean().optional(),
  excludeIds: z.array(z.string()).max(1000).optional(),
});

function cleanFilters(raw: unknown): BankFilters | null {
  const p = filtersSchema.safeParse(raw);
  if (!p.success) return null;
  // Empty strings from <select> mean "any".
  return Object.fromEntries(Object.entries(p.data).filter(([, v]) => v !== "" && v !== undefined)) as BankFilters;
}

export async function searchBankAction(raw: unknown): Promise<{ total: number; items: BankQuestion[] }> {
  await requirePermission("content:edit");
  const f = cleanFilters(raw);
  return f ? searchBank(f) : { total: 0, items: [] };
}

export async function randomPickAction(raw: unknown, count: number): Promise<BankQuestion[]> {
  await requirePermission("content:edit");
  const f = cleanFilters(raw);
  if (!f || !Number.isInteger(count) || count < 1) return [];
  return randomPick(f, Math.min(count, 200));
}

"use server";

import { revalidatePath } from "next/cache";
import { countAudience, queueCampaign, sendCampaignTest, sendQueued } from "@/modules/email/service";
import { requirePermission } from "@/modules/identity/session";

type Result<T = object> = ({ ok: true } & T) | { ok: false; errors: string[] };

export async function sendCampaignTestAction(raw: unknown): Promise<Result> {
  const user = await requirePermission("commerce:manage");
  return sendCampaignTest(raw, user);
}

/** Queues the campaign, then sends as much as today's quota allows; the daily cron sends the rest. */
export async function queueCampaignAction(raw: unknown): Promise<Result<{ queued: number; sent: number }>> {
  const user = await requirePermission("commerce:manage");
  const res = await queueCampaign(raw, user.id);
  if (!res.ok) return res;
  const sent = await sendQueued();
  revalidatePath("/admin/emails");
  return { ok: true, queued: res.queued, sent: sent.sent };
}

export async function countAudienceAction(examId: string | null): Promise<number> {
  await requirePermission("commerce:manage");
  return countAudience(examId || null);
}

/** Sends what is queued now instead of waiting for the 7 pm cron (same quota and rules). */
export async function sendQueuedNowAction(): Promise<Result<{ sent: number; left: number }>> {
  await requirePermission("commerce:manage");
  const s = await sendQueued();
  revalidatePath("/admin/emails");
  return { ok: true, sent: s.sent, left: s.left };
}

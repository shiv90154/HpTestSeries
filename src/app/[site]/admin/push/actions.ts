"use server";

import { requirePermission } from "@/modules/identity/session";
import { countDevices, sendTestToAdmin, startCampaign } from "@/modules/push/service";
import { revalidateSitePath } from "@/sites/revalidate";

type Result<T = object> = ({ ok: true } & T) | { ok: false; errors: string[] };

export async function sendPushTestAction(raw: unknown): Promise<Result<{ devices: number; sent: number }>> {
  const user = await requirePermission("commerce:manage");
  return sendTestToAdmin(raw, user.id);
}

/** Starts sending; students' phones receive it over the next minute and the history table counts up. */
export async function startPushCampaignAction(raw: unknown): Promise<Result<{ targeted: number }>> {
  const user = await requirePermission("commerce:manage");
  const res = await startCampaign(raw, user.id);
  if (!res.ok) return res;
  revalidateSitePath("/admin/push");
  return { ok: true, targeted: res.targeted };
}

export async function countPushDevicesAction(site: string, examId: string | null): Promise<number> {
  await requirePermission("commerce:manage");
  return countDevices(site, examId || null);
}

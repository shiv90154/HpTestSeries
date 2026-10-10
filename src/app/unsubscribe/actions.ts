"use server";

import { verifyUnsubscribeToken } from "@/modules/email/rules";
import { unsubscribe } from "@/modules/email/service";

export async function unsubscribeAction(_: unknown, formData: FormData): Promise<{ ok?: boolean; error?: string }> {
  const userId = String(formData.get("u") ?? "");
  const category = String(formData.get("c") ?? "");
  if (!verifyUnsubscribeToken(process.env.BETTER_AUTH_SECRET ?? "", userId, category, String(formData.get("t") ?? ""))) {
    return { error: "This link is not valid. You can change your email settings on your profile page." };
  }
  await unsubscribe(userId, category);
  return { ok: true };
}

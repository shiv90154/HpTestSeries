"use server";

import { revalidateSitePath } from "@/sites/revalidate";
import { z } from "zod";
import { ALL_DISTRICTS } from "@/lib/districts";
import { setEmailPreferences } from "@/modules/email/service";
import { saveOwnProfile } from "@/modules/identity/profile";
import { requireUser } from "@/modules/identity/session";

const profileSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(60),
  district: z.enum(ALL_DISTRICTS),
  preferredLang: z.enum(["en", "hi"]),
});

export async function updateProfileDetailsAction(_: unknown, formData: FormData): Promise<{ error?: string; ok?: boolean }> {
  const user = await requireUser();
  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    district: formData.get("district"),
    preferredLang: formData.get("preferredLang"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  await saveOwnProfile(user.id, parsed.data);
  revalidateSitePath("/profile");
  revalidateSitePath("/dashboard");
  return { ok: true };
}

export async function updateEmailPreferencesAction(_: unknown, formData: FormData): Promise<{ ok?: boolean }> {
  const user = await requireUser();
  await setEmailPreferences(user.id, { offers: formData.get("offers") === "on", reminders: formData.get("reminders") === "on" });
  revalidateSitePath("/profile");
  return { ok: true };
}

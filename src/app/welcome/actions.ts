"use server";

import { z } from "zod";
import { HP_DISTRICTS } from "@/lib/districts";
import { PLACEHOLDER_NAME } from "@/modules/identity/permissions";
import { saveOwnProfile } from "@/modules/identity/profile";
import { requireUser } from "@/modules/identity/session";

const welcomeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name")
    .max(60)
    .refine((n) => n.toLowerCase() !== PLACEHOLDER_NAME.toLowerCase(), "Enter your own name"),
  district: z.enum(HP_DISTRICTS).or(z.literal("Outside HP")).optional(),
});

/** First sign-in with an email or SMS code: the student replaces the placeholder name (district is optional). */
export async function saveWelcomeAction(_: unknown, formData: FormData): Promise<{ error?: string; ok?: boolean }> {
  const user = await requireUser("/welcome");
  const parsed = welcomeSchema.safeParse({ name: formData.get("name"), district: formData.get("district") || undefined });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  await saveOwnProfile(user.id, parsed.data);
  return { ok: true };
}

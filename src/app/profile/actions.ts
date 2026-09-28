"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { HP_DISTRICTS } from "@/lib/districts";
import { requireUser } from "@/modules/identity/session";

const profileSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(60),
  district: z.enum(HP_DISTRICTS).or(z.literal("Outside HP")),
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
  await db.user.update({ where: { id: user.id }, data: parsed.data });
  // Session cookie cache holds the old name for up to 5 minutes; drop it so headers/dashboard update now.
  revalidatePath("/profile");
  revalidatePath("/dashboard");
  return { ok: true };
}

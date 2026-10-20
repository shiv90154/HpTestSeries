"use server";

import { saveImageUpload } from "@/lib/uploads";
import { requirePermission } from "@/modules/identity/session";

/** Uploads one image for a question or blog post and returns the URL to put in markdown. */
export async function uploadImageAction(formData: FormData): Promise<{ url: string } | { error: string }> {
  await requirePermission("content:edit");
  const file = formData.get("file");
  if (!(file instanceof File)) return { error: "Choose an image first." };
  return saveImageUpload(file);
}

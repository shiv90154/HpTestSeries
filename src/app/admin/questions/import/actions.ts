"use server";

import { revalidatePath } from "next/cache";
import { commitQuestionImport, previewQuestionImport, type ImportCommitResult, type ImportPreview } from "@/modules/content/import-service";
import { requirePermission } from "@/modules/identity/session";

const MAX_FILE_BYTES = 3.5 * 1024 * 1024;

async function readCsv(formData: FormData): Promise<{ text: string; name: string } | { error: string }> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Choose a CSV file first." };
  if (!file.name.toLowerCase().endsWith(".csv")) return { error: "Upload a .csv file (in Google Sheets: File → Download → CSV)." };
  if (file.size > MAX_FILE_BYTES) return { error: "File is larger than 3.5 MB. Split it into smaller batches." };
  return { text: await file.text(), name: file.name };
}

export async function previewImportAction(formData: FormData): Promise<ImportPreview | { error: string }> {
  await requirePermission("content:edit");
  const csv = await readCsv(formData);
  if ("error" in csv) return csv;
  return previewQuestionImport(csv.text);
}

export async function commitImportAction(formData: FormData): Promise<ImportCommitResult> {
  const user = await requirePermission("content:edit");
  const csv = await readCsv(formData);
  if ("error" in csv) return { ok: false, error: csv.error };
  const result = await commitQuestionImport(csv.text, user.id, csv.name);
  if (result.ok) revalidatePath("/admin/questions");
  return result;
}

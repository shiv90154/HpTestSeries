import { importTemplateCsv } from "@/modules/content/question-import";
import { requirePermission } from "@/modules/identity/session";

export async function GET() {
  await requirePermission("content:edit");
  return new Response(importTemplateCsv(), {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="question-import-template.csv"',
    },
  });
}

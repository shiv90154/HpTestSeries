import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { listExamBodies } from "@/modules/content/exam-service";
import { requirePermission } from "@/modules/identity/session";
import { NewExamForm } from "./new-exam-form";

export const metadata: Metadata = { title: "Add exam" };

export default async function NewExamPage() {
  await requirePermission("content:edit");
  await connection();
  const bodies = await listExamBodies();

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <Link href="/admin/exams" className="text-sm text-muted">
          ← Exams
        </Link>
        <h1 className="text-xl font-semibold">Add exam</h1>
        <p className="text-sm text-muted">
          The exam is created hidden. Fill in its description, pattern, syllabus and FAQs on the next screen, then tick “Visible on the site”.
        </p>
      </div>
      <NewExamForm bodies={bodies} />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getExamForEdit } from "@/modules/content/exam-service";
import { requirePermission } from "@/modules/identity/session";
import { ExamForm } from "./exam-form";

export const metadata: Metadata = { title: "Edit exam" };

export default async function EditExamPage({ params }: PageProps<"/admin/exams/[id]">) {
  await requirePermission("content:edit");
  await connection();
  const { id } = await params;
  const exam = await getExamForEdit(id);
  if (!exam) notFound();
  const { id: examId, name, href, ...initial } = exam;

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <Link href="/admin/exams" className="text-sm text-muted">
          ← Exams
        </Link>
        <h1 className="text-xl font-semibold">{name}</h1>
        <a href={href} target="_blank" rel="noreferrer" className="text-sm text-primary underline">
          View public page {href}
        </a>
      </div>
      <ExamForm id={examId} path={href} initial={initial} />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { emptyQuestionInput } from "@/modules/content/question-shape";
import { getTaxonomy } from "@/modules/content/taxonomy";
import { can } from "@/modules/identity/permissions";
import { requirePermission } from "@/modules/identity/session";
import { QuestionForm } from "../question-form";

export const metadata: Metadata = { title: "New question" };

export default async function NewQuestionPage() {
  const user = await requirePermission("content:edit");
  await connection();
  const taxonomy = await getTaxonomy();

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <Link href="/admin/questions" className="text-sm text-muted">
          ← Questions
        </Link>
        <h1 className="text-xl font-semibold">New question</h1>
      </div>
      <QuestionForm
        id={null}
        initial={emptyQuestionInput()}
        status={null}
        taxonomy={taxonomy}
        canPublish={can(user.role, "content:publish")}
        canDelete={false}
        lockedOptionCount={0}
      />
    </div>
  );
}

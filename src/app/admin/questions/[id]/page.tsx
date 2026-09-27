import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getQuestionForEdit } from "@/modules/content/question-service";
import { getTaxonomy } from "@/modules/content/taxonomy";
import { can } from "@/modules/identity/permissions";
import { requirePermission } from "@/modules/identity/session";
import { StatusBadge } from "../../ui";
import { QuestionForm } from "../question-form";

export const metadata: Metadata = { title: "Edit question" };

export default async function EditQuestionPage({ params, searchParams }: PageProps<"/admin/questions/[id]">) {
  const user = await requirePermission("content:edit");
  await connection();
  const { id } = await params;
  const saved = (await searchParams).saved === "1";

  const [q, taxonomy] = await Promise.all([getQuestionForEdit(id), getTaxonomy()]);
  if (!q) notFound();

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <Link href="/admin/questions" className="text-sm text-muted">
          ← Questions
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-semibold">Edit question</h1>
          <StatusBadge status={q.status} />
        </div>
        <p className="text-xs text-muted">
          {q.createdBy && <>Created by {q.createdBy} · </>}
          {q.reviewedBy && <>Published by {q.reviewedBy} · </>}
          Last changed {q.updatedAt.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" })}
        </p>
      </div>

      {saved && (
        <p role="status" className="rounded-xl border border-primary bg-primary-soft p-3 text-sm">
          Saved. <Link href="/admin/questions/new" className="text-primary underline">Add another</Link>
        </p>
      )}

      {q.tests.length > 0 && (
        <p className="rounded-xl border border-border bg-surface p-3 text-sm">
          Used in:{" "}
          {q.tests.map((t, i) => (
            <span key={t.id}>
              {i > 0 && ", "}
              <Link href={`/admin/tests/${t.id}`} className="text-primary underline">
                {t.title}
              </Link>{" "}
              <span className="text-muted">({t.status.toLowerCase()})</span>
            </span>
          ))}
          . Changes show up for students immediately; options can be edited but not removed.
        </p>
      )}

      {q.reports.length > 0 && (
        <div className="rounded-xl border border-danger bg-danger-soft p-3 text-sm">
          <p className="font-medium text-danger">Open reports from students</p>
          <ul className="mt-1 list-disc pl-5">
            {q.reports.map((r) => (
              <li key={r.id}>
                {r.reason.replace("_", " ").toLowerCase()}
                {r.note && <>: “{r.note}”</>}
              </li>
            ))}
          </ul>
        </div>
      )}

      <QuestionForm
        id={q.id}
        initial={q.input}
        status={q.status}
        taxonomy={taxonomy}
        canPublish={can(user.role, "content:publish")}
        canDelete={q.tests.length === 0 && q.status !== "PUBLISHED"}
        lockedOptionCount={q.tests.length > 0 ? q.input.options.length : 0}
      />
    </div>
  );
}

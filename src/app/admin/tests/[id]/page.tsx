import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getTaxonomy } from "@/modules/content/taxonomy";
import { getTestForBuilder } from "@/modules/content/test-service";
import { can } from "@/modules/identity/permissions";
import { requirePermission } from "@/modules/identity/session";
import { TestBuilder } from "../test-builder";
import { TestMetaForm } from "../test-meta-form";

export const metadata: Metadata = { title: "Edit test" };

export default async function EditTestPage({ params }: PageProps<"/admin/tests/[id]">) {
  const user = await requirePermission("content:edit");
  await connection();
  const { id } = await params;
  const [t, taxonomy] = await Promise.all([getTestForBuilder(id), getTaxonomy()]);
  if (!t) notFound();
  const canPublish = can(user.role, "content:publish");
  const published = t.status === "PUBLISHED";

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Link href="/admin/tests" className="text-sm text-muted">
          ← Tests
        </Link>
        <h1 className="text-xl font-semibold">{t.meta.title}</h1>
      </div>

      <details open={!published && t.sections.every((s) => s.questions.length === 0)} className="group">
        <summary className="cursor-pointer text-sm font-medium">Test details (title, URL, exam, duration, access)</summary>
        <div className="mt-3">
          <TestMetaForm id={t.id} initial={t.meta} exams={taxonomy.exams} slugLocked={published} readOnly={published && !canPublish} />
        </div>
      </details>

      <TestBuilder
        // Remount after a save/publish so the builder starts from what the server stored.
        key={`${t.status}-${t.sections.map((s) => s.questions.length).join(".")}`}
        id={t.id}
        slug={t.meta.slug}
        status={t.status}
        attempts={t.attempts}
        initialSections={t.sections}
        taxonomy={taxonomy}
        canPublish={canPublish}
      />
    </div>
  );
}

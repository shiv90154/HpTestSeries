import { Eye } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { isScheduled } from "@/modules/catalog/visibility";
import { getTaxonomy } from "@/modules/content/taxonomy";
import { getTestForBuilder } from "@/modules/content/test-service";
import { can } from "@/modules/identity/permissions";
import { requirePermission } from "@/modules/identity/session";
import { listGrantableProducts } from "@/modules/identity/user-service";
import { TestBuilder } from "../test-builder";
import { LiveWinners } from "./live-winners";
import { TestMetaForm } from "../test-meta-form";

export const metadata: Metadata = { title: "Edit test" };

export default async function EditTestPage({ params }: PageProps<"/admin/tests/[id]">) {
  const user = await requirePermission("content:edit");
  await connection();
  const { id } = await params;
  const [t, taxonomy, products] = await Promise.all([getTestForBuilder(id), getTaxonomy(), listGrantableProducts()]);
  if (!t) notFound();
  const canPublish = can(user.role, "content:publish");
  // Scheduled and retired tests count as published here: their URL is public and their questions are locked.
  const published = t.status !== "DRAFT";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-3">
        <div className="mr-auto space-y-1">
          <Link href="/admin/tests" className="text-sm text-muted">
            ← Tests
          </Link>
          <h1 className="text-xl font-semibold">{t.meta.title}</h1>
        </div>
        {/* Shows the saved version: save the builder first to preview new changes. */}
        <Link
          href={`/preview/tests/${t.id}`}
          target="_blank"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:border-primary hover:text-primary"
        >
          <Eye className="size-4" /> Preview as student
        </Link>
      </div>

      <details open={!published && t.sections.every((s) => s.questions.length === 0)} className="group">
        <summary className="cursor-pointer text-sm font-medium">Test details (title, URL, exam, duration, access)</summary>
        <div className="mt-3">
          <TestMetaForm id={t.id} initial={t.meta} exams={taxonomy.exams} products={products} slugLocked={published} readOnly={published && !canPublish} />
        </div>
      </details>

      {t.meta.liveStartsAt && t.meta.liveEndsAt && <LiveWinners testId={t.id} />}

      <TestBuilder
        // Remount after a save/publish so the builder starts from what the server stored.
        key={`${t.status}-${t.sections.map((s) => s.questions.length).join(".")}`}
        id={t.id}
        slug={t.meta.slug}
        status={t.status}
        attempts={t.attempts}
        scheduledFor={isScheduled(t.status, t.publishedAt) ? t.publishedAt : null}
        initialSections={t.sections}
        taxonomy={taxonomy}
        canPublish={canPublish}
      />
    </div>
  );
}

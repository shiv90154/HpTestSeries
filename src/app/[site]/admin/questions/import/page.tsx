import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { db } from "@/lib/db";
import { MAX_IMPORT_ROWS } from "@/modules/content/question-import";
import { requirePermission } from "@/modules/identity/session";
import { ImportForm } from "./import-form";

export const metadata: Metadata = { title: "Import questions" };

export default async function ImportQuestionsPage() {
  await requirePermission("content:edit");
  await connection();

  const [subjects, exams] = await Promise.all([
    db.subject.findMany({
      orderBy: { order: "asc" },
      select: { slug: true, name: true, topics: { orderBy: { order: "asc" }, select: { slug: true } } },
    }),
    db.exam.findMany({
      orderBy: [{ body: { order: "asc" } }, { order: "asc" }],
      select: { slug: true, name: true, body: { select: { slug: true } } },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Link href="/admin/questions" className="text-sm text-muted">
          ← Questions
        </Link>
        <h1 className="text-xl font-semibold">Import questions</h1>
        <p className="max-w-2xl text-sm text-muted">
          Upload a CSV with one question per row (up to {MAX_IMPORT_ROWS} rows). Fill English, Hindi, or both. Every
          row is checked first; nothing is saved until you confirm. Imported questions start as <b>Draft</b>, and questions
          already in the bank are skipped.{" "}
          {/* Plain <a>: this is a CSV file download from a route handler, not a page navigation. */}
          <a href="/admin/questions/import/template" download className="text-primary underline">
            Download the template
          </a>
          .
        </p>
      </div>

      <ImportForm />

      <details className="rounded-xl border border-border bg-surface p-4 text-sm">
        <summary className="cursor-pointer font-medium">Column reference and valid codes</summary>
        <div className="mt-4 space-y-4">
          <ul className="list-disc space-y-1 pl-5 text-muted">
            <li>
              <code>subject</code>, <code>topic</code>: codes from the table below (required)
            </li>
            <li>
              <code>answer</code>: A–E (required). <code>difficulty</code>: easy / medium / hard (default medium)
            </li>
            <li>
              <code>question_en</code>, <code>a_en</code>…<code>e_en</code>, <code>explanation_en</code>, and the same
              with <code>_hi</code>. At least options A and B; both languages must have the same number of options.
            </li>
            <li>
              <code>source</code>: original (default) or pyq. PYQs also need <code>source_exam</code> and{" "}
              <code>source_year</code>.
            </li>
          </ul>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 font-medium">subject / topic</h3>
              <ul className="space-y-1 text-muted">
                {subjects.map((s) => (
                  <li key={s.slug}>
                    <code className="text-foreground">{s.slug}</code>: {s.topics.map((t) => t.slug).join(", ") || "—"}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-medium">source_exam</h3>
              <ul className="space-y-1 text-muted">
                {exams.map((e) => (
                  <li key={`${e.body.slug}/${e.slug}`}>
                    <code className="text-foreground">
                      {e.body.slug}/{e.slug}
                    </code>{" "}
                    — {e.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
}

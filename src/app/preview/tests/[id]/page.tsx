import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cbt } from "@/app/tests/[slug]/attempt/cbt";
import { btn } from "@/components/ui";
import { getPreviewPaper } from "@/modules/assessment/service";
import { requirePermission } from "@/modules/identity/session";

export const metadata: Metadata = { title: "Preview test", robots: { index: false, follow: false } };

// Lives outside /admin so the CBT gets the full screen instead of the admin sidebar layout.
export default async function PreviewTestPage({ params }: PageProps<"/preview/tests/[id]">) {
  const { id } = await params;
  const user = await requirePermission("content:edit", `/preview/tests/${id}`);
  const paper = await getPreviewPaper(id);
  if (!paper) notFound();
  const exitHref = `/admin/tests/${id}`;

  if (paper.sections.every((s) => s.questions.length === 0)) {
    return (
      <main className="mx-auto grid min-h-dvh max-w-md place-items-center px-4 text-center">
        <div className="space-y-4">
          <h1 className="text-xl font-semibold">Nothing to preview yet</h1>
          <p className="text-muted">Add questions to this test in the builder, then preview it.</p>
          <Link href={exitHref} className={btn("primary")}>
            Back to the builder
          </Link>
        </div>
      </main>
    );
  }

  return <Cbt paper={paper} candidate={{ name: user.name }} preview={{ exitHref }} />;
}

import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { CATEGORY_META } from "@/modules/content/post-input";
import { listPostsForAdmin } from "@/modules/content/post-service";
import { requirePermission } from "@/modules/identity/session";
import { StatusBadge } from "../ui";

export const metadata: Metadata = { title: "Blog" };

export default async function BlogAdminPage() {
  await requirePermission("content:edit");
  await connection();
  const posts = await listPostsForAdmin();

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">
            Blog <span className="text-base font-normal text-muted">({posts.length})</span>
          </h1>
          <p className="text-sm text-muted">Exam notifications, syllabus, cutoffs and tips — published at /blog and linked from exam pages.</p>
        </div>
        <Link href="/admin/blog/new" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
          No posts yet. <Link href="/admin/blog/new" className="text-primary underline">Write the first one</Link>.
        </p>
      ) : (
        <ul className="divide-y divide-border rounded-xl border border-border bg-surface">
          {posts.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 p-4 text-sm">
              <div className="min-w-0 flex-1">
                <Link href={`/admin/blog/${p.id}`} className="font-medium hover:text-primary">
                  {p.title}
                </Link>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                  <StatusBadge status={p.status} />
                  <span>{CATEGORY_META[p.category].label}</span>
                  {p.exams.length > 0 && <span>{p.exams.map((e) => e.name).join(", ")}</span>}
                  {p.status === "PUBLISHED" && (
                    <a href={`/blog/${p.slug}`} target="_blank" rel="noreferrer" className="text-primary underline">
                      /blog/{p.slug}
                    </a>
                  )}
                </div>
              </div>
              <span className="text-xs text-muted">Updated {p.updatedAt.toLocaleDateString("en-IN")}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

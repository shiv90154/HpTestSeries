import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { listExamOptions } from "@/modules/content/exam-service";
import { getPostForEdit } from "@/modules/content/post-service";
import { can } from "@/modules/identity/permissions";
import { requirePermission } from "@/modules/identity/session";
import { StatusBadge } from "../../ui";
import { PostForm } from "../post-form";

export const metadata: Metadata = { title: "Edit post" };

export default async function EditPostPage({ params }: PageProps<"/admin/blog/[id]">) {
  const user = await requirePermission("content:edit");
  await connection();
  const { id } = await params;
  const [post, examOptions] = await Promise.all([getPostForEdit(id), listExamOptions()]);
  if (!post) notFound();
  const { id: postId, status, ...initial } = post;

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <Link href="/admin/blog" className="text-sm text-muted">
          ← Blog
        </Link>
        <h1 className="flex flex-wrap items-center gap-3 text-xl font-semibold">
          {post.title} <StatusBadge status={status} />
        </h1>
      </div>
      <PostForm id={postId} status={status} canPublish={can(user.role, "content:publish")} examOptions={examOptions} initial={initial} />
    </div>
  );
}

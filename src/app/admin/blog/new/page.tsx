import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { listExamOptions } from "@/modules/content/exam-service";
import { requirePermission } from "@/modules/identity/session";
import { PostForm } from "../post-form";

export const metadata: Metadata = { title: "New post" };

export default async function NewPostPage() {
  await requirePermission("content:edit");
  await connection();
  const examOptions = await listExamOptions();

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <Link href="/admin/blog" className="text-sm text-muted">
          ← Blog
        </Link>
        <h1 className="text-xl font-semibold">New post</h1>
      </div>
      <PostForm
        id={null}
        status="DRAFT"
        canPublish={false}
        examOptions={examOptions}
        initial={{
          slug: "",
          title: "",
          titleHi: "",
          excerpt: "",
          content: "",
          coverImage: "",
          category: "NOTIFICATION",
          seoTitle: "",
          seoDescription: "",
          faqs: [],
          examIds: [],
        }}
      />
    </div>
  );
}

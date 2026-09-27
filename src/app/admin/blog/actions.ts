"use server";

import { revalidatePath } from "next/cache";
import { createPost, deletePost, setPostPublished, updatePost } from "@/modules/content/post-service";
import { requirePermission } from "@/modules/identity/session";

type Result<T = object> = ({ ok: true } & T) | { ok: false; errors: string[] };

/** Blog list, post pages, exam hubs ("Latest updates"), home, footer, sitemap and RSS all show posts. */
function refreshPublicPages() {
  revalidatePath("/", "layout");
}

export async function createPostAction(raw: unknown): Promise<Result<{ id: string }>> {
  const user = await requirePermission("content:edit");
  const res = await createPost(raw, user.id);
  if (res.ok) revalidatePath("/admin/blog");
  return res;
}

export async function updatePostAction(id: string, raw: unknown): Promise<Result> {
  const user = await requirePermission("content:edit");
  const res = await updatePost(id, raw, user.id);
  if (res.ok) refreshPublicPages();
  return res;
}

export async function setPostPublishedAction(id: string, published: boolean): Promise<Result> {
  const user = await requirePermission("content:publish");
  const res = await setPostPublished(id, published, user.id);
  if (res.ok) refreshPublicPages();
  return res;
}

export async function deletePostAction(id: string): Promise<Result> {
  const user = await requirePermission("content:edit");
  const res = await deletePost(id, user.id);
  if (res.ok) refreshPublicPages();
  return res;
}

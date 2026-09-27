import "server-only";
import { db } from "@/lib/db";
import { parseFaqs } from "./exam-content";
import { validatePost, type PostInput } from "./post-input";

type Fail = { ok: false; errors: string[] };

export async function listPostsForAdmin() {
  return db.post.findMany({
    orderBy: [{ status: "asc" }, { updatedAt: "desc" }],
    select: {
      id: true,
      slug: true,
      title: true,
      category: true,
      status: true,
      publishedAt: true,
      updatedAt: true,
      exams: { select: { name: true } },
    },
  });
}

export async function getPostForEdit(id: string): Promise<({ id: string; status: string } & PostInput) | null> {
  const p = await db.post.findUnique({ where: { id }, include: { exams: { select: { id: true } } } });
  if (!p) return null;
  return {
    id: p.id,
    status: p.status,
    slug: p.slug,
    title: p.title,
    titleHi: p.titleHi ?? "",
    excerpt: p.excerpt,
    content: p.content,
    coverImage: p.coverImage ?? "",
    category: p.category,
    seoTitle: p.seoTitle ?? "",
    seoDescription: p.seoDescription ?? "",
    faqs: parseFaqs(p.faqs),
    examIds: p.exams.map((e) => e.id),
  };
}

async function checkSlugFree(slug: string, excludeId: string | null): Promise<boolean> {
  const existing = await db.post.findUnique({ where: { slug }, select: { id: true } });
  return !existing || existing.id === excludeId;
}

function data(v: PostInput) {
  return {
    slug: v.slug,
    title: v.title,
    titleHi: v.titleHi || null,
    excerpt: v.excerpt,
    content: v.content,
    coverImage: v.coverImage || null,
    category: v.category,
    seoTitle: v.seoTitle || null,
    seoDescription: v.seoDescription || null,
    faqs: v.faqs,
  };
}

export async function createPost(raw: unknown, actorId: string): Promise<{ ok: true; id: string } | Fail> {
  const v = validatePost(raw);
  if (!v.ok) return v;
  if (!(await checkSlugFree(v.value.slug, null))) return { ok: false, errors: ["This URL is already used by another post"] };
  const post = await db.post.create({
    select: { id: true },
    data: { ...data(v.value), authorId: actorId, exams: { connect: v.value.examIds.map((id) => ({ id })) } },
  });
  await db.auditLog.create({ data: { actorId, entity: "post", entityId: post.id, action: "create" } });
  return { ok: true, id: post.id };
}

export async function updatePost(id: string, raw: unknown, actorId: string): Promise<{ ok: true; slug: string } | Fail> {
  const v = validatePost(raw);
  if (!v.ok) return v;
  if (!(await checkSlugFree(v.value.slug, id))) return { ok: false, errors: ["This URL is already used by another post"] };
  await db.post.update({
    where: { id },
    data: { ...data(v.value), exams: { set: v.value.examIds.map((examId) => ({ id: examId })) } },
  });
  await db.auditLog.create({ data: { actorId, entity: "post", entityId: id, action: "update" } });
  return { ok: true, slug: v.value.slug };
}

export async function setPostPublished(id: string, published: boolean, actorId: string): Promise<{ ok: true; slug: string } | Fail> {
  const p = await db.post.findUnique({ where: { id }, select: { slug: true, publishedAt: true } });
  if (!p) return { ok: false, errors: ["Post not found"] };
  await db.post.update({
    where: { id },
    // Keep the first publish date on re-publish so "published on" stays honest; updatedAt tracks edits.
    data: published ? { status: "PUBLISHED", publishedAt: p.publishedAt ?? new Date() } : { status: "DRAFT" },
  });
  await db.auditLog.create({ data: { actorId, entity: "post", entityId: id, action: published ? "publish" : "unpublish" } });
  return { ok: true, slug: p.slug };
}

export async function deletePost(id: string, actorId: string): Promise<{ ok: true } | Fail> {
  await db.post.delete({ where: { id } });
  await db.auditLog.create({ data: { actorId, entity: "post", entityId: id, action: "delete" } });
  return { ok: true };
}

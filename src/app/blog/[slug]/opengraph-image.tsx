import { ogCard, ogSize } from "@/lib/og-card";
import { site } from "@/lib/site";
import { getPost } from "@/modules/catalog/queries";
import { CATEGORY_META } from "@/modules/content/post-input";

export const alt = `${site.name} — exam update`;
export const size = ogSize;
export const contentType = "image/png";

export default async function PostOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPost((await params).slug);
  return ogCard({
    kicker: post ? CATEGORY_META[post.category].label : "Exam Updates",
    title: post?.title ?? "Himachal govt exam updates",
    footer: "hptestseries.in/blog · Free HP mock tests in real CBT format",
  });
}

import { ogCard, ogSize } from "@/lib/og-card";
import { getSite } from "@/sites";
import { getPost } from "@/modules/catalog/queries";
import { categoryMeta } from "@/modules/content/post-input";

export const alt = "Exam update";
export const size = ogSize;
export const contentType = "image/png";

export default async function PostOgImage({ params }: { params: Promise<{ site: string; slug: string }> }) {
  const { site: code, slug } = await params;
  const site = getSite(code);
  const post = await getPost(site.code, slug);
  return ogCard(site, {
    kicker: post ? categoryMeta(post.category, site.code).label : "Exam Updates",
    title: post?.title ?? `${site.stateAdj} govt exam updates`,
    footer: `${new URL(site.url).host}/blog · Free ${site.logo.initials} mock tests in real CBT format`,
  });
}

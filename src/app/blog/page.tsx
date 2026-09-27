import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";
import { getPublishedPosts, POSTS_PER_PAGE } from "@/modules/catalog/queries";
import { parsePage, PostList } from "./post-list";

export async function generateMetadata({ searchParams }: PageProps<"/blog">): Promise<Metadata> {
  const page = parsePage((await searchParams).page);
  return {
    title: page > 1 ? `HP Govt Exam Updates — Page ${page}` : "HP Govt Exam Updates — Notifications, Syllabus, Cutoff & Exam Dates",
    description:
      "Latest Himachal Pradesh government exam updates: HPRCA, HPPSC, HP Police, HP TET and Patwari notifications, syllabus, exam pattern, cutoff marks, admit cards and preparation tips — Hindi & English.",
    alternates: { canonical: page > 1 ? `/blog?page=${page}` : "/blog", types: { "application/rss+xml": "/blog/feed.xml" } },
  };
}

export default async function BlogPage({ searchParams }: PageProps<"/blog">) {
  const page = parsePage((await searchParams).page);
  const { items, total } = await getPublishedPosts({ page });
  const pages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
  if (page > pages) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: site.url },
            { "@type": "ListItem", position: 2, name: "Exam Updates", item: `${site.url}/blog` },
          ],
        }}
      />
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-8 px-4 py-12">
        <header className="max-w-3xl space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Himachal govt exam updates</h1>
          <p lang="hi" className="text-lg text-muted">
            हिमाचल की सरकारी भर्तियों की ताज़ा जानकारी — नोटिफिकेशन, सिलेबस, कट ऑफ और परीक्षा तिथि।
          </p>
        </header>
        <PostList posts={items} page={page} pages={pages} basePath="/blog" active={null} />
      </main>
      <SiteFooter />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";
import { getPublishedPosts, POSTS_PER_PAGE } from "@/modules/catalog/queries";
import { CATEGORY_META, categoryFromSlug, POST_CATEGORIES } from "@/modules/content/post-input";
import { parsePage, PostList } from "../../post-list";

export function generateStaticParams() {
  return POST_CATEGORIES.map((c) => ({ category: CATEGORY_META[c].slug }));
}

export async function generateMetadata({ params, searchParams }: PageProps<"/blog/category/[category]">): Promise<Metadata> {
  const category = categoryFromSlug((await params).category);
  if (!category) return {};
  const meta = CATEGORY_META[category];
  const page = parsePage((await searchParams).page);
  const path = `/blog/category/${meta.slug}`;
  const { total } = await getPublishedPosts({ category, take: 1 });
  return {
    // An empty category is thin content: keep it out of the index until it has posts.
    ...(total === 0 && { robots: { index: false, follow: true } }),
    title: `${meta.heading} ${new Date().getFullYear()}${page > 1 ? ` — Page ${page}` : ""}`,
    description: meta.blurb,
    alternates: { canonical: page > 1 ? `${path}?page=${page}` : path },
  };
}

export default async function BlogCategoryPage({ params, searchParams }: PageProps<"/blog/category/[category]">) {
  const category = categoryFromSlug((await params).category);
  if (!category) notFound();
  const meta = CATEGORY_META[category];
  const page = parsePage((await searchParams).page);
  const { items, total } = await getPublishedPosts({ category, page });
  const pages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
  if (page > pages) notFound();
  const path = `/blog/category/${meta.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: site.url },
            { "@type": "ListItem", position: 2, name: "Exam Updates", item: `${site.url}/blog` },
            { "@type": "ListItem", position: 3, name: meta.heading, item: `${site.url}${path}` },
          ],
        }}
      />
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-8 px-4 py-12">
        <header className="max-w-3xl space-y-2">
          <p className="text-sm text-muted">
            <Link href="/blog" className="hover:text-primary">
              Exam Updates
            </Link>{" "}
            / {meta.label}
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{meta.heading}</h1>
          <p className="text-muted">
            {meta.blurb} <span lang="hi">({meta.labelHi})</span>
          </p>
        </header>
        <PostList posts={items} page={page} pages={pages} basePath={path} active={category} />
      </main>
      <SiteFooter />
    </>
  );
}

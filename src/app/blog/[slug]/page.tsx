import { CalendarDays, CheckCircle2, Clock, RefreshCw } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { Markdown } from "@/components/markdown";
import { formatDate, PostCard } from "@/components/post-card";
import { ShareButtons } from "@/components/share-buttons";
import { WhatsAppGroupCard } from "@/components/whatsapp-group";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { btn, card } from "@/components/ui";
import { organizationNode } from "@/lib/schema";
import { site } from "@/lib/site";
import { getAllPostSlugs, getPost, getPublishedTests, getRelatedPosts } from "@/modules/catalog/queries";
import { faqPageJsonLd } from "@/modules/content/exam-content";
import { CATEGORY_META, readingMinutes } from "@/modules/content/post-input";

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getAllPostSlugs()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  return {
    title: post.seoTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      section: CATEGORY_META[post.category].label,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  const cat = CATEGORY_META[post.category];
  const url = `${site.url}/blog/${post.slug}`;
  // Only show "Updated" when the post changed meaningfully after publishing (not same-day typo fixes).
  const updated = post.updatedAt.getTime() - post.publishedAt.getTime() > 24 * 3600 * 1000;
  const [related, tests] = await Promise.all([getRelatedPosts(post), getPublishedTests(post.exams[0] ? { examId: post.exams[0].id } : {})]);
  const freeTest = tests.find((t) => t.isFree);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": post.category === "NOTIFICATION" || post.category === "RESULT" || post.category === "EXAM_DATE" ? "NewsArticle" : "Article",
            headline: post.title.slice(0, 110),
            description: post.excerpt,
            url,
            mainEntityOfPage: url,
            datePublished: post.publishedAt.toISOString(),
            dateModified: post.updatedAt.toISOString(),
            inLanguage: "en-IN",
            articleSection: cat.label,
            ...(post.coverImage && { image: [post.coverImage] }),
            author: post.author?.name ? { "@type": "Person", name: post.author.name } : { "@type": "Organization", name: site.name, url: site.url },
            publisher: organizationNode(),
            ...(post.exams.length > 0 && { about: post.exams.map((e) => ({ "@type": "Thing", name: e.name, url: `${site.url}${e.href}` })) }),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: site.url },
              { "@type": "ListItem", position: 2, name: "Exam Updates", item: `${site.url}/blog` },
              { "@type": "ListItem", position: 3, name: cat.heading, item: `${site.url}/blog/category/${cat.slug}` },
              { "@type": "ListItem", position: 4, name: post.title, item: url },
            ],
          },
          ...(post.faqs.length > 0 ? [faqPageJsonLd(post.faqs)] : []),
        ]}
      />
      <SiteHeader />
      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-10 px-4 pb-10 pt-7 lg:grid-cols-[1fr_300px]">
        <article className="min-w-0 space-y-6">
          <Breadcrumbs
            links={[
              { href: "/", label: "Home" },
              { href: "/blog", label: "Exam Updates" },
              { href: `/blog/category/${cat.slug}`, label: cat.label },
            ]}
          />

          <header className="space-y-3">
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
            {post.titleHi && (
              <p lang="hi" className="text-lg text-muted">
                {post.titleHi}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4" />
                <time dateTime={post.publishedAt.toISOString()}>{formatDate(post.publishedAt)}</time>
              </span>
              {updated && (
                <span className="flex items-center gap-1.5">
                  <RefreshCw className="size-4" /> Updated <time dateTime={post.updatedAt.toISOString()}>{formatDate(post.updatedAt)}</time>
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" /> {readingMinutes(post.content)} min read
              </span>
              {post.author?.name && <span>By {post.author.name}</span>}
            </div>
          </header>

          {post.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element -- admin-provided URL of unknown size/host
            <img src={post.coverImage} alt="" className="aspect-[1.91/1] w-full rounded-2xl object-cover" fetchPriority="high" />
          )}

          <Markdown text={post.content} />

          <p className="rounded-xl border border-border bg-surface-muted p-4 text-sm text-muted">
            Always confirm dates, vacancies and eligibility with the official notification of the recruiting body before applying.
          </p>

          {post.faqs.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">FAQs</h2>
              <FaqList faqs={post.faqs} />
            </section>
          )}

          <ShareButtons url={url} text={post.title} />
          <WhatsAppGroupCard place="blog_post" />
        </article>

        <aside className="space-y-6">
          <div className={`${card} space-y-4 p-5 lg:sticky lg:top-24`}>
            <h2 className="font-semibold">Practice in the real exam format</h2>
            <ul className="space-y-2 text-sm">
              {["Real CBT interface", "Hindi & English", "Detailed solutions", "Rank among HP aspirants"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-success" /> {t}
                </li>
              ))}
            </ul>
            {freeTest && (
              <Link href={`/tests/${freeTest.slug}`} className={btn("primary", "md", "w-full")}>
                Take a free mock test
              </Link>
            )}
            {post.exams.length > 0 && (
              <ul className="space-y-1.5 border-t border-border pt-4 text-sm">
                {post.exams.map((e) => (
                  <li key={e.href}>
                    <Link href={e.href} className="font-medium text-primary hover:underline">
                      {e.name} mock tests →
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        {related.length > 0 && (
          <section className="space-y-4 lg:col-span-2">
            <h2 className="text-2xl font-bold tracking-tight">Related updates</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} compact />
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}

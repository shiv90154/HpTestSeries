import { ChevronLeft, ChevronRight, Rss } from "lucide-react";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { card } from "@/components/ui";
import type { PublicPostCard } from "@/modules/catalog/queries";
import { CATEGORY_META, POST_CATEGORIES, type PostCategory } from "@/modules/content/post-input";

/** Shared body of /blog and /blog/category/[category]: category chips, post grid, pagination. */
export function PostList({
  posts,
  page,
  pages,
  basePath,
  active,
}: {
  posts: PublicPostCard[];
  page: number;
  pages: number;
  basePath: string;
  active: PostCategory | null;
}) {
  const pageHref = (n: number) => (n === 1 ? basePath : `${basePath}?page=${n}`);
  return (
    <div className="space-y-8">
      <nav aria-label="Categories" className="flex flex-wrap gap-2">
        <Chip href="/blog" active={!active}>
          All updates
        </Chip>
        {POST_CATEGORIES.map((c) => (
          <Chip key={c} href={`/blog/category/${CATEGORY_META[c].slug}`} active={active === c}>
            {CATEGORY_META[c].label}
          </Chip>
        ))}
        <a href="/blog/feed.xml" className="ml-auto flex min-h-10 items-center gap-1.5 text-sm text-muted hover:text-primary">
          <Rss className="size-4" /> RSS
        </a>
      </nav>

      {posts.length === 0 ? (
        <p className={`${card} p-6 text-muted`}>
          No posts here yet. Meanwhile, try the <Link href="/tests" className="text-primary underline">free mock tests</Link>.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}

      {pages > 1 && (
        <nav aria-label="Pagination" className="flex items-center justify-center gap-3 text-sm">
          {page > 1 && (
            <Link href={pageHref(page - 1)} rel="prev" className="flex h-10 items-center gap-1 rounded-lg border border-border px-3.5 hover:border-primary">
              <ChevronLeft className="size-4" /> Newer
            </Link>
          )}
          <span className="text-muted">
            Page {page} of {pages}
          </span>
          {page < pages && (
            <Link href={pageHref(page + 1)} rel="next" className="flex h-10 items-center gap-1 rounded-lg border border-border px-3.5 hover:border-primary">
              Older <ChevronRight className="size-4" />
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}

function Chip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface hover:border-primary hover:text-primary"}`}
    >
      {children}
    </Link>
  );
}

export function parsePage(raw: string | string[] | undefined): number {
  const n = Number(Array.isArray(raw) ? raw[0] : raw);
  return Number.isInteger(n) && n > 1 ? n : 1;
}

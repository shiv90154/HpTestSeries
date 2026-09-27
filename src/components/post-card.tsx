import { CalendarDays } from "lucide-react";
import Link from "next/link";
import type { PublicPostCard } from "@/modules/catalog/queries";
import { CATEGORY_META } from "@/modules/content/post-input";
import { card } from "./ui";

export function formatDate(d: Date): string {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
}

export function PostCard({ post, compact = false }: { post: PublicPostCard; compact?: boolean }) {
  const cat = CATEGORY_META[post.category];
  return (
    <article className={`${card} group flex flex-col gap-3 p-5 hover:border-primary`}>
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <Link href={`/blog/category/${cat.slug}`} className="rounded-md bg-primary-soft px-2 py-1 font-semibold text-primary">
          {cat.label}
        </Link>
        <span className="flex items-center gap-1 text-muted">
          <CalendarDays className="size-3.5" />
          <time dateTime={post.publishedAt.toISOString()}>{formatDate(post.publishedAt)}</time>
        </span>
      </div>
      <h3 className="font-semibold leading-snug">
        <Link href={`/blog/${post.slug}`} className="group-hover:text-primary">
          {post.title}
        </Link>
      </h3>
      {!compact && <p className="line-clamp-3 text-sm text-muted">{post.excerpt}</p>}
    </article>
  );
}

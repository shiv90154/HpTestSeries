import { ChevronRight, Flame, Play, Sparkles } from "lucide-react";
import Link from "next/link";
import { TrackedLink } from "@/components/tracked-link";
import { btn, card } from "@/components/ui";

/** Short badge text: a leading acronym (JOA, HPAS) as is, otherwise the initials of the first two words. */
function badge(name: string): string {
  const words = name.trim().split(/\s+/);
  const first = words[0] ?? "";
  if (first.length >= 3 && first === first.toUpperCase()) return first.slice(0, 4);
  return words.slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

/**
 * One exam on a "pick your exam" grid (/tests, /previous-year-papers): logo-style badge, counts, and an Open link.
 * The whole card is one link to the exam (an overlay under the content, which lets clicks through); the optional free-test
 * button sits above it as its own link, so the two links are never nested.
 */
export function ExamTile({
  href,
  name,
  label,
  nameHi,
  count,
  noun,
  free = 0,
  extra,
  popular = false,
  fresh,
  price,
  freeHref,
}: {
  href: string;
  /** the exam's own name, used for the badge initials */
  name: string;
  /** the display title */
  label: string;
  nameHi: string | null;
  count: number;
  /** what is counted, singular: "test", "paper" */
  noun: string;
  free?: number;
  /** a second count shown after the first, e.g. "6 papers" */
  extra?: string;
  /** shows a "Popular" tag */
  popular?: boolean;
  /** a "new" tag's text, e.g. "3 new tests" */
  fresh?: string;
  /** price line, e.g. "₹99 · ₹5 per test" */
  price?: string;
  /** a free test to start straight from the card */
  freeHref?: string;
}) {
  return (
    <div
      className={`${card} group relative flex h-full flex-col overflow-hidden transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
    >
      <Link href={href} aria-label={label} className="absolute inset-0 rounded-2xl focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary" />
      <span className="pointer-events-none relative flex items-center gap-3 overflow-hidden bg-primary p-4 text-white">
        <span aria-hidden className="absolute -bottom-10 right-4 size-24 bg-white/15 [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
        <span aria-hidden className="relative grid size-13 shrink-0 place-items-center rounded-2xl bg-white text-base font-extrabold text-primary ring-4 ring-white/30">
          {badge(name)}
          <span className="absolute right-1.5 top-1.5 size-2.5 rounded-full bg-accent" />
        </span>
        <span className="relative min-w-0">
          {(popular || fresh) && (
            <span className="mb-1 flex flex-wrap gap-1.5">
              {popular && (
                <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-[#1f1300]">
                  <Flame className="size-3" aria-hidden /> Popular
                </span>
              )}
              {fresh && (
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-primary">
                  <Sparkles className="size-3" aria-hidden /> {fresh}
                </span>
              )}
            </span>
          )}
          <span className="block text-lg font-bold leading-snug">{label}</span>
          {nameHi && (
            <span lang="hi" className="block text-sm text-white/80">
              {nameHi}
            </span>
          )}
        </span>
      </span>
      <span className="pointer-events-none relative flex items-center justify-between gap-3 px-4 pt-3 text-sm">
        <span className="text-muted">
          {count} {count === 1 ? noun : `${noun}s`}
          {extra && <span> · {extra}</span>}
          {free > 0 && <b className="ml-1.5 font-semibold text-success">· {free} free</b>}
        </span>
        <span aria-hidden className="flex items-center font-semibold text-primary">
          Open <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
        </span>
      </span>
      {price && <span className="pointer-events-none relative px-4 pt-1 text-sm font-medium text-foreground">{price}</span>}
      {freeHref ? (
        <span className="mt-auto px-4 pb-4 pt-3">
          <TrackedLink href={freeHref} event="directory_free_test_click" params={{ exam: href }} className={btn("accent", "sm", "relative z-10 w-full")}>
            <Play className="size-3.5" aria-hidden /> Start free mock
          </TrackedLink>
        </span>
      ) : (
        <span className="pb-3" />
      )}
    </div>
  );
}

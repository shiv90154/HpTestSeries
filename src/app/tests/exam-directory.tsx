"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ExamTile } from "@/components/exam-tile";
import { CATEGORIES, matchesSearch, type CategoryKey } from "@/modules/catalog/directory";

export type DirectoryCard = {
  href: string;
  name: string;
  label: string;
  nameHi: string | null;
  category: CategoryKey;
  /** extra words to match in search, e.g. "hc", "nurse" */
  aliases: string[];
  count: number;
  noun: string;
  free: number;
  extra?: string;
  popular: boolean;
  fresh?: string;
  price?: string;
  freeHref?: string;
};

/** The exam grid with a search box and job-group chips. Filtering happens in the browser; the full list is in the HTML for search engines. */
export function ExamDirectory({ exams }: { exams: DirectoryCard[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryKey | null>(null);

  const groups = useMemo(() => CATEGORIES.filter((c) => exams.some((e) => e.category === c.key)), [exams]);
  const shown = exams.filter(
    (e) => (!category || e.category === category) && matchesSearch(query, [e.label, e.name, e.nameHi, ...e.aliases, CATEGORIES.find((c) => c.key === e.category)?.label]),
  );

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <label className="relative block max-w-md">
          <span className="sr-only">Search exams</span>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
          <input
            type="text"
            enterKeyHint="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your exam, e.g. clerk, nurse, patwari"
            className="h-11 w-full rounded-xl border border-border bg-surface pl-10 pr-10 text-[15px] outline-none transition-colors placeholder:text-muted focus:border-primary"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-muted hover:text-foreground">
              <X className="size-4" />
            </button>
          )}
        </label>
        <div role="group" aria-label="Filter by job" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {[{ key: null, label: "All" } as const, ...groups].map((c) => {
            const active = category === c.key;
            return (
              <button
                key={c.key ?? "all"}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(c.key)}
                className={`inline-flex min-h-9 shrink-0 items-center rounded-full border px-4 text-sm font-medium transition-colors ${
                  active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {shown.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((e) => (
            <li key={e.href}>
              <ExamTile href={e.href} name={e.name} label={e.label} nameHi={e.nameHi} count={e.count} noun={e.noun} free={e.free} extra={e.extra} popular={e.popular} fresh={e.fresh} price={e.price} freeHref={e.freeHref} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-2xl border border-dashed border-border p-6 text-center text-muted">
          No exam matches “{query}”.{" "}
          <button
            type="button"
            className="font-medium text-primary hover:underline"
            onClick={() => {
              setQuery("");
              setCategory(null);
            }}
          >
            Show all exams
          </button>
        </p>
      )}
    </div>
  );
}

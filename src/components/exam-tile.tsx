import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { card } from "@/components/ui";

/** Short badge text: a leading acronym (JOA, HPAS) as is, otherwise the initials of the first two words. */
function badge(name: string): string {
  const words = name.trim().split(/\s+/);
  const first = words[0] ?? "";
  if (first.length >= 3 && first === first.toUpperCase()) return first.slice(0, 4);
  return words.slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

/** One exam on a "pick your exam" grid (/tests, /previous-year-papers): logo-style badge, counts, and an Open link. */
export function ExamTile({
  href,
  name,
  label,
  nameHi,
  count,
  noun,
  free = 0,
  extra,
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
}) {
  return (
    <Link
      href={href}
      className={`${card} group relative block h-full overflow-hidden transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
    >
      <span className="relative flex items-center gap-3 overflow-hidden bg-primary p-4 text-white">
        <span aria-hidden className="absolute -bottom-10 right-4 size-24 bg-white/15 [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
        <span aria-hidden className="relative grid size-13 shrink-0 place-items-center rounded-2xl bg-white text-base font-extrabold text-primary ring-4 ring-white/30">
          {badge(name)}
          <span className="absolute right-1.5 top-1.5 size-2.5 rounded-full bg-accent" />
        </span>
        <span className="relative min-w-0">
          <span className="block text-lg font-bold leading-snug">{label}</span>
          {nameHi && (
            <span lang="hi" className="block text-sm text-white/80">
              {nameHi}
            </span>
          )}
        </span>
      </span>
      <span className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
        <span className="text-muted">
          {count} {count === 1 ? noun : `${noun}s`}
          {extra && <span> · {extra}</span>}
          {free > 0 && <b className="ml-1.5 font-semibold text-success">· {free} free</b>}
        </span>
        <span className="flex items-center font-semibold text-primary">
          Open <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden />
        </span>
      </span>
    </Link>
  );
}

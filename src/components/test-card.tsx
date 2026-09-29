import { Clock, FileText, Lock } from "lucide-react";
import Link from "next/link";
import type { PublicTest } from "@/modules/catalog/queries";
import { btn, card } from "./ui";

const typeLabel: Record<string, string> = { MOCK: "Full mock", PYQ: "Previous year", SECTIONAL: "Sectional", TOPIC: "Topic test", DAILY: "Daily quiz" };

/** `headingLevel`: 2 on pages where the cards sit straight under the page <h1> (the /tests list), 3 under a section <h2>. */
export function TestCard({ test, headingLevel = 3 }: { test: PublicTest; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className={`${card} flex flex-col gap-4 p-5`}>
      <div className="flex items-center gap-2 text-xs font-semibold">
        <span className="rounded-md bg-primary-soft px-2 py-1 text-primary">{typeLabel[test.type] ?? test.type}</span>
        {test.isFree ? (
          <span className="rounded-md bg-success-soft px-2 py-1 text-success">FREE</span>
        ) : (
          <span className="flex items-center gap-1 rounded-md bg-accent-soft px-2 py-1 text-accent-ink">
            <Lock className="size-3" /> PAID
          </span>
        )}
      </div>
      <div>
        <Heading className="font-semibold leading-snug">
          <Link href={`/tests/${test.slug}`} className="hover:text-primary">
            {test.title}
          </Link>
        </Heading>
        {test.titleHi && (
          <p lang="hi" className="text-sm text-muted">
            {test.titleHi}
          </p>
        )}
      </div>
      <div className="flex gap-4 text-sm text-muted">
        <span className="flex items-center gap-1.5">
          <FileText className="size-4" /> {test.questionCount} Qs · {test.totalMarks} marks
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="size-4" /> {test.durationMin} min
        </span>
      </div>
      {test.isFree ? (
        <Link href={`/tests/${test.slug}/attempt`} className={btn("primary", "md", "mt-auto")}>
          Start free test
        </Link>
      ) : test.hasDemo ? (
        <div className="mt-auto space-y-1">
          <Link href={`/tests/${test.slug}/demo`} className={btn("primary", "md", "w-full")}>
            Try free demo
          </Link>
          <Link href={`/tests/${test.slug}`} className="flex min-h-10 items-center justify-center text-sm font-medium text-primary hover:underline">
            Unlock full test
          </Link>
        </div>
      ) : (
        <Link href={`/tests/${test.slug}`} className={btn("outline", "md", "mt-auto")}>
          Unlock test
        </Link>
      )}
    </div>
  );
}

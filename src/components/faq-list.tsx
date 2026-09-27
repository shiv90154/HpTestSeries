import { ChevronRight } from "lucide-react";
import type { Faq } from "@/modules/content/exam-content";
import { Markdown } from "./markdown";
import { card } from "./ui";

/** Collapsible FAQs. Answers stay in the HTML (closed <details>), so they match the FAQPage JSON-LD. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((f) => (
        <details key={f.q} className={`${card} group p-5`}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
            {f.q}
            <ChevronRight className="size-5 shrink-0 text-muted transition group-open:rotate-90" />
          </summary>
          <Markdown text={f.a} className="mt-3 text-sm text-muted" />
        </details>
      ))}
    </div>
  );
}

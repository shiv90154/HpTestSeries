import { ChevronRight } from "lucide-react";
import type { Faq } from "@/modules/content/exam-content";
import { Markdown } from "./markdown";
import { card } from "./ui";

/** Collapsible FAQs. Answers stay in the HTML (closed <details>), so they match the FAQPage JSON-LD. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((f) => (
        <details key={f.q} className={`${card} group`}>
          {/* The padding sits on <summary> so the whole card row is the tap target, not just the text */}
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold">
            {f.q}
            <ChevronRight className="size-5 shrink-0 text-muted transition group-open:rotate-90" />
          </summary>
          <Markdown text={f.a} className="-mt-2 px-5 pb-5 text-sm text-muted" />
        </details>
      ))}
    </div>
  );
}

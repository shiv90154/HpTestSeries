import { WHATSAPP_GROUP_URL } from "@/lib/site";
import { TrackedLink } from "./tracked-link";
import { card } from "./ui";

export function WhatsAppIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`${className} fill-current`}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z" />
    </svg>
  );
}

/**
 * Invite to our WhatsApp group (latest exam news, notifications, updates). Optional for the student.
 * `place` goes to GA4 so we can see which spot brings the most joins.
 */
export function WhatsAppGroupCard({ place, className = "" }: { place: string; className?: string }) {
  return (
    <section className={`${card} flex flex-wrap items-center gap-4 p-5 ${className}`}>
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#118376] text-white">
        <WhatsAppIcon className="size-6" />
      </span>
      <div className="min-w-0 flex-1 basis-56">
        <h2 className="font-semibold">Join our WhatsApp group</h2>
        <p lang="hi" className="text-sm text-muted">
          Latest news, exam notifications, results और नई updates सबसे पहले पाएँ। Join करना आपकी मर्ज़ी है, जब चाहें छोड़ सकते हैं।
        </p>
      </div>
      <TrackedLink
        href={WHATSAPP_GROUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        event="whatsapp_group_click"
        params={{ place }}
        className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#118376] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#0d6b60] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <WhatsAppIcon /> Join group
      </TrackedLink>
    </section>
  );
}

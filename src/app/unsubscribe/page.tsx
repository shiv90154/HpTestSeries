import type { Metadata } from "next";
import { Logo } from "@/components/logo";
import { card } from "@/components/ui";
import { UnsubscribeForm } from "./unsubscribe-form";

export const metadata: Metadata = { title: "Unsubscribe", robots: { index: false } };

const WHAT: Record<string, string> = {
  offers: "offer and update emails (free-test follow-ups and announcements)",
  reminders: "reminder emails about your purchases (for example, when your access is about to end)",
};

/** Opened from the link in a reminder or offer email. The change happens on the button press, not on page load. */
export default async function UnsubscribePage({ searchParams }: PageProps<"/unsubscribe">) {
  const q = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
  const [u, c, t] = [one(q.u), one(q.c), one(q.t)];
  const what = WHAT[c];
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-sm flex-col justify-center gap-6 px-4 py-10">
      <Logo />
      <div className={`${card} space-y-4 p-6`}>
        <h1 className="text-xl font-bold">Unsubscribe</h1>
        {what && u && t ? (
          <>
            <p className="text-sm text-muted">Stop getting {what} from HP Test Series? Login codes and result emails will still come.</p>
            <UnsubscribeForm u={u} c={c} t={t} what={what.split(" (")[0]} />
          </>
        ) : (
          <p className="text-sm text-muted">This link is incomplete. You can change your email settings on your profile page.</p>
        )}
      </div>
    </main>
  );
}

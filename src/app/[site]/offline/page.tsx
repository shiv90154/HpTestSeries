import { WifiOff } from "lucide-react";
import type { Metadata } from "next";
import { btn } from "@/components/ui";
import { RetryButton } from "./retry-button";

// Shown by the service worker (public /sw.js) when a page cannot be loaded because the phone has no connection.
// Kept free of the site header and anything that reads the database, so it stays a small static page that is safe to cache.
export const metadata: Metadata = { title: "You are offline", robots: { index: false, follow: false } };

export default function OfflinePage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <span className="grid size-16 place-items-center rounded-2xl bg-primary-soft text-primary">
        <WifiOff className="size-8" />
      </span>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">You are offline</h1>
        <p className="text-muted">
          Check your internet connection and try again. If you were in the middle of a test, your saved answers stay on this phone.
        </p>
      </div>
      <RetryButton className={btn("primary", "md", "w-full sm:w-auto")} />
    </main>
  );
}

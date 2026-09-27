"use client";

import { useEffect } from "react";
import { reportClientErrorAction } from "./report-error-action";

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    void reportClientErrorAction(error.message, error.stack, window.location.pathname).catch(() => {});
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-xl font-semibold">Something went wrong</h1>
      <p className="max-w-sm text-sm text-muted">
        This has been recorded. Please try again — if it keeps happening, contact support.
      </p>
      <button type="button" onClick={reset} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">
        Try again
      </button>
    </div>
  );
}

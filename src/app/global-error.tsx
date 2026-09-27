"use client";

import { useEffect } from "react";
import { reportClientErrorAction } from "./report-error-action";

// Catches errors thrown by the root layout itself, so it must render its own <html>/<body>.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    void reportClientErrorAction(error.message, error.stack, window.location.pathname).catch(() => {});
  }, [error]);

  return (
    <html lang="en">
      <body style={{ display: "grid", placeItems: "center", minHeight: "100dvh", fontFamily: "sans-serif", padding: 16 }}>
        <div style={{ textAlign: "center", maxWidth: 360 }}>
          <h1 style={{ fontSize: 20, fontWeight: 600 }}>Something went wrong</h1>
          <p style={{ fontSize: 14, color: "#5b6b85", marginTop: 8 }}>
            This has been recorded. Please reload the page — if it keeps happening, contact support.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: 16, borderRadius: 8, background: "#1e4fd8", color: "white", padding: "8px 16px", fontWeight: 600 }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

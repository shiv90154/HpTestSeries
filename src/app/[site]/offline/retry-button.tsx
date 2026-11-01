"use client";

export function RetryButton({ className }: { className: string }) {
  return (
    <button type="button" className={className} onClick={() => window.location.reload()}>
      Try again
    </button>
  );
}

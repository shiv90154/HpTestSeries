"use client";

import { useRef } from "react";
import { useFocusTrap } from "@/lib/use-focus-trap";

// Shared bits for admin screens.

export const input = "w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none";
export const label = "mb-1 block text-xs font-medium text-muted";
export const panel = "rounded-xl border border-border bg-surface p-4";

const statusStyle: Record<string, string> = {
  // Content status
  DRAFT: "bg-surface-muted text-muted",
  IN_REVIEW: "bg-accent-soft text-accent-strong",
  PUBLISHED: "bg-success-soft text-success",
  ARCHIVED: "bg-danger-soft text-danger",
  // Order status
  CREATED: "bg-surface-muted text-muted",
  PAID: "bg-success-soft text-success",
  FAILED: "bg-danger-soft text-danger",
  REFUNDED: "bg-accent-soft text-accent-strong",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${statusStyle[status] ?? ""}`}>
      {status.replace("_", " ").toLowerCase()}
    </span>
  );
}

export function ErrorList({ errors }: { errors: string[] }) {
  if (!errors.length) return null;
  return (
    <ul role="alert" className="list-disc space-y-1 rounded-xl border border-danger bg-danger-soft p-4 pl-8 text-sm text-danger">
      {errors.map((e) => (
        <li key={e}>{e}</li>
      ))}
    </ul>
  );
}

/** Accessible modal wrapper: traps focus, closes on Escape/backdrop click, restores focus on close. */
export function Modal({
  open,
  onClose,
  labelledBy,
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, open, onClose);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
      <button type="button" className="absolute inset-0" aria-label="Close" onClick={onClose} />
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby={labelledBy} className="relative w-full max-w-lg rounded-xl bg-surface p-5 shadow-2xl">
        {children}
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteFinanceEntryAction } from "./actions";

export function DeleteEntryButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <button
      disabled={pending}
      className="text-xs text-danger underline disabled:opacity-60"
      onClick={() =>
        confirm(`Delete "${title}"?`) &&
        startTransition(async () => {
          await deleteFinanceEntryAction(id);
          router.refresh();
        })
      }
    >
      Delete
    </button>
  );
}

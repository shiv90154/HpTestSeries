"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ErrorList } from "../ui";
import { deleteExamAction } from "./actions";

/** Deletes an exam nothing else uses; the server refuses (with the reason) while tests, series, questions or posts still point at it. */
export function DeleteExamButton({ id, name, compact = false }: { id: string; name: string; compact?: boolean }) {
  const router = useRouter();
  const [errors, setErrors] = useState<string[]>([]);
  const [pending, startTransition] = useTransition();

  function remove() {
    if (!confirm(`Delete "${name}"? This removes it from the whole site and can't be undone.`)) return;
    setErrors([]);
    startTransition(async () => {
      const res = await deleteExamAction(id);
      if (res.ok) {
        router.push("/admin/exams");
        router.refresh();
      } else setErrors(res.errors);
    });
  }

  return (
    <div className={compact ? "space-y-1" : "space-y-2 pt-2"}>
      <button
        type="button"
        disabled={pending}
        onClick={remove}
        className={`inline-flex items-center gap-1.5 text-danger disabled:opacity-50 ${compact ? "text-xs underline" : "rounded-lg border border-danger px-4 py-2 text-sm hover:bg-danger-soft"}`}
      >
        <Trash2 className="size-4" /> {pending ? "Deleting…" : "Delete exam"}
      </button>
      <ErrorList errors={errors} />
    </div>
  );
}

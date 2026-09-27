"use client";

import { UserRound } from "lucide-react";
import { useActionState } from "react";
import { btn, card } from "@/components/ui";
import { HP_DISTRICTS } from "@/lib/districts";
import { updateProfileAction } from "./actions";

const field = "h-11 w-full rounded-xl border border-border bg-surface px-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary-soft";

export function ProfileCard({ name, district }: { name: string; district: string | null }) {
  const [state, action, pending] = useActionState(updateProfileAction, {});
  if (state.ok) return null;
  return (
    <section className={`${card} p-5`}>
      <div className="mb-4 flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
          <UserRound className="size-5" />
        </span>
        <div>
          <h2 className="font-semibold">Complete your profile</h2>
          <p className="text-sm text-muted">Your name appears on your results, and your district will unlock district-wise ranks.</p>
        </div>
      </div>
      <form action={action} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <input name="name" defaultValue={name === "Aspirant" ? "" : name} placeholder="Your full name" className={field} required minLength={2} maxLength={60} autoComplete="name" />
        <select name="district" defaultValue={district ?? ""} className={field} required>
          <option value="" disabled>
            Select your district
          </option>
          {HP_DISTRICTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
          <option value="Outside HP">Outside HP</option>
        </select>
        <button className={btn("primary")} disabled={pending}>
          {pending ? "Saving…" : "Save"}
        </button>
      </form>
      {state.error && <p role="alert" className="mt-2 text-sm text-danger">{state.error}</p>}
    </section>
  );
}

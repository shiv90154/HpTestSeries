"use client";

import { useActionState } from "react";
import { btn } from "@/components/ui";
import { HP_DISTRICTS } from "@/lib/districts";
import { updateProfileDetailsAction } from "./actions";

const field = "h-11 w-full rounded-xl border border-border bg-surface px-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary-soft";

export function ProfileForm({ name, district, preferredLang }: { name: string; district: string | null; preferredLang: "en" | "hi" }) {
  const [state, action, pending] = useActionState(updateProfileDetailsAction, {});

  return (
    <form action={action} className="space-y-4" aria-label="Edit profile">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-xs font-medium text-muted">
            Full name
          </label>
          <input id="name" name="name" defaultValue={name === "Aspirant" ? "" : name} placeholder="Your full name" className={field} required minLength={2} maxLength={60} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="district" className="mb-1 block text-xs font-medium text-muted">
            District
          </label>
          <select id="district" name="district" defaultValue={district ?? ""} className={field} required>
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
        </div>
      </div>

      <fieldset>
        <legend className="mb-1 block text-xs font-medium text-muted">Preferred language</legend>
        <div className="flex gap-2">
          <label className={`${field} flex w-auto cursor-pointer items-center gap-2 px-4 has-checked:border-primary has-checked:bg-primary-soft`}>
            <input type="radio" name="preferredLang" value="en" defaultChecked={preferredLang === "en"} className="accent-primary" />
            English
          </label>
          <label className={`${field} flex w-auto cursor-pointer items-center gap-2 px-4 has-checked:border-primary has-checked:bg-primary-soft`}>
            <input type="radio" name="preferredLang" value="hi" defaultChecked={preferredLang === "hi"} className="accent-primary" />
            <span lang="hi">हिन्दी</span>
          </label>
        </div>
      </fieldset>

      {state.error && <p role="alert" className="text-sm text-danger">{state.error}</p>}
      {state.ok && <p role="status" className="text-sm text-success">Saved.</p>}

      <button className={btn("primary")} disabled={pending}>
        {pending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}

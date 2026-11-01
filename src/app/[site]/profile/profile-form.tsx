"use client";

import { CheckCircle2 } from "lucide-react";
import { useActionState, useState } from "react";
import { btn } from "@/components/ui";
import { districtOptions } from "@/lib/districts";
import { useSite } from "@/sites/provider";
import { updateProfileDetailsAction } from "./actions";

const field = "h-11 w-full rounded-xl border border-border bg-surface px-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary-soft";
const NAME_MAX = 60;

type Lang = "en" | "hi";

export function ProfileForm({ name, district, preferredLang }: { name: string; district: string | null; preferredLang: Lang }) {
  const site = useSite();
  const [state, action, pending] = useActionState(updateProfileDetailsAction, {});
  // Controlled so a failed save keeps what the student typed (React resets uncontrolled forms after an action).
  const initial = { name: name === "Aspirant" ? "" : name, district: district ?? "", lang: preferredLang };
  const [saved, setSaved] = useState(initial);
  const [values, setValues] = useState(initial);
  // A successful save becomes the new baseline (adjusting state while rendering, not in an effect).
  const [seen, setSeen] = useState(state);
  if (seen !== state) {
    setSeen(state);
    if (state.ok) setSaved({ ...values, name: values.name.trim() });
  }
  const dirty = values.name.trim() !== saved.name || values.district !== saved.district || values.lang !== saved.lang;
  const canSave = dirty && values.name.trim().length >= 2 && values.district !== "";

  return (
    <form action={action} className="space-y-4" aria-label="Edit profile">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <div className="mb-1 flex items-baseline justify-between">
            <label htmlFor="name" className="text-xs font-medium text-muted">
              Full name
            </label>
            <span className="text-xs text-muted" aria-hidden>
              {values.name.length}/{NAME_MAX}
            </span>
          </div>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            placeholder="As you want it on your results"
            className={field}
            required
            minLength={2}
            maxLength={NAME_MAX}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="district" className="mb-1 block text-xs font-medium text-muted">
            District
          </label>
          <select id="district" name="district" value={values.district} onChange={(e) => setValues({ ...values, district: e.target.value })} className={field} required>
            <option value="" disabled>
              Select your district
            </option>
            {districtOptions(site).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset>
        <legend className="mb-1 block text-xs font-medium text-muted">Preferred language</legend>
        <div className="flex gap-2">
          {(
            [
              ["en", "English"],
              ["hi", "हिन्दी"],
            ] as const
          ).map(([code, label]) => (
            <label key={code} className={`${field} flex w-auto cursor-pointer items-center gap-2 px-4 has-checked:border-primary has-checked:bg-primary-soft`}>
              <input type="radio" name="preferredLang" value={code} checked={values.lang === code} onChange={() => setValues({ ...values, lang: code })} className="accent-primary" />
              <span lang={code === "hi" ? "hi" : undefined}>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-3">
        <button className={btn("primary")} disabled={pending || !canSave}>
          {pending ? "Saving…" : "Save changes"}
        </button>
        {state.error && (
          <p role="alert" className="text-sm text-danger">
            {state.error}
          </p>
        )}
        {state.ok && !dirty && !pending && (
          <p role="status" className="inline-flex items-center gap-1 text-sm text-success">
            <CheckCircle2 className="size-4" /> Saved
          </p>
        )}
      </div>
    </form>
  );
}

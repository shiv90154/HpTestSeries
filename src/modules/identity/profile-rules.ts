// Pure helpers for the profile page (no DB), kept separate so they are unit-testable.

export type CompletenessInput = { name: string; district: string | null; phoneNumber: string | null; emailVerified: boolean };

/** Which profile steps are done, and the percentage. "Aspirant" is the placeholder name given at signup. */
export function profileCompleteness(p: CompletenessInput) {
  const steps = [
    { key: "name", label: "Add your name", done: p.name.trim().length >= 2 && p.name !== "Aspirant" },
    { key: "district", label: "Choose your district", done: !!p.district },
    { key: "phone", label: "Link your phone number", done: !!p.phoneNumber },
    { key: "email", label: "Verify your email", done: p.emailVerified },
  ];
  const percent = Math.round((steps.filter((s) => s.done).length / steps.length) * 100);
  return { steps, percent };
}

/** "SK" from "Shiv Kumar", "S" from "Shiv"; "?" when there is no real name yet. */
export function initialsOf(name: string): string {
  if (name === "Aspirant") return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  return (parts.length === 1 ? parts[0].slice(0, 1) : parts[0].slice(0, 1) + parts[parts.length - 1].slice(0, 1)).toUpperCase();
}

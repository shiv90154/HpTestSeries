// Shared bits for admin screens.

export const input = "w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none";
export const label = "mb-1 block text-xs font-medium text-muted";
export const panel = "rounded-xl border border-border bg-surface p-4";

const statusStyle: Record<string, string> = {
  DRAFT: "bg-surface-muted text-muted",
  IN_REVIEW: "bg-accent-soft text-accent-strong",
  PUBLISHED: "bg-success-soft text-success",
  ARCHIVED: "bg-danger-soft text-danger",
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

// Shared table/list rendering for admin screens — replaces hand-rolled <table>/<ul> markup.

export type Column<T> = {
  header: string;
  align?: "left" | "right" | "center";
  render: (row: T) => React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
};

export function Table<T>({
  columns,
  rows,
  rowKey,
  caption,
  emptyMessage = "Nothing here yet.",
}: {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  caption: string;
  emptyMessage?: string;
}) {
  if (rows.length === 0) {
    return <p className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">{emptyMessage}</p>;
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface">
      <table className="w-full text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-surface-muted text-left text-xs text-muted">
          <tr>
            {columns.map((c) => (
              <th
                key={c.header}
                className={`px-4 py-2 ${c.align === "right" ? "text-right" : c.align === "center" ? "text-center" : ""} ${c.headerClassName ?? ""}`}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)} className="border-t border-border">
              {columns.map((c) => (
                <td
                  key={c.header}
                  className={`px-4 py-2 ${c.align === "right" ? "text-right" : c.align === "center" ? "text-center" : ""} ${c.cellClassName ?? ""}`}
                >
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ListPanel({
  children,
  isEmpty,
  emptyMessage,
}: {
  children: React.ReactNode;
  isEmpty: boolean;
  emptyMessage: string;
}) {
  if (isEmpty) {
    return <p className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">{emptyMessage}</p>;
  }
  return <ul className="divide-y divide-border rounded-xl border border-border bg-surface">{children}</ul>;
}

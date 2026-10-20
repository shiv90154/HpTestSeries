/** Only allow same-site relative redirects (blocks open redirects like `//evil.com` or `https://…`). */
export function safeNextPath(next: string | string[] | undefined, fallback = "/dashboard"): string {
  const value = Array.isArray(next) ? next[0] : next;
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return fallback;
  return value;
}

// The shared email shell: a branded header bar, a white card, a sign-off and a footer. Tables and inline styles only,
// because mail apps ignore most CSS. Pure (no server imports) so the admin preview and every sender can use it.

import type { SiteConfig } from "@/sites/types";

export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export const emailColors = {
  primary: "#1e4fd8",
  strong: "#133a9e",
  ink: "#111827",
  body: "#374151",
  muted: "#6b7280",
  faint: "#9ca3af",
  line: "#e5e7eb",
  page: "#f3f4f6",
  panel: "#f9fafb",
  soft: "#e8efff",
  accent: "#f59e0b",
  success: "#15803d",
};

/** Hidden inbox preview line shown next to the subject. */
const preheader = (s: string) =>
  `<div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;color:${emailColors.page}">${esc(s)}${"&nbsp;&zwnj;".repeat(30)}</div>`;

/** Small upper-case label above the heading, e.g. "Subscription reminder". */
export function eyebrowRow(text: string) {
  const c = emailColors;
  return `<tr><td style="padding-bottom:10px;font-size:12px;line-height:1.4;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${c.primary}">${esc(text)}</td></tr>`;
}

export function headingRow(text: string) {
  return `<tr><td style="font-size:22px;line-height:1.35;font-weight:700;color:${emailColors.ink}">${esc(text)}</td></tr>`;
}

export function paragraphRow(text: string, opts: { muted?: boolean; top?: number } = {}) {
  const c = emailColors;
  return `<tr><td style="padding-top:${opts.top ?? 14}px;font-size:15px;line-height:1.65;color:${opts.muted ? c.muted : c.body}">${esc(text)}</td></tr>`;
}

export function buttonRow(label: string, url: string) {
  const c = emailColors;
  return `<tr><td style="padding-top:26px"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td bgcolor="${c.primary}" style="border-radius:8px;mso-padding-alt:14px 28px"><a href="${esc(url)}" style="display:inline-block;padding:14px 28px;font-family:${FONT};font-size:15px;line-height:1.2;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px">${esc(label)}</a></td></tr></table></td></tr>
<tr><td style="padding-top:12px;font-size:12px;line-height:1.5;color:${c.faint}">Button not working? Open this link: <a href="${esc(url)}" style="color:${c.muted};text-decoration:underline;word-break:break-all">${esc(url)}</a></td></tr>`;
}

/** Up to four figures side by side in a bordered box (e.g. correct / wrong / skipped / accuracy). */
export function statsRow(stats: { label: string; value: string }[]) {
  const c = emailColors;
  const width = Math.floor(100 / Math.max(1, stats.length));
  const cells = stats
    .map(
      (s, i) =>
        `<td align="center" width="${width}%" style="width:${width}%;padding:16px 4px;${i ? `border-left:1px solid ${c.line};` : ""}"><div style="font-size:22px;line-height:1.2;font-weight:700;color:${c.ink}">${esc(s.value)}</div><div style="padding-top:4px;font-size:12px;line-height:1.3;font-weight:600;letter-spacing:.4px;text-transform:uppercase;color:${c.muted}">${esc(s.label)}</div></td>`,
    )
    .join("");
  return `<tr><td style="padding-top:20px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${c.line};border-radius:10px;border-collapse:separate"><tr>${cells}</tr></table></td></tr>`;
}

/** Short benefit lines, each with a tick, in a light panel with an optional title. */
export function pointsRow(points: string[], title?: string) {
  const c = emailColors;
  const rows = points
    .map(
      (p) =>
        `<tr><td width="28" valign="top" style="width:28px;padding:6px 0"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td width="18" height="18" align="center" bgcolor="${c.soft}" style="width:18px;height:18px;border-radius:9px;font-size:11px;line-height:18px;font-weight:700;color:${c.primary}">&#10003;</td></tr></table></td><td style="padding:6px 0;font-size:14px;line-height:1.55;color:${c.body}">${esc(p)}</td></tr>`,
    )
    .join("");
  const head = title ? `<tr><td colspan="2" style="padding-bottom:6px;font-size:13px;line-height:1.4;font-weight:700;color:${c.ink}">${esc(title)}</td></tr>` : "";
  return `<tr><td style="padding-top:20px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td bgcolor="${c.panel}" style="background:${c.panel};border:1px solid ${c.line};border-radius:10px;padding:14px 18px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${head}${rows}</table></td></tr></table></td></tr>`;
}

/** A highlighted note: a tip, a quoted question, or a warning. */
export function noteRow(text: string, opts: { tone?: "info" | "warn"; italic?: boolean; top?: number } = {}) {
  const c = emailColors;
  const [bg, border, color] = opts.tone === "warn" ? ["#fffbeb", "#f59e0b", "#92400e"] : [c.soft, c.primary, c.body];
  return `<tr><td style="padding-top:${opts.top ?? 20}px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td bgcolor="${bg}" style="background:${bg};border-left:3px solid ${border};border-radius:6px;padding:12px 16px;font-size:14px;line-height:1.6;color:${color}${opts.italic ? ";font-style:italic" : ""}">${esc(text)}</td></tr></table></td></tr>`;
}

/** Closing line under the content: "Regards, Team HP Test Series". */
export function signOffRow(siteName: string) {
  const c = emailColors;
  return `<tr><td style="padding-top:28px;font-size:15px;line-height:1.6;color:${c.body}">Regards,<br><b style="color:${c.ink}">Team ${esc(siteName)}</b></td></tr>`;
}

/** Name and colours an email is branded with: the site of the student (or order) it is about. */
export type EmailBrand = Pick<SiteConfig, "name" | "url"> & { initials: string; primary: string; strong: string; soft: string; accent: string };

const HP_BRAND: EmailBrand = { name: "HP Test Series", url: "https://hptestseries.in", initials: "HP", primary: emailColors.primary, strong: emailColors.strong, soft: emailColors.soft, accent: emailColors.accent };

export function emailBrand(site: SiteConfig): EmailBrand {
  return {
    name: site.name,
    url: site.url,
    initials: site.logo.initials,
    primary: site.theme.primary ?? emailColors.primary,
    strong: site.theme["primary-strong"] ?? emailColors.strong,
    soft: site.theme["primary-soft"] ?? emailColors.soft,
    accent: site.theme.accent ?? emailColors.accent,
  };
}

/** Rows are built in the default (HP) palette; another site's mail swaps those colours for its own. */
function recolor(html: string, b: EmailBrand): string {
  const swaps: [string, string][] = [
    [emailColors.primary, b.primary],
    [emailColors.strong, b.strong],
    [emailColors.soft, b.soft],
    [emailColors.accent, b.accent],
  ];
  return swaps.reduce((h, [from, to]) => (from === to ? h : h.split(from).join(to)), html);
}

/** Wraps card rows in the branded shell. `footer` is already-escaped HTML. Without `brand` the mail is HP's. */
export function emailShell(m: { preview: string; siteUrl: string; rows: string; footer: string; brand?: EmailBrand }): string {
  const c = emailColors;
  const b = m.brand ?? HP_BRAND;
  const host = m.siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>${esc(b.name)}</title></head>
<body style="margin:0;padding:0;background:${c.page};font-family:${FONT};color:${c.ink};-webkit-text-size-adjust:100%">
${preheader(m.preview)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${c.page}" style="background:${c.page}"><tr><td align="center" style="padding:32px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
<tr><td bgcolor="#ffffff" style="background:#ffffff;border:1px solid ${c.line};border-radius:12px;overflow:hidden">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td bgcolor="${c.strong}" style="background:${c.strong};padding:18px 28px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td width="34" height="34" align="center" bgcolor="#ffffff" style="width:34px;height:34px;border-radius:8px;font-family:${FONT};font-size:13px;font-weight:800;color:${c.strong};letter-spacing:.5px">${esc(b.initials)}</td>
<td style="padding-left:12px;font-family:${FONT};font-size:17px;font-weight:700;color:#ffffff">${esc(b.name)}</td>
<td align="right" style="font-family:${FONT};font-size:12px;color:#ffffff;opacity:.8"><a href="${esc(m.siteUrl)}" style="color:#ffffff;text-decoration:none">${esc(host)}</a></td>
</tr></table></td></tr>
<tr><td height="3" bgcolor="${c.accent}" style="height:3px;line-height:3px;font-size:0;background:${c.accent}">&nbsp;</td></tr>
<tr><td style="padding:32px 28px 34px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${m.rows}
</table></td></tr></table>
</td></tr>
<tr><td style="padding:22px 16px 0;font-size:12px;line-height:1.7;color:${c.faint};text-align:center">${m.footer}</td></tr>
<tr><td style="padding:10px 16px 0;font-size:12px;line-height:1.7;color:${c.faint};text-align:center">&copy; ${new Date().getFullYear()} ${esc(b.name)} &middot; <a href="${esc(m.siteUrl)}" style="color:${c.muted};text-decoration:none">${esc(host)}</a></td></tr>
</table></td></tr></table></body></html>`;
  return recolor(html, b);
}

/** The login-code card: the digits sit in separate boxes so they are easy to read and copy. */
export function otpRows(code: string, minutes: number, siteName = "HP Test Series"): string {
  const c = emailColors;
  const boxes = code
    .split("")
    .map(
      (d) =>
        `<td align="center" width="44" height="54" bgcolor="${c.panel}" style="width:44px;height:54px;border-radius:8px;border:1px solid ${c.line};font-family:'Courier New',Consolas,monospace;font-size:26px;font-weight:700;color:${c.ink}">${esc(d)}</td><td width="8" style="width:8px;font-size:0">&nbsp;</td>`,
    )
    .join("");
  return [
    eyebrowRow("Account security"),
    headingRow("Your login code"),
    paragraphRow(`Use the code below to sign in to ${siteName}. It can be used only once.`, { top: 10 }),
    `<tr><td style="padding-top:22px"><table role="presentation" cellpadding="0" cellspacing="0"><tr>${boxes}</tr></table></td></tr>`,
    `<tr><td style="padding-top:14px;font-size:13px;color:${c.muted}">This code expires in <b style="color:${c.ink}">${minutes} minutes</b>.</td></tr>`,
    noteRow("Never share this code with anyone. Our team will never ask you for it.", { tone: "warn", top: 22 }),
    paragraphRow(`आपका लॉगिन कोड ऊपर दिया गया है। यह ${minutes} मिनट तक मान्य है। इसे किसी के साथ साझा न करें।`, { muted: true, top: 18 }),
    signOffRow(siteName),
  ].join("\n");
}

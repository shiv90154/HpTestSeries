// The shared email shell: branded header, a white card, footer. Tables and inline styles only, because mail apps ignore
// most CSS. Pure (no server imports) so the admin preview and every sender can use it.

export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const FONT = "'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export const emailColors = { primary: "#1e4fd8", strong: "#133a9e", ink: "#0f1b33", muted: "#5b6b85", faint: "#8a97ad", line: "#dfe5ef", soft: "#e8efff", accent: "#f59e0b" };

/** Hidden inbox preview line shown next to the subject. */
const preheader = (s: string) =>
  `<div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;color:#eef2f9">${esc(s)}${"&nbsp;&zwnj;".repeat(30)}</div>`;

export function paragraphRow(text: string, opts: { muted?: boolean; top?: number } = {}) {
  const c = emailColors;
  return `<tr><td style="padding-top:${opts.top ?? 14}px;font-size:15px;line-height:1.6;color:${opts.muted ? c.muted : c.ink}">${esc(text)}</td></tr>`;
}

export function buttonRow(label: string, url: string) {
  const c = emailColors;
  return `<tr><td style="padding-top:24px"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td bgcolor="${c.primary}" style="border-radius:10px"><a href="${esc(url)}" style="display:inline-block;padding:14px 26px;font-family:${FONT};font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:10px">${esc(label)}&nbsp;&rarr;</a></td></tr></table></td></tr>`;
}

/** Wraps card rows in the branded shell. `footer` is already-escaped HTML. */
export function emailShell(m: { preview: string; siteUrl: string; rows: string; footer: string }): string {
  const c = emailColors;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>HP Test Series</title></head>
<body style="margin:0;padding:0;background:#eef2f9;font-family:${FONT};color:${c.ink}">
${preheader(m.preview)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#eef2f9"><tr><td align="center" style="padding:28px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px">
<tr><td style="padding:0 4px 14px"><table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td width="36" height="36" align="center" bgcolor="${c.primary}" style="width:36px;height:36px;border-radius:10px;font-family:${FONT};font-size:14px;font-weight:800;color:#ffffff;letter-spacing:.5px">HP</td>
<td style="padding-left:10px;font-family:${FONT};font-size:17px;font-weight:700;color:${c.ink}">HP <span style="color:${c.primary}">Test Series</span></td>
</tr></table></td></tr>
<tr><td bgcolor="#ffffff" style="background:#ffffff;border:1px solid ${c.line};border-radius:18px;overflow:hidden">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td height="6" bgcolor="${c.primary}" style="height:6px;line-height:6px;font-size:0;background:linear-gradient(90deg,${c.strong},${c.primary} 60%,${c.accent})">&nbsp;</td></tr>
<tr><td style="padding:30px 28px 32px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${m.rows}
</table></td></tr></table>
</td></tr>
<tr><td style="padding:18px 8px 0;font-size:12px;line-height:1.6;color:${c.faint};text-align:center">${m.footer}<br>HP Test Series &middot; <a href="${esc(m.siteUrl)}" style="color:${c.faint}">${esc(m.siteUrl.replace(/^https?:\/\//, ""))}</a></td></tr>
</table></td></tr></table></body></html>`;
}

/** The login-code card: the digits sit in separate boxes so they are easy to read and copy. */
export function otpRows(code: string, minutes: number): string {
  const c = emailColors;
  const boxes = code
    .split("")
    .map(
      (d) =>
        `<td align="center" width="46" height="56" bgcolor="${c.soft}" style="width:46px;height:56px;border-radius:12px;border:1px solid #c9d8fb;font-family:'Courier New',Consolas,monospace;font-size:28px;font-weight:700;color:${c.strong}">${esc(d)}</td><td width="8" style="width:8px;font-size:0">&nbsp;</td>`,
    )
    .join("");
  return [
    `<tr><td style="font-size:24px;line-height:1.3;font-weight:800;color:${c.ink}">Your login code</td></tr>`,
    paragraphRow("Enter this code on HP Test Series to sign in. It works once.", { muted: true, top: 8 }),
    `<tr><td style="padding-top:22px"><table role="presentation" cellpadding="0" cellspacing="0"><tr>${boxes}</tr></table></td></tr>`,
    `<tr><td style="padding-top:16px;font-size:13px;color:${c.muted}">&#9201;&nbsp; Valid for <b style="color:${c.ink}">${minutes} minutes</b></td></tr>`,
    `<tr><td style="padding-top:24px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td bgcolor="#fff4dc" style="background:#fff4dc;border-radius:12px;padding:12px 14px;font-size:13px;line-height:1.55;color:#7a4a05">&#128274;&nbsp; <b>Never share this code.</b> Our team will never ask for it.</td></tr></table></td></tr>`,
    paragraphRow(`आपका लॉगिन कोड ऊपर दिया गया है। यह ${minutes} मिनट तक मान्य है। इसे किसी के साथ साझा न करें।`, { muted: true, top: 20 }),
  ].join("\n");
}

// Guest checkout: a buyer who is not logged in pays first and signs in afterwards. The browser keeps the
// secret claim tokens of the orders it placed in one cookie; logging in trades them for the access.

export const GUEST_ORDER_COOKIE = "hp_guest_orders";
export const GUEST_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
const MAX_TOKENS = 10;
const TOKEN_RE = /^[A-Za-z0-9_-]{32}$/; // 24 random bytes as base64url

/** Tokens found in the cookie value; anything malformed is dropped rather than trusted. */
export function parseClaimTokens(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw.split(",").filter((t) => TOKEN_RE.test(t)).slice(-MAX_TOKENS);
}

/** Cookie value with `token` appended (newest last); the oldest tokens fall off past the cap. */
export function withClaimToken(raw: string | undefined, token: string): string {
  return [...parseClaimTokens(raw).filter((t) => t !== token), token].slice(-MAX_TOKENS).join(",");
}

import "server-only";

// Which sign-in options the login page offers. Google + email OTP are free and need no DLT
// registration; phone OTP waits for MSG91/DLT approval in production.

export const googleLoginEnabled = !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET;

/**
 * PHONE_LOGIN=on|off overrides. By default phone login is offered once MSG91 is configured, and
 * always in development (codes print to the terminal) so existing phone-based staff accounts still work.
 */
export const phoneLoginEnabled =
  process.env.PHONE_LOGIN === "on" ||
  (process.env.PHONE_LOGIN !== "off" &&
    ((!!process.env.MSG91_AUTH_KEY && !!process.env.MSG91_OTP_TEMPLATE_ID) || process.env.NODE_ENV !== "production"));

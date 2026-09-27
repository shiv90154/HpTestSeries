import "server-only";

// Which sign-in options the login page offers. Google + email OTP are free and need no DLT
// registration; phone OTP waits for MSG91/DLT approval in production.

/** Better Auth sends codes in the background and reports success even if sending fails, so only offer
 * email login where mail can actually go out (always in development: codes print to the terminal). */
export const emailLoginEnabled = (!!process.env.RESEND_API_KEY && !!process.env.EMAIL_FROM) || process.env.NODE_ENV !== "production";

export const googleLoginEnabled = !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET;

/**
 * PHONE_LOGIN=on|off overrides. By default phone login is offered once MSG91 is configured, and
 * always in development (codes print to the terminal) so existing phone-based staff accounts still work.
 */
export const phoneLoginEnabled =
  process.env.PHONE_LOGIN === "on" ||
  (process.env.PHONE_LOGIN !== "off" &&
    ((!!process.env.MSG91_AUTH_KEY && !!process.env.MSG91_OTP_TEMPLATE_ID) || process.env.NODE_ENV !== "production"));

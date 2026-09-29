import "server-only";

// Which sign-in options the login page offers. Google + email OTP are free and need no DLT
// registration; phone OTP is off until explicitly enabled.

/** Better Auth sends codes in the background and reports success even if sending fails, so only offer
 * email login where mail can actually go out (always in development: codes print to the terminal). */
export const emailLoginEnabled = (!!process.env.RESEND_API_KEY && !!process.env.EMAIL_FROM) || process.env.NODE_ENV !== "production";

export const googleLoginEnabled = !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET;

/**
 * Phone (SMS OTP) login is OFF unless PHONE_LOGIN=on. Students sign in with Google or an email code; turn
 * this on only after MSG91 + DLT approval (and set MSG91_AUTH_KEY / MSG91_OTP_TEMPLATE_ID).
 */
export const phoneLoginEnabled = process.env.PHONE_LOGIN === "on";

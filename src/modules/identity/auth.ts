import "server-only";
import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { emailOTP, phoneNumber } from "better-auth/plugins";
import { db } from "@/lib/db";
import { consumeRateLimit } from "@/lib/rate-limit";
import { isValidIndianMobile } from "./permissions";
import { sendOtpEmail } from "./email";
import { googleLoginEnabled, phoneLoginEnabled } from "./login-methods";
import { sendOtpSms } from "./sms";

/** BLUEPRINT §16: at most this many concurrent sessions per user (deters account sharing). */
export const MAX_SESSIONS_PER_USER = 2;

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),

  socialProviders: googleLoginEnabled
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          prompt: "select_account",
        },
      }
    : {},

  account: {
    // Same person, same verified email: Google and email-OTP sign-ins land in one account.
    accountLinking: { enabled: true, trustedProviders: ["google"] },
  },

  user: {
    additionalFields: {
      // input: false — users can never set these through the auth API.
      role: { type: "string", defaultValue: "STUDENT", input: false },
      preferredLang: { type: "string", defaultValue: "en", input: false },
      district: { type: "string", required: false, input: false },
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days — students stay logged in on their phone
    updateAge: 60 * 60 * 24, // refresh expiry at most daily
    cookieCache: { enabled: true, maxAge: 5 * 60 }, // avoid a DB hit on every request
  },

  advanced: {
    // nginx sets X-Real-IP to $remote_addr (unspoofable) and the app only listens on 127.0.0.1.
    // X-Forwarded-For is unusable: a client-sent value makes the chain multi-hop, Better Auth then
    // resolves no IP and every user shares one rate-limit bucket.
    ipAddress: { ipAddressHeaders: ["x-real-ip"] },
  },

  rateLimit: {
    enabled: true,
    storage: "database",
    window: 60,
    max: 100,
    customRules: {
      "/phone-number/send-otp": { window: 60 * 10, max: 20 }, // per IP; per-phone cap is in sendOTP
      "/phone-number/verify": { window: 60 * 10, max: 30 },
      "/email-otp/send-verification-otp": { window: 60 * 10, max: 20 }, // per IP; per-email cap is in sendVerificationOTP
      "/sign-in/email-otp": { window: 60 * 10, max: 30 },
    },
  },

  databaseHooks: {
    session: {
      create: {
        // Keep only the newest MAX_SESSIONS_PER_USER sessions.
        after: async (session) => {
          const stale = await db.session.findMany({
            where: { userId: session.userId },
            orderBy: { createdAt: "desc" },
            skip: MAX_SESSIONS_PER_USER,
            select: { id: true },
          });
          if (stale.length) {
            await db.session.deleteMany({ where: { id: { in: stale.map((s) => s.id) } } });
          }
        },
      },
    },
  },

  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 10 * 60,
      allowedAttempts: 3,
      storeOTP: "hashed",
      sendVerificationOTP: async ({ email, otp, type }) => {
        if (type !== "sign-in") return; // password/email-change flows are not used
        // Placeholder addresses of phone-only accounts can never receive mail.
        if (email.endsWith(".invalid")) throw new APIError("BAD_REQUEST", { message: "Enter a real email address." });
        if (!(await consumeRateLimit(`otp-email:${email.toLowerCase()}`, 60 * 10, 5))) {
          throw new APIError("TOO_MANY_REQUESTS", { message: "Too many codes requested. Try again in 10 minutes." });
        }
        await sendOtpEmail(email, otp);
      },
    }),
    phoneNumber({
      otpLength: 6,
      expiresIn: 5 * 60,
      allowedAttempts: 3,
      phoneNumberValidator: isValidIndianMobile,
      sendOTP: async ({ phoneNumber, code }) => {
        if (!phoneLoginEnabled) throw new APIError("FORBIDDEN", { message: "Mobile login is not available yet." });
        // Per-phone cap (SMS cost + pumping protection). The per-IP rule below stays loose
        // because mobile carriers put thousands of students behind one CGNAT address.
        if (!(await consumeRateLimit(`otp-phone:${phoneNumber}`, 60 * 10, 3))) {
          throw new APIError("TOO_MANY_REQUESTS", { message: "Too many codes requested. Try again in 10 minutes." });
        }
        await sendOtpSms(phoneNumber, code);
      },
      signUpOnVerification: {
        // Placeholder email (never mailed); users can link Google later.
        getTempEmail: (phone) => `${phone.replace(/^\+/, "")}@phone.invalid`,
        getTempName: () => "Aspirant",
      },
    }),
    nextCookies(), // must be last: lets server actions set auth cookies
  ],
});

export type AuthSession = typeof auth.$Infer.Session;

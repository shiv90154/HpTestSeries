import "server-only";
import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { phoneNumber } from "better-auth/plugins";
import { db } from "@/lib/db";
import { consumeRateLimit } from "@/lib/rate-limit";
import { isValidIndianMobile } from "./permissions";
import { sendOtpSms } from "./sms";

/** BLUEPRINT §16: at most this many concurrent sessions per user (deters account sharing). */
export const MAX_SESSIONS_PER_USER = 2;

const googleConfigured = !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET;

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),

  socialProviders: googleConfigured
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          prompt: "select_account",
        },
      }
    : {},

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

  rateLimit: {
    enabled: true,
    storage: "database",
    window: 60,
    max: 100,
    customRules: {
      "/phone-number/send-otp": { window: 60 * 10, max: 20 }, // per IP; per-phone cap is in sendOTP
      "/phone-number/verify": { window: 60 * 10, max: 30 },
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
    phoneNumber({
      otpLength: 6,
      expiresIn: 5 * 60,
      allowedAttempts: 3,
      phoneNumberValidator: isValidIndianMobile,
      sendOTP: async ({ phoneNumber, code }) => {
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

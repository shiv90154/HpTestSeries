"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { consumeRateLimit } from "@/lib/rate-limit";
import { subscribeToExam } from "@/modules/email/exam-alerts";
import { requestSite } from "@/sites/current";

const input = z.object({
  email: z.string().max(200),
  examKey: z.string().max(120),
  source: z.enum(["syllabus-pdf", "alert"]),
});

/** Exam-page email form. Each new sign-up sends a mail, so sign-ups are capped per IP (nginx sets X-Real-IP). */
export async function subscribeExamAlertAction(raw: z.infer<typeof input>): Promise<{ ok: true } | { error: string }> {
  const v = input.safeParse(raw);
  if (!v.success) return { error: "Please enter a valid email address." };
  const ip = (await headers()).get("x-real-ip") ?? "unknown";
  if (!(await consumeRateLimit(`exam-alert:${ip}`, 10 * 60, 5))) return { error: "Too many tries. Please wait a few minutes." };
  const site = await requestSite();
  return subscribeToExam({ ...v.data, siteCode: site.code });
}

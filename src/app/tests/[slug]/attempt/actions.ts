"use server";

import { z } from "zod";
import { gradeDemoAttempt, gradeGuestAttempt, saveProgress, startAttempt, submitAttempt, type StartedAttempt } from "@/modules/assessment/service";
import { answersSchema, type ResultData } from "@/modules/assessment/types";
import { getCurrentUser } from "@/modules/identity/session";

const id = z.string().min(1).max(64);

export async function startAttemptAction(slug: string): Promise<StartedAttempt | { error: string }> {
  const user = await getCurrentUser();
  if (!user) return { error: "Please log in again." };
  return startAttempt(user.id, id.parse(slug));
}

const violationCount = z.number().int().min(0).max(100_000);

export async function saveProgressAction(attemptId: string, answers: unknown, violations?: number): Promise<boolean> {
  const user = await getCurrentUser();
  const parsed = answersSchema.safeParse(answers);
  if (!user || !parsed.success) return false;
  return saveProgress(user.id, id.parse(attemptId), parsed.data, violations !== undefined ? violationCount.parse(violations) : undefined);
}

export async function submitAttemptAction(
  attemptId: string,
  answers: unknown,
  violations?: number,
): Promise<{ ok: true } | { error: string }> {
  const user = await getCurrentUser();
  if (!user) return { error: "Your session expired. Log in again — your autosaved answers are safe." };
  const parsed = answersSchema.safeParse(answers);
  if (!parsed.success) return { error: "Could not read your answers. Please try again." };
  return submitAttempt(user.id, id.parse(attemptId), parsed.data, violations !== undefined ? violationCount.parse(violations) : undefined);
}

export async function gradeGuestAction(slug: string, answers: unknown): Promise<ResultData | { error: string }> {
  const parsed = answersSchema.safeParse(answers);
  if (!parsed.success) return { error: "Could not read your answers. Please try again." };
  const result = await gradeGuestAttempt(id.parse(slug), parsed.data);
  return result ?? { error: "Log in to take this test." };
}

export async function gradeDemoAction(slug: string, answers: unknown): Promise<ResultData | { error: string }> {
  const parsed = answersSchema.safeParse(answers);
  if (!parsed.success) return { error: "Could not read your answers. Please try again." };
  const result = await gradeDemoAttempt(id.parse(slug), parsed.data);
  return result ?? { error: "This test has no free demo." };
}

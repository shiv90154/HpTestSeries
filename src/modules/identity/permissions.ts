// Role → permission map (BLUEPRINT §8, §16). Pure, so both server guards and UI can use it.

export type Role = "STUDENT" | "SUPPORT" | "EDITOR" | "REVIEWER" | "ADMIN";

export type Permission =
  | "admin:access"
  | "content:edit"
  | "content:publish"
  | "users:manage"
  | "commerce:manage"
  /** who changed what, across content, money and users */
  | "audit:view";

const grants: Record<Role, readonly Permission[]> = {
  STUDENT: [],
  SUPPORT: ["admin:access", "users:manage"],
  EDITOR: ["admin:access", "content:edit"],
  REVIEWER: ["admin:access", "content:edit", "content:publish"],
  ADMIN: ["admin:access", "content:edit", "content:publish", "users:manage", "commerce:manage", "audit:view"],
};

export function can(role: Role | null | undefined, permission: Permission): boolean {
  return !!role && grants[role].includes(permission);
}

/** Indian mobile numbers in E.164: +91 followed by 10 digits starting 6-9. */
export function isValidIndianMobile(phone: string): boolean {
  return /^\+91[6-9]\d{9}$/.test(phone);
}

/** Accepts "98765 43210", "098765-43210", "+91 9876543210", … and returns E.164 or null. */
export function normalizeIndianMobile(input: string): string | null {
  let digits = input.replace(/[^\d]/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  const e164 = `+91${digits}`;
  return isValidIndianMobile(e164) ? e164 : null;
}

/** Name of an account created by an email or SMS code, until the student types their own (see /welcome). */
export const PLACEHOLDER_NAME = "Aspirant";

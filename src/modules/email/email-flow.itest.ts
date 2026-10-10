import "dotenv/config";
import { randomBytes } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// Never reach Resend from tests: without a key, sendEmail only logs (outside production).
delete process.env.RESEND_API_KEY;
process.env.EMAIL_DAILY_LIMIT = "500";

const { db } = await import("@/lib/db");
const { planReminders, queueCampaign, sendQueued, unsubscribe } = await import("./service");

const tag = randomBytes(4).toString("hex");
const DAY = 24 * 60 * 60 * 1000;
const now = new Date();
const userIds: string[] = [];
let productId = "";
let testId = "";
let examId = "";

async function newUser(label: string, data: { emailOffers?: boolean; emailReminders?: boolean; email?: string } = {}) {
  const u = await db.user.create({ data: { name: `IT ${label}`, email: data.email ?? `it-${tag}-${label}@example.com`, emailOffers: data.emailOffers ?? false, emailReminders: data.emailReminders ?? true } });
  userIds.push(u.id);
  return u.id;
}

async function freeAttempt(userId: string, submittedAgo: number) {
  const submittedAt = new Date(now.getTime() - submittedAgo);
  await db.attempt.create({
    data: { userId, testId, testVersion: 1, isFirst: true, status: "SUBMITTED", startedAt: submittedAt, deadlineAt: submittedAt, submittedAt, correct: 40, wrong: 30, skipped: 30 },
  });
}

async function entitlement(userId: string, expiresIn: number) {
  return db.entitlement.create({ data: { userId, productId, source: "ADMIN", expiresAt: new Date(now.getTime() + expiresIn) }, select: { id: true } });
}

const logs = (userId: string) => db.emailLog.findMany({ where: { userId }, orderBy: { createdAt: "asc" } });

let ending = "";
let renewer = "";
let followUp = "";
let notOptedIn = "";
let owner = "";
let phoneUser = "";

beforeAll(async () => {
  const test = await db.test.findFirst({ where: { isFree: true, status: "PUBLISHED", examId: { not: null } }, select: { id: true, examId: true } });
  if (!test) throw new Error("Seed the local database first: no free published test with an exam");
  testId = test.id;
  examId = test.examId!;
  const p = await db.product.create({ data: { slug: `it-email-${tag}`, title: `IT Email Series ${tag}`, kind: "PASS", priceInPaise: 9900, validityDays: 30 } });
  productId = p.id;

  ending = await newUser("ending");
  await entitlement(ending, 5 * DAY);

  renewer = await newUser("renewer");
  await entitlement(renewer, 5 * DAY);
  await entitlement(renewer, 40 * DAY);

  followUp = await newUser("followup", { emailOffers: true });
  await freeAttempt(followUp, DAY);

  notOptedIn = await newUser("noconsent");
  await freeAttempt(notOptedIn, DAY);

  owner = await newUser("owner", { emailOffers: true });
  await freeAttempt(owner, DAY);
  await entitlement(owner, 60 * DAY);

  phoneUser = await newUser("phone", { emailOffers: true, email: `9198${tag}@phone.invalid` });
  await freeAttempt(phoneUser, DAY);
});

afterAll(async () => {
  await db.emailCampaign.deleteMany({ where: { createdById: { in: userIds } } });
  await db.emailLog.deleteMany({ where: { userId: { in: userIds } } });
  await db.attempt.deleteMany({ where: { userId: { in: userIds } } });
  await db.entitlement.deleteMany({ where: { userId: { in: userIds } } });
  await db.product.delete({ where: { id: productId } });
  await db.user.deleteMany({ where: { id: { in: userIds } } });
});

describe("daily reminders", () => {
  it("queues access-ending and free-test follow-ups only for the right students, once", async () => {
    await planReminders(now);
    expect((await logs(ending)).map((l) => l.kind)).toEqual(["expiry"]);
    expect(await logs(renewer)).toEqual([]); // already renewed
    expect((await logs(followUp)).map((l) => [l.kind, l.refKey])).toEqual([["free-followup", examId]]);
    expect(await logs(notOptedIn)).toEqual([]); // no consent to offers
    expect((await logs(owner)).map((l) => l.kind)).toEqual([]); // already bought; their entitlement does not end soon

    const before = await db.emailLog.count({ where: { userId: { in: userIds } } });
    await planReminders(now);
    expect(await db.emailLog.count({ where: { userId: { in: userIds } } })).toBe(before);
  });

  it("sends them, and skips addresses that are not real", async () => {
    await sendQueued(now);
    expect((await logs(ending))[0].status).toBe("SENT");
    expect((await logs(followUp))[0].status).toBe("SENT");
    const phone = await logs(phoneUser);
    expect(phone.map((l) => [l.status, l.error])).toEqual([["SKIPPED", "no email address"]]);
  });

  it("holds a campaign back for 3 days after an offer email, and drops it for students who unsubscribe", async () => {
    const res = await queueCampaign({ subject: "New mocks", heading: "New mocks added", body: "Three new full mocks are live.", ctaLabel: "Start", ctaUrl: "/tests", examId }, owner);
    expect(res.ok).toBe(true);
    const campaignId = res.ok ? res.id : "";

    const ownerLog = await db.emailLog.findFirstOrThrow({ where: { userId: owner, campaignId } });
    await unsubscribe(owner, "offers");
    await sendQueued(now);

    const followUpCampaign = await db.emailLog.findFirstOrThrow({ where: { userId: followUp, campaignId } });
    expect(followUpCampaign.status).toBe("QUEUED"); // got the follow-up today
    expect((await db.emailLog.findUniqueOrThrow({ where: { id: ownerLog.id } })).status).toBe("SKIPPED");
    expect(await db.emailLog.count({ where: { userId: notOptedIn, campaignId } })).toBe(0);

    // Four days later the gap has passed and it goes out.
    await sendQueued(new Date(now.getTime() + 4 * DAY));
    expect((await db.emailLog.findUniqueOrThrow({ where: { id: followUpCampaign.id } })).status).toBe("SENT");
  });
});

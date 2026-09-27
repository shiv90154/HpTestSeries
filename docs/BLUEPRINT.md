# HP Exam Test Series Platform: Product and Technical Blueprint

## Context
The working directory is empty, so this is a greenfield build. The goal is a Himachal Pradesh-only, very cheap, mobile-first test-series platform for state government exams (HPPSC, HPRCA, HP Police, HP TET, and others). The developer builds it solo, possibly with a small content team. The blueprint has to be practical: one deployable app, low running cost, and ready to handle exam-season spikes. Once this plan is approved, the first implementation step saves it into the repo as `docs/BLUEPRINT.md` and scaffolds the app (see Roadmap, Phase 1).

---

## 1. Product concept and positioning
**One-liner:** "Every Himachal government exam, practised in the real exam format, for less than the price of a single book."

- **Position against national players** (Testbook, Adda247, and similar): they cover HP exams thinly, often with translated or generic questions and outdated patterns. We win on **HP depth, pattern accuracy, bilingual quality (Hindi + English), and price**.
- **Position against local coaching and PDF sellers:** we offer a real CBT simulation, instant analysis, and a state-wide rank, none of which they have.
- **The key economic insight:** most HP exams share a common syllabus spine (HP GK, General Studies, Reasoning, Quant, English, Hindi, Computer, Pedagogy). A single **topic-tagged question bank** can power many exam series. That reuse is what makes very low prices viable, and it is the central data-model decision.

## 2. Target users and needs
| Segment | Needs |
|---|---|
| Graduate aspirants (JOA IT, Clerk, Patwari, Constable), aged 20–30, often in villages or small towns, using low-end Android phones on patchy 4G | Cheap, works on a slow network, Hindi option, real exam pattern, "where do I stand in HP?" |
| Teaching aspirants (HP TET, JBT, TGT) | Pedagogy plus subject tests, PYQs, TET-specific pattern |
| HPAS / HPPSC aspirants | Serious mocks, HP GK depth, current affairs, quality explanations |
| Working or self-study candidates without coaching | Structured plan, short tests, performance feedback |

Underlying needs: trust (accurate answers), exam-realistic practice, knowing their rank, affordability, and quick access (no heavy app).

## 3. MVP features (build these)
1. Exam catalogue: exam pages with pattern, syllabus, and links to tests (these double as SEO pages).
2. Login with Google One Tap plus phone OTP.
3. Test engine: CBT-style timer, question palette, mark for review, sections, Hindi/English toggle, autosave and resume, submit.
4. Result page: score, accuracy, time spent, section and topic breakdown, **rank and percentile** (first attempt only), and full solutions with explanations.
5. Test types: **Full mocks, PYQs, sectional/topic tests, and a daily free HP GK quiz**.
6. Free tests on every exam (at least 1 mock, 1 PYQ, and some topic tests).
7. Purchase: individual series, exam packs, and an **All-Access Pass** through Razorpay (UPI first).
8. User dashboard: my series, attempts history, resume in-progress test, simple progress trend.
9. "Report question" button on every question (essential for quality control).
10. Admin: question bank with **bulk CSV/Excel import**, test builder, series and product management, publish scheduling, coupons, user and entitlement lookup, report queue, and a basic sales view.

## 4. Postponed (v2+)
- Live scheduled all-HP mocks with a fixed start time (v2; strong engagement driver).
- Weak-topic auto-practice (adaptive) and custom test generator.
- Monthly HP current affairs magazine and quizzes (start as plain blog content in the MVP).
- Referral program, streaks and badges.
- Native apps: ship a PWA first, then wrap it as a Trusted Web Activity (TWA) for the Play Store in v2.
- Doubt forum/comments, notes/PDF store, video.
- Push notifications (web push in v2; WhatsApp/Telegram broadcast is manual at first).

## 5. Exam and category structure (data-driven, never hardcoded)
Hierarchy: **Recruiting body → Exam → Post/Variant → Stage** (e.g., HPPSC → HPAS Combined → Prelims). Subjects and topics form a **separate global taxonomy** shared by all exams.

Starting catalogue. Each item must be **verified against the current official notifications** before launch, because commissions change (HPSSC was dissolved and replaced by HPRCA; recruitment bodies for some posts have shifted).
- **HPPSC:** HPAS/Allied Services (Prelims, Mains later), Naib Tehsildar, School Lecturer (New), Assistant Professor, HP SET, HPJS (later)
- **HPRCA:** JOA IT, Clerk, Steno-Typist, JBT, TGT (Arts/Medical/Non-Medical), Shastri/Language Teacher, JE, Lab Assistant, and other post codes
- **HP Police:** Constable (written test)
- **HPBOSE:** HP TET (JBT, TGT Arts/Medical/Non-Med, Shastri, LT, Special Educator)
- **Others:** Patwari, HP High Court (Clerk/Steno/Peon), Forest Guard, HPSEBL, cooperative banks (HPSCB/KCCB/JCCB Clerk), Anganwadi Supervisor
- **Cross-exam:** HP GK, HP Current Affairs, Computer, Reasoning, Quant, English, Hindi, Pedagogy

**MVP launch set (4–6 exams by aspirant volume):** JOA IT, Clerk, Constable, HP TET (JBT + one TGT), HPAS Prelims, and Patwari. Add the others purely through the admin panel.

## 6. Test-taking experience
- **Load once, run locally.** At test start, one request fetches the whole paper **without answers** (roughly 20–60 KB JSON). All navigation happens client-side, which works on a flaky network and keeps the server nearly idle during the test.
- **Server-authoritative time.** The attempt stores `startedAt` and `durationSec`. The client timer is for display only, and the server rejects or auto-closes submissions after the deadline plus a grace period.
- **Autosave.** Answers are stored in IndexedDB immediately and synced to the server with a debounce (every ~20–30 s and on section change), so the test can resume on another device.
- **UI.** It mirrors real CBT: question palette colours (answered / not answered / marked / not visited), section tabs, per-question language toggle, large tap targets, and a no-distraction layout. A "Pause" option exists for practice tests only.
- **Submit.** The server grades the attempt (negative marking, section-wise), stores a summary, computes rank, and returns the result. Solutions unlock after submit.
- **Offline edge case.** If the network is down at submit, the answers are queued and submitted when back online, graded against the recorded deadline.

## 7. Question and test management
- **Question:** type (MCQ single in the MVP; multi-select and numeric later), difficulty, topic tags, source (PYQ with exam+year, or original), explanation, status (draft → review → published), and **language variants** (hi/en stored side by side).
- Options can include images (stored in R2). Math support (KaTeX) is added only when Quant content needs it, as lightweight markdown with an image fallback.
- **Test:** sections → ordered question refs, with marks and negative marking per section, duration, instructions, type (mock/PYQ/sectional/topic/daily), and free flag.
- **Test series:** an ordered collection of tests for an exam, with optional scheduled release dates (drip).
- **Published tests are frozen.** Editing a question used in a published test creates an "erratum". A **regrade job** recomputes affected attempts and ranks, and users are notified via a result banner.
- Every change to a question is written to an audit log (who changed what).

## 8. Admin panel
Admin lives at `/admin` in the same Next.js app, with role gating.
- **Roles:** `ADMIN` (everything including money), `EDITOR` (create/edit content), `REVIEWER` (approve/publish content), `SUPPORT` (users, entitlements, refunds view).
- **Question bank:** filterable table (exam, topic, difficulty, status, source), bulk import from Excel/CSV/Google-Sheet export with row-level validation and a preview-then-commit step, duplicate detection (normalized text hash), and a bilingual side-by-side editor.
- **Test builder:** add questions by search/filter, "auto-fill N from topic X at difficulty Y", or import a test directly from a sheet. Preview it exactly as the student sees it.
- **Catalogue:** bodies, exams, stages, series, products, prices, coupons, SEO fields per page.
- **Operations:** report queue (question errors) with a "fix → regrade" flow, user lookup, manual grant/revoke entitlement, orders and payment status, and daily sales/signup/attempt counters.
- UI: shadcn/ui data tables with server-side pagination. Skip a CMS such as Payload or Strapi, since the domain is too specific for one.

## 9. User dashboard
"Continue test" card, my purchased series with next test, attempts history, simple score trend per exam, weak topics (top 3 by accuracy, computed from stored topic stats), and purchase history with invoices.

## 10. Results and analytics
- **Per attempt:** score, correct/wrong/skipped, accuracy, time per question and per section, topic-wise accuracy, rank, percentile, top score, and average score.
- **Comparison:** "you vs topper vs average" per section.
- **Rank:** first attempt only, among users who submitted. It is computed from an indexed count and cached per test (see §20).
- **Across attempts:** topic mastery aggregated from `attempt.topicStats` JSON. No heavy analytics engine is needed for the MVP.

## 11. Pricing and monetisation
All prices are GST-inclusive in the UI. Confirm GST registration and treatment with a CA; online education services are generally taxable.

| Product | Suggested price |
|---|---|
| Free | Daily HP GK quiz, 1–2 mocks + PYQs per exam, sample topic tests |
| Single test series (one exam, 20–40 tests) | ₹49–₹99 |
| Exam pack (e.g., all HPRCA JOA IT + Clerk + HP GK) | ₹149–₹199 |
| **All-Access Pass** | **₹99 / 3 months** or **₹299 / year** (hero product) |

- Validity is time-bound, ideally through exam date + buffer, which keeps revenue recurring.
- Launch offer: early-bird pricing plus coupon codes for YouTube and Telegram partner channels (affiliate share via coupon attribution).
- Avoid subscriptions with auto-debit in the MVP. One-time UPI payments are more trusted by this audience. Revisit UPI Autopay later.
- The low-price model only works with **volume plus low CAC**, which is why SEO and community distribution are first-class (§18–19).

## 12. Free vs paid
- **Free:** acquisition and trust. Every exam has real free content, the daily quiz, and a few PYQs with full solutions, all indexable.
- **Paid:** the complete mock sequence, all PYQs with explanations, sectional depth, and detailed analytics beyond the basic score.
- **Rule of thumb:** free users should experience the full engine and analytics once, and pay for **volume and depth**, not for features.
- **Rank is shown to everyone** as a hook. Solutions are free for free tests and paid for paid tests.

## 13. Database architecture (PostgreSQL + Prisma)
```
User(id, name, phone?, email?, googleId?, role, preferredLang, district?, createdAt)
Session/Account/Verification         -- auth library tables

ExamBody(id, slug, name, nameHi)
Exam(id, bodyId, slug, name, nameHi, description, pattern JSON, syllabus MD, seo JSON, isActive, order)
ExamStage(id, examId, slug, name)   -- prelims/mains/variant

Subject(id, slug, name, nameHi)
Topic(id, subjectId, parentId?, slug, name, nameHi)     -- global taxonomy
ExamTopic(examId, topicId)                               -- which topics matter for which exam

Question(id, type, difficulty, status, sourceType, sourceExamId?, sourceYear?, textHash, createdBy, reviewedBy, updatedAt)
QuestionContent(questionId, lang, stem, explanation)     -- hi/en rows
QuestionOption(id, questionId, order, isCorrect)
QuestionOptionContent(optionId, lang, text)
QuestionTopic(questionId, topicId)

Test(id, slug, title, titleHi, type, examId, stageId?, durationSec, instructions, isFree, status, publishedAt, version)
TestSection(id, testId, name, order, marksCorrect, marksWrong, durationSec?)
TestQuestion(testId, sectionId, questionId, order)

TestSeries(id, slug, examId, title, description, seo JSON, status)
SeriesTest(seriesId, testId, order, releaseAt?)

Product(id, slug, title, priceInPaise, validityDays | validUntil, kind: SERIES|PACK|PASS, isActive)
ProductItem(productId, seriesId?)   -- PASS = all series (flag, no rows)
Coupon(id, code, pctOff|flatOff, maxUses, usedCount, validTill, affiliateTag?)
Order(id, userId, productId, amount, couponId?, status, razorpayOrderId, createdAt)
Payment(id, orderId, razorpayPaymentId, status, raw JSON)
Entitlement(id, userId, productId, source: PURCHASE|ADMIN|COUPON_FREE, startsAt, expiresAt, orderId?)

Attempt(id, userId, testId, testVersion, isFirst, status: IN_PROGRESS|SUBMITTED|EXPIRED,
        startedAt, deadlineAt, submittedAt, answers JSONB, score, correct, wrong, skipped,
        timeSpentSec, sectionStats JSONB, topicStats JSONB)
TestStats(testId, attempts, avgScore, topScore, scoreHistogram JSONB, updatedAt)
QuestionReport(id, questionId, userId, reason, note, status)
AuditLog(id, actorId, entity, entityId, action, diff JSONB, at)
```
Key choices:
- **Answers are stored as one JSONB blob per attempt** (`{qid: {o: optionId, t: secs, m: marked}}`) instead of one row per answer. That keeps attempts to one row even at millions of attempts, and grading reads a single row.
- Indexes: `Attempt(testId, isFirst, score DESC)` for rank, `Attempt(userId, startedAt DESC)`, `Entitlement(userId, expiresAt)`, `Question(textHash)`, and a partial unique index so a user has one IN_PROGRESS attempt per test.
- Bilingual content lives in separate `*Content` rows keyed by lang, so a third language is possible later without changing the schema.

## 14. Backend architecture
**Modular monolith inside Next.js**, with no microservices.
```
src/
  app/                 routes (public, (student), admin, api/webhooks)
  modules/
    catalog/           exams, series, products (read-heavy, cached)
    content/           questions, import, tests, publishing, regrade
    assessment/        start/save/submit attempt, grading, ranking
    commerce/          orders, razorpay, coupons, entitlements, access check
    identity/          auth, roles, profile
    analytics/         dashboard aggregates, admin metrics
  lib/                 db (prisma), cache, r2, validation (zod), logger
```
- Mutations use **Server Actions** for student/admin forms and **Route Handlers** for the attempt API (start/save/submit) and the Razorpay webhook.
- Every input is validated with Zod. Each module exposes service functions, and the UI never calls Prisma directly.
- **Background work:** Vercel Cron handles nightly TestStats refresh and entitlement expiry reminders. Short jobs (regrade, bulk import commit) run through a lightweight queue (**Inngest** or Upstash QStash), which is serverless-friendly and has a free tier.
- Grading is synchronous at submit because it is cheap (in-memory comparison of ≤200 answers).

## 15. Frontend architecture
- **Next.js (App Router) + TypeScript + Tailwind + shadcn/ui.**
- **Public/SEO pages** (exam, series, PYQ, blog, and quiz landing pages) are **statically generated with ISR** and revalidated on admin publish via `revalidateTag`. They ship close to zero JS.
- **The test engine is a single client component tree** using Zustand for state and IndexedDB via `idb-keyval`. It is kept small because it must run on low-end Android.
- The dashboard and results pages are server-rendered and personalized, never cached publicly.
- Fonts: `next/font` with Noto Sans + Noto Sans Devanagari, subsetted. Images go through R2 behind Cloudflare with fixed dimensions.
- It is a **PWA** (manifest + service worker for the shell and in-progress test only).
- Performance budget: LCP < 2.5 s on a Moto-class device over 4G, and test-engine JS under ~120 KB gzipped.

## 16. Authentication and authorisation
- **Better Auth** (or Auth.js v5) with the Prisma adapter and DB sessions (httpOnly cookie).
- Login methods: **Google One Tap**, which is nearly free and suits Android-heavy users, plus **phone OTP via MSG91**. OTP needs DLT registration and costs roughly ₹0.2/SMS; start the paperwork early. WhatsApp OTP is an alternative later.
- **Session limits:** at most 2 active sessions per user, which deters account sharing. The oldest session is revoked on a new login.
- **Authorisation:** `role` on User plus a `requireRole()` guard in every admin action and route. Content access goes through a single function, `canAccessTest(user, test)` (§17).

## 17. Payment and access control
- **Flow:** create an `Order` on the server with the Razorpay order id → Razorpay Checkout (UPI intent, cards, netbanking) → client callback shows "processing" → **the webhook `payment.captured` is the source of truth**. It verifies the signature, marks the order paid idempotently, and creates the `Entitlement`. The client polls order status. No access is ever granted from the client callback alone.
- A daily reconciliation cron fetches unresolved orders from the Razorpay API.
- `canAccessTest` logic: the test is free, OR the user holds an active entitlement whose product is a PASS, OR the product includes a series containing the test. The result is cached per request.
- Refunds are handled manually from the Razorpay dashboard in the MVP. An admin action revokes the entitlement.
- Invoices are simple PDF/HTML receipts with GST details once registered.

## 18. SEO strategy (HP exam searches)
Target the queries aspirants actually type, in English and Hinglish/Hindi: "HP JOA IT mock test", "HPRCA clerk previous year paper", "HP GK questions in Hindi", "HPAS prelims syllabus", "HP TET JBT question paper 2024", "Himachal GK quiz".
- **URL structure:** `/hprca/joa-it` (hub: pattern, syllabus, eligibility, free tests, PYQs, FAQs, latest updates), `/hprca/joa-it/previous-year-papers/2024`, `/hprca/joa-it/mock-tests`, `/himachal-gk/<topic>` (e.g., rivers, districts, history, dams), `/daily-quiz/2026-09-27`, and `/hi/...` Hindi versions with `hreflang`.
- **Indexable PYQ and GK pages:** questions with answers and explanations rendered as HTML (real, useful content), with a CTA to "attempt as timed test".
- **Topic pages** for HP GK (districts, rivers, passes, festivals, and so on) should be genuinely comprehensive notes pages plus quiz. This is the long-tail engine, but avoid thin auto-generated pages.
- **Technical:** SSG/ISR, sitemap index split by type, BreadcrumbList + Organization + Article schema (FAQ rich results are no longer shown for most sites, so don't rely on them), fast CWV, canonical tags, and internal linking from hubs to topics to tests.
- **Freshness:** an "Updates" section per exam (notification, admit card, result, answer key). This is high-intent traffic around every HPRCA/HPPSC event. Use a manual admin post type.
- Set up Google Search Console + Bing from day one.

## 19. Content strategy
- **Content is the product, and quality is the moat.** Plan the content pipeline before the code.
- Sources: official PYQs (collected from commission sites and answer keys, re-typed, answers verified against official keys), original questions written by 2–4 paid subject-matter freelancers (HP-based teachers or recent selectees), and HP GK from primary sources (HP govt reports, Economic Survey of HP, district sites).
- **Never copy from competitor apps or books** (copyright plus quality risk).
- AI assist: an LLM can draft explanations, Hindi↔English translations, and tagging suggestions, but **every question passes human review** before publish.
- **Launch target:** ~3,000–5,000 reviewed questions: HP GK ~1,500, plus exam-specific banks, 10 full mocks and all available PYQs per launch exam.
- Weekly cadence: 7 daily quizzes, 1–2 new mocks per active exam, 1 current-affairs roundup, and updates posts.
- **Distribution:** Telegram channel + WhatsApp channel (daily quiz links with share-image result cards), YouTube Shorts (HP GK facts), and partnerships with small HP YouTubers via coupon codes.

## 20. Scalability and infrastructure
**Recommended stack (low cost, scales to lakhs of users):**
- **Vercel** (Pro, functions pinned to `bom1` Mumbai) for the Next.js app.
- **PostgreSQL:** Supabase or Neon in the Mumbai/Singapore region, used as a plain Postgres with pooled connections. Pick Supabase for the Mumbai region.
- **Cloudflare R2** for images (no egress fees), plus Cloudflare DNS.
- **Upstash Redis** (optional in the MVP) for rate limiting and hot rank/leaderboard caches.
- Sentry for errors, Vercel Analytics + PostHog (free tier) for product analytics.
- Expected cost: **₹3–6k/month** in early stages.
- Exit path: if Vercel costs grow, the same app runs in Docker on a Mumbai VPS (Coolify/Dokku) with no code changes. Avoid Vercel-only APIs beyond ISR/cron.

**Why this handles exam-day spikes:**
- The paper loads in one request.
- Autosave is batched (a few requests per user per test).
- Submit is one transactional write.
- Public pages are served from the CDN.
- Rank = `COUNT(*) WHERE testId=? AND isFirst AND score > ?` on a covering index, cached 60 s per test. TestStats histograms give percentile in O(1) for very large tests.
- Rough capacity: 10k concurrent test-takers ≈ well under 100 req/s to the DB, which is comfortable for a single Postgres instance.

## 21. Security and anti-cheating
This is low-stakes practice, so keep measures proportionate.
- **Never send correct answers or explanations to the client before submit.** The paper payload strips `isCorrect`.
- Server-authoritative deadlines, one first-attempt per user per test for ranking, and rank from the first attempt only.
- Rate limiting on OTP, login, attempt start, and the webhook (Upstash). Enforce DLT/OTP throttling per phone and IP.
- **Anti-scraping:** paid paper payloads served only to entitled users, per-user invisible watermark (user id in a CSS or zero-width marker) to trace leaked screenshots and PDFs, disabled text selection in the engine (a deterrent only), and throttled paper fetches per user per day.
- Flag suspicious attempts (implausibly fast high scores, many accounts from one device) to exclude from leaderboards. No proctoring.
- Standard hygiene: Zod validation, Prisma (no raw SQL injection), CSRF-safe server actions, webhook signature verification, secrets in env, admin behind role check + 2FA (TOTP for admin accounts), audit log, daily DB backups with point-in-time recovery.

## 22. Analytics and key metrics
- **North star:** tests completed per week.
- **Funnel:** visit → signup → first test started → first test completed (activation) → second test within 7 days → purchase.
- **Key numbers:** activation rate, test completion rate, D7/D30 retention, free→paid conversion (target 3–6%), ARPPU, revenue per exam, CAC by channel (coupon attribution), refund rate, **question report rate per 1,000 attempts** (quality KPI), and p95 page/engine load time.
- Tooling: PostHog events (`test_started`, `test_submitted`, `paywall_viewed`, `checkout_started`, `purchase_completed`) and an admin dashboard with DB counters.

## 23. Roadmap
| Phase | Weeks | Scope |
|---|---|---|
| **0. Groundwork** (parallel with dev) | 1–2 | Verify exam catalogue from official sources, recruit 2–3 content freelancers, Razorpay KYC, MSG91 DLT, domain, brand, Telegram channel |
| **1. Foundation** | 1–3 | Repo scaffold, Prisma schema, auth (Google + OTP), roles, catalogue models, admin shell, CSV question import, question editor |
| **2. Test engine** | 3–6 | Test builder, paper API, engine UI, autosave/resume, submit + grading, results + solutions, rank |
| **3. Commerce + public site** | 6–8 | Products, Razorpay + webhook + entitlements, paywall, exam hub/series/PYQ pages, SEO basics, sitemap, dashboard |
| **4. Private beta** | 8–10 | Load real content, 100–300 beta students via Telegram, fix quality issues, performance on low-end devices, load test (k6) the attempt APIs |
| **5. Public launch** | ~10–11 | Daily quiz, coupons/affiliates, updates posts, analytics |
| **6. v2** | 3–6 months | Live all-HP mocks, weak-topic practice, web push, TWA Play Store app, current-affairs module, referral, regrade automation polish |

## 24. Complexity estimate (solo developer)
| Module | Complexity | Rough effort |
|---|---|---|
| Auth (Google + OTP + roles) | Low–Med | 3–4 days |
| Catalogue + taxonomy | Low | 2–3 days |
| Question bank + bulk import + bilingual editor | **High** | 7–10 days |
| Test builder + publishing/versioning | Medium | 4–6 days |
| **Test engine (client) + attempt API** | **High** | 8–12 days |
| Grading, results, rank, analytics | Medium | 4–6 days |
| Payments + entitlements + reconciliation | Medium | 4–5 days |
| Public SEO pages + i18n (hi/en) | Medium | 5–7 days |
| Dashboard | Low–Med | 3 days |
| Admin ops (reports, users, coupons, sales) | Medium | 4–5 days |
| Infra, monitoring, backups, load test | Low–Med | 3 days |

## 25. What NOT to build initially
Microservices, a separate backend (NestJS/Express), a native app, video/courses, a live-class system, a doubt forum, adaptive AI engines, gamification, a multi-tenant or coaching white-label version, webcam proctoring, a complex CMS, GraphQL, Kubernetes, custom analytics pipelines, subscription auto-debit, and content for every exam at once (depth beats breadth).

## 26. Differentiators
1. **HP-only depth:** exact current HPRCA/HPPSC patterns, and HP GK beyond what national apps offer.
2. **True bilingual** questions (not machine-mangled Hindi).
3. **Real "HP rank"**, plus district-wise ranks later (district is captured at signup).
4. **Price:** the All-Access Pass costs less than a single guide book.
5. **Lightweight:** works on cheap phones and poor connectivity, with no app install required.
6. **Error-fix promise:** reported mistakes are fixed within 48 h, with public regrade. This builds trust.
7. **Exam-event responsiveness:** answer keys and fresh PYQs within days of each exam.

## 27. Risks and failure points
- **Content quality and volume** (biggest risk): wrong answers destroy trust. Mitigate with the review workflow, the report button, and regrades.
- **Recruitment uncertainty:** HP exams get delayed or cancelled (the HPSSC dissolution precedent), making demand lumpy and seasonal. Mitigate with the All-Access Pass, evergreen HP GK, and multi-exam coverage.
- **Low willingness to pay** plus free Telegram PDFs. Mitigate with experience-based value (rank, analysis, simulation) and very low prices.
- **Competitors** can cut prices or add HP content. Mitigate with speed, community, and local credibility.
- **Founder bandwidth:** building and producing content at once. Mitigate by paying freelancers for content early and keeping scope tight.
- **Operational:** OTP/DLT delays, Razorpay KYC delays, GST compliance, and piracy of paid tests.
- **Distribution:** SEO takes 3–6 months, so Telegram/YouTube must carry the launch.

## 28. Long-term expansion
Other hill/small states with the same model and codebase (Uttarakhand, J&K, Punjab) via an `examBody.state` dimension; central exams popular in HP (SSC, Army/Agniveer, Banking); HP current affairs monthly and notes (digital); live mocks with prizes; a Play Store app via TWA; B2B white-label tests for small HP coaching institutes; AI-generated personalised practice from weak topics; and an interview guidance or mentorship marketplace for HPAS.

---

## Implementation start (after approval)
1. `npx create-next-app` (TS, Tailwind, App Router, `src/`), add Prisma, shadcn/ui, Zod, Better Auth, Zustand.
2. Save this blueprint as `docs/BLUEPRINT.md`. Write `prisma/schema.prisma` from §13 and seed script with the verified exam bodies, exams, and subjects/topics.
3. Build in roadmap order: auth → admin question import → test builder → engine → results → payments → public SEO pages.

## Verification
- **Unit:** grading (negative marking, sections, skipped), `canAccessTest`, coupon math, webhook idempotency (Vitest).
- **E2E:** Playwright on a mobile viewport covering signup → free test → submit → result → buy (Razorpay test mode) → paid test unlocked, plus resume after reload/offline.
- **Load:** k6 script simulating 5k concurrent attempts (start, autosave every 30 s, submit), checking DB CPU and p95 latency.
- **Performance:** Lighthouse mobile on exam hub and engine pages (LCP < 2.5 s), and a test on a real low-end Android.
- **SEO:** Search Console URL inspection, rich-results test, and sitemap validation.

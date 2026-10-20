# Multi-site plan: one app, one state per domain

Status (2026-10-20): Phases 1–5 built in code, pb in soft launch (`launched: false`). D1–D6 follow the recommended
defaults below. Not deployed yet; pbtestseries.in is not bought yet. See "What is built" at the end.

## Goal

Run hptestseries.in, pbtestseries.in, hrtestseries.in, and later up to ~10 state sites from **one codebase, one deploy and one database**.

- Adding a state should mean adding one config file, seeding its content and doing the domain setup. No code fork and no copy-pasted pages.
- Each domain has its own name, colours, logo, copy, social links and sitemap.
- A domain shows its own state's exams plus the **national exams** (Delhi Police, NDA, CDS, AFCAT, SSC, ...). National tests exist once in the database and appear on every site.
- The question bank is already global: `Subject`/`Topic` is one taxonomy, and English, Hindi, Reasoning, Quant, General Studies and Computer questions are reused by any test on any site. Only state GK (and a regional language paper, where the state's exams have one) needs new questions per state.

## Decisions (recommended defaults, confirm before Phase 3)

| # | Question | Recommendation | Why |
|---|---|---|---|
| D1 | One account across all sites? | **Yes.** Same `User` row, so a phone or email used on hp also works on pb. | Purchases, wallet and referral code follow the student. Login cookies stay per domain, so they sign in once per site. |
| D2 | Where do national-exam pages rank? | **They are shown on every site, with the canonical URL on one primary domain** (hptestseries.in for now). | Ten identical copies of the Delhi Police page compete with each other. Google keeps one and drops the rest. A cross-domain canonical tells Google which one to keep, and the copies still sell on every site. |
| D3 | All-Access Pass | **One Pass per site** (HP Pass = HP + national exams). | Today a PASS "covers every series", which would hand Punjab content to an HP Pass buyer at HP prices. |
| D4 | Admin panel | **Only on the primary domain.** `/admin` on other domains redirects there. Admin sees every site, with a site filter. | One staff login, smaller attack surface. |
| D5 | Blog posts | **Each post belongs to one site.** National news goes on the primary site. | Same duplicate-content reason as D2. |
| D6 | Prices | Set per product, as now. Nothing changes. | Products are per series, and a series belongs to one exam. |

## How it works

### Request flow

```
pbtestseries.in/exams
  → nginx (server_name pbtestseries.in) → app on 127.0.0.1:3030
  → src/proxy.ts: host "pbtestseries.in" → site "pb" → internal rewrite to /pb/exams
  → src/app/[site]/exams/page.tsx renders with params.site = "pb"
```

The visitor never sees `/pb` in the URL. All public routes move under `src/app/[site]/`, and `generateStaticParams` returns every launched site. **ISR keeps working per site**, which is why we rewrite instead of reading the `Host` header inside pages: `headers()` would make every public page dynamic, so every hit would query the DB on a VPS that is shared with other apps.

What the proxy does, in order:

1. Map the host to a site code (`www.` is stripped; unknown hosts get the primary site).
2. `/admin` on a non-primary host → redirect to the primary domain (D4).
3. The existing logged-out check for `/dashboard` and `/admin`.
4. Rewrite to `/{site}{path}`.

The matcher excludes `/api/*` (auth, Razorpay webhook, cron), `/_next/*`, `/uploads/*` (images are shared) and static files. Server Actions POST to the page path, so the rewrite covers them too.

Local dev: Chrome resolves `*.localhost` to 127.0.0.1, so `hp.localhost:3000` and `pb.localhost:3000` each map to their site. Plain `localhost` maps to hp.

### Site registry: the one place a state is defined

```
src/sites/
  types.ts     SiteConfig type
  hp.ts        today's site.ts + per-site parts of business.ts
  pb.ts
  index.ts     SITES list, getSite(code), siteFromHost(host), PRIMARY_SITE
```

```ts
export type SiteConfig = {
  code: "hp" | "pb" | "hr";            // URL segment + value stored in the DB
  launched: boolean;                   // false = noindex, out of sitemap, hidden from other sites' links
  domains: string[];                   // ["hptestseries.in", "www.hptestseries.in"]; first = canonical
  name: string;                        // "PB Test Series"
  stateName: string; stateNameHi: string;  // "Punjab" / "पंजाब"
  aspirants: string;                   // "Punjab aspirants" (result page, rank copy)
  tagline: string; taglineHi: string;
  description: string;
  keywords: string[];
  title: string;                       // home <title> default
  theme: Partial<ThemeTokens>;         // only the tokens that differ from globals.css
  logo: { initials: string; markColor: string; accentColor: string };
  languages: Lang[];                   // CBT language switch, e.g. ["en", "hi"] or ["en", "pa"]
  freeMockSlug: string;
  statePage: { slug: string; title: string }; // /himachal on hp, /punjab on pb
  districts: { slug: string; name: string }[];
  social: { whatsapp?: string; telegram?: string; youtube?: string; instagram?: string };
  contact: { email: string; phones: string[] };
  emailFrom: string;                   // "PB Test Series <noreply@pbtestseries.in>"
  gaId?: string;
  gscVerification?: string;
};
```

The legal entity (name, grievance officer, jurisdiction) stays shared in `business.ts`: it is the same proprietor behind every domain, and the legal pages show it on each site.

### What is shared and what is per site

| Thing | Shared | Per site | How |
|---|---|---|---|
| Questions, subjects, topics | ✅ | | Already global. Add `punjab-gk`, `punjabi`, `haryana-gk`, ... subjects as states arrive. |
| Exam bodies | | ✅ | `ExamBody.sites String[]`: `["hp"]`, `["pb"]`, or `["*"]` for national. PGIMER can be `["hp","pb","hr"]`. |
| Exams, tests, series | follows body | | Visible on a site when the body is. One `Test` row serves every site that shows it. |
| Products | | ✅ | Visible when all their series are. PASS gets an explicit `Product.site` (D3). |
| Orders | | ✅ | `Order.site` records which domain sold it (reports, receipts, emails). |
| Users, wallet, referral | ✅ | | `User.signupSite` for emails and analytics only (D1). |
| Coupons | ✅ | optional | `Coupon.site String?`: null = valid everywhere. |
| Blog posts | | ✅ | `Post.site` (D5). |
| Leaderboards | per test | | National tests rank everyone across all sites, which is correct. |
| Emails | | ✅ | Branding, links and the from-address come from the user's `signupSite` or the order's `site`. |

Every public query goes through one visibility helper (extending `src/modules/catalog/visibility.ts`), for example `bodyOnSite(site)` → `{ OR: [{ sites: { has: site } }, { sites: { has: "*" } }] }`. Then `pbtestseries.in/tests/<an HP test slug>` returns 404 instead of leaking HP content.

### Theme

`globals.css` keeps today's HP tokens as the defaults. `src/app/[site]/layout.tsx` puts each site's overrides on `<html style="--primary: …; --accent: …">`. A new state therefore needs no CSS edit, only colours in its config. `contrast.test.ts` is extended to check every site's colours against the WCAG AA rule it already enforces, so a badly chosen colour fails `npm test`.

Per-site brand assets: `brand-mark.ts` (it draws a mountain inside the HP bubble; each site gets its own colours, and initials or a simpler mark), `icon.svg`, `apple-icon`, `opengraph-image`, `manifest`, `icons/[size]`. Each of these moves under `[site]`.

## Phases

Each phase ships on its own, and **hptestseries.in must look and behave exactly the same after Phases 1–4**.

### Phase 1: Site registry (size S, no visible change)

- Create `src/sites/` with `hp.ts` holding everything now in `src/lib/site.ts`, plus the HP-specific parts of `business.ts`, `WHATSAPP_GROUP_URL` and `districts.ts`.
- Keep `src/lib/site.ts` as a thin re-export of the hp config so the ~50 importers still compile. It gets deleted in Phase 2.
- Unit tests for `siteFromHost` (www, port, unknown host, `pb.localhost`).

Done when typecheck and tests pass and nothing renders differently.

### Phase 2: Routing (size L, the big refactor)

- Move every page route into `src/app/[site]/` (including dashboard, tests, buy, admin). `api/` and `uploads/` stay at the root.
- `src/app/[site]/layout.tsx` becomes the root layout: `<html>`, fonts, theme vars, metadata built from the site, and `generateStaticParams` over launched sites.
- Rewrite `src/proxy.ts` as described above, merging in the current auth check.
- Replace every `site.*` import with the request's site: from `params` in server components, and a small `SiteProvider` context for client components (`result-view`, `public-bottom-nav`, ...).
- `sitemap.ts`, `robots.ts`, `llms.txt`, `llms-full.txt`, `blog/feed.xml` move under `[site]` and read the site.
- Scope the HP-only redirects in `next.config.ts` with `has: [{ type: "host", value: "hptestseries.in" }]`.
- The `/himachal` page becomes a component that `[site]/[body]` renders when `body === site.statePage.slug`, so pb gets `/punjab` without a new folder.

Done when the HTML of the home page, an exam page, a test page, `/pricing`, `/sitemap.xml` and `/robots.txt` on hp is the same before and after (diff saved pages, ignoring build hashes), and `pb.localhost:3000` renders with the pb config.

⚠ This moves almost every file in `src/app`. Do it when no other session or person is editing the app (see the shared-working-tree rule), on its own branch, and merge quickly.

### Phase 3: Data scoping (size M)

- Migration: `ExamBody.state String` → `sites String[]`, backfilled from `state`. Set `upsc`, `iaf` and `delhi-police` to `["*"]`, and decide PGIMER.
- Add `Post.site`, `Order.site`, `User.signupSite`, `Product.site String?` and `Coupon.site String?`, backfilling existing rows with `"hp"`.
- Every catalog query in `src/modules/catalog/queries.ts` (plus pricing, buy, sitemap, blog and the dashboard suggestions) takes `site`.
- `access.ts`: a PASS covers only series visible on its site (D3).
- Canonical URLs: pages for `"*"` bodies, and their tests, point their canonical to `PRIMARY_SITE`'s domain (D2).
- Admin: site filter on orders, reports, exams, blog and emails. Exam and post forms get a site field.
- Seeds: `BodySeed` gets `sites`, and `prisma/catalogue.ts` sets it.

Done when a test of an HP-only exam returns 404 on pb, a Delhi Police test opens on both with the canonical on hp, and an HP Pass does not unlock a PB series.

### Phase 4: Brand, theme and copy per site (size M)

- Theme overrides plus the multi-site `contrast.test.ts`.
- Logo, icons, OG image and manifest built from the site config.
- Remove "Himachal" from shared code. About 55 files mention it. The largest are `app/page.tsx`, `[body]/[exam]/page.tsx`, `exam-landing.tsx`, `result-view.tsx`, `tests/page.tsx`, `exams/page.tsx`, `post-input.ts`, `email/layout.ts`, `lib/schema.ts` (JSON-LD Organization) and `upcoming-exams.ts`. Copy that is truly about one body (`body-info.ts`) stays as it is.
- Analytics: one GA4 property, a separate data stream per domain (`gaId` in config).
- Emails: brand, links and from-address chosen per user or order.

Done when pb renders with its own colours, name and logo, with no "Himachal" text outside HP bodies' own content.

### Phase 5: Infra per domain (size S per domain, mostly the owner's to do)

App side (code):
- better-auth: replace `BETTER_AUTH_URL` with `baseURL: { allowedHosts: <all site domains>, protocol: "https" }`, which better-auth 1.7 supports.
- `deploy/nginx.conf`: one server block per domain, or one block with every `server_name`. Generate it from the site list so a new state isn't hand-copied.
- `deploy.sh`: drop `NEXT_PUBLIC_SITE_URL`/`BETTER_AUTH_URL` (domains come from the registry), keep `EMAIL_FROM` only as a fallback.
- Razorpay Checkout `name`, `theme.color` and order `notes.site` taken from the site.

Owner side (accounts and DNS), one row per domain in the checklist below.

### Phase 6: Punjab content and launch (size L, content-heavy)

- Catalogue: PSSSB, PPSC, Punjab Police, PSTET bodies with `sites: ["pb"]`.
- Subjects: `punjab-gk`, `punjab-current-affairs`, `punjabi`.
- Punjabi language: add `pa` to the `Lang` enum, a Noto Sans Gurmukhi font (loaded only on pb), and a CBT language switch driven by `site.languages`. PSSSB papers include a qualifying Punjabi paper, so this is needed before those mocks.
- Content before launch: 3–5 mocks plus a landing page for 2 high-search exams (for example Punjab Police Constable and PSSSB Clerk), a free mock, and a `/punjab` state page. Punjab GK facts need a human check, as with HP.
- Soft launch: deploy with `launched: false` (live but noindex, out of the sitemap), test payment end to end, then flip to `true`, submit the sitemap in GSC and start posting on pb socials.

Haryana and later states repeat Phase 6 only, after reading pb's GSC numbers.

## Checklist: adding state N (after Phases 1–5)

1. Buy the domain; DNS A record → VPS IP (both apex and `www`).
2. `src/sites/<code>.ts`: name, copy, colours, districts, socials, contact, `launched: false`. Add it to `SITES`.
3. Run the contrast test (`npm test`) to check the colours.
4. nginx block plus `certbot --nginx -d <domain> -d www.<domain>` on the VPS, then `deploy.sh`.
5. Razorpay: add the website under Account & Settings and wait for approval before taking payments.
6. Resend: add and verify the domain (DNS records) for the from-address.
7. Google OAuth client: add `https://<domain>/api/auth/callback/google` as a redirect URI.
8. GA4: add a data stream and put its id in the config. GSC: add a Domain property.
9. SMS (DLT): check that the OTP template text is brand-neutral, or register one for the new brand.
10. Seed bodies, exams, the state GK subject and the mocks; check facts.
11. Flip `launched: true`, deploy, submit the sitemap.

## SEO

To Google, every domain is a separate website. hptestseries.in's rankings, history and backlinks do not pass to pbtestseries.in. The setup also falls close to two of Google's spam policies, so these rules are part of the plan, not extras.

### The two policies to stay clear of

- **Doorway abuse.** Google's own example is "multiple domain names … targeted at specific regions or cities that funnel users to one page". Ten sites on the same template with the same national tests and thin state pages is exactly that pattern. The defence is that each site must be **genuinely about its state**: its own exams, state GK, PYQs, syllabus and notifications. The shared national tests are a small extra, not the bulk of the site.
- **Scaled content abuse.** Mass-produced pages written mainly to rank. Generating 10 states of AI-written content quickly is the risk. Grow state by state, have a human check facts (already the rule for HP GK), and don't publish exam pages with only a name and an empty list.

### Rules

1. **HP must not lose a single URL.** Phase 2 changes internal folders only. Public URLs, canonicals, sitemap, robots and JSON-LD on hp stay byte-identical (the Phase 2 diff checks this). After deploy, watch GSC for 404s and coverage drops for two weeks.
2. **Never move the canonical of a page that already gets traffic.** PGIMER and High Court bring most of today's clicks. If PGIMER is shown on pb and hr, the canonical stays on hp.
3. **One canonical home for shared content.** National-exam pages, their tests and national blog posts canonical to the primary domain (D2, D5). Every other page has a self-referencing canonical on its own domain. Never two indexable copies.
4. **No hreflang between state sites.** hreflang is for the same page in another language, and these are different sites with different content.
5. **No sitewide footer links to all sister sites.** Ten domains linking to each other from every page looks like a link network. Use one "Other states" page per site, plus contextual links where they help a reader (an hp PGIMER post mentioning pb's Punjab exams is fine).
6. **Separate identity per site.** Each site gets its own Organization and WebSite JSON-LD, its own `sameAs` socials (pb must not list HP's YouTube/Telegram), OG image, sitemap, robots.txt, RSS, llms.txt and GSC Domain property. Same legal entity in the footer is fine and honest.
7. **Soft launch = noindex.** `launched: false` serves `noindex`, keeps the site out of its sitemap and hides links to it from other sites. Flip it only when the launch content exists (Phase 6).
8. **Unknown hosts get nothing.** The nginx `default_server` already returns 444 / rejects the TLS handshake, so a stray domain or the bare IP can't serve a duplicate copy. Keep it that way when adding blocks.

### What makes pb rank

- **Depth on a few exams first:** the exam hub + `/syllabus` + `/exam-pattern` + `/previous-year-papers` + `/tests` sub-pages already exist and switch on per exam when the content is there. Fill them fully for 2 exams before adding the next.
- **A real `/punjab` state GK page** (the HP `/himachal` equivalent) and Punjab GK free mocks: low competition, high intent.
- **Notification and cut-off posts** on pb's own blog, the same playbook that made High Court work on hp.
- **Punjabi (Gurmukhi) pages** are worth testing once `pa` exists: big coaching sites mostly ignore them.
- **Its own backlinks and brand searches:** pb Telegram/YouTube/Instagram, a GSC property from day one, and branded queries ("pb test series") that only start once people know the name.

Expect pb to take weeks to months before meaningful traffic. hp's own curve is the reference.

## Risks

- **Duplicate content.** Handled by D2 and D5. Never publish the same article or landing copy on two domains without a canonical.
- **New domains start at zero.** pb has no backlinks or history. Expect weeks before traffic, and launch with real depth, not empty exam pages.
- **Razorpay review.** Several near-identical sites under one account can trigger questions. Add each website early, and make sure each has working legal pages (they come from the shared layout).
- **Shared VPS.** One Node process serves every domain, and ISR pages per site multiply the cache size. Watch memory after pb launches.
- **Big file move (Phase 2)** conflicts with any parallel edits. Schedule it.
- **Phone OTP via DLT.** A template that names "HP Test Series" will be wrong on other domains.

## Open questions for the owner

- Confirm D1–D6.
- PGIMER (Chandigarh) on hp, pb and hr?
- Do HP Police and Punjab Police share a WhatsApp/Telegram group, or does each site get its own?
- Which domain is primary long term? hptestseries.in has the authority today. A neutral national domain could take national exams later, but not now.

## What is built (2026-10-20)

| Piece | Where |
|---|---|
| Site registry (hp, pb), theme, logo, OG, socials, districts, copy fields | `src/sites/` |
| Host → `/{site}` rewrite, `/admin` only on the primary domain | `src/proxy.ts` |
| All pages under `app/[site]/`; `currentSite()` (root params) in Server Components, `useSite()` in Client Components, `requestSite()` in Server Actions | `src/sites/current.ts`, `src/sites/provider.tsx` |
| robots.txt, sitemap.xml, manifest, icon.svg, apple-icon as per-site route handlers | `app/[site]/*/route.ts` |
| `ExamBody.sites`, `Test.site`, `Product.site`, `Post.site`, `Order.site`, `User.signupSite` | migration `20261020100000_multi_site` |
| Every public query takes the site; HP-only tests/exams 404 on pb; national (UPSC, IAF, Delhi Police) and PGIMER show on both | `catalog/visibility.ts`, `catalog/queries.ts` |
| Canonical of shared bodies stays on hp; pb's sitemap leaves them out | `canonicalFor`, sitemap route |
| PASS covers only its own site (+ national) | `commerce/access.ts`, `ownership.ts` |
| Emails branded by the user's `signupSite` / the order's `site`; from `EMAIL_FROM_PB` when set | `email/layout.ts`, `identity/email.ts` |
| better-auth on every domain (`baseURL.allowedHosts`) | `identity/auth.ts` |
| Contrast test runs for every site's colours | `app/contrast.test.ts` |
| `/punjab` state page, Punjab GK free mock (16 Punjab GK + shared reasoning/computer) | `app/[site]/punjab`, `prisma/punjab/free-mock.ts` |
| nginx block for pbtestseries.in | `deploy/nginx-pbtestseries.conf` |

Still open: Punjab exams (PSSSB, Punjab Police, PPSC, PSTET) with real patterns and mocks; a pb WhatsApp/Telegram;
admin site filters; the owner checklist below (domain, DNS, certbot, Razorpay website, Resend domain, Google OAuth
redirect URI, GSC, GA stream). Flip `launched: true` in `src/sites/pb.ts` only after that.

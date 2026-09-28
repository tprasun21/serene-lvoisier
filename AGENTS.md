# AGENTS.md — Serene Lavoisier

**Version:** 1.1.0 · **Date:** 2026-09-28 · **Status:** Required implementation guide for coding agents and developers.

This root file is the project contract. Folder-level `AGENTS.md` files add detailed rules for their own folders (see [§6](#6-nested-agentsmd-index)). When a nested file and this file disagree, this file wins. Follow both unless the project owner explicitly decides otherwise.

**Changelog**
- **1.1.0 (2026-09-28):** Rewritten from the `AGENTS_check.md` draft. Split into nested files. Aligned with the actual codebase (root folders, Tailwind v4, Poppins + Newsreader). Design tokens corrected to match the design reference. Duplicate schemas, SSRF rules, fallback chains and scheduling sections merged. Super-admin role, safe-fetch module and complete AI tables added.
- **1.0.0:** Original draft.

---

## Read this first — hard rules

1. **Never read, create, edit, or print any `.env*` file** (including `.env.example` and `.env.local`). The project owner maintains them. See [§1](#1-permissions).
2. **Never `git commit` or `git push` without explicit confirmation.**
3. **Server secrets stay on the server.** The user's OpenRouter key is never sent to the browser, stored in browser storage, logged, or sent to analytics.
4. **Free models only.** A paid model must never be reachable, including through fallback. Every AI call goes through `assertFreeModelEligible()`.
5. **Never hard-code the OpenRouter model list,** and never assume a model is still free or still online.
6. **AI is optional.** Reading, navigation, search, bookmarks and auth must work when AI is down. An AI failure never breaks an article page.
7. **AI output is always labeled as AI-generated** and is visually separate from the reporting.
8. **Never trust client-sent identity** (`userId`), pricing, or capability data. Identity comes from the Better Auth session.
9. **Every outbound fetch of a user- or admin-supplied URL goes through `lib/sources/safe-fetch`** (SSRF protection).
10. **Respect publisher rights.** The default ingestion mode is metadata, attribution and a link. Never bypass paywalls, CAPTCHAs, anti-bot measures or robots rules.
11. **Use design tokens only.** No hard-coded hex values, no arbitrary spacing values, no new colors.
12. **Accessibility target: WCAG 2.2 AA.** Use semantic HTML first, keep focus visible, and respect `prefers-reduced-motion`.
13. **Server Components by default.** Use `"use client"` only for interactivity, animation, or browser APIs.
14. **Don't add a dependency without checking it** against the rules in [§4.3](#43-adding-dependencies).

---

## Contents

1. [Permissions](#1-permissions)
2. [Mission and product contract](#2-mission-and-product-contract)
3. [Product scope](#3-product-scope)
4. [Tech stack](#4-tech-stack)
5. [Non-negotiable engineering principles](#5-non-negotiable-engineering-principles)
6. [Nested AGENTS.md index](#6-nested-agentsmd-index)
7. [Repository layout](#7-repository-layout)
8. [Architecture conventions](#8-architecture-conventions)
9. [Background jobs and scheduling](#9-background-jobs-and-scheduling)
10. [Environment variables](#10-environment-variables)
11. [Deployment and free-plan behavior](#11-deployment-and-free-plan-behavior)
12. [Agent workflow](#12-agent-workflow)
13. [Implementation order](#13-implementation-order)
14. [Release security checklist](#14-release-security-checklist)
15. [Important implementation notes](#15-important-implementation-notes)
16. [References](#16-references)

---

## 1. Permissions

These permissions apply to every agent operation in this workspace. They are also enforced by `.agents/rules/permissions.md` and `.agents/scripts/permission-gate.js`.

### 1.1 Always allowed (`allow`)

These build, run and lint commands are pre-approved and can run without asking:

- `npm run dev`
- `npm run build`
- `npm start` / `npm run start`
- `npm run lint` / `npm lint`

### 1.2 Requires explicit confirmation (`ask`)

Never run these version-control commands on your own. Always ask the user first:

- `git commit`
- `git push`

### 1.3 Strictly forbidden (`deny`)

Never read, inspect, create or modify any environment variable file:

- Reading any `.env` file (e.g. `.env`, `.env.local`, `.env.production`, `.env.example`) is **denied**.
- Editing or creating any `.env` file is **denied**.
- Shell commands that display or change `.env` files are **denied**.

If a task needs a new environment variable, add it to [§10](#10-environment-variables) and ask the project owner to add it to their env files.

---

## 2. Mission and product contract

Build **Serene Lavoisier**: a clean, editorial-first news portal with a calm, premium visual system, plus an AI summarization layer that uses **only free OpenRouter models**, called with the user's own key (BYOK).

Tagline: **Real News. Deeper Perspectives.**

The product should feel:

- credible and editorial, not noisy;
- bright, white, spacious and very readable;
- accented with orange, without looking warm or saturated overall;
- fast on mobile and desktop;
- accessible and keyboard-friendly;
- resilient when an AI model disappears, changes price, is rate-limited or fails.

> **Product contract:** Serene Lavoisier is a calm, editorial news experience with a dynamic, free-only, user-provided OpenRouter AI layer that fails over transparently and never compromises security, accessibility, or reading quality.

---

## 3. Product scope

### 3.1 Core areas

1. Public news homepage
2. Article detail and reading experience
3. Category and topic pages
4. Search
5. Sign up / sign in
6. User profile and settings
7. Saved articles (bookmarks)
8. **For You** feed built from user-chosen sources
9. News source ingestion (super-admin global sources plus user sources)
10. AI summaries
11. OpenRouter BYOK key setup
12. Free-model catalog, model testing, model preferences
13. Automatic AI model failover
14. Responsive mobile experience (a first-class layout, not a collapsed desktop page)
15. Empty, loading, error and offline states
16. Footer and editorial/legal pages

### 3.2 AI scope (BYOK)

After signing in, a user who wants AI features is asked, in a modal they can dismiss, for their **OpenRouter API key**. The UI calls it "OpenRouter API Key". The key is:

- tied to that user and never visible to other users;
- never in the client bundle, logs or analytics;
- never stored as plaintext (AES-256-GCM at rest).

There is **no shared/app-level OpenRouter inference key.**

---

## 4. Tech stack

### 4.1 Current baseline (installed)

| Area | Choice | Notes |
|------|--------|-------|
| Framework | **Next.js 16 App Router**, React 19, TypeScript | Turbopack is the default bundler; see `app/AGENTS.md`. |
| Styling | **Tailwind CSS v4** + `class-variance-authority` + `clsx` + `tailwind-merge` | Tokens live in `app/globals.css` (`@theme`). There are no styled-components. |
| Fonts | **Poppins** (UI) + **Newsreader** (editorial) through `next/font/google` | See `components/ui/AGENTS.md`. |
| Icons | **Lucide** (`lucide-react`) | Default icon set. |

### 4.2 Planned (install when the feature that needs it is built)

| Area | Choice |
|------|--------|
| Auth | **Better Auth** (email/password, sessions, admin plugin for roles) |
| Database | **Neon Postgres** (platform) + **Drizzle ORM** (access layer and migrations) |
| Hosting | **Vercel** |
| Validation | **Zod** |
| Motion | **Framer Motion** (ordinary UI transitions), **GSAP** (timeline sequences only) |
| Article extraction | `@mozilla/readability`, an HTML parser (e.g. `cheerio`), an RSS/Atom parser, a `robots.txt` parser |
| Sanitization | `isomorphic-dompurify` |
| Utilities | `date-fns`, `sonner` (toasts), `react-hook-form` (complex forms), `focus-trap-react` (if needed) |
| Brand/social icons | Font Awesome Free |
| Streams | **RxJS**, only where stream semantics clearly help |
| Legacy | **jQuery** and **core-js**, only for the narrow cases below |

**Install on first use.** Don't add a planned package until the feature that needs it is being built.

"Neon" means the Neon Postgres platform. Drizzle is the ORM. Use `drizzle-orm/neon-http` for normal serverless queries, and a WebSocket connection only where interactive transactions need one.

### 4.3 Adding dependencies

Before adding any package, check that:

1. its license is compatible;
2. it is maintained;
3. it clearly reduces complexity;
4. there is no simple platform-native alternative (prefer native Web APIs).

`lodash-es` is allowed only when a native helper would be clearly worse. Keep a `THIRD_PARTY.md` with notable licenses once the dependency count grows.

### 4.4 Restricted libraries

- **jQuery** is only for an unavoidable legacy integration, a third-party widget that requires it, or isolated DOM integration code. Never use it for state, forms, rendering, routing, simple events or animations. **Never let jQuery touch a DOM subtree that React controls.**
- **RxJS** is for catalog-refresh orchestration, debounced search, request cancellation, connectivity streams and AI request state streams. Don't wrap simple React state in RxJS.
- **core-js** is only for polyfills required by the browser support matrix. Import polyfills explicitly, never globally "just in case".
- **Framer Motion vs GSAP:** one animation belongs to one library. Never animate the same element with both.
- **Redux:** don't introduce it unless complexity clearly requires it.

---

## 5. Non-negotiable engineering principles

1. Server secrets stay on the server.
2. Never trust client-provided model pricing or capability data.
3. Never hard-code the OpenRouter free-model list.
4. Never assume a model stays free.
5. Never assume a model stays online.
6. Never make an AI request depend on a single model.
7. Never block article rendering on the AI layer.
8. Don't run jQuery in normal React component code.
9. Don't use both GSAP and Framer Motion for the same animation.
10. Respect reduced-motion preferences.
11. Design mobile-first.
12. Use semantic HTML before adding ARIA.
13. Keep news content and AI output visibly distinct.
14. AI-generated summaries must never pass as original reporting.
15. No secret values in logs, telemetry, error messages, screenshots or analytics.
16. Use optimistic UI only where the final state can be safely reconciled.
17. Prefer progressive enhancement over client-only rendering.
18. A failed AI request degrades gracefully and never breaks the article page.

---

## 6. Nested AGENTS.md index

Before working in a folder, read the `AGENTS.md` file for that folder (and any parent folders).

| File | Read when you work on… |
|------|------------------------|
| [`app/AGENTS.md`](app/AGENTS.md) | pages, routes, metadata/SEO, caching, performance, i18n, Turbopack config |
| [`app/api/AGENTS.md`](app/api/AGENTS.md) | route handlers, endpoint list, auth checks, cron routes, rate limits, observability |
| [`actions/AGENTS.md`](actions/AGENTS.md) | Server Actions (UI mutations) |
| [`components/ui/AGENTS.md`](components/ui/AGENTS.md) | design tokens, primitives, forms, icons, motion, accessibility, states, toasts, design QA |
| [`components/layout/AGENTS.md`](components/layout/AGENTS.md) | logo, header/navigation, footer, landing page composition, responsive layout |
| [`components/news/AGENTS.md`](components/news/AGENTS.md) | news cards, the article reading experience, attribution, images, source-management UI |
| [`components/ai/AGENTS.md`](components/ai/AGENTS.md) | the key modal, AI settings page, model catalog UI, summary UI, AI UX copy |
| [`lib/ai/AGENTS.md`](lib/ai/AGENTS.md) | the OpenRouter client, model catalog, free-only guardrail, testing, routing/fallback, prompts, health |
| [`lib/sources/AGENTS.md`](lib/sources/AGENTS.md) | ingestion: discovery, safe fetch, extraction, adapters, dedupe, rights, Reddit, For You ranking |
| [`lib/auth/AGENTS.md`](lib/auth/AGENTS.md) | Better Auth, sessions, roles/super-admin, OpenRouter key encryption |
| [`lib/db/AGENTS.md`](lib/db/AGENTS.md) | Neon + Drizzle, the full schema, migrations |
| [`tests/AGENTS.md`](tests/AGENTS.md) | unit, integration and E2E tests, AI fixtures |

`ARCHITECTURE.md` describes the general CRUD data flow (validation → Server Action → UI feedback). It must stay consistent with this file.

---

## 7. Repository layout

The project uses **root-level folders** (no `src/`). This is the target layout; create folders as features need them.

```text
/
├─ AGENTS.md                  ← this file
├─ ARCHITECTURE.md            ← CRUD data-flow guide
├─ README.md
├─ THIRD_PARTY.md             ← once dependencies grow
├─ next.config.ts
├─ drizzle.config.ts
├─ vercel.json                ← cron schedules
├─ designs/                   ← design reference images (source of truth for visuals)
├─ public/                    ← icons/, images/, logo SVGs
├─ app/                       ← routes (see app/AGENTS.md)
│  └─ api/                    ← route handlers (see app/api/AGENTS.md)
├─ actions/                   ← Server Actions
├─ components/
│  ├─ ui/                     ← primitives
│  ├─ layout/                 ← header, nav, footer, shells
│  ├─ news/                   ← news cards, article parts, source UI
│  ├─ ai/                     ← AI UI
│  ├─ auth/                   ← sign-in/up forms
│  └─ crud/                   ← generic data tables, pagination
├─ context/                   ← client UI context providers
├─ hooks/                     ← client hooks
├─ lib/
│  ├─ ai/                     ← OpenRouter server layer
│  ├─ sources/                ← ingestion + safe-fetch
│  ├─ auth/                   ← Better Auth config, session helpers, encryption
│  ├─ db/                     ← Drizzle client, schema, migrations
│  ├─ jobs/                   ← scheduler abstraction, job locks
│  ├─ articles/               ← article queries, sanitization, search
│  ├─ validations/            ← Zod schemas
│  └─ utils.ts                ← cn(), formatting helpers
├─ types/                     ← shared TypeScript types
├─ prompts/                   ← implementation plans (not runtime AI prompts)
└─ tests/                     ← unit/, integration/, e2e/, fixtures/
```

Runtime AI prompts live in `lib/ai/prompts.ts`, not in `prompts/`.

---

## 8. Architecture conventions

### 8.1 Server vs client

- Server Components are the default. Fetch server data in Server Components.
- Client Components are only for interactivity, animation, browser APIs and client subscriptions.
- Never call the database from presentational components. Data access goes through `lib/`.
- Never call OpenRouter from client code.

### 8.2 Server Actions vs route handlers

| Use | For |
|-----|-----|
| **Server Actions** (`actions/`) | UI-driven mutations: bookmarks, profile, preferences, adding/removing/muting user sources, saving model preferences |
| **Route handlers** (`app/api/`) | Better Auth, cron jobs, AI endpoints (summaries, model test/refresh, key verification), anything called from outside the app, streaming responses |

Implement each operation **once**, as either a Server Action or a route handler, never both. Both are thin adapters: validate input, check the session, then call business logic in `lib/`.

### 8.3 State

```text
Server state          → database / server fetches / route handlers
Session state         → Better Auth
Client UI state       → React state / context (context/)
Reactive streams      → RxJS, where justified
Persistent prefs      → database (never browser storage for anything important)
```

---

## 9. Background jobs and scheduling

The model-catalog refresh and source fetching share one **scheduler abstraction** in `lib/jobs/`, so the app isn't tied to a single scheduling provider.

- **Vercel Hobby (free):** cron jobs are limited, currently about once a day. *Check the current Vercel limits when implementing.* Use a daily sync, plus a refresh when data is stale on demand, plus a refresh after errors.
- **Paid Vercel plan:** hourly or per-minute schedules can be enabled.
- **External free scheduler:** allowed, if it calls the protected cron routes.
- Never promise minute-level freshness on the free tier.
- Never do hundreds of fetches inside one short HTTP request. Enqueue the work and process it in batches.
- Prevent duplicate work (the "thundering herd") with a short-lived lock (the `job_lock` table): the first caller refreshes, and concurrent callers get the stale-but-usable data.
- Cron routes verify `CRON_SECRET` (see `app/api/AGENTS.md`).

---

## 10. Environment variables

The project owner maintains `.env.example` and `.env.local`. **Agents never touch these files** ([§1.3](#13-strictly-forbidden-deny)). The app expects:

```env
DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
OPENROUTER_SITE_URL=
OPENROUTER_APP_NAME=
OPENROUTER_KEY_ENCRYPTION_SECRET=
CRON_SECRET=
```

- `OPENROUTER_KEY_ENCRYPTION_SECRET` is the master key that encrypts users' OpenRouter keys.
- There is no shared OpenRouter inference key (BYOK only).
- Never expose a secret through a `NEXT_PUBLIC_*` variable.
- Read env vars in one validated server-only module (e.g. `lib/env.ts` with Zod). Don't scatter `process.env` calls.

---

## 11. Deployment and free-plan behavior

```text
Vercel → Next.js app → Neon Postgres → OpenRouter
```

- Production env vars are configured in Vercel.
- Database migrations run safely (reviewed, never auto-generated in production).
- Cron routes are protected.
- Preview environments are isolated. Don't copy production secrets into public previews.

**Free-plan behavior:** the app stays useful without paying for AI. Users bring their own key. Only models currently priced at zero are eligible, and there's no paid fallback. If no eligible model works, say so honestly. Never imply that OpenRouter's free capacity is unlimited.

---

## 12. Agent workflow

1. **Inspect.** Read this file and the nested `AGENTS.md` files for the folders you'll touch, plus `README.md`, `ARCHITECTURE.md`, `package.json` and the existing code in the target folders. Follow existing conventions before creating new ones.
2. **Plan.** List the routes, shared components, schema changes, auth/security boundaries and tests affected. For multi-step features, write the plan in `prompts/` and get approval.
3. **Implement.** Prefer small composable components, typed functions, server-side orchestration, existing tokens and existing patterns.
4. **Verify.** Run the typecheck (`npx tsc --noEmit`), `npm run lint`, unit and integration tests, E2E tests where relevant, and `npm run build`.
5. **Review.** Check for: no secret leakage, no paid-model path, no accessibility regression, no design-token drift, no unnecessary dependency, no client-side use of the OpenRouter key.

Never report a test, lint result or performance score that wasn't actually run or measured.

---

## 13. Implementation order

1. App shell, theme and design tokens
2. Shared UI primitives
3. Neon + Drizzle schema and migrations
4. Better Auth (including the admin role)
5. Landing page and category pages
6. Article detail page
7. Search
8. Bookmarks and reading history
9. User settings and profile
10. Safe fetch and source registry
11. Super-admin source management (add/test/fetch)
12. Ingestion pipeline (discovery → extraction → dedupe → store)
13. For You feed and user sources
14. OpenRouter key flow
15. Live model catalog
16. Model testing
17. Summary endpoint
18. Fallback routing
19. Model health persistence
20. Refresh scheduling (catalog and sources)
21. Accessibility and performance pass
22. E2E hardening
23. Vercel production deployment

---

## 14. Release security checklist

```text
[ ] Better Auth sessions protected; passwords handled only by Better Auth
[ ] Super-admin checks enforced on the server
[ ] OpenRouter key encrypted at rest; never in browser storage or logs
[ ] No userId trusted from a request body or query
[ ] CSRF/session policy reviewed
[ ] Rate limiting enabled
[ ] Article HTML sanitized
[ ] All outbound fetches go through safe-fetch (URL + redirect validation, SSRF blocks)
[ ] robots/terms/source-permission checks implemented
[ ] Source attribution and canonical URLs preserved
[ ] Model pricing re-checked before generation; paid fallback impossible
[ ] Cron routes protected by CRON_SECRET
[ ] Security headers configured
```

---

## 15. Important implementation notes

- **"Free model" doesn't mean "open-source model."** Free is a pricing and availability state in OpenRouter's live catalog.
- **Don't trust model metadata permanently.** Pricing and availability change, so re-check at request time.
- **Don't rely on the model name.** Use the returned metadata for pricing, context, modalities and parameters.
- **Hide fallback complexity from users.** Users pick a preferred model; the app handles resilience.
- **AI is never required for reading news.**
- **A public URL isn't permission to copy.** Prefer official feeds, APIs and licenses, and fall back to metadata and a link.

---

## 16. References

Checked while preparing the original draft. Re-check them for current behavior when implementing.

- Better Auth: https://better-auth.com/docs/introduction · database: https://better-auth.com/docs/concepts/database · email/password: https://better-auth.com/docs/authentication/email-password · organization plugin: https://better-auth.com/docs/plugins/organization
- Drizzle + Neon: https://orm.drizzle.team/docs/connect-neon · getting started: https://orm.drizzle.team/docs/get-started/neon-new
- OpenRouter free models: https://openrouter.ai/collections/free-models/ · free router: https://openrouter.ai/openrouter/free · catalog: https://openrouter.ai/models · fallbacks: https://openrouter.ai/docs/guides/routing/model-fallbacks · API example: https://openrouter.ai/blog/tutorials/send-image-to-llm/
- Next.js Turbopack: https://nextjs.org/docs/app/api-reference/turbopack
- Vercel Cron: https://vercel.com/docs/cron-jobs · limits: https://vercel.com/docs/cron-jobs/usage-and-pricing
- Reddit API: https://developers.reddit.com/docs/capabilities/server/reddit-api · developer rules: https://developers.reddit.com/docs/devvit_rules · HTTP fetch: https://developers.reddit.com/docs/capabilities/server/http-fetch

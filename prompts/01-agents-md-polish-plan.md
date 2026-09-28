# Plan: Split AGENTS_check.md into root + nested AGENTS.md files

**Created:** 2026-09-28 · **Revised:** 2026-09-28 (rev 2, with your decisions)
**Source draft:** `AGENTS_check.md` (~3,230 lines, v1.0.0). To be deleted at the end (Phase 9).
**Target:** one full root `AGENTS.md` plus short nested `AGENTS.md` files in the folders they apply to.
**Status:** ✅ Complete (2026-09-28). Phases 1–9 were done in one pass at the owner's request. Root + 12 nested AGENTS.md files written; tokens and fonts fixed in code; `AGENTS_check.md` deleted. Not done: the `.gitignore` `!.env.example` tweak (not approved) and the permission-gate fail-open fix (not requested).

---

## How this works

1. I work one **phase** at a time, in the order in section C.
2. After each phase I show you the diff and wait for your OK before starting the next one.
3. Git: I won't commit or push without asking you first.

---

## A. Decisions

| ID | Decision | Result |
|----|----------|--------|
| D-1 | File shape | **Nested AGENTS.md files.** One full root `AGENTS.md`, plus shorter `AGENTS.md` files in the folders where the rules are used (UI rules in `components/ui/`, layout rules in `components/layout/`, AI rules next to the AI code, and so on). No `docs/` folder. Map in section B0. |
| D-2 | Styling | **Tailwind v4 + cva + tailwind-merge**, as already installed. The styled-components requirement is removed. |
| D-3 | Folder layout | **Root layout** (`app/`, `components/`, `lib/`, `actions/`…), no `src/`. *(Recommendation accepted.)* |
| D-4 | Fonts | **UI: Poppins** (as in the design reference). **Editorial: Newsreader** (Google Fonts, via `next/font`), replacing the Lora stand-in. Newsreader was designed for reading news on screen, has optical sizes for headlines and body text, and doesn't have the generic "template" look. |
| D-5 | Dark mode | **Light only for v1.** Dark mode is noted as future work. *(Recommendation accepted.)* |
| D-6 | Env files | **No exception to the deny rule.** You create `.env.example` and `.env.local` by hand (Phase 0). Agents never read, create or edit `.env*` files. |
| — | AI folder | AI rules go in `lib/ai/AGENTS.md` (server) and `components/ai/AGENTS.md` (UI). |
| — | Draft deletion | `AGENTS_check.md` is deleted in Phase 9, after its content has been moved and checked. |
| D-7 | Server Actions vs API routes | **Server Actions for UI mutations; route handlers for auth, cron, AI and external calls.** *(Recommendation accepted.)* |
| — | Design values | The values in the design image are correct. The tokens will be fixed everywhere to match them (C-09 to C-11). |

---

## B0. Nested AGENTS.md map

Each nested file is short (about 80–250 lines) and covers only its own folder. The root file lists all of them and says when to read each one.

| File | Content taken from the draft (draft § numbers) |
|------|------------------------------------------------|
| `AGENTS.md` (root, full) | Permissions · "Read this first" hard rules · mission and product contract (§0, §73) · scope (§1) · stack (§2) · non-negotiables (§3) · repo map and index of nested files (§4) · server/client conventions (§4.1) · state architecture (§37) · agent workflow (§64) · implementation order (§67) · release security checklist (§56) · important notes (§68) · references (§69, §72) |
| `components/ui/AGENTS.md` | Tokens: color, type, spacing, radius, shadow (§7–§10) · primitives (§11.1) · motion (§12) · icons (§13) · forms (§34) · accessibility (§35) · states and toasts (§40, §41) · Tailwind rules (replaces §30) · design QA and visual definition of done (§63, §66) |
| `components/layout/AGENTS.md` | Brand and logo (§6) · header and navigation (§14) · landing page composition (§15) · responsive layout (§36) · footer |
| `components/news/AGENTS.md` | News components (§11.2) · article reading experience (§16) · images and attribution (§27, §25A.15) · For You and admin source UI (§25A.25) |
| `components/ai/AGENTS.md` | AI components (§11.3) · key-setup modal UX (§19.2) · AI settings page (§42) · fallback UX (§23.5) · UX copy (§62) · labeling AI output as AI-generated (§16) |
| `lib/ai/AGENTS.md` | OpenRouter server layer: architecture (§19.1) · catalog and free eligibility (§20, §44) · refresh strategy (§21) · test workflow (§22) · routing and fallback (§23 merged with §46) · free-only guardrail (§45) · summary contract and prompts (§24, §53) · health (§47) · concurrency (§48) · privacy (§39) · AI definition of done (§65) |
| `lib/sources/AGENTS.md` | News ingestion (§25A): registry, discovery, extraction, adapters, dedupe, safe fetch (merged with §57), robots and copyright, Reddit, scheduling, backoff, ranking, failure behavior, ingestion definition of done |
| `lib/auth/AGENTS.md` | Better Auth (§17) · super-admin role (new, C-20) · OpenRouter key encryption (§19.3) |
| `lib/db/AGENTS.md` | Neon + Drizzle (§2.1, §18.1) · the whole schema in one place (§18, §25, §25A.19, merged) · migrations |
| `app/AGENTS.md` | Page and route map · SEO (§54) · performance (§28) · caching (§38) · i18n (§55) · Turbopack (§29) |
| `app/api/AGENTS.md` | Route-handler rules · session checks and never trusting a client-sent `userId` (§43) · endpoint list (§43, §25A.18) · cron protection (§58) · rate limits (§49) · observability (§50) |
| `actions/AGENTS.md` | Server Action conventions (D-7) · validation · revalidation |
| `tests/AGENTS.md` | Testing strategy (§51) · AI fixtures (§52) |

Environment variables (§59) and deployment (§60, §61) go in the root file.

---

## B. Change list

Line numbers refer to `AGENTS_check.md`.

### B1. Structure

| ID | Change |
|----|--------|
| C-01 | Keep the existing permissions (allow / ask / deny) as section 1 of the root AGENTS.md, **unchanged**. |
| C-02 | Use consistent heading levels (`#` title, `##` sections, `###` subsections). |
| C-03 | Renumber sections in order; remove the "25A" numbering and the missing 70–71 gap. |
| C-04 | Remove the broken citation text at lines 1830 and 3218. |
| C-05 | Add a table of contents and a "Read this first" block to the root file. |
| C-06 | Add a version/changelog block (v1.1.0). |

### B2. Match the codebase and design

| ID | Change |
|----|--------|
| C-07 | Rewrite the repo tree for the root layout; remove `turbo.json`. |
| C-08 | Rewrite the styling rules for Tailwind v4 (`@theme` tokens in `app/globals.css`, cva variants, `cn()` built on `clsx` + `tailwind-merge`). |
| C-09 | Colors from the design: primary 500 `#FF682D`, 400 `#FF8A3D`, 300 `#FFA66B`, 200 `#FFD0B3`, 100 `#FFF4ED`. Neutral 900 `#111827`, 700 `#374151`, 500 `#6B7280`, 400 `#9CA3AF`, 200 `#E5E7EB`, 100 `#F3F4F6`. Semantic `#10B981` / `#3B82F6` / `#F59E0B` / `#EF4444`. **Also fix `app/globals.css`** (200 is currently `#FFD083`). |
| C-10 | Shadows from the design: sm `0 1px 2px rgba(0,0,0,0.05)`, md `0 4px 12px rgba(0,0,0,0.08)`, lg `0 12px 32px rgba(0,0,0,0.12)`. |
| C-11 | Radius from the design: sm 4 / default 8 / md 12 / lg 16 / xl 24 (these already match `globals.css`). |
| C-12 | Fonts: Poppins (UI) + Newsreader (editorial) via `next/font`. **Also update `app/layout.tsx`** and the `--font-serif` token. |
| C-13 | "Install on first use" rule for jQuery, RxJS, core-js, GSAP, Framer Motion and Font Awesome. |
| C-14 | Reconcile with ARCHITECTURE.md (D-7). |

### B3. Contradictions and duplicates inside the draft

| ID | Change |
|----|--------|
| C-15 | Merge the two `news_source` schemas (lines 1315–1338 and 1907–1925). |
| C-16 | Merge the two SSRF sections (25A.12 and §57) into one "safe fetch" section. |
| C-17 | Merge the two fallback orders (§23.2 and §46). |
| C-18 | Merge the two scheduling sections (§21.3 and §25A.9). |
| C-19 | Make pages and routes consistent. Add For You, admin sources, bookmarks and `category/[slug]`, and fix the source-fetch endpoints. |
| C-20 | Define the super-admin role and how the server checks it. |
| C-21 | Fix the `isFreeModel` example so it normalizes prices before comparing. |
| C-22 | Add `prompt_version` to `ai_request` and define the fields of `ai_request_attempt`. |
| C-23 | Mark vendor limits (for example, Vercel cron) as "verify at implementation time". |
| C-24 | Add ingestion, For You, search, bookmarks and admin to the implementation order. |

### B4. Related files

| ID | Change |
|----|--------|
| C-25 | Point `GEMINI.md` at the root AGENTS.md so the permission rules aren't kept in two places. The rules themselves don't change. |
| C-26 | Update the `README.md` description and font mention. |
| C-27 | Update `ARCHITECTURE.md` for the new folders and the nested AGENTS.md files. |
| C-28 | **Delete `AGENTS_check.md`** once all of its content has been moved (Phase 9). |

---

## C. Phases

| Phase | Scope | Changes |
|-------|-------|---------|
| **0** | **Env files, created by you.** The `.env*` deny rule stays **unchanged** (your answer: no exception). You create `.env.example` and `.env.local` by hand using the variable list below. Optional, needs your OK: add `!.env.example` to `.gitignore`, because `.env*` currently ignores the example file too, so it would never be committed. | — |
| **1** | Root AGENTS.md skeleton: title, version, TOC, "Read this first" block, permissions, and the index of nested files | C-01 to C-06 |
| **2** | Root AGENTS.md body: mission, scope, stack, principles, repo map, conventions, workflow, env vars, deployment | C-07, C-08, C-13, C-14, C-19, C-24 |
| **3** | `components/ui/AGENTS.md` + token fixes in `globals.css` + font swap in `layout.tsx` | C-09 to C-12 |
| **4** | `components/layout/AGENTS.md`, `components/news/AGENTS.md` | — |
| **5** | `lib/auth/AGENTS.md`, `lib/db/AGENTS.md` | C-15, C-20, C-22 |
| **6** | `lib/ai/AGENTS.md`, `components/ai/AGENTS.md` | C-17, C-18, C-21, C-23 |
| **7** | `lib/sources/AGENTS.md` | C-15, C-16, C-18 |
| **8** | `app/AGENTS.md`, `app/api/AGENTS.md`, `actions/AGENTS.md`, `tests/AGENTS.md` | C-19 |
| **9** | Final pass: check that every section of the draft has moved somewhere, check links, update README/ARCHITECTURE/GEMINI, **then delete `AGENTS_check.md`** | C-25 to C-28 |

### Env variables for Phase 0 (from draft §59)

```env
DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
OPENROUTER_SITE_URL=
OPENROUTER_APP_NAME=
OPENROUTER_KEY_ENCRYPTION_SECRET=
CRON_SECRET=
```

There's no shared OpenRouter inference key (BYOK only), and no secret gets a `NEXT_PUBLIC_*` name.

---

## D. What stays the same

- The product's meaning: BYOK OpenRouter, free models only, no paid fallback, copyright-aware ingestion, accessibility and security rules.
- The `.env*` deny rule stays as it is: agents never read, create or edit any env file.

## Side note (not planned)

`.agents/scripts/permission-gate.js` allows everything when it can't parse its input ("fail-safe to allow"). For a security gate, failing closed (deny) is usually safer. I'll only change this if you ask.

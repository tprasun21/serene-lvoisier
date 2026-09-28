# app/api — Route handlers

Applies to `app/api/`. UI-driven mutations belong in Server Actions ([`actions/AGENTS.md`](../../actions/AGENTS.md)). Implement each operation **once**, as either a route handler or a Server Action, never both.

---

## 1. Handler rules

Every handler is a **thin adapter**:

```text
parse + validate input (Zod) → requireUser()/requireAdmin() → rate limit
→ call lib/ function → map result to a safe response
```

- Identity comes only from the Better Auth session. **Never** accept `userId` from the client as authoritative.
- Return a consistent error shape containing a safe error class and a message. No stack traces, secrets or raw upstream error bodies.
- Business logic lives in `lib/`, never in `route.ts`.
- Mark handlers that use the session or user data as dynamic, and never cache them publicly.

## 2. Endpoints

```text
Auth
  *      /api/auth/[...all]                    Better Auth

AI (user)
  GET    /api/ai/models                        eligible free catalog (from snapshot)
  POST   /api/ai/models/refresh                refresh catalog (deduped via job_lock)
  POST   /api/ai/models/test                   test a model with the user's key
  POST   /api/ai/summarize                     summary with free-only fallback
  GET    /api/user/openrouter-key              status + masked hint only
  POST   /api/user/openrouter-key              test & save (encrypt)
  DELETE /api/user/openrouter-key              disconnect + delete

Sources (user: own sources only)
  GET    /api/sources
  POST   /api/sources
  PATCH  /api/sources/[sourceId]
  DELETE /api/sources/[sourceId]
  POST   /api/sources/discover                 preview a pasted URL
  POST   /api/sources/[sourceId]/fetch         trigger an async sync of own source

Sources (admin only)
  GET    /api/admin/sources
  POST   /api/admin/sources
  PATCH  /api/admin/sources/[sourceId]
  DELETE /api/admin/sources/[sourceId]         archive
  POST   /api/admin/sources/test               test a URL/config before publishing
  POST   /api/admin/sources/[sourceId]/fetch   fetch now

Cron (CRON_SECRET only)
  GET    /api/cron/openrouter-models           catalog sync
  GET    /api/cron/sources                     enqueue due source refreshes
```

The user source CRUD endpoints can be implemented as Server Actions instead, as long as each operation is built only once.

## 3. Cron routes

- Verify the dedicated `CRON_SECRET` (e.g. the `Authorization: Bearer` header Vercel Cron sends). Reject everything else with 401.
- Never use a user's OpenRouter key in a cron request.
- Schedules live in `vercel.json`. Check the plan limits (root `AGENTS.md` §9).
- Enqueue and process in batches. Never do long fan-out inside one request.

## 4. Rate limiting

Apply **per-user**, **per-IP** and **per-route burst** limits to: sign-in · sign-up · key verification · model testing · catalog refresh · summaries · source discovery/fetch. One account must never be able to trigger thousands of model tests or fetches.

## 5. Observability

**Track:** request duration · selected model · effective model · fallback count · success/failure · error class · token usage (if available) · catalog refresh age · model confirmation age · source fetch outcomes.

**Never log:** API keys · passwords · session cookies · raw prompts (unless explicitly approved) · private article drafts · response bodies from models.

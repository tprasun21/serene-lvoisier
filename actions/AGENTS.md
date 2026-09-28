# actions — Server Actions

Applies to `actions/`. The general CRUD flow is described in [`ARCHITECTURE.md`](../ARCHITECTURE.md) and [`actions/README.md`](README.md).

---

## Use Server Actions for UI-driven mutations

Bookmarks · reading progress · profile · model preferences (primary model, fallback order, auto-fallback) · adding, removing, muting, reordering and setting preferences for user sources.

**Not here:** Better Auth, cron, OpenRouter calls (test, summarize, key verification) and anything called from outside the app. Those go in [`app/api/`](../app/api/AGENTS.md).

## Rules

1. Start the file with `"use server"`. One domain per file (e.g. `actions/bookmarks.ts`, `actions/sources.ts`).
2. **Validate input with Zod** (schemas in `lib/validations/`, shared with the client form).
3. **Authorize first:** `requireUser()` / `requireAdmin()` from `lib/auth`. Never take `userId` from the arguments.
4. Call business logic in `lib/`. Actions don't contain raw queries.
5. Call `revalidatePath` / `revalidateTag` for the views that are affected.
6. Return a typed `ActionResponse<T>` (`{ success: true, data } | { success: false, error, fieldErrors? }`). Never throw raw errors to the client, and never include secrets or stack traces.
7. Use optimistic UI only where the final state can be safely reconciled (e.g. bookmark toggle).
8. Apply the same rate limits as the equivalent API routes ([`app/api/AGENTS.md`](../app/api/AGENTS.md) §4).

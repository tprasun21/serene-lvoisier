# lib/ai — OpenRouter server layer

Applies to `lib/ai/`. This code runs on the **server only** (`import "server-only"`). UI rules are in [`components/ai/AGENTS.md`](../../components/ai/AGENTS.md), tables in [`lib/db/AGENTS.md`](../db/AGENTS.md), and key encryption in [`lib/auth/AGENTS.md`](../auth/AGENTS.md).

Suggested modules: `openrouter-client.ts` · `model-catalog.ts` · `eligibility.ts` · `model-health.ts` · `model-router.ts` · `errors.ts` · `summarize.ts` · `prompts.ts`.

---

## 1. Architecture

```text
Browser ──authenticated request──▶ route handler (app/api/ai/*)
                                     ↓ session check, rate limit
                                   lib/ai (decrypt user key for this request only)
                                     ↓
                                   OpenRouter API
                                     ↓
                                   normalize response ──▶ Browser
```

- The browser never calls OpenRouter. The key belongs to the user; the app orchestrates the requests.
- The plaintext key exists only for the duration of one server request. It never appears in logs, errors, telemetry or response bodies.
- Keys are always scoped to their owner. **No request ever uses another user's key**, including during fallback.

## 2. Model catalog

- The only source of truth is the live catalog: `GET https://openrouter.ai/api/v1/models`.
- **Never ship a static model list** (`const FREE_MODELS = [...]`). Static lists are allowed only as test fixtures.
- The product catalog is: **all returned models → free-eligibility filter → capability filter → the user's sort/filter.** Never only "top" models.

### 2.1 Free eligibility

```ts
// Prices come back as strings (e.g. "0", "0.0000"). Normalize before comparing.
function toPrice(value: unknown): number | null {
  const n = typeof value === "number" ? value : Number.parseFloat(String(value ?? ""));
  return Number.isFinite(n) ? n : null;
}

export function isFreeModel(model: OpenRouterModel): boolean {
  const prompt = toPrice(model.pricing?.prompt);
  const completion = toPrice(model.pricing?.completion);
  return prompt === 0 && completion === 0; // missing/unparseable price ⇒ not free
}
```

Also check `supportsRequiredInput(model)`, `supportsRequiredOutput(model)` and `supportsRequestedParameters(model)` against the returned metadata. Summaries need text in and text out; image input needs image modality. Don't assume every zero-priced variant supports every feature.

### 2.2 Free-only guardrail

One shared policy function, **`assertFreeModelEligible(model, requirements)`**, which every AI call path goes through. This is a security and business invariant: **NO PAID FALLBACK.**

If a selected model becomes paid:
1. mark it invalid for free mode;
2. refresh the catalog;
3. choose another free model;
4. tell the user only when necessary.

## 3. Catalog refresh

```text
OpenRouter live API → server cache → database snapshot (ai_model) → client cache
```

- Record `catalog_seen_at` (per model) and `last_catalog_sync_at` (per user preference row).
- **TTL:** aim for 15–60 minutes for interactive freshness, with a hard fallback of 24 hours. Use stale-while-revalidate.
- **Refresh triggers:** scheduled job · AI settings page opened while the catalog is stale · a test fails with model-not-found or unavailable · a summary finds a stale selected model · the user clicks **Refresh models**.
- **Dedupe:** only the first caller takes the `job_lock` and refreshes; concurrent callers get the stale snapshot (no thundering herd). Scheduling is covered in root `AGENTS.md` §9.
- The cron refresh (`/api/cron/openrouter-models`) never uses a user key. The flow is: fetch → normalize → filter free → upsert snapshot → mark removed/stale models → record the timestamp. Per-user verification still uses the user's own key.

## 4. Test-model workflow

```text
select model → check latest catalog metadata → verify still free
→ send minimal test request → measure success + latency
→ persist ai_model_health → Confirmed / Failed
```

- Prompt: `Reply with exactly: OK`, with conservative parameters and a low max-tokens value. Never summarize a real article as a health check.
- Use a short server timeout, so a broken provider never leaves the browser spinning forever.
- **Confirmed** only if: the request succeeded, the response parses, the output isn't empty, the required capability matches, and the catalog still says free. Confirmed means "confirmed recently", not trusted forever.
- Health states: `unknown · testing · confirmed · degraded · failed · removed`.
- Health records are scoped to the user's credential (`key_fingerprint`) when the account can affect availability.

## 5. Routing and fallback

### 5.1 Fallback order (the only one)

1. user-selected primary model
2. user-configured fallback models
3. recently confirmed free models that match the required capability
4. other free models found in the current catalog that match the capability
5. last resort: the `openrouter/free` router, only when capability requirements match

Every candidate passes `assertFreeModelEligible()` **before** each attempt. Build the list from current catalog data; never include a model whose current price is above zero. OpenRouter's `models` fallback parameter may be used as an optimization, but app-level health tracking and the free-only check still apply. When `openrouter/free` is used, record the **effective** model OpenRouter returns.

### 5.2 Error classes (`errors.ts`)

`AUTH_INVALID · MODEL_NOT_FOUND · MODEL_NOT_FREE · RATE_LIMITED · PROVIDER_DOWN · TIMEOUT · CONTEXT_TOO_LARGE · UNSUPPORTED_INPUT · UNSUPPORTED_PARAMETER · CONTENT_FILTER · INVALID_RESPONSE · NETWORK_ERROR · UNKNOWN`

| Class | Action |
|-------|--------|
| `AUTH_INVALID` | Stop. Ask the user to re-test their key. **Never** fall back to any other credential. |
| `MODEL_NOT_FOUND` | Mark the model stale/removed, refresh the catalog, try the next model. |
| `MODEL_NOT_FREE` | Disqualify immediately, refresh the catalog, try the next model. |
| `RATE_LIMITED` / `PROVIDER_DOWN` / `TIMEOUT` / `NETWORK_ERROR` | Try the next healthy model. |
| `CONTEXT_TOO_LARGE` | Truncate or summarize in stages, or choose a free model with a larger context. |
| `UNSUPPORTED_INPUT` / `UNSUPPORTED_PARAMETER` | Choose a model with the required capability. |
| `INVALID_RESPONSE` | Retry only where safe; otherwise fail over. |
| `CONTENT_FILTER` / `UNKNOWN` | Fail over once, then stop with a safe error. |

Every attempt is recorded in `ai_request_attempt`. Show a final error only when all eligible candidates have failed.

### 5.3 Health signals

- **Passive:** every real request updates health.
- **Explicit:** the user clicks Test.
- **Background (optional):** check popular or recently selected models only. Never health-check every model every minute; that wastes rate limits.

## 6. Summary contract

```ts
type SummaryRequest = {
  content: string;
  title?: string;
  sourceUrl?: string;
  articleId?: string;
  language?: string;
  maxLength?: "short" | "medium" | "long";
  modelId?: string; // preference only; still verified on the server
};

type SummaryResult = {
  summary: string;
  modelUsed: string;
  attemptedModels: string[];
  fallbackUsed: boolean;
  generatedAt: string;
};
```

The summarizer must: summarize **only** the supplied content · not invent facts or add facts from memory · keep uncertainty · separate reported claims from established facts · keep names, dates, numbers and quotes exact · be concise · use the requested language · never give political recommendations or opinions.

Preferred news structure: **What happened · Why it matters · Key facts · Important uncertainty / disputed claims.** It isn't an editorial.

URL-based summaries fetch content through `lib/sources/safe-fetch` only (see [`lib/sources/AGENTS.md`](../sources/AGENTS.md)).

## 7. Prompts and versioning

- All prompt strings live in `lib/ai/prompts.ts`. Never scatter them across route handlers.
- Version them: `export const SUMMARY_PROMPT_VERSION = "summary-v1";`. Bump the version whenever a prompt changes meaningfully.
- Save `prompt_version` in `ai_request`.

## 8. Privacy and retention

**Never store:** the plaintext key · full article content in AI logs · full prompts in analytics · model responses in general logs.

**Store:** model IDs (selected and effective) · timestamps · status · latency · token counts if available · safe error class · the user-visible summary only when the product needs it kept.

Never cache user-specific AI responses in a shared or public cache. Users can disconnect and delete their key at any time.

## 9. Definition of done — AI summary

```text
[ ] User is authenticated
[ ] OpenRouter key setup works; key is encrypted and never leaves the server
[ ] Live free-model catalog loads; user can inspect all eligible free models
[ ] User can select and test a model; confirmed status is stored
[ ] Summary request uses the selected model
[ ] Primary failure triggers fallback; fallback stays free
[ ] First failure doesn't interrupt the user
[ ] Effective model and prompt version recorded; errors classified
[ ] No secret appears in logs
[ ] Empty/loading/error states present
```

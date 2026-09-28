# tests — Testing strategy

Applies to `tests/` (`unit/`, `integration/`, `e2e/`, `fixtures/`). No test runner is installed yet. When adding one, add the matching `npm` scripts and record them in the root `AGENTS.md` §12.

---

## 1. Rules

- **CI never calls the real OpenRouter API** or real publisher sites. Mock them all, so the suite never depends on outside uptime.
- Fallback and routing tests are **deterministic**.
- Tests never contain real keys or secrets. Fixture keys are obviously fake.
- Never report tests as passing unless they actually ran and passed.

## 2. Unit tests

Free-model predicate (including string/number price normalization) · capability filter · model normalization · error classification · fallback ordering · `assertFreeModelEligible` · summary prompt construction · key encryption/decryption round trip · token/length policies · safe-fetch URL/IP validation (localhost, private ranges, metadata IPs, redirects) · URL canonicalization and dedupe · For You diversity rule.

## 3. Integration tests

Better Auth session → protected AI endpoint · non-admin blocked from admin routes · store/retrieve encrypted key · refresh model catalog · test model · summarize with the primary model · fail over when the primary fails · reject a paid model · remove the OpenRouter key · source discovery from a feed fixture · ingestion dedupe across two sources.

## 4. E2E journeys (minimum)

```text
Add global source as super-admin → test source → fetch source → verify article appears

Sign up → sign in → connect OpenRouter → browse free models → select model
→ test model → summarize article → force model failure → confirm fallback summary
→ open settings → replace/remove key

User adds a source to For You → sees "Sync in progress" → receives an article
```

## 5. AI fixtures (`tests/fixtures/openrouter/`)

Free working model · free rate-limited model · free not-found model · paid model · vision-only model · text-only model · timeout · malformed response · context-too-large response · invalid API key · a model that turns paid between catalog fetch and request.

## 6. Ingestion fixtures (`tests/fixtures/sources/`)

RSS feed · Atom feed · sitemap · JSON-LD article page · malformed HTML · oversized response · redirect to a private IP · non-HTML content type · robots.txt disallow.

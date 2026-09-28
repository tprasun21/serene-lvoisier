# lib/sources — News source ingestion and safe fetch

Applies to `lib/sources/`. Server-only. Tables are in [`lib/db/AGENTS.md`](../db/AGENTS.md), UI in [`components/news/AGENTS.md`](../../components/news/AGENTS.md), and endpoints in [`app/api/AGENTS.md`](../../app/api/AGENTS.md).

Suggested modules: `safe-fetch.ts` · `registry.ts` · `discovery.ts` · `extract.ts` · `sanitize.ts` · `normalize.ts` · `dedupe.ts` · `adapters/` · `rights.ts` · `health.ts` · `ranking.ts`.

---

## 1. Two source modes

1. **Super-admin sources:** central sources, available across the whole platform.
2. **User sources:** sources a signed-in user adds to their personal **For You** feed. They are private preferences and **never** become global sources automatically.

Examples: BBC, CNN, Reuters, NPR, TechCrunch, Reddit communities, publisher RSS feeds, public APIs.

`source_type`: `publisher · aggregator · community · social · blog · wire_service · api · rss · other`
`fetch_method`: `rss · atom · api · sitemap · article_url · html_discovery · manual`. Store the preferred method plus an ordered list of fallback methods.

Admins configure a source (feed, API or discovery settings) once; the pipeline then finds individual articles. Admins never enter article URLs one by one.

### Pipeline overview

```text
Super-admin global setup ─┐
                          ├─▶ Source registry ─▶ Feed/API/URL discovery ─▶ Safe fetch (SSRF checks)
User For You "Add Source" ┘       ─▶ Extract + sanitize ─▶ Normalize + dedupe ─▶ Article store + search index
                                                                                  ├─▶ Global news pages
                                                                                  └─▶ For You feed ─▶ AI summaries
```

## 2. Admin workflow

```text
Add Source → paste URL → validate hostname + URL (safe-fetch rules)
→ discover RSS/Atom/API/sitemap → rights check (robots/terms)
→ test source → preview discovered articles
→ set category / refresh interval / content rights / status → publish
```

If the rights check can't confirm the source may be used for its intended purpose, set the status to **`needs_review`**. Never quietly bypass it.

## 3. Discovery priority

For any supplied URL, try in this order:

1. explicit RSS/Atom feed
2. official API
3. sitemap / sitemap index
4. structured metadata / JSON-LD
5. HTML article discovery
6. direct article URL

Always prefer an official feed or API over HTML scraping.

```text
Article URL:   validate → safe fetch → detect metadata → extract → sanitize → normalize → store
Source URL:    discover feeds/links/sitemap → identify article URLs → queue fetches → dedupe → extract → store
```

## 4. Safe fetch (SSRF protection), the only outbound fetch path

**Every** server fetch of a URL supplied by a user, an admin or a feed goes through `safe-fetch.ts`. That includes source discovery, article extraction, feed polling, robots.txt, and AI URL summaries. The app must never become an open network proxy.

Before and during each fetch:

- allow only `http:` and `https:`; normalize the URL; reject credentials in the URL;
- resolve DNS on the server and reject **localhost, loopback, private RFC 1918 ranges, link-local addresses, IPv6 ULA/link-local, and cloud metadata endpoints** (e.g. `169.254.169.254`);
- follow redirects manually, with a small redirect limit, and **re-validate the destination after every redirect**;
- enforce connection and response timeouts and a maximum response size;
- validate `Content-Type` and reject unexpected binary payloads;
- **never run remote JavaScript** (no headless browser in normal ingestion); never follow non-HTTP protocols;
- send an honest, identifiable User-Agent;
- use `ETag` / `Last-Modified` conditional requests when supported.

## 5. Extraction

```text
HTTP response → content-type check → size limit → HTML parser
→ JSON-LD / OpenGraph metadata → Readability-style main-content extraction
→ source adapter override (if needed) → sanitize → normalize
```

Treat all extracted content as untrusted. Sanitize HTML on the server (DOMPurify). Never store third-party scripts. Normalized fields: title, dek, author, published_at, updated_at, canonical_url, source_url, source_id, body (only if rights allow), hero_image_url, image_urls, language, tags, category, extracted_at.

## 6. Adapters

```ts
export interface NewsSourceAdapter {
  canHandle(input: SourceDescriptor): boolean;
  discover(input: SourceDescriptor): Promise<DiscoveredSource>;
  discoverArticles(source: DiscoveredSource): Promise<DiscoveredArticle[]>;
  extractArticle(url: string): Promise<NormalizedArticle>;
  healthCheck(source: DiscoveredSource): Promise<SourceHealthResult>;
}
```

Build the generic adapters first: `GenericRssAdapter · GenericAtomAdapter · GenericSitemapAdapter · GenericArticleAdapter · GenericJsonLdAdapter`. Add a source-specific adapter only when the generic pipeline can't handle a source reliably. Don't build dozens of hard-coded adapters.

## 7. Deduplication

The same article can arrive through a feed, a sitemap, a direct URL, a user source or an admin source. Dedupe by, in order:

1. normalized canonical URL
2. a URL hash that doesn't depend on the source
3. the publisher's article ID
4. normalized title + published timestamp (last resort)

`article` is the one canonical content record; `user_source` records who wants to see it. Two users adding the same source never creates duplicate articles.

## 8. Rights, robots and copyright

A publicly reachable URL is **not** permission to copy or republish. Before activating a source:

1. check `robots.txt` where it applies;
2. identify the terms of use;
3. prefer official RSS/API feeds or licensed syndication;
4. respect no-crawl / no-fetch rules;
5. store only the minimum the product needs;
6. keep attribution and canonical URLs;
7. support removal/takedown;
8. allow the source to be disabled immediately.

**Content rights (`news_source.content_rights`):** `metadata` (default) · `excerpt` · `full`. Store and show the full body only when the source or license explicitly permits it. Otherwise store the title, a dek/excerpt where permitted, author, date, image where permitted, canonical URL and source, and send readers to the original.

**Never build:** anti-bot bypasses, paywall circumvention, CAPTCHA bypasses, stealth/headless scraping, or anything else designed to evade publisher controls.

## 9. Reddit and community sources

- Treat Reddit as a separate `community` source type.
- Use official Reddit developer or API mechanisms. Never make uncontrolled scraping the default.
- Follow Reddit's developer terms, data policies, privacy rules and rate limits. Minimize the user-generated data stored, keep attribution, never ingest private user information, and never infer sensitive personal characteristics.
- If a Reddit source can't be connected through an approved mechanism, show it as **Unavailable**. Don't build a workaround.

## 10. Status

- **Source:** `pending · needs_review · active · paused · degraded · blocked · removed`
- **Article (ingestion):** `discovered · fetching · extracted · published · updated · failed · removed`

A source going temporarily offline never deletes articles already ingested.

## 11. Scheduling, failure and backoff

Refresh intervals are per source, and they're targets, not guarantees:

| Source kind | Interval |
|-------------|----------|
| Breaking / high frequency | 5–15 min (where infrastructure and terms allow) |
| Normal publisher feed | 15–60 min |
| Low frequency | 1–24 h |
| Manual | on demand |

Use the shared scheduler in `lib/jobs/` (root `AGENTS.md` §9). The pipeline is: scheduler → enqueue source refresh → fetch/discover → enqueue extraction → normalize → dedupe → publish/update. Never do hundreds of fetches inside one short request. The first sync after a user adds a source runs asynchronously.

**If a source fails:** keep the homepage working, keep existing articles, mark the source `degraded`, retry with backoff, and keep fetching other sources.
**If extraction fails:** keep the metadata, canonical URL and attribution where appropriate.
**One malformed page must never crash the worker.**

**Backoff:** exponential with jitter (short → longer → increasing delays). Store `consecutive_failures` and `next_fetch_at`, reset them after a success, and never keep hitting a source that's down.

**Health tracking:** last_checked_at, last_success_at, last_failure_at, consecutive_failures, http_status, response_time_ms, articles_discovered, articles_extracted, articles_failed.

## 12. For You ranking

Signals: user-selected sources + explicit topics/categories + reading and bookmark behavior + recency + source freshness. **Never infer sensitive user characteristics.**

Initial order: (1) pinned source · (2) fresh article from a selected source · (3) topic match · (4) recent relevant article · (5) diversity adjustment. Diversity rule: at most **N** consecutive items from one source, with N configurable.

## 13. Search integration

Ingested articles go through the **same** normalized article and search pipeline as first-party content (`lib/articles`). Never build a separate search system for them. Searchable fields: title, dek, body (if stored), category, tags, author, source, published_at.

## 14. Definition of done — ingestion

```text
[ ] Super-admin can add a source URL; discovery finds RSS/Atom/API/sitemap when available
[ ] Source can be tested before activation; admin can fetch/test manually
[ ] Articles discovered from an active source and fetched via safe-fetch (SSRF blocks in place)
[ ] Robots/terms/rights respected; needs_review used when unclear
[ ] Adapter architecture exists; articles normalized into the common model
[ ] Duplicates deduplicated; source failures don't break the portal
[ ] Source health tracked; retries use backoff; background refresh is async
[ ] User can add/remove/mute/reorder sources; user sources isolated per account
[ ] Reddit uses an approved access mechanism
[ ] Attribution + canonical links preserved; metadata/excerpt/full rules enforced
[ ] E2E test: add a source → receive an article
```

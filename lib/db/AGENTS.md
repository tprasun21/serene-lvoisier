# lib/db — Neon Postgres + Drizzle ORM

Applies to `lib/db/` (client, schema, migrations). This is the **only** schema reference. If you change the schema, update this file too.

---

## 1. Rules

- **Neon Postgres** is the database. **Drizzle ORM** is the access layer and handles migrations (`drizzle.config.ts` at the repo root).
- Client: `drizzle-orm/neon-http` for normal serverless queries. Use a WebSocket/pooled connection only where interactive transactions need one.
- Layout: `lib/db/index.ts` (client, server-only) · `lib/db/schema/*.ts` · `lib/db/migrations/`.
- Database access happens **only** in `lib/` (queries/services). Never in components, and never directly in route handlers or Server Actions beyond calling `lib/` functions.
- Every migration is generated, reviewed and committed. Never edit a migration that has already been applied.
- Use `snake_case` column names, `created_at` / `updated_at` timestamps (with time zone), and text or UUID IDs used consistently.
- Keep search in Postgres at first (full-text `tsvector` on title, dek, body, tags, author, source). Add a dedicated search engine only if scale justifies it.

## 2. Auth (managed by Better Auth)

`user` (+ `role` from the admin plugin) · `session` · `account` · `verification`. Let Better Auth's schema generator own these tables.

## 3. Users and reading

```text
user_profile      user_id PK/FK, display_name, avatar_url, language, created_at, updated_at
bookmark          user_id, article_id, created_at                     (PK: user_id + article_id)
reading_history   user_id, article_id, read_at, progress_percent
```

## 4. Content

```text
category          id, slug (unique), name, description, sort_order
article           id, slug (unique), title, dek, body, excerpt,
                  content_mode (metadata | excerpt | full),
                  category_id, author_id (first-party, nullable), author_name (external),
                  hero_image_url, image_urls_json,
                  status (draft | discovered | fetching | extracted | published | updated | failed | removed),
                  published_at, updated_at, extracted_at, reading_time_minutes,
                  source_id (nullable), source_name, source_url, canonical_url, url_hash (unique),
                  language, tags_json, location, seo_title, seo_description, og_image,
                  search_vector
article_category  article_id, category_id                              (extra categories)
```

Drafts and unpublished articles are never public and never indexed by search engines.

## 5. Sources

```text
news_source             id, name, hostname, base_url, source_type, status,
                        fetch_method, fallback_fetch_methods_json,
                        description, logo_url, default_category_id,
                        content_rights (metadata | excerpt | full),
                        robots_status, terms_url, privacy_url,
                        refresh_interval_minutes, parsing_rules_json,
                        last_checked_at, last_success_at, last_failure_at,
                        consecutive_failures, next_fetch_at,
                        created_by, created_at, updated_at

source_feed             id, source_id, feed_url, feed_type, is_primary,
                        etag, last_modified, last_checked_at, last_success_at, status

source_fetch            id, source_id, started_at, completed_at, status, http_status,
                        response_time_ms, articles_discovered, articles_extracted,
                        articles_failed, error_class

source_article          id, source_id, article_id, external_id, canonical_url,
                        discovered_at, last_seen_at

user_source             id, user_id, source_id, custom_url, status, is_pinned,
                        sort_order, created_at, updated_at      (unique: user_id + source_id)

user_source_preference  user_id, source_id, topics_json, muted, priority,
                        include_in_recommendations
```

Status values are in [`lib/sources/AGENTS.md`](../sources/AGENTS.md) §10. `custom_url` is for when a user adds a specific feed or path instead of the source's homepage.

## 6. AI

```text
openrouter_credential   id, user_id (unique), encrypted_api_key, encryption_key_version,
                        key_fingerprint, key_hint, status, last_verified_at,
                        created_at, updated_at

ai_model                id, provider_id, model_id (unique), name, description,
                        pricing_json, architecture_json, supported_parameters_json,
                        input_modalities_json, output_modalities_json, context_length,
                        is_free_eligible, status (active | stale | removed),
                        catalog_seen_at, last_verified_at, created_at, updated_at

ai_model_health         id, model_id, key_fingerprint, tested_at, success, latency_ms,
                        http_status, error_code, error_class, response_model, notes

user_ai_preferences     user_id PK, primary_model_id, fallback_model_ids_json,
                        auto_fallback_enabled, last_catalog_sync_at, updated_at

ai_request              id, user_id, request_type, prompt_version,
                        selected_model_id, effective_model_id, status,
                        started_at, completed_at, input_tokens, output_tokens,
                        latency_ms, error_class

ai_request_attempt      id, request_id, attempt_number, model_id, response_model,
                        started_at, completed_at, success, http_status,
                        error_class, latency_ms

ai_summary              id, user_id, article_id, model_used, prompt_version,
                        language, max_length, summary, created_at
```

- **Never** store the raw key, the full prompt or the full source article in AI tables unless a deliberate retention policy says so.
- Never return `encrypted_api_key` to the client.
- `ai_summary` is stored only when the product needs summaries kept, and is scoped to the user (never shared across users unless it's explicitly normalized and safe).

## 7. Jobs

```text
job_lock   key PK, holder, acquired_at, expires_at     (short-lived dedupe/refresh locks)
```

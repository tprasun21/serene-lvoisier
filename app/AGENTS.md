# app — Routes, pages, SEO, performance

Applies to `app/` (App Router pages and layouts). Route handlers are covered in [`app/api/AGENTS.md`](api/AGENTS.md).

---

## 1. Route map

```text
app/
├─ layout.tsx                  root shell, fonts (Poppins + Newsreader), metadata
├─ globals.css                 Tailwind @theme tokens (see components/ui/AGENTS.md)
├─ not-found.tsx · error.tsx · loading.tsx
├─ page.tsx                    Home (landing composition)
├─ category/[slug]/page.tsx    World, Business, Tech, Health, Sports… (from the category table; unknown slug → 404)
├─ article/[slug]/page.tsx     Article reading page
├─ search/page.tsx             Search (?q=)
├─ for-you/page.tsx            🔒 user: personalized feed + Your Sources
├─ bookmarks/page.tsx          🔒 user: saved articles
├─ auth/sign-in/page.tsx
├─ auth/sign-up/page.tsx
├─ settings/page.tsx           🔒 user
├─ settings/profile/page.tsx   🔒 user
├─ settings/ai/page.tsx        🔒 user: OpenRouter key, model catalog, fallbacks
├─ admin/sources/page.tsx      🔒 admin: global source registry
├─ design/page.tsx             internal design-token preview (keep in sync with tokens; noindex)
├─ (legal)/about · contact · privacy · terms · attribution
└─ api/…                       see app/api/AGENTS.md
```

🔒 = redirect when signed out or lacking the role, **and** enforce the check in the data layer ([`lib/auth/AGENTS.md`](../lib/auth/AGENTS.md)).

## 2. Page rules

- Pages are Server Components. Fetch data through `lib/` functions. Only interactive leaves are Client Components.
- Every data route has loading, empty and error states (`loading.tsx`, `error.tsx`, plus empty-state components).
- Article pages render fully without AI and without client JS. The AI summary loads on its own and can never block the page.
- Stream server content with Suspense where it helps.

## 3. SEO

Every public article has: a canonical URL · title · description · Open Graph · Twitter/X card · structured `NewsArticle` JSON-LD where appropriate. Use the Next.js `generateMetadata` API.

- Slugs are stable.
- Drafts, unpublished content, settings, admin and `/design` are `noindex` and left out of the sitemap.
- For externally sourced articles, the canonical tag points to the original publisher URL when only metadata or an excerpt is shown.

## 4. Performance (Core Web Vitals)

- Keep client JavaScript small and avoid unnecessary hydration.
- Use `next/image` with explicit dimensions to avoid layout shift. Lazy-load media below the fold.
- Defer non-critical scripts. Keep animation off the critical rendering path.
- Measure real-user performance with the Web Vitals instrumentation. **Never report a score that wasn't measured.**

## 5. Caching

Cache these separately: article pages · category listings · model catalog · model health · user preferences.

- Public pages can be statically generated or revalidated. Revalidate after ingestion or edits.
- **Never** cache user-specific data (keys, AI responses, For You, bookmarks) in a shared or public cache.

## 6. Internationalization readiness

English first, but: keep UI strings in one place · never build sentences by joining translated fragments · format dates and numbers for the user's locale (`Intl`, `date-fns`) · summaries accept a target language.

## 7. Turbopack

Turbopack is the default bundler in Next.js 16. Use plain `next dev` / `next build`. Don't add the legacy `experimental.turbo` config. Use the top-level `turbopack` key in `next.config.ts` only when customization is really needed. Avoid webpack-only plugins that have no Turbopack equivalent. Keep config minimal.

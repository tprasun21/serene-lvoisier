# components/news — News UI and reading experience

Applies to `components/news/` (cards, article parts, source-management UI). Token and primitive rules are in [`components/ui/AGENTS.md`](../ui/AGENTS.md). Ingestion logic is in [`lib/sources/AGENTS.md`](../../lib/sources/AGENTS.md).

---

## 1. Components

HeroNewsCard · CompactNewsCard · ArticleCard · VideoCard · ResourceCard · LatestNewsList · FeaturedTopics · CategoryCard · AuthorMeta · ArticleHeader · ArticleBody · ArticleActions · RelatedStories · NewsletterCard · SourceBadge · SourceList · AddSourceDialog · SourceHealthBadge.

Components receive typed data through props. They never query the database or call ingestion code directly.

## 2. Article reading experience

The article page is built for reading.

```text
Category badge
Title
Dek / standfirst
Author · Published time · Read time
Source attribution (external articles)
Hero image
Body (inline media, pull quotes)
Save · Share · Text-size controls
AI summary (separate, labeled; see components/ai/AGENTS.md)
Related stories
```

- Body text: `font-serif text-body-lg`, with the reading column limited to **`max-width: 68ch`**. Never stretch paragraphs edge to edge.
- Render **only sanitized HTML** (sanitized on the server in `lib/articles`). Never pass untrusted HTML to `dangerouslySetInnerHTML` without sanitizing it first. Article content can never override site styles, run scripts, add event handlers, change iframe policy or change navigation.
- The AI summary is extra material. It's always visibly labeled as AI-generated and never mixed with the article body.
- Reading never depends on AI or client JavaScript.

## 3. Attribution (external articles)

Every externally sourced article clearly shows:

```text
Source: BBC
Original article ↗   (canonical URL, always reachable)
Published: …
```

When only metadata and a link are stored, label the card or page as a link to the original story (e.g. "Read at BBC"). Never imply that Serene Lavoisier wrote it.

## 4. Images

- Use free or open sources where legally appropriate: Unsplash, Pexels, Wikimedia Commons, Openverse, or assets the project owns. Keep any attribution the license requires.
- Don't scrape copyrighted publisher images as a shortcut. Publisher images are shown only where the source's rights allow it.
- Use `next/image` with explicit dimensions or aspect ratio to prevent layout shift. Lazy-load images below the fold.

## 5. Source-management UI

### For You (signed-in user)

```text
For You
├─ Recommended
├─ Your Sources
│  ├─ Reddit            Pinned · Active    [Preferences] [Remove]
│  ├─ TechCrunch        Active             [Preferences] [Remove]
│  ├─ BBC               Active             [Preferences] [Remove]
│  └─ + Add Source
└─ Preferences
```

Add Source: paste a URL → discover → show a preview → user confirms → added. Right after adding, show **"Source added · Finding recent articles…"** and render the page immediately with a **"Sync in progress"** state that updates when articles arrive.

Users can add, remove, mute and reorder sources, choose topics per source, and choose whether a source feeds recommendations. **Keep user controls simple.** Parser and fetch settings are only for super-admins.

### Super-admin (`/admin/sources`)

```text
Sources                                  + Add Source
Search sources    Filter: All / Active / Degraded / Paused / Needs review

BBC   Active · RSS · Last sync 4 min ago       [Test] [Fetch now] [Edit]
CNN   Active · RSS/API · Last sync 7 min ago   [Test] [Fetch now] [Edit]
```

Admins can add, edit, pause, resume, test, fetch now, archive, see discovered feeds, see the last success and last failure, see extraction errors, and configure category, refresh interval, content rights and parsing rules.

### Source health labels (user-facing)

Healthy · Syncing · Delayed · Needs attention · Unavailable. Never show stack traces or raw errors to ordinary users.

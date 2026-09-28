# components/ui — Design system and primitives

Applies to `components/ui/` and to styling decisions anywhere in the app. The root [`AGENTS.md`](../../AGENTS.md) still applies.

**Source of truth for visuals:** [`designs/Serene-designsystem.png`](../../designs/Serene-designsystem.png) and [`designs/Serene-landing.png`](../../designs/Serene-landing.png). Don't redesign the visual language unless the project owner asks. `/design` (`app/design/page.tsx`) is the living token preview; keep it in sync when tokens change.

---

## 1. Styling with Tailwind v4

- All tokens are defined once, in `@theme` in [`app/globals.css`](../../app/globals.css). Components use the generated utilities (`bg-primary-500`, `text-neutral-700`, `rounded-md`, `shadow-sm`, `text-heading-2`).
- **Don't use hard-coded hex values or arbitrary values** (`text-[#FF682D]`, `p-[13px]`, `text-[48px]`) in components. If a value is missing, add a token; don't make a one-off.
- Build variants with `class-variance-authority`. Merge classes with `cn()` from `lib/utils.ts` (`clsx` + `tailwind-merge`).
- Keep global CSS limited to the reset, base styles, accessibility helpers and tokens.
- Every primitive accepts `className` and forwards native props (`React.ComponentPropsWithRef<"button">`, etc.).
- Primitives have no business logic, no data fetching and no domain types.
- **Light theme only for v1.** Dark mode is future work. Don't add `dark:` variants yet.

## 2. Color tokens

| Token | Hex | Role |
|-------|-----|------|
| `primary-500` | `#FF682D` | Primary brand color and actions |
| `primary-400` | `#FF8A3D` | Hover |
| `primary-300` | `#FFA66B` | Light |
| `primary-200` | `#FFD0B3` | Lighter |
| `primary-100` | `#FFF4ED` | Tinted background |
| `neutral-900` | `#111827` | Text |
| `neutral-700` | `#374151` | Headings |
| `neutral-500` | `#6B7280` | Body/secondary text |
| `neutral-400` | `#9CA3AF` | Muted |
| `neutral-200` | `#E5E7EB` | Borders |
| `neutral-100` | `#F3F4F6` | Surfaces |
| `white` | `#FFFFFF` | Page background |
| `success` | `#10B981` | Success, confirmed, complete |
| `info` | `#3B82F6` | Informational |
| `warning` | `#F59E0B` | Warning, degraded |
| `error` | `#EF4444` | Destructive, error |

Rules:

- Orange means brand, action and focus. Grays set content hierarchy, borders and surfaces.
- Don't use pure black for text (use `neutral-900`). Don't create near-duplicate colors.
- Don't give the white design a warm or red tint. Orange is an accent only.
- **Never use color alone** to show state (model health, article state, form errors, active tabs). Always pair it with text or an icon.

## 3. Typography

| Family | Token | Used for |
|--------|-------|----------|
| **Poppins** (400/500/600) | `font-sans` (default) | UI, headings in UI chrome, navigation, buttons |
| **Newsreader** (variable, with italics) | `font-serif` | Display, editorial headlines, article body |

Both are loaded in `app/layout.tsx` through `next/font/google`. Don't load fonts any other way.

| Utility | Size / line height | Weight | Used for |
|---------|-------------------:|--------|----------|
| `text-display-1` | 48 / 56 | 600 | Hero titles |
| `text-display-2` | 36 / 44 | 600 | Section titles |
| `text-heading-1` | 28 / 36 | 600 | Card titles |
| `text-heading-2` | 24 / 32 | 500 | Section headers |
| `text-heading-3` | 20 / 28 | 500 | Subtitles |
| `text-body-lg` | 18 / 26 | 400 | Article text |
| `text-body` | 16 / 24 | 400 | Body text |
| `text-small` | 14 / 20 | 400 | Captions, metadata |
| `text-tiny` | 12 / 16 | 400 | Labels, tags |

- 48px display text is only for large desktop screens. Scale hero type down on tablet and mobile with `clamp()`.
- Editorial headings must never overlap nearby media.

## 4. Spacing (4px base)

Only use these steps: `1` (4) · `2` (8) · `3` (12) · `4` (16) · `6` (24) · `8` (32) · `10` (40) · `12` (48) · `16` (64).

- Section spacing: 8 / 10 / 12 / 16. Card internals: usually 3 / 4 / 6.
- No odd values (13px, 19px, 27px) unless a component has a documented exception.
- On mobile, shrink the outer gutters before reducing card readability.

## 5. Radius and shadow

| Token | Value | Default use |
|-------|------:|-------------|
| `rounded-sm` | 4px | Small elements |
| `rounded-default` | 8px | Inputs, buttons |
| `rounded-md` | 12px | Standard cards |
| `rounded-lg` | 16px | Large hero/media cards |
| `rounded-xl` | 24px | Large surfaces, modals |
| `rounded-full` | 9999px | Pills, tags, avatars |

| Token | Value |
|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.08)` |
| `shadow-lg` | `0 12px 32px rgba(0,0,0,0.12)` |

Use shadows sparingly. Prefer a border plus a subtle shadow; not every card should float.

## 6. Required primitives

Button (primary / secondary / tertiary / text, plus loading and disabled states) · IconButton · Link · Input · SearchInput · Select · Dropdown/Menu · Badge · Chip · Tag · Avatar · Tabs · Tooltip · Modal/Dialog · Toggle · ProgressBar · Skeleton · Spinner · EmptyState · ErrorState · Toast · Card · Divider · Breadcrumbs · Pagination.

Match the states shown in the design reference: default, hover, focus, active, disabled, loading, error.

## 7. Forms

- A visible `<label>` is always present. A placeholder never replaces a label.
- The focus ring is always visible (orange).
- Errors sit next to the field they belong to (`aria-describedby`) and don't rely on color alone.
- Keyboard submission works. A loading state prevents duplicate submits.
- Password fields have a show/hide toggle.
- Use `react-hook-form` + Zod for complex forms, and share schemas from `lib/validations/`.

## 8. Icons

- **Lucide** is the default. Font Awesome Free is only for brand and social icons.
- Use one icon style per surface and consistent stroke widths.
- Sizes: 16px for dense UI, 18–20px for standard controls, 24px for prominent navigation.
- Icon-only controls need an accessible label. Don't use emoji where an interface icon exists.

## 9. Motion

- **Framer Motion** (install on first use): dialog enter/exit, accordions, tabs, card hover, layout transitions, small page transitions, list reordering.
- **GSAP** (install on first use): only for timeline sequences, such as the hero reveal, editorial storytelling, coordinated image/title/metadata choreography, and scroll-driven sequences.
- One library per animation. Keep animation off the critical rendering path.
- Respect `@media (prefers-reduced-motion: reduce)` and `useReducedMotion()`: remove or minimize non-essential motion. Content must never depend on animation to be understood.

## 10. Accessibility (WCAG 2.2 AA)

Semantic headings in order · full keyboard navigation and a logical tab order · visible focus · accessible dialogs (focus trap, Esc, focus returned to the trigger) · sufficient contrast · meaningful alt text (empty `alt=""` for decorative images) · reduced-motion support · `aria-live` only where an announcement is actually useful.

## 11. States, toasts and inline errors

Build every state the design shows: loading, empty, error, completed, disabled, saved, live/active, disconnected. Never leave blank space where a skeleton, empty state or error should explain what happened.

- **Toast** for: save confirmation, bookmark added/removed, key verified, model confirmed/removed, non-blocking fallback notices.
- **Inline error** for: form validation, credential problems, missing content, destructive failures.
- Don't show a toast for every network failure.

## 12. Design QA — a page isn't done until

```text
[ ] Correct typography tokens (Poppins UI / Newsreader editorial)
[ ] 4px spacing rhythm
[ ] Correct primary/neutral tokens, no hard-coded hex
[ ] Consistent radius, buttons and card density
[ ] Keyboard reachable, focus visible
[ ] Mobile layout tested
[ ] Loading/empty/error states tested
[ ] Images have reserved dimensions
[ ] Motion respects reduced-motion
[ ] No unnecessary visual clutter, no warm/red tint on the white design
```

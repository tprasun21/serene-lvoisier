# components/layout — Brand, navigation, page composition

Applies to `components/layout/` (header, navigation, footer, page shells). Token and primitive rules are in [`components/ui/AGENTS.md`](../ui/AGENTS.md). Reference image: [`designs/Serene-landing.png`](../../designs/Serene-landing.png).

---

## 1. Brand and logo

- Name: **Serene Lavoisier**. Tagline: **Real News. Deeper Perspectives.** The tone is editorial, modern, intelligent, trustworthy and spacious.
- The logo is an **SVG React component** (orange mark plus wordmark). Keep its proportions fixed. Never redraw the mark with CSS shapes.
- Provide a full variant and a compact/mobile variant for light backgrounds.
- Leave clear space around the logo. Never place it directly on a busy photo without a solid surface behind it.

## 2. Header and navigation

**Desktop:** logo on the left · primary navigation in the top row · search in the center (expands on focus) · **Sign In** · **Get Started** as the primary button.

**Primary routes:** Home · World · Business · Tech · Health · Sports. Categories link to `/category/[slug]`; see [`app/AGENTS.md`](../../app/AGENTS.md).

**Signed in:** replace Sign In / Get Started with an avatar menu (Profile, Settings, Notifications, Help & Support, Log Out), as in the design reference.

**Mobile:**
- compact logo, menu trigger, search button, and an auth/profile control when there's room;
- a bottom navigation bar is allowed for frequent destinations (Home, Explore, Bookmarks, Profile, as in the reference's mobile screens).

Don't build a mega-menu unless the information architecture really needs one. Mark the active route with `aria-current="page"` and a visual indicator that doesn't rely on color alone (the reference uses an underline).

## 3. Landing page composition

```text
Header
↓
Hero story: editorial copy · category badge · metadata · CTA · large image
↓
Three secondary stories in a row
↓
Latest News + Featured Topics
↓
Newsletter / subscription card
↓
Large editorial feature
↓
Sign In + Create Account blocks
↓
Footer
```

The homepage should feel spacious. Avoid dense news-portal grids.

## 4. Footer

Brand block and tagline · category links · editorial/legal pages (About, Contact, Privacy, Terms, source attribution/takedown policy) · social icons (Font Awesome Free, each with an accessible label).

## 5. Responsive layout

- Mobile-first. Choose breakpoints based on the content; the reference layouts are **mobile, tablet, desktop and wide desktop**.
- Prefer fluid sizing: `clamp()`, `min()`, `max()`.
- Use grid and flexbox for layout, never absolute positioning.
- The mobile screens in the reference are real product layouts, not collapsed desktop pages.
- Keep a readable content width. Reduce gutters before reducing readability.

## 6. Definition of done — visual system

```text
[ ] Landing page matches the reference hierarchy
[ ] Tokens centralized in app/globals.css; typography uses Poppins + Newsreader
[ ] Colors, 4px spacing, radius and shadows match the reference
[ ] Buttons/inputs/tags/menus are reusable primitives
[ ] Article reading experience implemented
[ ] Sign-in / sign-up blocks and footer implemented
[ ] Mobile screens are first-class
[ ] No warm/red tint added to the white design
```

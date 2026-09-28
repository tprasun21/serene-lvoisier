# Layout Components (`/components/layout`)

This directory contains shell and structure components that establish consistent page framing, navigation, and layout responsiveness across the dashboard and CRUD views.

## Recommended Components to Add

| Component | File | Purpose |
| :--- | :--- | :--- |
| **Navbar / Header** | `navbar.tsx` | Top application bar containing brand logo, global search, notifications, and user profile menu. |
| **Sidebar** | `sidebar.tsx` | Collapsible vertical navigation menu listing main entities/routes with active state highlighting. |
| **Breadcrumbs** | `breadcrumbs.tsx` | Hierarchical navigational trail showing current path (e.g., `Dashboard > Items > Edit #42`). |
| **Page Header** | `page-header.tsx` | Reusable section header displaying page title, subtitle, and top-right action buttons (e.g. "+ Add New"). |
| **Container** | `container.tsx` | Responsive max-width wrapper providing consistent horizontal margins and paddings. |

## Best Practices

- Make shell layouts responsive with clean mobile drawer navigation.
- Use Next.js `<Link>` components to maintain client-side routing benefits.
- Read active route using `usePathname()` from `next/navigation` to highlight current links.

# Components (`/components`)

This directory houses all reusable React components in the application, structured according to atomic design principles and production CRUD separation of concerns.

## Directory Structure

```
components/
├── ui/         # Generic, stateless UI primitives (Buttons, Inputs, Modals, Tables, Skeletons)
├── crud/       # Domain-agnostic CRUD patterns (DataTables, Filters, Forms, ConfirmDialogs)
└── layout/     # Shell and navigational elements (Header, Sidebar, Breadcrumbs, PageContainer)
```

## Architectural Guidelines

1. **Server vs. Client Components**:
   - Default to Server Components where possible.
   - Add `"use client"` directive only when components use hooks (`useState`, `useEffect`), browser events, or context providers.
   - Keep interactive client components as leaf nodes in the render tree.

2. **Component Separation**:
   - **Primitives (`ui/`)**: Reusable across any feature. Should not have domain/business logic.
   - **CRUD Components (`crud/`)**: Reusable data-driven patterns (e.g., sortable tables with pagination, filter bars, delete confirmation modals).
   - **Layout (`layout/`)**: Consistent page wrappers, responsive navigation, and header controls.

3. **Styling & Accessibility**:
   - Styled using Tailwind CSS v4.
   - Maintain accessibility (ARIA roles, keyboard navigation, focus management) on interactive elements.

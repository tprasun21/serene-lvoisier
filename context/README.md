# React Context Providers (`/context`)

This directory contains client-side React Context providers that manage cross-cutting UI/UX state across the application.

## Recommended Providers to Add

| Provider | File | Purpose |
| :--- | :--- | :--- |
| **Toast Context** | `toast-context.tsx` | Provides a global queue and trigger function for displaying success/error toast alerts. |
| **Modal / Dialog Context** | `modal-context.tsx` | Manages centralized modal states (e.g. open entity drawer, confirm delete modal) so components don't duplicate modal DOM trees. |
| **Theme Context** | `theme-provider.tsx` | Manages light, dark, or system color themes. |
| **Root Providers** | `providers.tsx` | Aggregates all context providers into a single wrapper for cleaner integration in `app/layout.tsx`. |

## Guidelines

- Keep contexts marked with `"use client"`.
- Avoid storing high-frequency server data in Context; use Server Components or React Query/SWR for server state, and use Context strictly for client-side UI states.

# Production CRUD Architecture Guide

This document outlines the architectural blueprint for building scalable, type-safe Create, Read, Update, and Delete (CRUD) applications in this Next.js project.

> **Project rules come first.** [`AGENTS.md`](AGENTS.md) is the project contract, and folder-level `AGENTS.md` files (e.g. `components/ui/`, `lib/ai/`, `lib/sources/`, `lib/db/`) add detailed rules. If this guide and AGENTS.md disagree, AGENTS.md wins. Server Actions handle UI mutations; route handlers in `app/api/` handle auth, cron, AI and external calls. Database code lives in `lib/db/`.

---

## 1. Directory Structure Map

```
serene-lavoisier/
├── actions/                   # Next.js Server Actions for CRUD mutations & cache revalidation
│   └── README.md
├── app/                       # App Router: Pages, layouts, loading/error boundaries
│   ├── api/                   # REST Route Handlers for external APIs and webhooks
│   │   └── README.md
│   ├── globals.css            # Tailwind CSS v4 styling rules
│   ├── layout.tsx             # Root application shell
│   └── page.tsx               # Main entry / dashboard view
├── components/                # Reusable React components
│   ├── crud/                  # DataTables, Pagination, SearchBars, DeleteDialogs
│   │   └── README.md
│   ├── layout/                # Navbar, Sidebar, Breadcrumbs, PageHeaders
│   │   └── README.md
│   ├── ui/                    # Primitive design system widgets (Button, Input, Modal, Toast)
│   │   └── README.md
│   └── README.md
├── context/                   # React Context Providers for client UI state (Toasts, Modals)
│   └── README.md
├── hooks/                     # Custom hooks (useDebounce, usePagination, useToast, useModal)
│   └── README.md
├── lib/                       # Utilities, database clients, constants
│   ├── validations/           # Runtime validation schemas (Zod)
│   │   └── README.md
│   └── README.md
├── types/                     # Shared TypeScript interfaces, DTOs, and API responses
│   └── README.md
├── .agents/                   # Antigravity permissions and lifecycle hooks
│   ├── hooks.json
│   ├── rules/
│   └── scripts/
├── GEMINI.md                  # Workspace-level rules for AI coding assistant
└── AGENTS.md                  # Project instructions
```

---

## 2. Production CRUD Data Flow

```
┌──────────────────────────────────────────────────────────────┐
│                        User Interface                        │
│   (Server Components + Leaf Client Components in /components)│
└──────────────────────────────┬───────────────────────────────┘
                               │
                Form Submit / Action Trigger
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                    Input Validation Layer                    │
│                     (/lib/validations)                       │
│       • Runtime schema parsing (Zod)                         │
│       • Returns structured field errors on failure           │
└──────────────────────────────┬───────────────────────────────┘
                               │
                       Validated Payload
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                     Server Actions Layer                     │
│                         (/actions)                           │
│       • Authentication & authorization checks                │
│       • Database write/update/delete operation               │
│       • revalidatePath() to refresh cached UI                │
│       • Returns standardized ActionResponse<T>               │
└──────────────────────────────┬───────────────────────────────┘
                               │
                       Result Response
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                  Client UI Feedback & UX                     │
│                (/hooks, /context, /components/ui)            │
│       • Toast notification on success/failure                │
│       • Close modal / reset form state                       │
│       • Optimistic or revalidated table updates              │
└──────────────────────────────────────────────────────────────┘
```

---

## 3. Layer Responsibilities & Best Practices

| Layer | Folder | Responsibility | Best Practices |
| :--- | :--- | :--- | :--- |
| **Presentation** | `components/` | Rendering UI elements, layout framing, and user interactions. | Keep server components default; use `"use client"` only for interactive hooks and state. |
| **Interaction** | `hooks/` | Reusable client-side logic (debouncing, pagination calculation). | Extract repetitive stateful logic out of components into dedicated hooks. |
| **Contract** | `types/` | Compile-time type safety for entities, DTOs, and API responses. | Use centralized definitions to ensure client and server remain synchronized. |
| **Integrity** | `lib/validations/` | Runtime contract enforcement. | Share schemas between client form handlers and server action guards. |
| **Mutations** | `actions/` | Server-side business logic, database transactions, and cache management. | Always validate inputs, handle exceptions gracefully, and trigger cache revalidation. |
| **Global UI** | `context/` | Ephemeral client-side state (notifications, active modal). | Keep contexts focused on UI state rather than caching large data sets. |

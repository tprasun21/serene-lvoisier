# UI Primitives (`/components/ui`)

This directory contains reusable, stateless UI building blocks (design system primitives). These components are independent of specific domain models and can be used across any feature.

## Recommended Components to Add

| Component | File | Purpose |
| :--- | :--- | :--- |
| **Button** | `button.tsx` | Standard button with variants (`primary`, `secondary`, `outline`, `destructive`, `ghost`, `link`) and loading spinner states. |
| **Input** | `input.tsx` | Form text input with focus rings, placeholder, error state styling, and disabled states. |
| **Textarea** | `textarea.tsx` | Multi-line text input with automatic resizing or fixed dimensions. |
| **Select / Dropdown** | `select.tsx` | Accessible dropdown menu for selecting values and filters. |
| **Modal / Dialog** | `dialog.tsx` | Accessible dialog with backdrop blur, focus trap, and keyboard ESC escape. |
| **Badge** | `badge.tsx` | Status indicators (`active`, `pending`, `archived`, `error`, `success`). |
| **Card** | `card.tsx` | Container for grouping related content with header, content, and footer sections. |
| **Table** | `table.tsx` | Primitive table elements (`<Table>`, `<TableHeader>`, `<TableRow>`, `<TableCell>`). |
| **Skeleton** | `skeleton.tsx` | Placeholder shimmer animations for loading states. |
| **Toast** | `toast.tsx` | Floating alert notification system for CRUD success/failure feedback. |

## Implementation Conventions

- Avoid hardcoded business logic or API queries inside these components.
- Expose standard HTML attributes via `React.ComponentPropsWithRef<"button">` or TypeScript interfaces.
- Support a `className` prop for contextual style overrides using Tailwind CSS.

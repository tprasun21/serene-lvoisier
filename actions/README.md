# Server Actions (`/actions`)

This directory contains Next.js **Server Actions** (`"use server"`). Server Actions handle all CRUD mutations and data operations directly on the server without needing boilerplate REST route handlers.

## Standard CRUD Action Pattern

Each entity typically has an action module (e.g. `item.actions.ts`) containing:

```ts
"use server";

import { revalidatePath } from "next/cache";
import { createItemSchema } from "@/lib/validations/item.schema";
import type { ActionResponse } from "@/types/crud";

export async function createItem(formData: unknown): Promise<ActionResponse> {
  // 1. Validate payload
  const parsed = createItemSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    // 2. Perform database mutation
    // const newItem = await db.item.create({ data: parsed.data });

    // 3. Revalidate Next.js cache
    revalidatePath("/items");

    return { success: true, data: /* newItem */ };
  } catch (error) {
    return { success: false, error: "Failed to create item" };
  }
}
```

## Recommended Actions Modules

- `[entity].actions.ts`: Standard `create`, `update`, `delete`, and `get` operations for a specific domain model.
- `bulk.actions.ts`: Batch operations (bulk delete, status updates).

## Production Guidelines

1. **Always Validate Server-Side**: Never trust client inputs; always parse with validation schemas from `@/lib/validations`.
2. **Standardized Responses**: Return consistent `ActionResponse<T>` envelopes containing `{ success, data, error, fieldErrors }`.
3. **Cache Invalidation**: Call `revalidatePath(...)` or `revalidateTag(...)` immediately after mutations so the UI reflects changes instantly.
4. **Security**: Perform authentication checks and permission validation inside each server action before executing database writes.

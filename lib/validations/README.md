# Validation Schemas (`/lib/validations`)

This directory houses runtime input validation schemas (typically using **Zod** or similar schema validation libraries). They enforce type safety and constraints at runtime on both client-side forms and server-side actions/API endpoints.

## Why Separate Validation Schemas?

1. **Single Source of Truth**: The same schema validates client-side form submissions (with React Hook Form) and server-side payloads before saving to the database.
2. **Type Inference**: TypeScript types can be inferred automatically from schemas:
   ```ts
   export const createItemSchema = z.object({
     title: z.string().min(1, "Title is required").max(100),
     description: z.string().optional(),
     status: z.enum(["draft", "published", "archived"]),
   });

   export type CreateItemInput = z.infer<typeof createItemSchema>;
   ```
3. **Safe Parsing**: Allows server actions to safely parse inputs and return structured error messages for invalid fields.

## Recommended Files

| File | Purpose |
| :--- | :--- |
| `common.ts` | Shared schema fragments (pagination params, ID formats, email/password regex). |
| `<entity>.schema.ts` | Creation and update schemas for specific entities (e.g. `item.schema.ts`, `user.schema.ts`). |

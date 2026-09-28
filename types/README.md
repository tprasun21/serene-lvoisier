# TypeScript Type Definitions (`/types`)

This directory contains shared TypeScript interfaces, types, and enums used across the client, server actions, route handlers, and data models.

## Recommended Type Files to Add

### 1. `crud.ts` (Core CRUD Contracts)
Defines reusable generic interfaces for all CRUD operations:

```ts
export type SortOrder = "asc" | "desc";

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface QueryFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
  [key: string]: unknown;
}

export type ActionResponse<T = void> = 
  | { success: true; data: T; message?: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };
```

### 2. `entities/` or Entity-Specific Types (e.g., `user.ts`, `product.ts`)
- **Domain Models**: Complete shape of records including system fields (`id`, `createdAt`, `updatedAt`).
- **Create DTOs**: Payload required to instantiate an entity (omitting auto-generated fields).
- **Update DTOs**: Partial payload (`Partial<CreateDTO>`) plus record identifier.

### 3. `ui.ts`
- Table column configurations, badge variants, and navigation link specifications.

## Conventions
- Prefer `interface` for entity data shapes that can be extended.
- Prefer `type` for unions, primitives, and utility types.
- Export all domain types from an `index.ts` barrel file for clean `@/types` imports.

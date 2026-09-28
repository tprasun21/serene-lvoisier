# Route Handlers (`/app/api`)

This directory contains Next.js **Route Handlers** (`route.ts`) for HTTP endpoints that serve external clients, webhooks, file exports, or traditional REST integrations.

## When to Use Route Handlers vs. Server Actions

- **Use Server Actions (`/actions`)**: For form submissions, data mutations, and UI-driven CRUD operations within the Next.js app (simpler, faster, automatic cache revalidation).
- **Use Route Handlers (`/app/api`)**:
  - Webhooks (e.g., Stripe, GitHub, Clerk).
  - External public API endpoints consumed by mobile apps or third-party services.
  - File generation and streaming (e.g. exporting records as CSV, Excel, or PDF).
  - Custom HTTP methods (e.g., `HEAD`, `OPTIONS`, `PATCH`).

## Standard Route Handler Pattern

```ts
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page") || "1");

  // Fetch data
  return NextResponse.json({ success: true, page });
}
```

# Utility and Business Libraries (`/lib`)

This directory contains utility functions, database/client singletons, constants, and schema validation logic shared across the project.

## Directory Structure

```
lib/
├── utils.ts          # Generic helpers (string manipulation, date formatting, class merging)
├── constants.ts      # Application-wide defaults (pagination limits, status lists)
├── db.ts             # Database connection singleton (e.g., Prisma, Drizzle, PostgreSQL client)
└── validations/      # Runtime input validation schemas (Zod)
```

## Recommended Files

### 1. `utils.ts`
Contains shared helper functions:
- `cn(...classes)`: Class name merge utility for Tailwind CSS.
- `formatDate(date, format)`: Standardized date and time formatting.
- `formatCurrency(amount, currency)`: Localized currency formatter.

### 2. `constants.ts`
Centralizes project defaults and magic values:
- `DEFAULT_PAGE_SIZE = 10`
- `MAX_PAGE_SIZE = 100`
- `STATUS_OPTIONS = [...]`

### 3. `validations/`
Houses schemas that validate user inputs on both client forms and server actions.

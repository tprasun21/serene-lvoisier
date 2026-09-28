# Custom Hooks (`/hooks`)

This directory contains client-side React hooks that encapsulate reusable stateful logic, side effects, and interaction patterns for CRUD workflows.

## Recommended Hooks to Add

### 1. `use-debounce.ts`
- **Purpose**: Delays updating a value until a specified timeout has elapsed without changes.
- **Use Case**: Search inputs in data tables to prevent firing database/API queries on every single keystroke.
- **Example Usage**:
  ```tsx
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);
  ```

### 2. `use-pagination.ts`
- **Purpose**: Manages current page, total records, page size, and calculates offset/page limits.
- **Use Case**: Coordinating pagination state between data tables and query parameters.

### 3. `use-modal.ts`
- **Purpose**: Streamlines controlling modal open/close states, active entity data, and reset triggers.
- **Use Case**: Opening create/edit drawers or inspection dialogs with selected record payload.

### 4. `use-toast.ts`
- **Purpose**: Interface for emitting and dismissing transient feedback notifications.
- **Use Case**:
  ```tsx
  const { toast } = useToast();
  toast({ title: "Item Created", description: "Record #104 has been added.", variant: "success" });
  ```

### 5. `use-confirm.ts`
- **Purpose**: Provides a promise-based or callback-based trigger for modal confirmation before destructive actions.

## Rules for Custom Hooks
- Prefix all custom hook filenames and function names with `use` (e.g. `use-debounce.ts`, `export function useDebounce`).
- Must run in Client Component contexts (`"use client"`).
- Keep hooks modular and focused on a single responsibility.

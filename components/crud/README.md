# CRUD Components (`/components/crud`)

This directory contains reusable UI patterns tailored specifically for full Create, Read, Update, and Delete workflows. These components standardize how data is presented, filtered, edited, and deleted across the application.

## Key Components to Add

### 1. `data-table.tsx`
- **Purpose**: Generic tabular view for paginated and sortable collections of records.
- **Features**:
  - Column definition props (accessor, header title, custom cell renderers).
  - Sorting toggles (ascending/descending indicators).
  - Row action menus (Edit, View Details, Delete).
  - Selection checkboxes for batch operations.

### 2. `pagination-controls.tsx`
- **Purpose**: Pagination bar beneath data tables and grid cards.
- **Features**:
  - Page numbers, next/previous buttons, and "items per page" selector.
  - Integration with URL search parameters (e.g. `?page=2&limit=10`).

### 3. `search-filter-bar.tsx`
- **Purpose**: Unified toolbar above data views for searching and filtering datasets.
- **Features**:
  - Debounced text search input.
  - Filter dropdowns (e.g. category, status, date range).
  - "Clear filters" action button.

### 4. `confirm-delete-dialog.tsx`
- **Purpose**: High-safety modal dialog before executing permanent deletions.
- **Features**:
  - Clear warning message specifying the item name/ID being deleted.
  - Destructive styling on the confirm button.
  - Pending/loading state during deletion execution.

### 5. `empty-state.tsx`
- **Purpose**: Visual presentation when a query returns zero results.
- **Features**:
  - Friendly icon, descriptive title, and a primary "Create New" Call-To-Action (CTA).

### 6. `form-wrapper.tsx`
- **Purpose**: Form layout container that manages submission state, validation errors, and action buttons (Cancel / Save / Submit).

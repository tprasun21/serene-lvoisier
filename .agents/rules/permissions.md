# Permissions & Tool Execution Policy

## Permissions Configuration

### Allowed (`allow`)
- `npm run dev`
- `npm run build`
- `npm start`
- `npm run lint`

### Confirmation Required (`ask`)
- `git commit`
- `git push`

### Denied (`deny`)
- Any read, view, create, or edit operation on `.env*` files
- Any terminal commands inspecting or altering `.env*` files

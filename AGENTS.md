# Project Permissions and Security Rules

## Tool Execution & Command Permissions

The following permissions are enforced for all agent operations in this workspace:

### 1. Always Allowed (`allow`)
The following build, run, and lint commands are pre-approved and may be executed without prompting:
- `npm run dev`
- `npm run build`
- `npm start` / `npm run start`
- `npm run lint` / `npm lint`

### 2. Requires Explicit Confirmation (`ask`)
The following version control operations must NEVER be performed autonomously; always ask the user for confirmation first:
- `git commit`
- `git push`

### 3. Strictly Forbidden (`deny`)
Under no circumstances should the agent read, inspect, create, or modify any environment variable files:
- Reading any `.env` file (e.g. `.env`, `.env.local`, `.env.production`, etc.) is **denied**.
- Editing or creating any `.env` file is **denied**.
- Shell commands displaying or manipulating `.env` files are **denied**.

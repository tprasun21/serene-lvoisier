# lib/auth — Authentication, roles, key encryption

Applies to `lib/auth/` (Better Auth config, session helpers, role checks, encryption helpers). Server-only.

---

## 1. Better Auth

Use **Better Auth** for email/password sign-in, session management and the account/session lifecycle. Social providers and organizations are added only if explicitly enabled later. **Never build a custom password or session system.**

- Mount it at `app/api/auth/[...all]/route.ts`, using the Drizzle adapter (tables in [`lib/db/AGENTS.md`](../db/AGENTS.md)).
- Auth UI (Sign In, Sign Up, Sign Out, Account Settings) follows the design system and lives in `components/auth/`.
- Use Better Auth's built-in rate limiting for auth endpoints (sign-in, sign-up). Check its current config options when implementing.

## 2. Session helpers

Expose a small server API and use it everywhere:

```ts
getSession(): Promise<Session | null>
requireUser(): Promise<User>          // throws 401 if signed out
requireAdmin(): Promise<User>         // throws 403 unless role === "admin"
```

- Identity **always** comes from the session. Never trust a `userId` from a request body, query, header or form field.
- Every route handler and Server Action that touches user data calls `requireUser()` or `requireAdmin()` first.
- Page-level redirects (e.g. `/settings`, `/for-you`, `/admin/*`) are a convenience. The real authorization check happens in the data layer and handlers.

## 3. Roles (super-admin)

- Use the Better Auth **admin plugin**, which adds a `role` field to `user`. Check the plugin's current fields when implementing.
- `role = "admin"` is the **super-admin** that manages global news sources. Everyone else is `"user"`.
- Admins are promoted manually (a seed script or an existing admin). There's no self-service path to admin.
- Super-admin can: manage the global source registry, run tests and fetches, change content rights and parsing rules.
- An ordinary user can only work on **their own** sources, bookmarks, preferences and key.

## 4. OpenRouter key encryption

Module: `lib/auth/encryption.ts` (server-only).

- **AES-256-GCM**, with the master key derived from `OPENROUTER_KEY_ENCRYPTION_SECRET`.
- A fresh random 12-byte IV for every encryption. Store `iv + authTag + ciphertext` together in `openrouter_credential.encrypted_api_key`.
- Store `encryption_key_version` so the master key can be rotated later.
- `key_fingerprint` is a non-reversible identifier (e.g. HMAC-SHA-256 of the key) used to scope health records. `key_hint` is the last 4 characters, for display only.
- Decrypt only inside the server request that needs the key. Never return the encrypted or plaintext key to the client.
- Never log the key, even partially (apart from `key_hint`), and never include it in error messages.
- **Delete / disconnect** removes the credential row completely.

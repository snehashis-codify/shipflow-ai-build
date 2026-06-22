# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo Structure

This is a **pnpm + Turborepo** monorepo. All commands should be run from the repo root unless noted.

```
apps/
  web/          # Next.js 16 frontend (React 19, TypeScript, Tailwind v4)
packages/
  auth/         # better-auth instance wired to Drizzle/Postgres
  database/     # Drizzle ORM client + schema + migrations
  trpc/         # Shared tRPC router (standalone, not used by the web app's server layer)
  utils/        # Shared Zod schemas
```

Package names use the `@repo/` scope (e.g. `@repo/auth`, `@repo/database`).

## Commands

### Root (Turborepo)

```bash
pnpm dev        # Run all packages/apps in dev mode concurrently (turbo)
pnpm build      # Build all packages and the web app (dependency-ordered)
```

### Web app (`apps/web`)

```bash
pnpm --filter web dev     # Next.js dev server on :3000
pnpm --filter web build   # Production build
pnpm --filter web lint    # ESLint (eslint.config.mjs)
```

### Database (`packages/database`)

```bash
pnpm --filter @repo/database db:up        # Start Postgres via Docker Compose
pnpm --filter @repo/database db:down      # Stop Postgres
pnpm --filter @repo/database db:generate  # Generate Drizzle migrations from schema changes
pnpm --filter @repo/database db:migrate   # Apply pending migrations
pnpm --filter @repo/database dev          # Open Drizzle Studio (GUI)
```

### First-time setup

```bash
./setup.sh      # Creates .env from .env.example and symlinks it into every package/app
pnpm install
pnpm --filter @repo/database db:up
pnpm --filter @repo/database db:migrate
```

## Environment Variables

A single `.env` at the repo root is symlinked into every package by `setup.sh`. Required variables (see `.env.example`):

```
DB_USER / DB_PASSWORD / DB_NAME
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET     # min 32 chars
BETTER_AUTH_URL        # base URL of the server
GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET
```

## Architecture

### Next.js version warning

**This project uses Next.js 16.2.9 with React 19**, which has breaking API changes from the versions in Claude's training data. Before editing anything in `apps/web`, read `node_modules/next/dist/docs/` for the relevant guide.

### Auth flow

- `packages/auth` exports a single `auth` instance (better-auth, GitHub OAuth provider, Drizzle adapter).
- The catch-all route `apps/web/src/app/api/auth/[...all]/route.ts` mounts the better-auth handler.
- GitHub sign-in is triggered via a Next.js **Server Action** (`src/features/auth/actions/index.ts`) which calls the tRPC server caller → `authRouter.githubSignInProvider` → `auth.api.signInSocial`, then redirects to the returned URL.
- Route guards (`requireAuth` / `requireUnauth`) are stubbed out in comments; the `(auth)` and `(protected)` route groups have placeholder layouts ready to wire them in.

### tRPC setup (two-layer)

There are **two separate tRPC setups** that must not be confused:

1. **`packages/trpc`** — a standalone package with `appRouter` (currently only a `health` procedure). Intended for cross-app sharing but not yet consumed by the web app.
2. **`apps/web/src/server/api/`** — the web app's own tRPC layer:
   - `trpc.ts` — initialises tRPC with the request `Context` (forwarded `headers`).
   - `root.ts` — composes sub-routers into `serverRouter` (currently `auth`).
   - `routers/auth.ts` — `githubSignInProvider` mutation.
   - `src/trpc/server-caller.ts` — creates a server-side caller (used in Server Actions, never exposed to the client).

### Database schema

`packages/database/src/models/auth.ts` defines the four better-auth tables: `user`, `session`, `account`, `verification`. Schema entrypoint for Drizzle Kit is `packages/database/src/models/schema.ts`.

### UI components

`apps/web/src/components/ui/` contains shadcn/ui components (style: `radix-nova`, icon library: `lucide`). Add new components with:

```bash
pnpm --filter web dlx shadcn@latest add <component>
```

New feature code belongs in `apps/web/src/features/<feature-name>/` with sub-directories `actions/`, `components/`, `utils/`.

### Path aliases

Inside `apps/web`, use `@/` for `src/` (e.g. `@/components/ui/button`).

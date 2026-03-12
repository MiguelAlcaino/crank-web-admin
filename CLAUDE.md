# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vue 3 + TypeScript admin dashboard for managing fitness classes (Crank Fit). Built as a library that exports app initialization functions for embedding into other systems.

## Commands

```bash
npm run dev              # Start dev server
npm run build            # Type-check + build (run-p type-check build-only)
npm run type-check       # vue-tsc --noEmit
npm run lint             # ESLint with auto-fix
npm run format           # Prettier (100 char width, single quotes, 2-space indent, no semicolons)
npm run codegen          # GraphQL Code Generator (regenerate src/gql/ from schema + .graphql files)
npm run test:unit        # Vitest with jsdom
```

## Architecture

### Multi-Entry Library Build

The app is built in **library mode** (Vite). `src/start-app-functions.ts` exports ~12 named functions (e.g., `startCalendarApp`, `startCustomerCreateApp`, `startPaymentLinksApp`) that mount isolated Vue apps into host pages. Each function creates its own Vue instance with router, Pinia, and Apollo.

### Module Structure

Feature code lives in `src/modules/`. Each module can contain:
- `views/` — page components
- `components/` — module-specific components
- `composables/` — Vue 3 composables (data fetching, state)
- `router/` — route definitions (lazy-loaded)
- `graphql/` — `.graphql` operation files
- `interfaces/` — TypeScript interfaces

Key modules: `class-schedule`, `customer`, `payment-links`, `gift-card`, `admin-user`, `room-layout`, `auth`, `shared`.

### GraphQL / API Layer

- **Apollo Client** with auth link (Bearer token) and automatic token refresh on `jwt.expired_access_token` errors
- `src/services/apiService.ts` — large service class containing most GraphQL queries/mutations inline
- Newer modules (e.g., `payment-links`) use separate `.graphql` files with **GraphQL Code Generator** (`codegen.ts` → `src/gql/`)
- Schema introspection file: `graphql.schema.json`

### State Management

- **Pinia** stores in `src/stores/`:
  - `authToken` — JWT storage (localStorage), refresh token timeout
  - `appStorage` — site selection (Dubai/AbuDhabi/TownSquare), dayjs locale config

### Auth & Roles

- JWT-based auth with auto-refresh (1 min before expiry) in `src/services/authService.ts`
- Role-based route guards: `ROLE_SUPER_ADMIN`, `ROLE_STAFF`, `ROLE_ADMIN_MANAGER`, `ROLE_USER`, `ROLE_INSTRUCTOR`
- Multi-site support with site-scoped data

### Shared Components

Reusable components in `src/modules/shared/components/`: Modal, Pagination, Stats widgets, Charts, ErrorMessage, ProgressBar, etc.

## Conventions

- All components use `<script setup lang="ts">`
- Composables handle data fetching and return reactive state + methods
- Routes use `meta.requiresAuth` and `meta.role` for access control
- Environment variables prefixed with `VITE_` (see `.env.development`)

## Local Development & Testing

### Local GQL Server

- **URL**: `https://crank-payments.crank.local/api/graphql/`
- **Admin token**:
  ```bash
  curl --location 'https://crank-payments.crank.local/api/admin_login_check' \
    --header 'Content-Type: application/json' \
    --data-raw '{"email":"miguel.alcaino@ogb.cl","password":"12345678"}'
  ```
- **User token**:
  ```bash
  curl --location 'https://crank-payments.crank.local/api/login_check?site=dubai' \
    --header 'Content-Type: application/json' \
    --data-raw '{"username":"gabrielcorrearamirez@gmail.com","password":"gabriel123456"}'
  ```
- Then use the token in the `Authorization: Bearer <token>` header to test GQL operations.

## Feature Development Workflow

When starting a new feature, follow these steps in order:

### 1. Branch

- **Ask the user** whether to branch from `develop` or `main`.
- Create a feature branch (e.g., `feature/short-description`) and work on it.

### 2. Implement

- Work on the feature branch. Follow the module structure and conventions above.
- If the feature touches GraphQL, run `npm run codegen` after modifying `.graphql` files or the schema.

### 3. Test

- **Browser verification (required)**: Start the dev server (`npm run dev`) and use Chrome automation tools to visually verify the feature works — navigate to the relevant pages, interact with the UI, and confirm expected behavior.
- **Unit tests (when applicable)**: If the feature introduces testable logic in composables, utils, or services, write Vitest tests. Pure UI rendering does not need unit tests.
- **Type-check**: Run `npm run type-check` to catch type errors.

### 4. Lint & Format

- Run `npm run lint` to auto-fix lint issues.
- Run `npm run format` if needed.

### 5. Commit

- Stage and commit changes on the feature branch with a clear commit message.

### 6. PR

- **Do not create a PR automatically.** The user wants to review code before merging, so let them handle PR creation unless explicitly asked.

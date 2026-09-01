# Mirha Vacation Homes

A luxury vacation rental platform for Dubai-based Mirha Vacation Homes, featuring property listings, booking management, customer inquiries, and a secure admin dashboard.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/mirha-web run dev` — run the frontend (port 21749)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Wouter routing, TanStack Query, Tailwind CSS, shadcn/ui, Framer Motion
- API: Express 5 + express-session
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Fonts: Playfair Display (headings) + Plus Jakarta Sans (body)
- Color palette: Champagne gold (#primary) on deep navy (#secondary)

## Where things live

- `lib/api-spec/openapi.yaml` — API contract (source of truth)
- `lib/db/src/schema/` — DB schema: properties.ts, bookings.ts, inquiries.ts
- `artifacts/api-server/src/routes/` — properties, bookings, inquiries, admin
- `artifacts/mirha-web/src/` — React frontend
- `artifacts/mirha-web/src/pages/` — Home, Properties, PropertyDetail, Booking, About, Contact, Admin pages

## Architecture decisions

- Contract-first: OpenAPI spec → Orval codegen → typed React Query hooks + Zod validators
- Admin auth via express-session with cookie (username: admin, password: mirha2024 by default)
- Array columns stored as PostgreSQL text[] (Drizzle `.array()`)
- `/properties/featured` and `/properties/stats` routes registered before `/:id` to avoid Express route conflicts
- Total price calculated server-side from nights × property.pricePerNight

## Product

- Browse luxury Dubai holiday apartments, penthouses, villas, and rooms
- Search and filter by type, price, bedrooms, and location
- View full property details with gallery, amenities, and booking form
- Submit booking requests (pending → confirmed by admin)
- Contact form and WhatsApp integration for customer inquiries
- Admin dashboard: manage properties, bookings, and inquiries

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Google Fonts `@import url(...)` must be the very first line in index.css (before `@import "tailwindcss"`)
- Run `pnpm run typecheck:libs` after changing any `lib/*` schema before checking artifact typechecks
- Admin credentials are env vars: `ADMIN_USERNAME` (default: admin), `ADMIN_PASSWORD` (default: mirha2024)
- Session secret is from `SESSION_SECRET` env var

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details

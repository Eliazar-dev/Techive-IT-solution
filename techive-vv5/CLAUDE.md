# Techive IT Solutions — Project Context for Claude Code

## What this is
A monorepo (npm workspaces): `apps/web` (React + Vite + TS + Tailwind), `apps/api` (Express + TS + Prisma/Neon), `packages/shared` (shared TS types). Deploys as a single monolithic project on Vercel.

This codebase is **already fully built and verified** — not a scaffold. `npm install` succeeds, the shared package and frontend both build with zero TypeScript errors, the backend passes a full type-check with zero errors. Treat existing code as the source of truth for patterns; extend it, don't replace it.

## Ground rules (always apply, every session)
- Never delete or restructure existing files without listing them and getting explicit confirmation first.
- Never commit `.env` files or print secret values (API keys, JWT secrets, passwords) in chat or terminal output — confirm they're set, don't echo them.
- Work in git. Commit after each meaningful, tested change — not in one giant batch.
- Work in phases when a task is multi-step. Report what you did after each phase and wait for confirmation before continuing to the next, unless told otherwise.
- Test locally before declaring something done — "it compiles" is not the same as "it works."

## Design source of truth
Figma file key: `gG72qbf1PvWnuXXE0y4cRK`. Section node IDs are in `reference/FIGMA_NODE_MAP.md`. Design tokens (colors, fonts, spacing) are already configured in `apps/web/tailwind.config.js` — use those utility classes (`bg-brand-gradient`, `text-ink`, `text-muted`, `rounded-card`, etc.) rather than raw hex values or arbitrary Tailwind values, so the whole site stays visually consistent. Use your Figma Dev Mode MCP connection to pull exact design context per section when refining pixel accuracy.

## Backend patterns
`apps/api/src/routes/services.ts` is the reference CRUD pattern — every other resource (`solutions.ts`, `courses.ts`, `projects.ts`, `team.ts`, `blog.ts`, `testimonials.ts`) already follows it. If adding a new resource, copy this pattern exactly: Joi validation schema, public router (read-only), admin router (`requireAdmin` + full CRUD), Prisma error handling for `P2002`/`P2025`.

Known lessons already baked into this codebase — don't reintroduce these bugs:
- File uploads use `multer.memoryStorage()` streamed directly to Cloudinary (`apps/api/src/middleware/upload.ts`) — never write uploads to local disk, Vercel's serverless filesystem is read-only outside `/tmp`.
- Email (`apps/api/src/lib/email.ts`) always sets `replyTo` on customer-facing emails.
- CORS only allows `FRONTEND_URL` in production, never a wildcard.
- Rate limiting is applied to `/api/admin/auth/login` and `/api/contact` from day one.

## Frontend patterns
`apps/web/src/lib/api.ts` is the typed public API client (imports types from `@techive/shared`). `apps/web/src/lib/adminApi.ts` is the authenticated admin client. `apps/web/src/components/admin/AdminResourceList.tsx` is a generic CRUD UI driven by field-config props — used for 7 of the 8 admin sections (see `apps/web/src/pages/admin/AdminDashboard.tsx` for how each resource configures it). Don't hardcode content in page components — always fetch via `lib/api.ts`, with a graceful fallback for loading/error states.

## What's genuinely unfinished (don't assume these exist)
- Visual placeholders (gradient divs) stand in for real images/photography everywhere — hero visual, solution cards, portfolio thumbnails, team photos.
- No pixel-perfect Figma verification pass has been done yet on 7 of 11 sections.
- No chatbot, no AI features (undiscussed/unscoped as of this writing).
- No legal pages (Privacy Policy/Terms), no SEO/sitemap work.

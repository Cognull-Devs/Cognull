# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Cognull institutional landing page (Portuguese/pt-BR content) — a marketing/positioning site with a lead-capture form, built with Vite + React + TypeScript + Tailwind + shadcn/ui.

## Commands

- `npm run dev` — start dev server at http://localhost:8080 (see `vite.config.ts`; not the Vite default 5173)
- `npm run build` — production build
- `npm run build:dev` — build in development mode (unminified, useful for debugging build issues)
- `npm run preview` — serve the production build locally
- `npm run lint` — run ESLint

There is no test suite and no test runner configured in this repo.

## Architecture

**Routing is manual, not a router library.** `src/App.tsx` reads `window.location.pathname` directly and switch-renders one of three pages — there is no `react-router-dom` dependency despite what README.md's tech list says (treat that README section as aspirational/stale):
- `/` → `Index.tsx` (loaded eagerly)
- `/formulario` → `Formulario.tsx` (lazy-loaded)
- anything else → `NotFound.tsx` (lazy-loaded)

When adding a new route/page, add a path check in `App.tsx`; there's no route config file or nested routing.

**React is aliased to Preact at build time.** `vite.config.ts` rewrites `react`, `react-dom`, and their subpaths to `preact/compat` for bundle-size reasons. Code is written against the normal React API, but at runtime it's Preact underneath — keep this in mind if something behaves subtly differently from stock React (e.g. certain edge-case React internals/devtools behavior), since preact/compat doesn't cover 100% of React's surface.

**Page components are large and self-contained.** `Index.tsx` (~730 lines) and `Formulario.tsx` (~570 lines) each inline their own icon components (raw SVGs, e.g. `Menu`, `X`, `Github`, `Linkedin`, `WhatsApp`), animation setup, and section markup rather than splitting into many small files. Follow this existing convention rather than aggressively extracting components unless a piece is reused.

**Canvas/WebGL background animation.** Both `Index.tsx` and `Formulario.tsx` set up a canvas-based particle/atom animation in a `useEffect`, gated behind checks for `prefers-reduced-motion`, small screens (`window.innerWidth < 1024`), and low `navigator.hardwareConcurrency` — the animation is skipped entirely in those cases. Preserve these guards when touching that code; they exist for performance/accessibility, not by accident.

**Email delivery via EmailJS, no backend.** `Formulario.tsx` submits the contact form using `@emailjs/browser` directly from the client. Configuration (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`) comes from `.env.local` (gitignored) — see `EMAILJS_SETUP.md` for the full setup flow if these need to be reconfigured. In production (Vercel), these must be set as environment variables in the hosting dashboard, not committed.

**shadcn/ui components live in `src/components/ui/`** and are generated/managed via the shadcn CLI per `components.json` (style: default, baseColor: slate, path aliases `@/components`, `@/lib`, `@/hooks`, `@/ui`). Treat these as vendored — prefer regenerating/composing via shadcn conventions over hand-editing internals.

**Deployment is Vercel**, configured via `vercel.json` for SPA rewrites (all paths → `index.html`, since routing is client-side only) and asset cache headers.

## Linting notes

`@typescript-eslint/no-unused-vars` is explicitly turned off in `eslint.config.js` — don't assume unused-var lint errors will catch dead code.

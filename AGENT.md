# AGENT.md - Veletta Li Wedding Site

## Commands
- Dev: `npm run dev` (with turbopack)
- Build: `npm run build`
- Start: `npm start`
- Lint: `npm run lint`
- TypeScript check: `npx tsc --noEmit`
- No test framework configured

## Architecture
- Next.js 15 with App Router
- TypeScript with strict mode
- Tailwind CSS 4 for styling
- Shadcn/ui components (new-york style)
- Structure: `src/app/` (pages), `src/components/` (UI), `src/lib/` (utilities)
- Key routes: `/`, `/information`, `/rsvp`, `/schedule`

## Code Style
- TypeScript strict mode enforced
- Use `@/` prefix for imports (`@/components`, `@/lib/utils`)
- Shadcn/ui component patterns with `cn()` utility for class merging
- PascalCase for components, camelCase for functions/variables
- ESLint with Next.js rules
- Functional components with TypeScript interfaces
- Tailwind classes preferred over CSS modules

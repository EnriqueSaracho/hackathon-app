# ViltrumHacks — Tech Stack

## Core

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 15 (App Router) | File-based routing, SSR for marketing shell |
| Language | TypeScript | Type-safe models and forms |
| Styling | Tailwind CSS v4 | Utility-first, fast iteration |
| Forms | React Hook Form + Zod | Validation without heavy boilerplate |
| QR | `qrcode` | Client-side PNG generation for download |
| Icons | lucide-react | Lightweight SVG icons |
| Dates | Native `Intl` + optional date-fns | Countdown and formatting |

## No database

All application persistence via `localStorage` wrapped in `src/lib/storage.ts` with `typeof window` guards.

## Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

## Client vs server

- Marketing sections can be server components where possible
- Forms, QR, check-in, countdown, localStorage seed: `"use client"`
- `StorageProvider` client component in layout calls `seedApplications()` on mount

## Dependencies

```bash
npm install react-hook-form zod @hookform/resolvers qrcode lucide-react date-fns
npm install -D @types/qrcode
```

## Testing

Optional for v1. Manual QA per qa-checklist.md. Build gate: `npm run build` must pass.

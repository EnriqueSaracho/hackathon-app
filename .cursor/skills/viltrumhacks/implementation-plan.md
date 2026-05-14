# ViltrumHacks — Implementation Plan

## Build order

### Step 1: Scaffold
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
npm install react-hook-form zod @hookform/resolvers qrcode lucide-react date-fns
npm install -D @types/qrcode
```

### Step 2: Foundation
- [ ] `src/lib/types.ts`
- [ ] `src/lib/ids.ts`
- [ ] `src/lib/qr.ts`
- [ ] `src/lib/validation.ts`
- [ ] `src/lib/storage.ts`
- [ ] `src/content/site.ts`

### Step 3: Layout
- [ ] `globals.css` — CSS variables for tokens, reduced-motion
- [ ] `layout.tsx` — Google fonts (Oswald, Inter, Bebas Neue, Playfair, Rajdhani, Space Mono)
- [ ] `SiteNav.tsx`, `Footer.tsx`, `SiteLayout.tsx`, `StorageProvider.tsx`

### Step 4: Landing
- [ ] `page.tsx` composing all home sections
- [ ] `Hero.tsx`, `Countdown.tsx` (target `2026-08-05T23:59:00-07:00`)
- [ ] `StatCard.tsx`, `ValueCard.tsx`, `ScheduleOutline.tsx`
- [ ] `PastProjectCard.tsx`, `FAQAccordion.tsx`, `SponsorBadge.tsx`

### Step 5: Forms
- [ ] `ApplicationForm.tsx` — role prop: hacker | mentor | volunteer
- [ ] `apply/page.tsx`, `mentor/page.tsx`, `volunteer/page.tsx`

### Step 6: QR & success
- [ ] `QRDisplay.tsx` — render + download PNG + copy
- [ ] `apply/success/page.tsx`

### Step 7: Check-in & debug
- [ ] `CheckInPanel.tsx`, `check-in/page.tsx`
- [ ] `debug/export/page.tsx`

### Step 8: Polish & verify
- [ ] Print styles on success page (`@media print`)
- [ ] `npm run build` — fix all errors
- [ ] Walk through qa-checklist.md

## File checklist (complete list)

```
.cursor/skills/viltrumhacks/* (8 files)
src/app/layout.tsx
src/app/globals.css
src/app/page.tsx
src/app/apply/page.tsx
src/app/apply/success/page.tsx
src/app/mentor/page.tsx
src/app/volunteer/page.tsx
src/app/check-in/page.tsx
src/app/debug/export/page.tsx
src/components/layout/SiteNav.tsx
src/components/layout/Footer.tsx
src/components/layout/SiteLayout.tsx
src/components/layout/StorageProvider.tsx
src/components/home/Hero.tsx
src/components/home/Countdown.tsx
src/components/home/StatCard.tsx
src/components/home/ValueCard.tsx
src/components/home/FAQAccordion.tsx
src/components/home/SponsorBadge.tsx
src/components/home/PastProjectCard.tsx
src/components/home/ScheduleOutline.tsx
src/components/forms/ApplicationForm.tsx
src/components/qr/QRDisplay.tsx
src/components/check-in/CheckInPanel.tsx
src/content/site.ts
src/lib/types.ts
src/lib/storage.ts
src/lib/ids.ts
src/lib/qr.ts
src/lib/validation.ts
```

## Lint / typecheck gates

Before marking done:
1. `npm run build` exits 0
2. No TypeScript errors
3. No ESLint errors blocking build

---
name: viltrumhacks
description: Build and extend ViltrumHacks 2026, a practice Invincible-themed hackathon site with client-side applications, QR check-in, and localStorage. Use when implementing ViltrumHacks, hackathon landing pages, or reading project specs in .cursor/skills/viltrumhacks/.
---

# ViltrumHacks 2026

Practice hackathon/event website for a fictional BC university hackathon with an Invincible-inspired theme (heroic, bold, not gory). No database, no external services.

## Read order

1. [product-spec.md](product-spec.md) — pages, journeys, acceptance criteria
2. [content-spec.md](content-spec.md) — all canonical copy
3. [design-system.md](design-system.md) — tokens, components, motion
4. [tech-stack.md](tech-stack.md) — dependencies and scripts
5. [architecture.md](architecture.md) — folder structure, data models, localStorage, QR
6. [implementation-plan.md](implementation-plan.md) — build order and file checklist
7. [qa-checklist.md](qa-checklist.md) — manual test script

## Constraints

- No database, auth, email, or file uploads
- No Devpost, Discord, Google Forms, or external embeds
- No copyrighted Invincible/Amazon logos or character images
- No real photos or videos — typography, CSS, SVG, Lucide icons only
- Application data stored in browser localStorage only
- Countdown deadline: `2026-08-05T23:59:00-07:00` (PDT)

## Definition of done

- [ ] All routes ship: `/`, `/apply`, `/apply/success`, `/mentor`, `/volunteer`, `/check-in`, `/debug/export`
- [ ] Landing page has all sections per product-spec
- [ ] Forms validate with Zod; submit generates `VH-2026-XXXX` + 8-char check-in code
- [ ] Success page shows QR (JSON payload), download PNG, copy code
- [ ] Check-in validates seeded + submitted applications
- [ ] `npm run build` passes with zero errors
- [ ] Practice disclaimer visible on form success pages

## Quick start (implementation)

```bash
npm run dev
```

Demo flow: `/check-in` with seed code → `/apply` submit → `/apply/success` QR → `/check-in` with new code.

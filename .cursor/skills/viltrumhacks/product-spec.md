# ViltrumHacks — Product Spec

## Personas

### Prospective hacker
University student in BC evaluating whether to attend. Needs clarity on eligibility, experience requirements, logistics, and a fast apply path.

### Volunteer / mentor
Wants a shorter signup with role-specific fields. Same check-in QR flow as hackers.

### Event organizer (check-in)
Needs to validate an attendee at the door by code or QR payload. No admin dashboard required.

## User journeys

### Apply → QR → check-in
1. Visitor lands on `/`, reads about event, clicks Apply
2. Fills `/apply` form, agrees to Code of Conduct
3. Redirected to `/apply/success?id=VH-2026-XXXX` with QR and check-in code
4. At event, staff opens `/check-in`, pastes code → VALID + name

### Demo without applying
1. First visit seeds 3 applications in localStorage
2. `/check-in` with seed code `DEMO0001` returns VALID immediately

## Page map

| Route | Type | Sections / purpose |
|-------|------|-------------------|
| `/` | Marketing | Hero, countdown, CTAs, about, values, stats, schedule, past projects, FAQ, sponsors, team, footer |
| `/apply` | Form | Hacker application |
| `/apply/success` | Confirmation | Summary, QR, download, copy code |
| `/mentor` | Form | Mentor application (shorter) |
| `/volunteer` | Form | Volunteer application (shorter) |
| `/check-in` | Tool | Code validation for staff |
| `/debug/export` | Utility | Export all local applications as JSON |

## Acceptance criteria

### `/`
- Sticky nav with anchor links: About, Values, Schedule, FAQ, Sponsors
- Hero shows event name, tagline, dates, venue
- Countdown to application deadline (Aug 5, 2026 11:59 PM PDT)
- Primary CTA: Apply as Hacker → `/apply`
- Secondary CTAs: Mentor → `/mentor`, Volunteer → `/volunteer`
- Sponsor section with mailto `sponsors@viltrumhacks.test`
- Footer: land acknowledgment, contact emails, Event Check-In → `/check-in`

### `/apply`
- Fields: fullName, email, school, experienceLevel, dietaryNotes (optional), teamPreference, agreedToCoC
- Zod validation; CoC must be checked
- Duplicate email shows warning (non-blocking)
- On success: save to localStorage, redirect with `?id=`

### `/apply/success`
- Load application by `id` query param
- Display QR encoding QRPayload JSON
- Buttons: Download QR PNG, Copy check-in code
- Disclaimer: practice app, browser-only storage

### `/mentor` and `/volunteer`
- Fields: fullName, email, school, experienceLevel, dietaryNotes (optional), agreedToCoC
- Same ID/code generation and redirect to `/apply/success?id=`

### `/check-in`
- Text input for check-in code (8 chars, case-insensitive)
- Optional `?code=` URL prefill
- Accepts pasted QRPayload JSON
- Shows VALID (green) or INVALID (red) with attendee name and role on valid

### `/debug/export`
- Button downloads `viltrumhacks-applications.json`

## Out of scope

- Database, user accounts, email notifications
- Devpost, Discord, external registration portals
- Photo/video galleries, copyrighted character assets
- Camera-based QR scanning (manual entry only for v1)
- Payment / refunds (event is free)

# ViltrumHacks — Product Spec

## Personas

### Prospective hacker
University student in BC evaluating whether to attend. Needs clarity on eligibility, experience requirements, logistics, and a fast apply path.

### Volunteer / mentor
Wants a shorter signup with role-specific fields. Same check-in QR flow as hackers.

### Event organizer (check-in)
Needs to validate an attendee at the door by code or QR payload. Demo uses Allen persona as staff scanner.

### Demo test users (practice app)
| Demo login | Application | Session role | Primary UI |
|------------|-------------|--------------|------------|
| Mark | VH-2026-SEED / DEMO0001 | attendee | `/my-ticket` |
| Eve | VH-2026-SD02 / DEMO0002 | attendee | `/my-ticket` |
| Allen | VH-2026-SD03 / DEMO0003 | staff | `/check-in` |

Application `role` (hacker/mentor/volunteer) = event registration. Session `role` (attendee/staff) = app permissions.

## User journeys

### Apply → QR → check-in
1. Visitor lands on `/`, reads about event, clicks Apply
2. Fills `/apply` form, agrees to Code of Conduct
3. Redirected to `/apply/success?id=VH-2026-XXXX` with QR and check-in code
4. Staff (Allen demo) opens `/check-in`, scans or enters code → VALID → Check in

### Demo two-phone check-in
1. Phone A: `/demo/login` → Allen → `/check-in`
2. Phone B: `/demo/login` → Mark or Eve → `/my-ticket` → show QR
3. Phone A: scan/enter code → Check in → success
4. Phone A: same code → Already checked in

### Demo without applying
1. First visit seeds 3 applications in localStorage
2. `/demo/login` as Mark → `/my-ticket` with DEMO0001 QR

## Page map

| Route | Type | Sections / purpose |
|-------|------|-------------------|
| `/` | Marketing | Hero, countdown, CTAs, about, values, stats, schedule, past projects, FAQ, sponsors, team, footer |
| `/apply` | Form | Hacker application |
| `/apply/success` | Confirmation | Summary, QR, download, copy code |
| `/mentor` | Form | Mentor application (shorter) |
| `/volunteer` | Form | Volunteer application (shorter) |
| `/demo/login` | Demo auth | Persona picker (Mark / Eve / Allen) |
| `/my-ticket` | Demo attendee | Ticket + QR for logged-in attendee |
| `/check-in` | Staff scanner | Camera + manual; check-in action (staff only) |
| `/debug/export` | Utility | Export all local applications as JSON |

## Acceptance criteria

### `/`
- Sticky nav with anchor links: About, Values, Schedule, FAQ, Sponsors
- Hero shows event name, tagline, dates, venue
- Countdown to application deadline (Aug 5, 2026 11:59 PM PDT)
- Primary CTA: Apply as Hacker → `/apply`
- Secondary CTAs: Mentor → `/mentor`, Volunteer → `/volunteer`
- Sponsor section with mailto `sponsors@viltrumhacks.test`
- Footer: Volunteer check-in (demo) → `/demo/login?next=/check-in`, Demo login → `/demo/login`

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

### `/demo/login`
- Three persona buttons; optional `?next=` redirect after login
- Sign out / switch persona
- Not real authentication

### `/my-ticket`
- Requires attendee session (Mark or Eve)
- Shows seed or linked application ticket + QR

### `/check-in`
- Requires staff session (Allen)
- Camera QR scan + manual code/JSON entry
- VALID → attendee details → Check in → sets `checkedInAt`
- Repeat lookup → Already checked in with timestamp
- Optional `?code=` URL prefill

### `/debug/export`
- Button downloads `viltrumhacks-applications.json`

## Check-in states (staff scanner)

| State | UI |
|-------|-----|
| INVALID | Red panel |
| VALID (pending) | Green panel + details + Check in button |
| Checked in (success) | Green confirmation with timestamp |
| Already checked in | Amber panel with existing `checkedInAt` |

## Demo limitations

Practice app — browser-only data. Seed applications sync across devices only for the three demo personas on first visit (same codes). New `/apply` submissions and `checkedInAt` are per-browser only.

## Out of scope

- Production hackathon ops, real user database, email notifications
- Cross-device sync for new applications or check-in status
- Devpost, Discord, external registration portals
- Photo/video galleries, copyrighted character assets
- Full NextAuth / individual volunteer accounts
- Payment / refunds (event is free)

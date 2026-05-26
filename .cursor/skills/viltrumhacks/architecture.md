# ViltrumHacks — Architecture

## Folder structure

```
src/
  app/
    layout.tsx
    globals.css
    page.tsx
    apply/page.tsx
    apply/success/page.tsx
    mentor/page.tsx
    volunteer/page.tsx
    demo/login/page.tsx
    my-ticket/page.tsx
    check-in/page.tsx
    debug/export/page.tsx
  components/
    layout/SiteNav.tsx, Footer.tsx, SiteLayout.tsx, StorageProvider.tsx
    auth/DemoAuthGate.tsx, DemoLoginPanel.tsx
    ticket/TicketView.tsx, MyTicketContent.tsx
    home/...
    forms/ApplicationForm.tsx
    qr/QRDisplay.tsx
    check-in/CheckInPanel.tsx, QrScanner.tsx, CheckInStaffContent.tsx
  content/site.ts
  lib/
    types.ts
    storage.ts
    demo-session.ts
    demo-personas.ts
    ids.ts
    qr.ts
    validation.ts
```

## Data models

```ts
type ApplicationRole = "hacker" | "mentor" | "volunteer";

type BaseApplication = {
  applicationId: string;
  checkInCode: string;
  createdAt: string;
  fullName: string;
  email: string;
  experienceLevel: "beginner" | "intermediate" | "advanced";
  dietaryNotes?: string;
  agreedToCoC: true;
  checkedInAt?: string;  // ISO
  checkedInBy?: string;  // e.g. "allen-demo"
};

// school and teamPreference are hacker-only
type HackerApplication = BaseApplication & {
  role: "hacker";
  school: string;
  teamPreference: "solo" | "have-team" | "find-team";
};

type MentorApplication = BaseApplication & { role: "mentor" };
type VolunteerApplication = BaseApplication & { role: "volunteer" };

type Application = HackerApplication | MentorApplication | VolunteerApplication;

type DemoPersonaId = "mark" | "eve" | "allen";
type SessionRole = "attendee" | "staff";

type DemoSession = {
  personaId: DemoPersonaId;
  sessionRole: SessionRole;
  applicationId: string;
};

type QRPayload = {
  v: 1;
  event: "viltrumhacks-2026";
  applicationId: string;
  checkInCode: string;
};
```

## Storage contracts

| Key | Storage | Shape |
|-----|---------|-------|
| `viltrumhacks:applications:v1` | localStorage | `Record<string, Application>` |
| `viltrumhacks:meta:v1` | localStorage | `{ seeded: boolean }` |
| `viltrumhacks:demo-session:v1` | sessionStorage | `DemoSession` |

### API (`storage.ts`)

- `getApplications()`, `getApplication(id)`, `saveApplication(app)`
- `findByCheckInCode(code)` — case-insensitive
- `emailExists(email)`
- `seedApplications()`
- `markCheckedIn(applicationId, checkedInBy?)` — idempotent if already checked in
- `exportApplicationsJson()`

### API (`demo-session.ts`)

- `getDemoSession()`, `setDemoSession()`, `clearDemoSession()`, `hasSessionRole(role)`

## Demo session model

- Persona picker at `/demo/login` writes `sessionStorage`
- `DemoAuthGate` (client-only) protects `/my-ticket` (attendee) and `/check-in` (staff)
- Wrong role redirects to the other home route
- No middleware — UX gate only, not security

## Seed strategy

On first client mount, `StorageProvider` calls `seedApplications()`:
- If `viltrumhacks:meta:v1.seeded` is true, skip
- Else merge 3 seed applications, set meta.seeded = true
- Seeds do not include `checkedInAt` (demo can check in fresh)

## QR encode/decode

**Encode:** `JSON.stringify({ v: 1, event: "viltrumhacks-2026", applicationId, checkInCode })`

**Decode (check-in input):**
1. Trim input
2. If starts with `{`, parse as QRPayload JSON; validate `event` and `v`
3. Else treat as raw 8-char checkInCode
4. Lookup via `findByCheckInCode`

**Camera:** `html5-qrcode` decodes to same string → `parseCheckInInput`

**Deep link:** `/check-in?code=DEMO0001` — prefill in CheckInPanel (staff session required)

## Error states

| Case | Behavior |
|------|----------|
| Invalid form | Inline Zod errors |
| Duplicate email | Yellow warning banner, still allow submit |
| Success page missing id | Show error + link to /apply |
| Check-in invalid code | Red INVALID panel |
| Check-in valid, not checked in | Green VALID + Check in |
| Already checked in | Amber panel with timestamp |
| No demo session on gated route | Redirect to `/demo/login?next=...` |
| localStorage unavailable | Show error message on forms |

## SSR / hydration

- Never access localStorage/sessionStorage in server components
- `storage.ts` / `demo-session.ts` return empty/null when `typeof window === "undefined"`
- QR canvas and camera only in client components

## Ambiguous decisions (locked)

- Mentor/volunteer success uses same `/apply/success?id=` route
- QR encodes JSON string, not URL
- Allen demo persona = staff scanner; Mark/Eve = attendees
- `checkedInAt` per-browser is acceptable for practice app

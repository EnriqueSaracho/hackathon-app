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
    check-in/page.tsx
    debug/export/page.tsx
  components/
    layout/SiteNav.tsx, Footer.tsx, SiteLayout.tsx, StorageProvider.tsx
    home/Hero.tsx, Countdown.tsx, StatCard.tsx, ValueCard.tsx,
          FAQAccordion.tsx, SponsorBadge.tsx, PastProjectCard.tsx, ScheduleOutline.tsx
    forms/ApplicationForm.tsx
    qr/QRDisplay.tsx
    check-in/CheckInPanel.tsx
  content/site.ts
  lib/
    types.ts
    storage.ts
    ids.ts
    qr.ts
    validation.ts
```

## Data models

```ts
type ApplicationRole = "hacker" | "mentor" | "volunteer";

type Application = {
  applicationId: string;
  checkInCode: string;
  role: ApplicationRole;
  createdAt: string;
  fullName: string;
  email: string;
  school: string;
  experienceLevel: "beginner" | "intermediate" | "advanced";
  dietaryNotes?: string;
  teamPreference?: "solo" | "have-team" | "find-team";
  agreedToCoC: true;
};

type QRPayload = {
  v: 1;
  event: "viltrumhacks-2026";
  applicationId: string;
  checkInCode: string;
};
```

## localStorage contract

| Key | Shape |
|-----|-------|
| `viltrumhacks:applications:v1` | `Record<string, Application>` keyed by applicationId |
| `viltrumhacks:meta:v1` | `{ seeded: boolean }` |

### API (`storage.ts`)

- `getApplications(): Record<string, Application>`
- `getApplication(id: string): Application | null`
- `saveApplication(app: Application): void`
- `findByCheckInCode(code: string): Application | null` — case-insensitive
- `emailExists(email: string): boolean` — for duplicate warning
- `seedApplications(): void` — runs once if meta.seeded is false
- `exportApplicationsJson(): string`

## Seed strategy

On first client mount, `StorageProvider` calls `seedApplications()`:
- If `viltrumhacks:meta:v1.seeded` is true, skip
- Else merge 3 seed applications from content-spec, set meta.seeded = true

## QR encode/decode

**Encode:** `JSON.stringify({ v: 1, event: "viltrumhacks-2026", applicationId, checkInCode })`

**Decode (check-in input):**
1. Trim input
2. If starts with `{`, parse as QRPayload JSON; validate `event` and `v`
3. Else treat as raw 8-char checkInCode
4. Lookup via `findByCheckInCode`

**Deep link:** `/check-in?code=DEMO0001` — read in CheckInPanel on mount

## ID generation (`ids.ts`)

- `applicationId`: `VH-2026-` + 4 chars from `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`
- `checkInCode`: 8 chars from same charset
- Collision: re-roll if ID exists (unlikely)

## Error states

| Case | Behavior |
|------|----------|
| Invalid form | Inline Zod errors |
| Duplicate email | Yellow warning banner, still allow submit |
| Success page missing id | Show error + link to /apply |
| Check-in invalid code | Red INVALID panel |
| Check-in valid | Green VALID + fullName + role |
| localStorage unavailable | Show error message on forms |

## SSR / hydration

- Never access localStorage in server components
- `storage.ts` functions return empty/null when `typeof window === "undefined"`
- QR canvas generation only in client `QRDisplay` via useEffect

## Ambiguous decisions (locked)

- Mentor/volunteer success uses same `/apply/success?id=` route (not separate pages)
- QR encodes JSON string, not URL (check-in page parses both JSON and raw code)
- `teamPreference` only on hacker role; optional on Application type

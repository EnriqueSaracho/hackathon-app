# ViltrumHacks — Design System

## Color tokens

| Token | Hex | Usage |
|-------|-----|-------|
| navy-950 | #0B1020 | Hero background |
| navy-900 | #121A2E | Dark sections, nav |
| navy-800 | #1E2A45 | Cards on dark |
| accent-yellow | #F5C518 | CTAs, highlights, countdown |
| accent-red | #C41E2A | Sparingly — alerts, accent borders |
| off-white | #F4F5F7 | Light section backgrounds |
| white | #FFFFFF | Cards |
| text-dark | #1A1A2E | Body on light sections |
| text-muted | #6B7280 | Secondary text |
| success | #16A34A | Valid check-in |
| error | #DC2626 | Invalid check-in |

## Typography

**Google Fonts (load in layout):**
- `Oswald` — display, hero headlines, section titles
- `Inter` — body, forms, FAQ
- Sponsor tier fonts (text logos only):
  - Title: `Bebas Neue`
  - Gold: `Playfair Display`
  - Silver: `Rajdhani`
  - Bronze: `Space Mono`

**Scale:**
- Hero h1: 3.5rem / 56px (mobile: 2.5rem)
- Section h2: 2.25rem / 36px
- Body: 1rem / 16px, line-height 1.6
- Small: 0.875rem

## Spacing & shape

- Section padding: `py-20 px-6` (mobile `py-14`)
- Max content width: `max-w-6xl mx-auto`
- Card radius: `rounded-xl` (12px)
- Button radius: `rounded-lg` (8px)
- Shadow: `shadow-lg` on elevated cards

## Button variants

| Variant | Style |
|---------|-------|
| primary | Yellow bg, dark text, hover brighten |
| secondary | Transparent border white/yellow on dark; border navy on light |
| ghost | Text only with underline on hover |

## Components

| Component | Responsibility |
|-----------|----------------|
| SiteNav | Sticky top nav, mobile hamburger, anchor links |
| Footer | Land ack, emails, check-in link |
| Hero | Headline, tagline, dates, venue, CTA row |
| Countdown | Days/hrs/mins/secs to deadline |
| StatCard | Animated or static stat display |
| ValueCard | Icon + title + description |
| FAQAccordion | Category tabs or grouped accordion |
| SponsorBadge | Company name with tier font class |
| PastProjectCard | Title, description, team name |
| ScheduleOutline | Timeline table/list |
| ApplicationForm | Shared form shell by role |
| QRDisplay | Renders QR + download/copy actions |
| CheckInPanel | Code input + result state |

## Motion

- Section fade-in on scroll (optional, subtle)
- Countdown tick every second
- `@media (prefers-reduced-motion: reduce)`: disable animations, instant transitions

## No-image policy

- No `<img>` for content photos
- Use CSS gradients (navy → purple diagonal on hero)
- Lucide React icons for values and UI
- SVG decorative accents (simple geometric shapes, cape-like triangles)

## Accessibility

- Minimum contrast 4.5:1 for body text
- Focus rings on interactive elements: `ring-2 ring-accent-yellow`
- All form fields have visible labels
- FAQ accordion keyboard navigable

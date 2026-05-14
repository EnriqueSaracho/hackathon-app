# ViltrumHacks — QA Checklist

## Manual test script

### Landing page
- [ ] `/` loads without console errors
- [ ] Sticky nav visible; anchor links scroll to sections
- [ ] Mobile nav hamburger opens/closes
- [ ] Countdown shows time remaining until Aug 5, 2026 11:59 PM PDT
- [ ] All stats, values, 5 past projects, sponsors, FAQ (12+), schedule visible

### Seed check-in (no apply needed)
- [ ] Open `/check-in`
- [ ] Enter `DEMO0001` → VALID, shows "Mark Grayson (Demo)"
- [ ] Enter `INVALID1` → INVALID
- [ ] Visit `/check-in?code=DEMO0002` → pre-filled, can validate

### Hacker apply flow
- [ ] `/apply` — submit empty → validation errors
- [ ] Submit without CoC → error
- [ ] Submit valid form → redirects to `/apply/success?id=VH-2026-XXXX`
- [ ] Success page shows summary, QR, check-in code
- [ ] "Copy check-in code" works
- [ ] "Download QR as PNG" downloads file
- [ ] Practice disclaimer visible
- [ ] Paste new code on `/check-in` → VALID

### Mentor / volunteer
- [ ] `/mentor` and `/volunteer` submit successfully
- [ ] Redirect to success page with QR

### Duplicate email warning
- [ ] Apply with demo1@viltrumhacks.test → warning shown, can still submit

### Debug export
- [ ] `/debug/export` downloads JSON with all applications

### Reduced motion
- [ ] With `prefers-reduced-motion: reduce`, animations disabled

### Print
- [ ] Success page prints cleanly (QR visible)

## Accessibility minimums

- [ ] All form inputs have associated labels
- [ ] Focus visible on buttons and links
- [ ] FAQ accordion operable via keyboard
- [ ] Color contrast acceptable on hero and light sections
- [ ] Page has meaningful `<title>` and heading hierarchy (one h1 per page)

## Build gate

- [ ] `npm run build` passes

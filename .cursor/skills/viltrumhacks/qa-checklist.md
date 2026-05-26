# ViltrumHacks — QA Checklist

## Manual test script

### Landing page
- [ ] `/` loads without console errors
- [ ] Sticky nav visible; anchor links scroll to sections
- [ ] Mobile nav hamburger opens/closes
- [ ] Countdown shows time remaining until Aug 5, 2026 11:59 PM PDT
- [ ] All stats, values, 5 past projects, sponsors, FAQ (12+), schedule visible
- [ ] Footer links: Volunteer check-in (demo), Demo login

### Demo login and guards
- [ ] `/check-in` while logged out → redirects to `/demo/login`
- [ ] Login as Mark → lands on `/my-ticket` with QR + `DEMO0001`
- [ ] Login as Eve → `/my-ticket` + `DEMO0002`
- [ ] Login as Allen → `/check-in` scanner
- [ ] While logged in as Mark, open `/check-in` → redirected away (cannot scan)
- [ ] Logout / switch persona works

### Two-phone seed demo (canonical)
1. **Phone A:** `/demo/login` → Allen → `/check-in` → open camera or manual
2. **Phone B:** `/demo/login` → Mark or Eve → `/my-ticket` → show QR or read code aloud
3. **Phone A:** Scan QR or enter `DEMO0001` / paste JSON → VALID → **Check in** → success + timestamp
4. **Phone A:** Same code again → **Already checked in** with same timestamp
5. **Phone B:** Mark's ticket unchanged (no sync) — expected limitation

### Same-browser double check-in
- [ ] Allen checks in `DEMO0001` → success
- [ ] Validate `DEMO0001` again without refresh → already checked in

### Staff scanner
- [ ] Manual `DEMO0001`–`DEMO0003` validate on staff scanner
- [ ] `/check-in?code=DEMO0002` prefill works (staff session)
- [ ] Camera works on localhost; manual fallback if camera denied
- [ ] Check in sets `checkedInAt`; INVALID for bad codes

### Hacker apply flow
- [ ] `/apply` — submit empty → validation errors
- [ ] Submit without CoC → error
- [ ] Submit valid form → redirects to `/apply/success?id=VH-2026-XXXX`
- [ ] Success page shows summary, QR, check-in code
- [ ] "Copy check-in code" works
- [ ] "Download QR as PNG" downloads file
- [ ] Practice disclaimer visible
- [ ] Staff can check in new applicant code after Allen login

### Mentor / volunteer
- [ ] `/mentor` and `/volunteer` submit successfully
- [ ] Redirect to success page with QR

### Duplicate email warning
- [ ] Apply with demo1@viltrumhacks.test → warning shown, can still submit

### Debug export
- [ ] `/debug/export` downloads JSON with all applications (includes `checkedInAt` when set)

### Reduced motion
- [ ] With `prefers-reduced-motion: reduce`, animations disabled

### Print
- [ ] Success page / my-ticket prints cleanly (QR visible)

## Accessibility minimums

- [ ] All form inputs have associated labels
- [ ] Focus visible on buttons and links
- [ ] FAQ accordion operable via keyboard
- [ ] Color contrast acceptable on hero and light sections
- [ ] Page has meaningful `<title>` and heading hierarchy (one h1 per page)

## Build gate

- [ ] `npm run build` passes

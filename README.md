This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### LAN testing (two-device check-in)

To test on a phone and PC at the same time (e.g. Mark’s ticket on PC, Allen’s scanner on phone):

```bash
npm run dev:lan
```

- **PC:** [http://localhost:3000](http://localhost:3000)
- **Phone (same Wi‑Fi):** `http://<PC-LAN-IP>:3000` — find the IP with `ipconfig` (IPv4 Address on your active adapter)

Windows may block inbound connections until the network is **Private** or port 3000 is allowed on the active firewall profile. `next.config.ts` uses 4-label patterns (e.g. `192.168.*.*`) because IPv4 hostnames have four dot-separated segments—`192.168.*` only matched three labels and blocked dev assets from the phone. Optional: add extra dev origins in `.env.local` via `ALLOWED_DEV_ORIGINS` (see `.env.example`). If dev on LAN is still flaky, use `npm run build && npm run start:lan` (no HMR, but buttons work).

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

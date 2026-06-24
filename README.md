# Teachers To You

Custom marketing and booking site for [Teachers To You](https://instagram.com/teacherstoyouatx) — in-person guitar and bass lessons in Austin, TX.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** + **shadcn/ui**
- **Square** — embed widgets for single lessons, Bookings API for 4-week packages
- **Vercel Hobby** hosting

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/              # Pages and API routes
  components/       # UI, layout, booking flows
  data/teachers.ts  # Teacher bios, photos, Square config
  lib/              # Pricing, Square client, travel distance
```

## Square setup

1. Get Dashboard access from Mason
2. Create a Square application and obtain access token + location ID
3. Copy Advanced Widget embed URLs into `squareEmbedUrl` per teacher in `src/data/teachers.ts`
4. Set team member IDs and service variation IDs in `.env.local`

Without Square credentials, the site runs in demo mode with placeholder booking widgets and mock availability.

## Travel fees

When a student chooses "At my location," the server calculates drive time from the teacher's base address (stored server-side in `teachers.ts`, never shown on the frontend). A $10/lesson travel fee applies if the drive is over 15 minutes.

Optional: set `OPENROUTESERVICE_API_KEY` for accurate drive times. Without it, a distance estimate is used.

## Deploy to Vercel

```bash
npx vercel
```

1. Import the repo on [vercel.com](https://vercel.com)
2. Add environment variables from `.env.example`
3. Connect custom domain (e.g. `teacherstoyou.com`) in Project Settings → Domains

## Pages

| Route | Description |
|---|---|
| `/` | Home |
| `/about` | About the studio |
| `/teachers` | Teacher directory |
| `/teachers/[slug]` | Teacher profile + booking |
| `/lessons` | Pricing & travel policy |
| `/packages` | 4-week package booking |
| `/book` | Single lesson booking |
| `/policies` | FAQ & policies |

## Maintenance

Edit teacher bios, photos, and pricing in `src/data/teachers.ts` and `src/lib/pricing.ts`, then redeploy. No admin dashboard.

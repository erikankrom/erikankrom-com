# erikankrom.com

Personal website built with [Astro](https://astro.build) + [Payload CMS](https://payloadcms.com), deployed on [Vercel](https://vercel.com).

## Architecture

```
apps/
  web/   → Astro frontend (Vercel Serverless Functions)
  cms/   → Payload CMS backend (Next.js on Vercel)
```

- **Frontend** (`apps/web`): Astro 5 with `@astrojs/vercel` adapter. Fetches content from Payload's REST API.
- **CMS** (`apps/cms`): Payload 3 with Neon Postgres database and R2 storage for media. Admin panel at `/admin`.

## Prerequisites

- Node.js >= 20
- [pnpm](https://pnpm.io)
- [Vercel account](https://vercel.com)
- [Cloudflare account](https://dash.cloudflare.com) (for R2 media storage)

## Setup

```bash
# Install dependencies
pnpm install

# Copy and fill in CMS env vars
cp apps/cms/.env.example apps/cms/.env.local
```

## Development

```bash
# Start the CMS (runs on http://localhost:3000)
pnpm dev:cms

# Start the frontend (runs on http://localhost:4321)
pnpm dev:web
```

On first CMS run, visit `http://localhost:3000/admin` to create your admin user.

## Deployment

Both apps deploy as separate Vercel projects from this monorepo.

### 1. CMS (`apps/cms`)

1. Create a Vercel project with root directory set to `apps/cms`
2. Add the Neon Postgres integration (auto-sets `DATABASE_URL`)
3. Set env vars:
   - `PAYLOAD_SECRET` — `openssl rand -hex 32`
   - `R2_BUCKET` — `erikankrom-media`
   - `R2_ENDPOINT` — `https://<account-id>.r2.cloudflarestorage.com`
   - `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` — from R2 API token

### 2. Frontend (`apps/web`)

1. Create a Vercel project with root directory set to `apps/web`
2. Set env var: `CMS_URL` — the CMS Vercel deployment URL

Both deploy automatically on `git push`.

## Collections

| Collection  | Description                              |
| ----------- | ---------------------------------------- |
| `users`     | Admin authentication                     |
| `media`     | Image/file uploads (stored in R2)        |
| `posts`     | Blog posts with rich text content        |
| `projects`  | Project showcase entries                 |

## Globals

| Global   | Description                                                       |
| -------- | ----------------------------------------------------------------- |
| `resume` | Structured resume data (experience, education, skills, certs)     |

# erikankrom.com

Personal website built with [Astro](https://astro.build) + [Payload CMS](https://payloadcms.com), deployed on [Cloudflare Workers](https://workers.cloudflare.com).

## Architecture

```
apps/
  web/   → Astro frontend (SSR on Cloudflare Workers)
  cms/   → Payload CMS backend (Next.js on Cloudflare Workers via OpenNext)
```

- **Frontend** (`apps/web`): Astro 5 with `@astrojs/cloudflare` adapter. Fetches content from Payload's REST API.
- **CMS** (`apps/cms`): Payload 3 with D1 (SQLite) database and R2 storage for media. Admin panel at `/admin`.

## Prerequisites

- Node.js >= 20
- [pnpm](https://pnpm.io)
- [Cloudflare account](https://dash.cloudflare.com) (for deployment)

## Setup

```bash
# Install dependencies
pnpm install

# Generate a secret for the CMS
openssl rand -hex 32
# Add it to apps/cms/.dev.vars as PAYLOAD_SECRET=<your-secret>
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

### 1. Create Cloudflare resources

```bash
# Create D1 database
wrangler d1 create erikankrom-cms

# Create R2 bucket
wrangler r2 bucket create erikankrom-media
```

Update `apps/cms/wrangler.jsonc` with the D1 `database_id` from the output.

### 2. Set the Payload secret

```bash
cd apps/cms
wrangler secret put PAYLOAD_SECRET
```

### 3. Deploy

```bash
# Deploy CMS
pnpm deploy:cms

# Update apps/web/wrangler.jsonc CMS_URL to the CMS worker URL
# Deploy frontend
pnpm deploy:web
```

## Collections

| Collection | Description |
|-----------|-------------|
| `users`   | Admin authentication |
| `media`   | Image/file uploads (stored in R2) |
| `posts`   | Blog posts with rich text content |
| `projects`| Project showcase entries |

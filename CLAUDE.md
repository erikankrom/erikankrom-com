# erikankrom.com

Personal website for Erik Ankrom.

## Architecture

Monorepo with pnpm workspaces. Two apps deployed as separate Cloudflare Workers:

- **`apps/web`** — Astro 5 frontend with SSR via `@astrojs/cloudflare`. Fetches content from Payload's REST API.
- **`apps/cms`** — Payload CMS 3.77 on Next.js 15. Uses D1 (SQLite) for the database, R2 for media storage. Deployed via `@opennextjs/cloudflare`. Admin panel at `/admin`.

Payload cannot be embedded in Astro — it is Next.js-native. They communicate over HTTP.

## Development

```bash
pnpm dev:cms    # CMS at http://localhost:3000 (start first)
pnpm dev:web    # Frontend at http://localhost:4321
```

## Key Files

- `apps/web/src/lib/payload.ts` — CMS API client (`fetchFromCMS`, `fetchOneFromCMS`, `mediaUrl`, `mediaAlt`)
- `apps/web/src/layouts/Base.astro` — Shared layout with nav, dark theme
- `apps/cms/src/payload.config.ts` — Payload config with D1 adapter, R2 storage, CORS
- `apps/cms/src/collections/` — Collection definitions (Users, Media, Posts, Projects)

## CMS Collections

| Collection | Key Fields |
|-----------|------------|
| `users` | email (auth) |
| `media` | alt, upload (R2, no crop/focalPoint — no sharp on Workers) |
| `posts` | title, slug (unique), banner (upload), excerpt, content (richText), content_html, status, publishedAt |
| `projects` | title, slug (unique), description, banner (upload), gallery (array of image+caption), url, repo |

## Migrations

After changing collection fields, always generate and run a migration:

```bash
cd apps/cms
npx payload migrate:create <name>
npx payload migrate
```

To reset local DB during dev: `rm -rf apps/cms/.wrangler/state`

## Deployment

Both apps deploy to Cloudflare Workers via wrangler:

```bash
pnpm deploy:cms   # Builds with OpenNext, deploys CMS worker
pnpm deploy:web   # Builds Astro, deploys frontend worker
```

Requires:
- D1 database (id goes in `apps/cms/wrangler.jsonc` `database_id`)
- R2 bucket named `erikankrom-media`
- `PAYLOAD_SECRET` set via `wrangler secret put` (not in code)
- `CMS_URL` var in `apps/web/wrangler.jsonc` pointing to CMS worker URL

## Conventions

- pnpm for package management (workspaces configured in `pnpm-workspace.yaml`)
- Secrets in `.dev.vars` (local) or `wrangler secret` (production) — never committed
- `wrangler.jsonc` files are safe to commit (database IDs are not secrets)
- Astro integrations added via `npx astro add <name>`
- CMS uses `cross-env` for cross-platform script compatibility

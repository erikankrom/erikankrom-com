# erikankrom.com

Personal website for Erik Ankrom.

## Architecture

Monorepo with pnpm workspaces. Both apps deploy to Vercel as separate projects:

- **`apps/web`** — Astro 5 frontend with SSR via `@astrojs/vercel`. Fetches content from Payload's REST API.
- **`apps/cms`** — Payload CMS 3.77 on Next.js 15, deployed to Vercel. Uses Neon Postgres for the database, Cloudflare R2 (via S3-compatible credentials) for media storage. Admin panel at `/admin`.

Payload cannot be embedded in Astro — it is Next.js-native. They communicate over HTTP.

## Development

```bash
pnpm dev:cms    # CMS at http://localhost:3000 (start first)
pnpm dev:web    # Frontend at http://localhost:4321
```

## Key Files

- `apps/web/src/lib/payload.ts` — CMS API client (`fetchFromCMS`, `fetchOneFromCMS`, `mediaUrl`, `mediaAlt`)
- `apps/web/src/lib/github.ts` — GitHub API helper (`fetchGitHubRepos`, `fetchGitHubProfile`)
- `apps/web/src/layouts/Base.astro` — Shared layout with nav, dark theme
- `apps/cms/src/payload.config.ts` — Payload config with Vercel Postgres adapter, S3 storage (R2), CORS
- `apps/cms/src/collections/` — Collection definitions (Users, Media, Posts, Projects)
- `apps/cms/src/globals/Resume.ts` — Resume global (experience, education, skills, certifications)

## CMS Collections

| Collection  | Key Fields |
| ----------- | ---------- |
| `users`     | email (auth) |
| `media`     | alt, upload (R2 via S3) |
| `posts`     | title, slug (unique), banner (upload), excerpt, content (richText), content_html, status, publishedAt |
| `projects`  | title, slug (unique), description, banner (upload), gallery (array of image+caption), url, repo |

## Migrations

After changing collection fields, generate and run a migration:

```bash
cd apps/cms
npx payload migrate:create <name>
npx payload migrate
```

## Deployment

Both apps deploy to Vercel via git push. Each is a separate Vercel project with root directory set to its app folder.

Env vars:
- **CMS**: `DATABASE_URL`, `PAYLOAD_SECRET`, `R2_BUCKET`, `R2_ENDPOINT`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`
- **Web**: `CMS_URL` (pointing to CMS Vercel URL)

## Conventions

- pnpm for package management (workspaces configured in `pnpm-workspace.yaml`)
- Secrets in `.env.local` (local dev) or Vercel env vars (production) — never committed
- Astro integrations added via `npx astro add <name>`
- CMS uses `cross-env` for cross-platform script compatibility

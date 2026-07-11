# Deploying to Cloudflare Pages

This TanStack Start app builds to a Cloudflare Worker via Nitro. Cloudflare Pages
supports that same output through its "Advanced Mode" (`_worker.js`), so no code
changes are required — only the right build settings.

## Option A — Cloudflare Pages (recommended, zero config in this repo)

1. Push this repo to GitHub / GitLab.
2. In Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Pick the repo, then use these build settings:

   | Field                    | Value                                              |
   | ------------------------ | -------------------------------------------------- |
   | Framework preset         | None                                               |
   | Build command            | `NITRO_PRESET=cloudflare-pages bun run build`      |
   | Build output directory   | `dist`                                             |
   | Root directory           | *(leave blank)*                                    |
   | Node version (env var)   | `NODE_VERSION = 20`                                |

   If your CI doesn't have `bun`, use `npm install && NITRO_PRESET=cloudflare-pages npm run build` instead.

4. Add any required environment variables under **Settings → Environment variables**
   (both Production and Preview). `nodejs_compat` is enabled automatically by the
   Nitro output.
5. Save & deploy. Cloudflare will run the build and serve `dist/` with the
   `_worker.js` handler.

## Option B — Cloudflare Workers (default)

The default build already targets Workers (`cloudflare-module` preset). Deploy with:

```bash
bun run build
bunx wrangler deploy
```

Wrangler picks up the generated `dist/_worker.js` and `wrangler.json` produced
by Nitro.

## Notes

- Do **not** commit a hand-written `wrangler.toml` — Nitro emits the correct
  deploy config during build.
- Server functions (`createServerFn`) and `src/routes/api/**` route handlers work
  on both Workers and Pages Advanced Mode.
- `process.env.*` is available inside server handlers on both targets. Client
  code should use `import.meta.env.VITE_*`.

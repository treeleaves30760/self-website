# treeleaves30760.com

Source of [www.treeleaves30760.com](https://www.treeleaves30760.com), the personal website of Po-Hsiang Hsu (許博翔). A static site built with Astro 7 and Tailwind CSS 4, available in English (`/`) and Traditional Chinese (`/zh/`).

## Development

Requires Node 22.12 or newer (24 recommended) and pnpm 10.

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static output in dist/
pnpm preview    # serve dist/ locally
pnpm verify     # type-check, unit tests, build and SEO checks
```

## What is in this repository

- `src/content/projects/` — one Markdown file per project and language (`en/`, `zh/`); the frontmatter holds title, description, tags, tech and links.
- `src/content/publications/` — one Markdown file per paper and language; the body is the abstract.
- `src/content/career.json` — experience and education entries shown on the home and About pages.
- `src/data/site.ts` — name, headline, bio, about text and social links.
- `src/i18n/` — UI strings and locale URL helpers.
- `src/layouts/`, `src/components/`, `src/views/` — page building blocks; `src/pages/` holds the routes (English at the root, Chinese under `zh/`).
- `public/` — favicons, Open Graph image, `robots.txt`, and Cloudflare's `_headers` file.
- `scripts/` — `gen-og.mjs` regenerates the Open Graph image and favicons; `check-seo.mjs` verifies the built site.
- `wrangler.jsonc` — Cloudflare Workers static-assets configuration.
- `.github/workflows/ci.yml` — runs type-check, unit tests, build and SEO checks on every push and pull request.
- `LICENSE` — MIT for the code; text, images and papers are © Po-Hsiang Hsu.

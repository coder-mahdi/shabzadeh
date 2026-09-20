# Shabzadeh (شب‌زده)

A bilingual (Persian/English) personal site for short & long stories, multi-part travelogues, photos, and videos. Built with Next.js (App Router) and `next-intl`.

- Frontend deploys to Vercel at `shabzadeh.mahdiroozbahani.com`.
- Content is managed from a WordPress install at `cms.mahdiroozbahani.com`, via the custom plugin in `wordpress-plugin/shabzadeh-content/`.

## Getting started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/fa` or `/en` based on your browser language.

Set `WP_API_URL` in `.env.local` (see `.env.local.example`) once the WordPress plugin is installed and reachable; until then the site runs on local placeholder content.

## Structure

- `src/app/[locale]/` — all routes, nested under the locale segment (`fa` / `en`)
- `src/i18n/` — `next-intl` routing, navigation, and request config
- `messages/fa.json`, `messages/en.json` — UI copy
- `src/lib/content/` — content types, mock data, and the `api.ts` data-access layer, which fetches from the WordPress REST API when `WP_API_URL` is set and falls back to the local mock data otherwise
- `src/components/` — shared UI (header, footer, language switcher, story/trip cards, gallery, video embed)
- `wordpress-plugin/shabzadeh-content/` — the WordPress plugin (bilingual CPTs + REST API) that powers the content; see its own README for setup

All current mock content (stories, travelogues, photos, videos) lives in `src/lib/content/data/`, used only until `WP_API_URL` is configured.

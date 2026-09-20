# Shabzadeh Content — WordPress Plugin

A headless CMS for the Shabzadeh site. Manages bilingual (Persian/English) stories, travelogues, photos and videos in WordPress, and exposes them read-only at `/wp-json/shabzadeh/v1/`.

## Install

1. Zip this folder (`shabzadeh-content/`) or use the pre-built `shabzadeh-content.zip` next to it.
2. Install on the WordPress site at **cms.mahdiroozbahani.com**: admin → **Plugins → Add New → Upload Plugin**, choose the zip, **Install Now**, then **Activate**.
3. A **شب‌زده** menu appears in the sidebar. Its allowed frontend origin (CORS) is already pre-set to `https://shabzadeh.mahdiroozbahani.com` (the Vercel-hosted frontend) — only change it if the frontend domain changes.
4. On the frontend, set `WP_API_URL=https://cms.mahdiroozbahani.com/wp-json/shabzadeh/v1` in its `.env.local` (or the Vercel project's environment variables) once this plugin is live.

## Content types

- **داستان‌ها (Stories)** — set "نوع داستان" to کوتاه (short, has its own text) or بلند (long — add its text as separate **فصل‌های داستان** / chapters, each pointing back at the story via "داستان مادر", ordered with the native **Order** field).
- **سفرنامه‌ها (Trips)** — the trip overview. Its parts live in **قسمت‌های سفرنامه**, each pointing back at the trip via "سفر مادر", ordered with **Order**.
- **عکس‌ها (Photos)** — set the Featured Image to the photo itself; caption is bilingual; optionally link it to a trip.
- **ویدیوها (Videos)** — choose a provider:
  - **یوتیوب**: paste the full YouTube URL or just the video ID.
  - **لینکدین**: LinkedIn doesn't support a plain video ID. Open the LinkedIn post, click **⋯ → Embed this post**, and paste the URL from inside `src="..."` of the embed code it gives you.

Every text field has separate فارسی/English inputs — fill in both so the frontend has content in both languages. The native WordPress "Title" field is kept in sync automatically from the Persian title/caption, so you don't need to fill it in separately.

## Requirements

Self-hosted WordPress (wordpress.org) with plugin upload access. No other plugins required — no ACF, no WPGraphQL, no Polylang.

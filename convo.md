# Project Running Log — Fenix Web Design

Multi-page static marketing site built per the **WebCreator playbook**
(`../cmr153ju10002ro43r2djwz9e.webcreator-playbook.md`). Goal: convert visitors
into leads (call, message, or modal lead form). National scope — **no location
suffix** in H1/copy. **No pricing anywhere.** **Email only on Privacy/Terms.**

## Client Brief (interview complete — never re-interview)
- **Business:** Fenix Web Design
- **Industry / homepage theme:** Home Services Digital Marketing Agency (national)
- **Phone:** 6028290009 → displayed as (602) 829-0009, only inside `tel:` links
- **Email:** mgarcia4@gmail.com (Privacy/Terms ONLY)
- **Domain:** fenixwebdesign.com
- **Primary color:** #ff6b35  | **Hover:** #ff946e | Accent: deep teal #1b4d4a
- **Fonts:** Montserrat (headings), Open Sans (body), Dancing Script (review names)
- **Logo:** phoenix mark → `images/logo.jpg` (copied from __webassets/logoUrl.jpg)
- **Booking:** no  | **Bilingual:** no  | **Reviews:** generated  | **OG image:** generated
- **LOCATION_IN_FILENAMES:** no

## Service pages to build (slug = title, lowercase-hyphen, no location)
- Website Design → `/website-design/`
- Google Ads Management → `/google-ads-management/`
- Painting Marketing → `/painting-marketing/`
- Roofing Marketing → `/roofing-marketing/`
- Plumbing Marketing → `/plumbing-marketing/`
- Logo Design → `/logo-design/`

## Fixed 10-section layout (every non-legal page)
Nav → Hero → Why Us → About Us → Reviews → Banner → Services → Steps → FAQs → Footer.
Section bg alternation handled in CSS (Banner always primary, Footer #282828).

## Current State (Instruction 1 of 4 — DONE)
Project scaffold + design system + shared nav/footer/modal are built:
- `index.html` — full `<head>` (SEO/OG/Twitter/schema), sticky nav with Services &
  About Us dropdowns, **hero scaffold** (copy is placeholder-quality, refine later),
  footer (Layout B — no map), mobile sticky CTA bar, and the full **3-step lead modal**.
  Sections 3–9 are NOT yet on the homepage — to be added in a later step.
- `css/styles.css` — complete design system: `:root` tokens (brand palette, spacing
  scale, fonts), base/reset, heading scale, `.container`, section padding, section bg
  alternation, global buttons, nav (desktop dropdowns + mobile hamburger), hero, all
  card grids (why-us/about/reviews/services/steps), banner, FAQ accordion, footer
  (Layout A + B), legal pages, 404, mobile CTA bar, and the multi-step modal.
- `js/main.js` — nav toggles, FAQ accordion, footer year, US phone formatting,
  IntersectionObserver fade-ins, and the full multi-step modal (validation + Pabbly
  webhook POST). `MODAL_WEBHOOK_URL` is EMPTY — modal shows success w/o POST until set.
- Support files: `.gitignore`, `robots.txt`, `sitemap.xml` (all pages listed).
- Favicon: generated inline SVG "F" on #ff6b35 (no favicon supplied in brief).

## Key Decisions / Conventions
- Favicon = inline SVG fallback (no JS swap needed) since no favicons were provided.
- No Google Maps iframe provided → Footer **Layout B** (single centered column).
- Modal webhook URL not in brief → placeholder empty string; success still shown.
- All internal links are absolute folder URLs with trailing slash, no `.html`.
- CSS/JS referenced via absolute paths (`/css/styles.css`, `/js/main.js`).
- Accent color chosen deep teal per playbook "orange → deep teal/navy" guide.

## TODO (future instructions)
- [ ] Homepage sections 3–9 with finalized conversion copy + generated reviews + FAQs.
- [ ] Generate images (hero-bg, about-us, 4 service cards, banner, og-image) via
      Gemini per playbook Step 6.6 (manifest + scripts), reference as `.webp`.
      NOTE: this env also exposes an MCP logo/image generator — evaluate which to use.
- [ ] 6 service pages (full 10-section layout each, hub-and-spoke link back to `/`).
- [ ] Privacy Policy + Terms & Conditions pages.
- [ ] 404.html.
- [ ] Deployment.

## How to continue
Read this file + the playbook first. Build remaining pages reusing the shared nav,
footer, and modal markup already in `index.html`. Keep `convo.md` updated each session.

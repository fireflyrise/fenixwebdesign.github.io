# Project Running Log — Fenix Web Design

Multi-page static marketing site built per the **WebCreator playbook**
(`../cmr1icg6i0002ph44ioqttrp4.webcreator-playbook.md`). Goal: convert visitors
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
Authoritative list from CURRENT brief (order = brief order):
- Google Ads Management → `/google-ads-management/`
- Facebook Ads Management → `/facebook-ads-management/`
- Website Design → `/website-design/`
- Painting Marketing → `/painting-marketing/`
- Roofing Marketing → `/roofing-marketing/`
- Plumbing Marketing → `/plumbing-marketing/`

NOTE (2026-07-01): An earlier session (against a stale brief) had listed
"Logo Design" and omitted "Facebook Ads Management". Corrected this session across
nav dropdown, sitemap.xml, and modal step-1 options to match the current brief.
Homepage Services section shows 4 cards (Website Design, Google Ads, Roofing,
Plumbing) — all valid, no Logo Design.

## Fixed 10-section layout (every non-legal page)
Nav → Hero → Why Us → About Us → Reviews → Banner → Services → Steps → FAQs → Footer.
Section bg alternation handled in CSS (Banner always primary, Footer #282828).

## Current State

### Instruction 1 of 4 — DONE (verified + service list corrected 2026-07-01)
Project scaffold + design system + shared nav/footer/modal. This session re-read the
full authoritative playbook and audited the existing scaffold against the CURRENT
brief. Confirmed the `:root` palette (primary #ff6b35, hover #ff946e, accent deep
teal #1b4d4a, full text/bg/border tokens), spacing scale, Montserrat/Open Sans/
Dancing Script fonts, heading scale, `.container`, section padding, and white/gray
section alternation (Banner=primary, Footer=#282828) all match the playbook. Shared
sticky nav (logo + brand name + Services▾ + About Us▾ dropdowns, mobile hamburger),
Footer Layout B, global buttons, and the multi-step lead modal are all in place and
compliant. **Fix applied:** service list now matches the brief exactly (added
Facebook Ads Management, removed the stale Logo Design) in nav, sitemap, and modal.

### Instruction 2 of 4 — DONE (homepage fully built)
`index.html` now contains the **complete fixed 10-section layout** with finalized
visitor-first, direct-response copy themed on "Home Services Digital Marketing Agency":
Nav → Hero → Why Us → About Us → Reviews (3 generated, commented) → Banner →
Services (4 cards: Website Design, Google Ads, Roofing Mktg, Plumbing Mktg, each
linking to its page) → Steps (3) → FAQs (6) → Footer.
- H1 = MAIN_SERVICE ("Home Services Digital Marketing Agency"), no location (national).
- About Us has hub contextual links to /website-design/ and /google-ads-management/.
- No pricing anywhere; phone only in tel: links; email only in JSON-LD schema.
- Image refs point to /images/*.webp (hero-bg, about-us, 4 service cards) — NOT yet
  generated. Hero uses inline background-image style w/ dark gradient overlay.
- Lead modal: brief provided **no MODAL_WEBHOOK_URL**, so `MODAL_WEBHOOK_URL` in
  js/main.js stays an empty placeholder; modal still validates + shows success.
  Searched the whole workspace — no webhook was seeded. Swap in real URL when available.
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
- [x] Homepage sections 3–9 with finalized conversion copy + generated reviews + FAQs.
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

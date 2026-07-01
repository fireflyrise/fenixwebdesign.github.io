# Project Running Log — Fenix Web Design

Multi-page static marketing site built per the **WebCreator playbook**
(`../cmr1icg6i0002ph44ioqttrp4.webcreator-playbook.md`). Goal: convert visitors
into leads (call, message, or modal lead form). National scope — **no location
suffix** in H1/copy. **No pricing anywhere.** **Email only on Privacy/Terms.**

## Client Brief (interview complete — never re-interview)
- **Business:** Fenix Web Design
- **Industry / homepage theme:** Home Services Digital Marketing Company (national)
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
visitor-first, direct-response copy themed on "Home Services Digital Marketing Company":
Nav → Hero → Why Us → About Us → Reviews (3 generated, commented) → Banner →
Services (4 cards: Website Design, Google Ads, Roofing Mktg, Plumbing Mktg, each
linking to its page) → Steps (3) → FAQs (6) → Footer.
- H1 = MAIN_SERVICE ("Home Services Digital Marketing Company"), no location (national).
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

Session 2026-07-01 refinements (Instruction 2 re-verified):
- Aligned MAIN_SERVICE naming to the brief's EXACT wording: "Home Services Digital
  Marketing Company" (was "…Agency") across the H1, <title>, og:title, twitter:title,
  and JSON-LD description. Per playbook H1 rule the homepage H1 = MAIN_SERVICE with no
  location (national) — now exact.
- Audited all three contact/pricing rules on the homepage: NO pricing terms anywhere;
  email appears ONLY in JSON-LD schema metadata (never visible body copy, no mailto);
  phone shown only as formatted (602) 829-0009 inside tel: links (hero/banner/footer/
  mobile CTA) + the meta-description CTA. Compliant.
- Modal webhook wiring finalized: single MODAL_WEBHOOK_URL constant at top of main.js
  is the only wiring point; when set, modal POSTs the full Pabbly payload. Added a
  parallel `phone_digits` field (digits-only) alongside formatted `phone` per playbook.
  Still empty by design — NO webhook was seeded anywhere in workspace/webassets/brief.
- Verified section order (Nav→Hero→WhyUs→About→Reviews→Banner→Services→Steps→FAQs→
  Footer) and `node --check js/main.js` passes.

### Instruction 3 of 4 — DONE (all 6 service pages + 2 legal pages built)
Built each page as its own `[slug]/index.html` clean folder URL, reusing the exact
shared nav / footer (Layout B) / mobile-CTA / multi-step modal markup from the homepage.

Service pages (full fixed 10-section layout, hub-and-spoke back to `/` and siblings):
- `/google-ads-management/`, `/facebook-ads-management/`, `/website-design/`,
  `/painting-marketing/`, `/roofing-marketing/`, `/plumbing-marketing/`
- Each: `<title>` = service name only (no business name, no location, national scope);
  H1 (hero-label) = service name per H1 rule; meta desc 140–160 chars w/ phone CTA;
  canonical; inline favicon SVG; OG + Twitter tags; **Service** JSON-LD schema
  (@type Service, provider ProfessionalService, areaServed "United States").
- Hero uses inline `background-image: linear-gradient(...) url('/images/hero-[slug].webp')`
  (images NOT yet generated — Instruction 4).
- Copy is visitor-first direct-response (pain→desire→fear→proof→CTA), tailored per
  service. Trade pages (painting/roofing/plumbing) lean on urgency + "get found first".
- About Us section on each links to sibling services (/website-design/, /google-ads-...);
  Services section = 4 cards each linking to a sibling service; 4th card cross-promotes
  the trade pages. 3 generated reviews (HTML-commented) + 6 anxiety-framework FAQs each.

Legal pages (simplified layout: Nav → `<main class="legal-page">` → Footer, no hero):
- `/privacy-policy/` — title "Privacy Policy | Fenix Web Design", H1 "Privacy Policy",
  11 sections per playbook, `noindex,follow`. **Email mgarcia4@gmail.com appears here**
  (allowed on legal pages only), phone in tel: link.
- `/terms-and-conditions/` — title "Terms and Conditions | Fenix Web Design",
  H1 "Terms and Conditions", 12 sections adapted for a marketing agency (added
  Results/Performance + Third-Party Platforms sections; no on-site/address language
  since national scope, no city/state/address in brief), `noindex,follow`. Email here.
- Both dated "Last updated: July 1, 2026".

Verification this session: all 8 pages exist; every internal href resolves (all point
to existing folders + `/` + `/css/styles.css`); homepage links to all 6 services + both
legal pages (hub-and-spoke complete); section order correct on service pages; NO pricing
figures anywhere (only narrative "race to the bottom on price" re: competitors);
`node --check js/main.js` passes.

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
- [x] 6 service pages (full 10-section layout each, hub-and-spoke link back to `/`).
- [x] Privacy Policy + Terms & Conditions pages.
- [ ] 404.html.
- [ ] Deployment.

## How to continue
Read this file + the playbook first. Build remaining pages reusing the shared nav,
footer, and modal markup already in `index.html`. Keep `convo.md` updated each session.

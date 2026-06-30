# Project Running Log — Fenix Web Design Website

> Running log across sessions. Keep this up to date. Built per the WebCreator
> playbook (`../cmr153ju10002ro43r2djwz9e.webcreator-playbook.md`).

## Goal
Convert visitors into leads: get them to call, message, or contact Fenix Web
Design. Every page/headline/CTA funnels to that single action.

## Client Brief (interview already complete — DO NOT re-interview)
- **Business name:** Fenix Web Design
- **Industry:** Home Services Digital Marketing Agency
- **Scope:** National → NO location suffix in copy/H1; no CITY/STATE in titles
- **Phone:** 6028290009 → `tel:6028290009`, displayed `(602) 829-0009`
- **Email:** mgarcia4@gmail.com — ONLY shown on Privacy Policy & Terms pages
- **Domain:** fenixwebdesign.com
- **Main service (homepage theme):** Home Services Digital Marketing Agency
- **Service pages to build (6):**
  - Website Design → `/website-design/`
  - Google Ads Management → `/google-ads-management/`
  - Painting Marketing → `/painting-marketing/`
  - Roofing Marketing → `/roofing-marketing/`
  - Plumbing Marketing → `/plumbing-marketing/`
  - Logo Design → `/logo-design/`
- **LOCATION_IN_FILENAMES:** no
- **Branding:** primary `#ff6b35`, hover `#ff946e`, accent (derived) deep teal `#1b4965`
- **Logo:** `images/logoUrl.jpg` (copied from webassets; keep original JPG format)
- **Fonts:** Montserrat (headings), Open Sans (body), Dancing Script (review names)
- **Booking:** no · **Bilingual:** no
- **Reviews:** generated · **OG image:** generated
- **Google Maps iframe:** none → Footer uses Layout B (single column, centered)
- **MODAL_WEBHOOK_URL:** NOT provided → placeholder `''` in js/main.js (marked REPLACE)

## Key Rules (from playbook — enforce on every page)
- Visitor-first copy ("you/your"), never "we/our".
- NO pricing anywhere (no $ amounts/ranges). Positioning language only.
- EMAIL never shown except Privacy/Terms. PHONE only inside `tel:` buttons.
- H1 = SEO service name, NEVER the business name. National → no location suffix.
- Fixed 10-section layout on home + every service page: Nav, Hero, Why Us,
  About Us, Reviews, Banner, Services, Steps, FAQs, Footer.
- Clean folder URLs: `[slug]/index.html` served at `/[slug]/`. Root `index.html`
  + `404.html` are the only root HTML files.
- Section bg alternation white/#f2f2f2; Banner always primary; Footer #282828.
- 2 CTAs in Hero (tel + modal), Banner, Footer. Modal is the only lead form.

## Build Progress

### Session 1 (2026-06-30) — Instruction 1 of 4: Foundation ✅
Built the project skeleton + design system + shared nav/footer (CSS/JS only;
page HTML comes in later instructions).

**Created:**
- `css/`, `js/`, `images/`, `scripts/` folders
- `images/logoUrl.jpg` — client logo (copied from webassets)
- `css/styles.css` — FULL design system:
  - `:root` palette (brand, derived, text, bg, border) + spacing scale + layout tokens
  - Google Fonts @import (Montserrat / Open Sans / Dancing Script)
  - Base reset, typography (h1–h4 scale, never override per-section)
  - `.container`, section padding tokens, section bg alternation classes
  - Global button base (`.btn-primary` solid, `.btn-secondary` outline, banner btns)
  - Navigation (sticky, brand, desktop dropdowns, mobile hamburger <750px)
  - Footer Layout B (single column, dark) + footer secondary btn light variant
  - Mobile sticky CTA bar
  - Section styles for ALL sections (Hero, Why Us, About, Reviews, Banner,
    Services, Steps, FAQ), Legal pages, 404, and the multi-step Modal — so later
    instructions only add HTML.
- `js/main.js` — footer year, nav (hamburger + dropdown toggles + outside-click
  close), FAQ accordion, phone formatting `(XXX) XXX-XXXX`, scroll fade-in,
  full multi-step Hero Modal (open/close/ESC/overlay, option select, step
  validation, Pabbly webhook POST with success/error states).
- `.gitignore` (ignores .env)
- `robots.txt` (points to https://fenixwebdesign.com/sitemap.xml)

**Decisions:**
- Accent color `#1b4965` (deep teal) per playbook orange→teal/navy guide.
- No favicons provided → will use generated SVG favicon (letter "F" on primary
  bg) inline in each page `<head>`; no favicon-swap JS needed (so it's omitted
  from main.js). To be added when building page HTML heads.
- Modal webhook empty → modal shows success state locally so UX is testable;
  marked clearly for REPLACE in js/main.js.

### Session 2 (2026-06-30) — Instruction 2 of 4: Homepage ✅
Built the root `index.html` (full 10-section layout) themed on "Home Services
Digital Marketing Agency", visitor-first direct-response copy throughout.

**Created/updated:**
- `index.html` — complete homepage:
  - `<head>`: title (`Fenix Web Design | Home Services Digital Marketing Agency`),
    meta description/keywords, canonical, robots, inline SVG favicon + apple-touch
    (generated "F" on `#ff6b35`), full Open Graph + Twitter card (og-image.webp
    1200x630), ProfessionalService JSON-LD (telephone +16028290009, email in
    schema only, areaServed United States, knowsAbout = 6 services).
  - Nav: Home | Services ▾ (6 service links) | About Us ▾ (About Us→`/#about-us`,
    Privacy Policy, Terms & Conditions).
  - Hero: H1 = SEO service name (NOT business name), headline "Get More Calls,
    Booked Jobs, and Trucks on the Road", 2 CTAs (tel + modal).
  - Why Us (3 cards: phone-as-only-metric, no contracts, trades-focused).
  - About Us (`id="about-us"`) with ONE contextual in-copy link to `/`
    (anchor "home services marketing") — hub-and-spoke.
  - Reviews (3 generated, each wrapped in REPLACE comment; Dancing Script names).
  - Banner (primary bg): tel + modal CTAs.
  - Services (4 cards → Website Design, Google Ads, Roofing, Plumbing, each
    btn-secondary deep-link to its service folder).
  - Steps (3) · FAQs (6, accordion) · Footer Layout B (single column) ·
    Mobile sticky CTA bar · 3-step lead modal (service / timeline / contact).
- `css/styles.css` — added `.btn-banner-secondary` white-outline styling so the
  banner's secondary CTA stays visible on the orange banner (was inheriting the
  invisible orange-on-orange `.btn-secondary` look). Hover inverts to white bg /
  primary text.

**Validation run (all pass):** 1 H1 (= service name, not business name); 8
sections + 73 divs balanced; 4 modal triggers + 4 `tel:` links; NO pricing /
NO `$` / NO `mailto:`; email present ONLY inside JSON-LD schema (not visible).

**Decisions:**
- "Wire modal to configured webhook": no Pabbly URL was supplied in the brief, so
  `MODAL_WEBHOOK_URL` stays `''` in js/main.js (graceful local success state,
  marked REPLACE). Wire the real URL when provided.
- Images referenced but not yet generated (hero handled by base `.hero` primary
  bg; about-us.webp, 4 service-*.webp, og-image.webp) — to be produced in the
  images instruction. `loading="lazy"` on all below-the-fold imgs.
- Minimal, intentional "we/our" only in trust/CTA lines; dominant voice = reader.

## TODO — Remaining (future instructions)
- [x] Homepage `index.html` (10 sections, themed on main service)
- [ ] 6 service pages (`/website-design/`, `/google-ads-management/`,
      `/painting-marketing/`, `/roofing-marketing/`, `/plumbing-marketing/`,
      `/logo-design/`), each full 10-section layout + hub-and-spoke link back to `/`
- [ ] Privacy Policy + Terms pages
- [ ] 404.html
- [ ] Modal HTML block (Step1 service type, Step2 qualifier, Step3 contact) at
      bottom of each page `<body>` — JS already wired via `#hero-modal`
- [ ] Per-page `<head>`: title/meta/OG/Twitter/geo/canonical + LocalBusiness JSON-LD
- [ ] `images_manifest.json` + `scripts/generate_images.py` + `validate_env.py`
      (hero-bg, about-us, 6 service images, banner-cta, steps-bg, og-image)
- [ ] sitemap.xml
- [ ] Real Pabbly webhook URL in js/main.js when provided

## Notes for next session
- Nav menu structure: Home | Services ▾ (6 service links, name only) |
  About Us ▾ (About Us → `/#about-us`, Privacy Policy, Terms & Conditions).
- Modal form expects: radio name `service` (step1), radio/text name `qualifier`
  (step2), inputs `full_name`/`phone`(.js-phone-input)/`email` (step3). Set
  `data-step1-question` / `data-step2-question` on `#hero-modal-form`.
- Hero CSS references `/images/hero-bg.webp`; service pages should add per-page
  hero bg override (e.g. `.hero.hero-[slug]{ background-image:... }`) in styles.css.

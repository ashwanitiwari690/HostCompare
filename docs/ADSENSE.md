# Google AdSense Integration Guide

HostCompare currently ships with **reserved ad placeholders only** — there is
no real AdSense (or any other ad network) script wired up anywhere in the
codebase. This document explains what exists today, why, and exactly how to
turn the placeholders into real ads later.

## What exists today

Four thin wrapper components (all in
`src/app/shared/components/ad-placeholder/`) render a labeled, dashed-border
placeholder box at the correct size for a given ad slot:

| Component            | Selector              | Typical size    |
| --------------------- | ---------------------- | ---------------- |
| `AdBannerComponent`    | `<app-ad-banner />`    | 728×90 leaderboard |
| `AdInArticleComponent` | `<app-ad-in-article />` | Fluid, ~120px tall |
| `AdSidebarComponent`   | `<app-ad-sidebar />`   | 300×600 skyscraper |
| `AdRectangleComponent` | `<app-ad-rectangle />` | 300×250 medium rectangle |

All four are thin wrappers around a single configurable
`AdPlaceholderComponent` (`format` input), so the visual style and the
"Advertisement" label stay consistent everywhere.

They are already placed in reasonable, non-intrusive locations:

- Homepage — one medium rectangle between the "Why HostCompare" section and
  the newsletter signup.
- Provider review pages — one in-article slot after the pricing table.
- Comparison landing pages (`/compare/:slug`) — one in-article slot after the
  "Ease of Use" section.
- Guide articles — one in-article slot after the main content, before the
  share buttons.

## Design rules these placeholders already follow (keep them when you wire up real ads)

- Always labeled **"Advertisement"** in a small caption — never disguised as
  navigation, a "Download" button, or editorial content.
- Never placed inside a button, card CTA, or anywhere a user could mistake a
  click on an ad for a click on a product action.
- Kept to a handful of slots per page — the site is not designed to be
  "ad-heavy."
- Sized to standard IAB ad units so a real `<ins class="adsbygoogle">` tag can
  drop in without changing surrounding layout.

## How to turn a placeholder into a real AdSense unit

1. **Get an AdSense account and ad unit IDs** for each placement you want to
   monetize (banner, in-article, sidebar, rectangle). AdSense will give you a
   `data-ad-client` (publisher ID) and a `data-ad-slot` per unit.

2. **Load the AdSense script once, globally.** Add it to `src/index.html`
   inside `<head>`:

   ```html
   <script
     async
     src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"
   ></script>
   ```

3. **Replace the inside of `AdPlaceholderComponent`'s template** with the real
   AdSense markup, keyed off the existing `format` input so each wrapper
   component still maps to the right ad unit:

   ```html
   <ins
     class="adsbygoogle"
     style="display:block"
     [attr.data-ad-client]="'ca-pub-XXXXXXXXXXXXXXXX'"
     [attr.data-ad-slot]="slotIdFor(format())"
     data-ad-format="auto"
     data-full-width-responsive="true"
   ></ins>
   ```

4. **Push the ad after the element renders**, e.g. in `ngAfterViewInit`:

   ```ts
   ngAfterViewInit(): void {
     try {
       ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
     } catch {
       /* ad blocker or script not loaded yet — fail silently */
     }
   }
   ```

5. **Respect cookie consent.** `CookieConsentService` (see
   `src/app/core/services/cookie-consent.service.ts`) already tracks whether
   the visitor accepted the "Advertising" cookie category. Before loading the
   AdSense script or pushing an ad, check
   `cookieConsent.current().advertising` and only render/initialize ads when
   it is `true`, consistent with the site's cookie banner promises.

6. **Update the Cookie Policy and Privacy Policy** (`src/app/features/legal/data/legal-pages.data.ts`)
   to describe what AdSense actually collects once it's live — the current
   copy explicitly says no ad network is integrated yet.

7. **Re-check layout on mobile.** AdSense responsive units can occasionally
   introduce horizontal scroll on very narrow viewports; verify at 320–430px
   widths after wiring in real ads (see the responsive breakpoints already
   tested in this project's README).

## What NOT to do

- Don't add more ad slots than the four already placed without reassessing
  whether the page still reads as "content first." The project's stated
  priority order is **user value > content quality > UX > SEO >
  monetization**.
- Don't make an ad visually resemble a "Visit Provider" button, a download
  link, or a navigation item.
- Don't load the AdSense script before the visitor has made a cookie choice
  that includes "Advertising."
- Don't introduce sponsored/paid placements without labeling them
  "Sponsored" and keeping them visually distinct from editorial rankings
  (see `/affiliate-disclosure` for the existing disclosure language this
  should stay consistent with).

# HostCompare

**Compare Hosting. Choose Better.**

HostCompare is a frontend-only Angular platform for comparing web hosting,
WordPress hosting, VPS, cloud hosting, dedicated hosting, domain registrars
and domain extensions. It combines a hosting directory, a scored Hosting
Finder wizard, a side-by-side comparison engine, editorial reviews and a
library of guides — built to eventually support Google AdSense and hosting
affiliate links.

> **This is a frontend-only project.** There is no backend, database, or
> real authentication. All content comes from local TypeScript mock data.
> Pricing shown throughout the site is **sample data** for development and
> demonstration — see [Updating prices](#updating-prices-and-provider-data)
> before using this in production.

---

## Table of Contents

- [Technology](#technology)
- [Node version](#node-version)
- [Installation](#installation)
- [Development](#development)
- [Production build](#production-build)
- [Architecture](#architecture)
- [Adding a hosting provider](#adding-a-hosting-provider)
- [Adding a hosting plan](#adding-a-hosting-plan)
- [Updating prices and provider data](#updating-prices-and-provider-data)
- [Adding a comparison page](#adding-a-comparison-page)
- [Adding a guide](#adding-a-guide)
- [Adding affiliate links](#adding-affiliate-links)
- [AdSense integration](#adsense-integration)
- [SEO strategy](#seo-strategy)
- [Hosting Finder architecture](#hosting-finder-architecture)
- [Recommendation algorithm](#recommendation-algorithm)
- [Comparison architecture](#comparison-architecture)
- [Future backend integration](#future-backend-integration)
- [Deployment](#deployment)
- [Known limitations](#known-limitations)

---

## Technology

- **Angular 21** — standalone components only, no NgModules
- **TypeScript**, strict-ish mode via Angular CLI defaults
- **Angular Signals** (`signal`, `computed`, `effect`) for all reactive state
- **Angular Router** with lazy-loaded (`loadComponent`) routes
- **Reactive Forms** (`ReactiveFormsModule`) for the contact form
- **SCSS** with a CSS-custom-property design token system (light/dark themes)
- **RxJS** only where genuinely useful (data-service return types), not as a
  state-management framework
- **No NgRx** — Signals are sufficient for this app's state
- **Zoneless change detection** (`provideZonelessChangeDetection`)
- Local **TypeScript mock data** + **browser `localStorage`** — no backend

## Node version

```bash
node -v   # v24.19.0 (do not downgrade)
npm -v    # 11.17.0
ng version # Angular CLI 21.2.20
```

## Installation

```bash
npm install
```

## Development

```bash
npm start        # ng serve, http://localhost:4200
```

The app automatically reloads on file changes. Theme, comparison selection,
favorites, Hosting Finder answers and cookie preferences all persist via
`localStorage`, so state survives a page refresh.

## Production build

```bash
npm run build     # ng build (production configuration)
```

Output is written to `dist/hostcompare/`. The initial bundle is currently
~95 kB transferred (gzip-equivalent), well under the configured budgets in
`angular.json` (500 kB warning / 1 MB error on the initial bundle).

## Architecture

```text
src/app/
├── core/
│   ├── models/       # All shared TypeScript interfaces (HostingProvider, HostingPlan, ...)
│   ├── services/     # HostingService, ComparisonsService, GuidesService, ReviewsService,
│   │                 # DomainsService, SeoService, ThemeService, FavoritesService,
│   │                 # CompareSelectionService, CookieConsentService, ToastService, SearchService
│   └── (utils/ reserved for future pure helpers)
│
├── shared/
│   ├── components/   # ProviderCard, ComparisonCard, GuideCard, ReviewCard, RatingDisplay,
│   │                 # Badge, FavoriteButton, CompareButton, AffiliateButton, AdPlaceholder
│   │                 # (+ AdBanner/AdInArticle/AdSidebar/AdRectangle), FilterPanel, SearchBox,
│   │                 # Breadcrumb, FaqAccordion, Pagination, Modal, EmptyState, RelatedContent,
│   │                 # ContentBlocks, Icon, CookieConsentBanner, Toast
│   └── directives/   # ClickOutsideDirective
│
├── layout/
│   ├── header/       # Sticky responsive header: nav, search, compare badge, theme toggle
│   └── footer/       # Site map, affiliate disclosure blurb, legal links
│
└── features/
    ├── home/                 # "/"
    ├── hosting/              # "/hosting", "/hosting/:slug" (+ "/reviews/:slug")
    ├── wordpress/            # "/wordpress-hosting"
    ├── vps/                  # "/vps"
    ├── domains/              # "/domains", "/domain-comparison"
    ├── comparisons/          # "/compare", "/compare/:slug"
    ├── hosting-finder/       # "/hosting-finder"
    ├── reviews/              # "/reviews"
    ├── guides/               # "/guides", "/guides/:slug"
    ├── search/               # "/search"
    ├── favorites/            # "/favorites"
    └── legal/                # about, contact, privacy-policy, terms, disclaimer,
                               # cookie-policy, affiliate-disclosure, 404
```

Each feature that owns data keeps it in a `data/*.data.ts` file, exported as a
plain array plus a `getXBySlug()` helper — never inline in a template.

## Adding a hosting provider

1. Add a new `HostingProvider` object to
   `src/app/features/hosting/data/providers.data.ts` (see the interface in
   `src/app/core/models/hosting-provider.model.ts` for every required field).
2. Give it a unique `id` and `slug` — the slug becomes the URL segment for
   `/hosting/:slug` and `/reviews/:slug`.
3. Add at least one `HostingPlan` for it in
   `src/app/features/hosting/data/plans.data.ts` (`providerId` must match the
   provider's `id`).
4. Optionally add a matching `Review` in
   `src/app/features/reviews/data/reviews.data.ts` (`providerId` must match).
5. Reference the new provider's `id` from any `relatedProviderIds` arrays on
   providers you want to cross-link, and from `Comparison.providerIdA/B` if
   you want an SEO comparison page featuring it.
6. Set `isMockData: true` and a realistic `dataUpdated` date unless you have
   verified the pricing/features yourself — see
   [Updating prices](#updating-prices-and-provider-data).

No component needs to change — `HostingService`, the hosting directory,
provider detail page, comparison engine and search all read from this array.

## Adding a hosting plan

Add an entry to `src/app/features/hosting/data/plans.data.ts` matching the
`HostingPlan` interface. `HostingService.getPlansByProvider(providerId)`
picks it up automatically; the comparison table uses the first plan per
provider today (`plans[0]`) as the representative "starter" plan, so keep
plans ordered cheapest-first per provider if you add more than the current
two per provider.

## Updating prices and provider data

Every provider, plan, and registrar record carries `isMockData: true` and a
`dataUpdated` (or similar) ISO date field. Before treating any of this data
as production-ready:

1. Verify the **current introductory price** and **current renewal price**
   separately — hosts frequently change both independently of each other.
   The data model has explicit `price` (or `startingPrice`) vs
   `renewalPrice` fields specifically to avoid conflating the two.
2. Verify storage, bandwidth, included domain, SSL, backup, and money-back
   guarantee terms — these change with provider marketing cycles.
3. Update the `dataUpdated` field to the date you verified the data.
4. Never remove the "sample data" language from the UI (provider cards,
   provider pages, comparison pages, footer) unless the underlying data is
   genuinely current and sourced — see `docs/ADSENSE.md`'s sibling concern
   about not misrepresenting placeholder content as real.

## Adding a comparison page

1. Pick two existing provider `id`s.
2. Add a `Comparison` object to
   `src/app/features/comparisons/data/comparisons.data.ts` with
   `slug: '<provider-a>-vs-<provider-b>'` (this exact pattern is what
   `/compare/:slug` expects and what internal links generate).
3. Fill in every field on the `Comparison` interface — the comparison detail
   page renders all of them (quick verdict, pricing/performance/ease-of-use/
   support/security/features summaries, best-for lists, choose-A/choose-B
   lists, final summary, FAQs). Leaving a thin, mostly-empty comparison page
   defeats the point of this page type — see the project brief's "no thin
   doorway pages" rule.
4. Add the new slug to `relatedComparisonSlugs` on the two providers involved
   and on any related guides, so it's reachable via internal links, not just
   direct URL.

## Adding a guide

1. Add a `Guide` object to `src/app/features/guides/data/guides.data.ts`.
2. Write `content` as an array of typed `GuideContentBlock`s (`paragraph`,
   `heading`, `list`, `table`, `code`, `quote`) — never raw HTML. Headings
   need a unique `id` (kebab-case) so the auto-generated table of contents
   can deep-link to them.
3. Set `category` to one of the existing `GuideCategory` values so it shows
   up in the `/guides` category filter.
4. Populate `relatedGuideSlugs`, `relatedProviderIds` and
   `relatedComparisonSlugs` — this is what powers the internal-linking
   `RelatedContentComponent` block at the bottom of the article.

## Adding affiliate links

- Every provider/registrar record has an optional `affiliateUrl`. If it's
  set, `AffiliateButtonComponent` renders `rel="nofollow sponsored noopener"`
  and shows an "Affiliate link — why?" disclosure linking to
  `/affiliate-disclosure`.
- If `affiliateUrl` is not set, the button falls back to the plain
  `websiteUrl` with `rel="noopener"` only — it never mislabels a normal link
  as an affiliate one.
- **Never hardcode an affiliate URL inside a component template.** All CTA
  components take the URL as an `@Input`/signal input sourced from the data
  layer (`HostingProvider.affiliateUrl`, `DomainRegistrar.affiliateUrl`, or
  a `HostingPlan.affiliateUrl` override for plan-specific tracking links).

## AdSense integration

No ad network is wired up yet. Four placeholder components
(`AdBannerComponent`, `AdInArticleComponent`, `AdSidebarComponent`,
`AdRectangleComponent`) reserve correctly-sized, clearly labeled slots in the
homepage, provider pages, comparison pages and guide articles. See
[`docs/ADSENSE.md`](docs/ADSENSE.md) for the exact steps to wire in real
Google AdSense later, including respecting the cookie-consent "Advertising"
category before loading any ad script.

## SEO strategy

`SeoService` (`src/app/core/services/seo.service.ts`) centralizes:

- `setPage()` — sets `<title>`, meta description, canonical link, Open Graph
  and Twitter Card tags in one call, invoked from every routed page's
  `ngOnInit`.
- `setJsonLd(id, data)` / `removeJsonLd(id)` — injects/removes a
  `<script type="application/ld+json">` block via `textContent` (never
  `innerHTML`), used for `Organization` and `WebSite` (global, in `App`),
  and `BreadcrumbList`/`Article`/`FAQPage` on individual pages — **only when
  that page genuinely has breadcrumbs / an article / FAQs**, never
  fabricated.

The site is built around two conversion/traffic architectures:

```text
Visitor → Hosting Finder → Recommendations → Comparison → Provider Review → Visit Provider
Google Search → Comparison / Guide page → Provider Review → Visit Provider
```

Concretely: `/compare/hostinger-vs-bluehost` links to `/hosting/hostinger`
and `/hosting/bluehost` (via "Read the Full Reviews"), which each link back
to related comparisons and guides, which link to the Hosting Finder and
`/compare`. Every content type (`RelatedContentComponent`) cross-links to
the other three, by design.

## Hosting Finder architecture

`src/app/features/hosting-finder/`:

- `services/finder.service.ts` — holds the 7 `FinderQuestion`s (website
  type, experience, traffic, budget, needs WordPress/VPS/email), the
  visitor's `FinderAnswers` (persisted to `localStorage`), step navigation
  signals, and `getRecommendations()`.
- `components/finder-progress.component.ts` — the step progress bar.
- `components/recommendation-card.component.ts` — one scored recommendation
  with match score, matching features, and transparent "why recommended"
  reasons.
- `pages/finder-wizard/` — the routed page that renders one question per
  step, then the recommendation results.

## Recommendation algorithm

Weights (see `FINDER_WEIGHTS` in `finder.service.ts`):

| Factor | Weight |
| --- | --- |
| Budget fit | 25% |
| Hosting type fit | 20% |
| Required features (SSL/backup/domain/email) | 20% |
| Performance (traffic-adjusted) | 15% |
| WordPress/VPS requirement match | 10% |
| Support quality (experience-adjusted) | 10% |

Each factor is scored 0–100 independently and combined into a single
0–100 `matchScore` using the weights above. Every provider that clears the
top-5 cut gets a `reasons: string[]` array built from *which* factors scored
well combined with what the visitor actually answered — e.g. "Matches your
₹100–300 budget" or "Includes managed WordPress hosting" — so a
recommendation is always explainable and never just asserts "this is the
best hosting."

## Comparison architecture

Two related but distinct concepts:

1. **The comparison *tool*** (`/compare`) — `CompareSelectionService` holds
   up to 4 provider IDs the visitor is actively comparing, persisted to
   `localStorage` under `hostcompare-comparison`. Populated by "Add to
   compare" buttons anywhere in the app (provider cards, provider pages,
   Hosting Finder recommendations) and rendered by the shared
   `ComparisonTableComponent`.
2. **SEO comparison *pages*** (`/compare/:slug`) — fully authored, static
   editorial content in `comparisons.data.ts` for specific, high-intent
   provider pairs (e.g. "hostinger-vs-bluehost"). These are not generated
   from the live comparison tool; they're written content that happens to
   also render the same `ComparisonTableComponent` for its "Quick
   Comparison" section.

## Future backend integration

Every data-access method already returns an `Observable`, even though it
currently resolves synchronously from local arrays:

```ts
hostingService.getProviders(): Observable<HostingProvider[]>
hostingService.getProviderBySlug(slug): Observable<HostingProvider | undefined>
hostingService.getPlansByProvider(providerId)              // sync helper today
comparisonsService.getComparisonBySlug(slug): Observable<Comparison | undefined>
reviewsService.getReviews(): Observable<Review[]>
guidesService.getGuideBySlug(slug): Observable<Guide | undefined>
domainsService.searchDomain(query): Observable<DomainSearchResult[]>
```

To move to a real backend: inject `HttpClient` into each service, replace
the `of(LOCAL_ARRAY)` call with `this.http.get<T>('/api/providers')` (etc.),
and delete the corresponding `data/*.data.ts` file. No component code should
need to change, since components only ever depend on the service's method
signatures, not on where the data comes from.

`DomainsService.searchDomain()` is explicitly a deterministic, frontend-only
simulation (hash-based fake availability) — it is **not** a real WHOIS
lookup and is clearly commented as such; replace it with a real
availability API call the same way.

## Deployment

This is a static Angular app (no SSR) — deploy the contents of
`dist/hostcompare/browser/` to any static host (Netlify, Vercel, Cloudflare
Pages, GitHub Pages, S3+CloudFront, nginx, etc.). Because routing is
client-side, configure your host to rewrite all unmatched paths to
`index.html` (a SPA fallback rule), otherwise a hard refresh on e.g.
`/hosting/hostinger` will 404 at the host level before Angular's router ever
runs.

## Known limitations

- **No backend, no real database.** Favorites, comparison selection, theme,
  Hosting Finder answers and cookie preferences all live in the visitor's
  own browser (`localStorage`) and are not shared across devices.
- **Contact form is frontend-only.** It validates and shows a success state
  but does not send an email anywhere yet (see
  [Future backend integration](#future-backend-integration)).
- **Domain availability search is simulated**, not a real registrar/WHOIS
  API call.
- **Pricing and feature data is sample/mock data** and will drift from real
  provider pricing over time — see
  [Updating prices](#updating-prices-and-provider-data).
- **No AdSense script is loaded** — only placeholder ad slots exist (see
  [`docs/ADSENSE.md`](docs/ADSENSE.md)).
- **Cookie consent is a functional starting point, not legal advice** — the
  categories and copy should be reviewed against the specific
  regions/regulations (GDPR, CCPA, etc.) the live site will target.

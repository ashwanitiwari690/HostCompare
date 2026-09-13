import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'hosting',
    loadComponent: () =>
      import('./features/hosting/pages/hosting-directory/hosting-directory.component').then((m) => m.HostingDirectoryComponent),
  },
  {
    path: 'hosting/:slug',
    loadComponent: () =>
      import('./features/hosting/pages/provider-detail/provider-detail.component').then((m) => m.ProviderDetailComponent),
  },
  {
    path: 'wordpress-hosting',
    loadComponent: () =>
      import('./features/wordpress/pages/wordpress-hosting.component').then((m) => m.WordpressHostingComponent),
  },
  {
    path: 'vps',
    loadComponent: () => import('./features/vps/pages/vps-hosting.component').then((m) => m.VpsHostingComponent),
  },
  {
    path: 'domains',
    loadComponent: () => import('./features/domains/pages/domains.component').then((m) => m.DomainsComponent),
  },
  {
    path: 'domain-comparison',
    loadComponent: () =>
      import('./features/domains/pages/domain-comparison/domain-comparison.component').then((m) => m.DomainComparisonComponent),
  },
  {
    path: 'compare',
    loadComponent: () => import('./features/comparisons/pages/compare-tool/compare-tool.component').then((m) => m.CompareToolComponent),
  },
  {
    path: 'compare/:slug',
    loadComponent: () =>
      import('./features/comparisons/pages/comparison-detail/comparison-detail.component').then((m) => m.ComparisonDetailComponent),
  },
  {
    path: 'hosting-finder',
    loadComponent: () =>
      import('./features/hosting-finder/pages/finder-wizard/finder-wizard.component').then((m) => m.FinderWizardComponent),
  },
  {
    path: 'reviews',
    loadComponent: () => import('./features/reviews/pages/reviews-list/reviews-list.component').then((m) => m.ReviewsListComponent),
  },
  {
    path: 'reviews/:slug',
    loadComponent: () =>
      import('./features/hosting/pages/provider-detail/provider-detail.component').then((m) => m.ProviderDetailComponent),
  },
  {
    path: 'guides',
    loadComponent: () => import('./features/guides/pages/guides-list/guides-list.component').then((m) => m.GuidesListComponent),
  },
  {
    path: 'guides/:slug',
    loadComponent: () => import('./features/guides/pages/guide-detail/guide-detail.component').then((m) => m.GuideDetailComponent),
  },
  {
    path: 'search',
    loadComponent: () => import('./features/search/pages/search-results.component').then((m) => m.SearchResultsComponent),
  },
  {
    path: 'favorites',
    loadComponent: () => import('./features/favorites/pages/favorites.component').then((m) => m.FavoritesComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./features/legal/pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/legal/pages/contact/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./features/legal/pages/legal-page/legal-page.component').then((m) => m.LegalPageComponent),
    data: { legalSlug: 'privacy-policy' },
  },
  {
    path: 'terms',
    loadComponent: () => import('./features/legal/pages/legal-page/legal-page.component').then((m) => m.LegalPageComponent),
    data: { legalSlug: 'terms' },
  },
  {
    path: 'disclaimer',
    loadComponent: () => import('./features/legal/pages/legal-page/legal-page.component').then((m) => m.LegalPageComponent),
    data: { legalSlug: 'disclaimer' },
  },
  {
    path: 'cookie-policy',
    loadComponent: () => import('./features/legal/pages/legal-page/legal-page.component').then((m) => m.LegalPageComponent),
    data: { legalSlug: 'cookie-policy' },
  },
  {
    path: 'affiliate-disclosure',
    loadComponent: () => import('./features/legal/pages/legal-page/legal-page.component').then((m) => m.LegalPageComponent),
    data: { legalSlug: 'affiliate-disclosure' },
  },
  {
    path: '404',
    loadComponent: () => import('./features/legal/pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

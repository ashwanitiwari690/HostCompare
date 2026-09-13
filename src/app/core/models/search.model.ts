export type SearchResultType = 'provider' | 'plan' | 'domain' | 'review' | 'guide' | 'comparison';

export interface SearchResultItem {
  type: SearchResultType;
  title: string;
  description: string;
  routerLink: string;
  meta?: string;
}

export type FavoriteType = 'provider' | 'guide' | 'comparison';

export interface FavoriteItem {
  type: FavoriteType;
  id: string;
  addedAt: string;
}

export type Theme = 'light' | 'dark' | 'system';

export interface CookiePreferences {
  necessary: true;
  analytics: boolean;
  advertising: boolean;
  decidedAt: string | null;
}

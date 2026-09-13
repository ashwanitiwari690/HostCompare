export interface Feature {
  id: string;
  label: string;
  key: string;
  icon?: string;
  filterable?: boolean;
}

export interface AffiliateLink {
  id: string;
  providerId: string;
  url: string;
  ctaText: string;
  placement?: 'top' | 'pricing' | 'bottom' | 'sidebar' | 'card';
}

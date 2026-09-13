export interface DomainRegistrar {
  id: string;
  slug: string;
  name: string;
  logoInitials: string;
  logoColor: string;
  description: string;
  websiteUrl: string;
  affiliateUrl?: string;
  ctaText: string;
  registrationPriceFrom: number;
  renewalPriceFrom: number;
  transferPriceFrom: number;
  currency: string;
  whoisPrivacyFree: boolean;
  dnsManagement: boolean;
  emailForwarding: boolean;
  websiteBuilder: boolean;
  freeSsl: boolean;
  unlimitedSubdomains: boolean;
  supportChannels: string[];
  rating: number;
  pros: string[];
  cons: string[];
  bestFor: string[];
  supportedTlds: string[];
  isMockData: true;
  dataUpdated: string;
}

export interface DomainExtension {
  tld: string;
  category: 'Popular' | 'Business' | 'Tech' | 'Country' | 'Niche';
  registrationPrice: number;
  renewalPrice: number;
  currency: string;
  popularity: 'high' | 'medium' | 'low';
  description: string;
  isMockData: true;
}

export interface DomainSearchResult {
  domain: string;
  tld: string;
  available: boolean;
  price: number;
  currency: string;
}

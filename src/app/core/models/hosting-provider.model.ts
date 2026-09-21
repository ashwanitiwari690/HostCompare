export type HostingType =
  | 'shared'
  | 'wordpress'
  | 'vps'
  | 'cloud'
  | 'dedicated'
  | 'reseller'
  | 'email';

export interface RatingBreakdown {
  overall: number;
  easeOfUse: number;
  performance: number;
  support: number;
  features: number;
  valueForMoney: number;
}

export interface ProviderFaq {
  question: string;
  answer: string;
}

/**
 * Editorial provider profile. All pricing/feature data is sample/mock data
 * for development and must be verified against the live provider before
 * production use (see docs/ADSENSE.md and README "Updating prices").
 */
export interface HostingProvider {
  id: string;
  slug: string;
  name: string;
  logoInitials: string;
  logoColor: string;
  tagline: string;
  description: string;
  overview: string;
  websiteUrl: string;
  affiliateUrl?: string;
  ctaText: string;
  hostingTypes: HostingType[];
  startingPrice: number;
  currency: string;
  billingPeriod: string;
  introductoryPrice: boolean;
  renewalPrice?: number;
  rating: RatingBreakdown;
  keyFeatures: string[];
  pros: string[];
  cons: string[];
  bestFor: string[];
  avoidIf: string[];
  moneyBackGuaranteeDays: number;
  freeDomain: boolean;
  freeSsl: boolean;
  freeCdn: boolean;
  freeBackup: boolean;
  freeEmail: boolean;
  dataCenters: string[];
  uptimeGuarantee: string;
  supportChannels: string[];
  founded?: number;
  headquarters?: string;
  editorsNote: string;
  relatedProviderIds: string[];
  relatedGuideSlugs: string[];
  relatedComparisonSlugs: string[];
  faqs: ProviderFaq[];
  popularity: number;
  isMockData?: boolean;
  dataUpdated: string;
}

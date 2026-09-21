export interface HostingPlan {
  id: string;
  providerId: string;
  name: string;
  tier: string;
  price: number;
  currency: string;
  billingPeriod: string;
  introductoryPrice: boolean;
  renewalPrice?: number;
  storage: string;
  bandwidth: string;
  websites: number | 'unlimited';
  freeDomain: boolean;
  ssl: boolean;
  backup: boolean;
  email: boolean;
  wordpress: boolean;
  vps: boolean;
  cloud: boolean;
  cpu?: string;
  ram?: string;
  recommended?: boolean;
  affiliateUrl?: string;
  isMockData?: boolean;
}

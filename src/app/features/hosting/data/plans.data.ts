import { HostingPlan } from '../../../core/models';

/**
 * Sample hosting plan data (mock/demo pricing) used to populate plan tables
 * on provider review pages and the comparison engine. Never rendered as
 * hardcoded strings in templates — always read from this data source.
 */
export const PLANS: HostingPlan[] = [
  {
    id: 'hostinger-starter', providerId: 'hostinger', name: 'Premium Web Hosting', tier: 'Starter',
    price: 149, currency: 'INR', billingPeriod: '/mo', introductoryPrice: true, renewalPrice: 299,
    storage: '100 GB SSD', bandwidth: 'Unmetered', websites: 100, freeDomain: true, ssl: true,
    backup: true, email: true, wordpress: true, vps: false, cloud: false, isMockData: true,
  },
  {
    id: 'hostinger-business', providerId: 'hostinger', name: 'Business Web Hosting', tier: 'Business',
    price: 279, currency: 'INR', billingPeriod: '/mo', introductoryPrice: true, renewalPrice: 449,
    storage: '200 GB NVMe SSD', bandwidth: 'Unmetered', websites: 100, freeDomain: true, ssl: true,
    backup: true, email: true, wordpress: true, vps: false, cloud: false, recommended: true, isMockData: true,
  },
  {
    id: 'bluehost-starter', providerId: 'bluehost', name: 'Basic', tier: 'Starter',
    price: 199, currency: 'INR', billingPeriod: '/mo', introductoryPrice: true, renewalPrice: 399,
    storage: '10 GB SSD', bandwidth: 'Unmetered', websites: 1, freeDomain: true, ssl: true,
    backup: false, email: true, wordpress: true, vps: false, cloud: false, isMockData: true,
  },
  {
    id: 'bluehost-plus', providerId: 'bluehost', name: 'Choice Plus', tier: 'Business',
    price: 349, currency: 'INR', billingPeriod: '/mo', introductoryPrice: true, renewalPrice: 599,
    storage: '40 GB SSD', bandwidth: 'Unmetered', websites: 'unlimited', freeDomain: true, ssl: true,
    backup: true, email: true, wordpress: true, vps: false, cloud: false, recommended: true, isMockData: true,
  },
  {
    id: 'siteground-starter', providerId: 'siteground', name: 'StartUp', tier: 'Starter',
    price: 399, currency: 'INR', billingPeriod: '/mo', introductoryPrice: true, renewalPrice: 799,
    storage: '10 GB SSD', bandwidth: '10,000 visits/mo', websites: 1, freeDomain: false, ssl: true,
    backup: true, email: true, wordpress: true, vps: false, cloud: false, isMockData: true,
  },
  {
    id: 'siteground-grow', providerId: 'siteground', name: 'GrowBig', tier: 'Business',
    price: 649, currency: 'INR', billingPeriod: '/mo', introductoryPrice: true, renewalPrice: 1299,
    storage: '20 GB SSD', bandwidth: '25,000 visits/mo', websites: 'unlimited', freeDomain: false, ssl: true,
    backup: true, email: true, wordpress: true, vps: false, cloud: false, recommended: true, isMockData: true,
  },
  {
    id: 'namecheap-stellar', providerId: 'namecheap', name: 'Stellar', tier: 'Starter',
    price: 169, currency: 'INR', billingPeriod: '/mo', introductoryPrice: true, renewalPrice: 349,
    storage: '20 GB SSD', bandwidth: 'Unmetered', websites: 3, freeDomain: false, ssl: true,
    backup: true, email: true, wordpress: true, vps: false, cloud: false, isMockData: true,
  },
  {
    id: 'namecheap-stellar-plus', providerId: 'namecheap', name: 'Stellar Plus', tier: 'Business',
    price: 289, currency: 'INR', billingPeriod: '/mo', introductoryPrice: true, renewalPrice: 549,
    storage: 'Unmetered SSD', bandwidth: 'Unmetered', websites: 'unlimited', freeDomain: false, ssl: true,
    backup: true, email: true, wordpress: true, vps: false, cloud: false, recommended: true, isMockData: true,
  },
  {
    id: 'godaddy-economy', providerId: 'godaddy', name: 'Economy', tier: 'Starter',
    price: 149, currency: 'INR', billingPeriod: '/mo', introductoryPrice: true, renewalPrice: 399,
    storage: '25 GB SSD', bandwidth: 'Unmetered', websites: 1, freeDomain: true, ssl: true,
    backup: false, email: false, wordpress: true, vps: false, cloud: false, isMockData: true,
  },
  {
    id: 'godaddy-deluxe', providerId: 'godaddy', name: 'Deluxe', tier: 'Business',
    price: 299, currency: 'INR', billingPeriod: '/mo', introductoryPrice: true, renewalPrice: 599,
    storage: 'Unmetered SSD', bandwidth: 'Unmetered', websites: 'unlimited', freeDomain: true, ssl: true,
    backup: true, email: false, wordpress: true, vps: false, cloud: false, recommended: true, isMockData: true,
  },
  {
    id: 'dreamhost-shared-starter', providerId: 'dreamhost', name: 'Shared Starter', tier: 'Starter',
    price: 259, currency: 'INR', billingPeriod: '/mo', introductoryPrice: true, renewalPrice: 459,
    storage: '50 GB SSD', bandwidth: 'Unmetered', websites: 1, freeDomain: false, ssl: true,
    backup: false, email: true, wordpress: true, vps: false, cloud: false, isMockData: true,
  },
  {
    id: 'dreamhost-shared-unlimited', providerId: 'dreamhost', name: 'Shared Unlimited', tier: 'Business',
    price: 399, currency: 'INR', billingPeriod: '/mo', introductoryPrice: true, renewalPrice: 699,
    storage: 'Unmetered SSD', bandwidth: 'Unmetered', websites: 'unlimited', freeDomain: false, ssl: true,
    backup: true, email: true, wordpress: true, vps: false, cloud: false, recommended: true, isMockData: true,
  },
  {
    id: 'a2-startup', providerId: 'a2-hosting', name: 'Startup', tier: 'Starter',
    price: 229, currency: 'INR', billingPeriod: '/mo', introductoryPrice: true, renewalPrice: 499,
    storage: '100 GB SSD', bandwidth: 'Unmetered', websites: 1, freeDomain: false, ssl: true,
    backup: false, email: true, wordpress: true, vps: false, cloud: false, isMockData: true,
  },
  {
    id: 'a2-turbo-boost', providerId: 'a2-hosting', name: 'Turbo Boost', tier: 'Business',
    price: 499, currency: 'INR', billingPeriod: '/mo', introductoryPrice: true, renewalPrice: 899,
    storage: 'Unmetered NVMe SSD', bandwidth: 'Unmetered', websites: 'unlimited', freeDomain: false, ssl: true,
    backup: true, email: true, wordpress: true, vps: false, cloud: false, recommended: true, isMockData: true,
  },
  {
    id: 'cloudways-standard', providerId: 'cloudways', name: 'Standard 1GB', tier: 'Starter',
    price: 833, currency: 'INR', billingPeriod: '/mo', introductoryPrice: false,
    storage: '25 GB SSD', bandwidth: '1 TB', websites: 'unlimited', freeDomain: false, ssl: true,
    backup: true, email: false, wordpress: true, vps: false, cloud: true, cpu: '1 vCPU', ram: '1 GB', isMockData: true,
  },
  {
    id: 'cloudways-performance', providerId: 'cloudways', name: 'Standard 4GB', tier: 'Business',
    price: 2499, currency: 'INR', billingPeriod: '/mo', introductoryPrice: false,
    storage: '80 GB SSD', bandwidth: '3 TB', websites: 'unlimited', freeDomain: false, ssl: true,
    backup: true, email: false, wordpress: true, vps: false, cloud: true, cpu: '2 vCPU', ram: '4 GB', recommended: true, isMockData: true,
  },
  {
    id: 'ionos-essential', providerId: 'ionos', name: 'Essential', tier: 'Starter',
    price: 99, currency: 'INR', billingPeriod: '/mo', introductoryPrice: true, renewalPrice: 499,
    storage: '25 GB SSD', bandwidth: 'Unmetered', websites: 1, freeDomain: true, ssl: true,
    backup: true, email: true, wordpress: true, vps: false, cloud: false, isMockData: true,
  },
  {
    id: 'ionos-business', providerId: 'ionos', name: 'Business', tier: 'Business',
    price: 249, currency: 'INR', billingPeriod: '/mo', introductoryPrice: true, renewalPrice: 699,
    storage: '100 GB SSD', bandwidth: 'Unmetered', websites: 'unlimited', freeDomain: true, ssl: true,
    backup: true, email: true, wordpress: true, vps: false, cloud: false, recommended: true, isMockData: true,
  },
  {
    id: 'digitalocean-basic-droplet', providerId: 'digitalocean', name: 'Basic Droplet', tier: 'Starter',
    price: 400, currency: 'INR', billingPeriod: '/mo', introductoryPrice: false,
    storage: '25 GB SSD', bandwidth: '1 TB', websites: 'unlimited', freeDomain: false, ssl: true,
    backup: false, email: false, wordpress: false, vps: true, cloud: true, cpu: '1 vCPU', ram: '1 GB', isMockData: true,
  },
  {
    id: 'digitalocean-general-purpose', providerId: 'digitalocean', name: 'General Purpose Droplet', tier: 'Business',
    price: 1600, currency: 'INR', billingPeriod: '/mo', introductoryPrice: false,
    storage: '60 GB SSD', bandwidth: '4 TB', websites: 'unlimited', freeDomain: false, ssl: true,
    backup: false, email: false, wordpress: false, vps: true, cloud: true, cpu: '2 vCPU', ram: '4 GB', recommended: true, isMockData: true,
  },
  {
    id: 'vultr-cloud-compute', providerId: 'vultr', name: 'Cloud Compute', tier: 'Starter',
    price: 250, currency: 'INR', billingPeriod: '/mo', introductoryPrice: false,
    storage: '25 GB SSD', bandwidth: '1 TB', websites: 'unlimited', freeDomain: false, ssl: true,
    backup: false, email: false, wordpress: false, vps: true, cloud: true, cpu: '1 vCPU', ram: '1 GB', isMockData: true,
  },
  {
    id: 'vultr-high-frequency', providerId: 'vultr', name: 'High Frequency Compute', tier: 'Business',
    price: 1500, currency: 'INR', billingPeriod: '/mo', introductoryPrice: false,
    storage: '64 GB NVMe SSD', bandwidth: '3 TB', websites: 'unlimited', freeDomain: false, ssl: true,
    backup: false, email: false, wordpress: false, vps: true, cloud: true, cpu: '2 vCPU', ram: '4 GB', recommended: true, isMockData: true,
  },
];

export function getPlansByProvider(providerId: string): HostingPlan[] {
  return PLANS.filter((p) => p.providerId === providerId);
}

import { DomainRegistrar } from '../../../core/models';

/**
 * Sample/editorial domain registrar profiles. Pricing is mock data — always
 * verify current registration, renewal and transfer pricing directly with
 * the registrar before publishing as fact.
 */
export const REGISTRARS: DomainRegistrar[] = [
  {
    id: 'namecheap', slug: 'namecheap', name: 'Namecheap', logoInitials: 'N', logoColor: '#FF5722',
    description: 'Competitively priced domains with free WHOIS privacy on almost every TLD.',
    websiteUrl: 'https://www.namecheap.com', affiliateUrl: '#', ctaText: 'Visit Namecheap',
    registrationPriceFrom: 599, renewalPriceFrom: 999, transferPriceFrom: 699, currency: 'INR',
    whoisPrivacyFree: true, dnsManagement: true, emailForwarding: true, websiteBuilder: true, freeSsl: true,
    unlimitedSubdomains: true, supportChannels: ['24/7 Live Chat', 'Ticket'],
    rating: 4.6,
    pros: ['Free WHOIS privacy included', 'Simple, uncluttered dashboard', 'Competitive renewal pricing versus big-brand registrars'],
    cons: ['Fewer enterprise/multi-domain management tools', 'Upsells for premium DNS and email'],
    bestFor: ['Individuals and small businesses', 'Anyone who wants private WHOIS by default'],
    supportedTlds: ['.com', '.net', '.org', '.io', '.dev', '.store', '.online', '.co'],
    isMockData: true, dataUpdated: '2026-01-15',
  },
  {
    id: 'godaddy', slug: 'godaddy', name: 'GoDaddy', logoInitials: 'G', logoColor: '#1BDBDB',
    description: "The world's largest registrar, with the widest selection of TLDs and add-ons.",
    websiteUrl: 'https://www.godaddy.com', affiliateUrl: '#', ctaText: 'Visit GoDaddy',
    registrationPriceFrom: 99, renewalPriceFrom: 1299, transferPriceFrom: 799, currency: 'INR',
    whoisPrivacyFree: false, dnsManagement: true, emailForwarding: true, websiteBuilder: true, freeSsl: false,
    unlimitedSubdomains: true, supportChannels: ['24/7 Phone', 'Live Chat', 'Ticket'],
    rating: 4.0,
    pros: ['Massive TLD selection', 'Aggressive introductory registration pricing', 'Strong phone support'],
    cons: ['WHOIS privacy is a paid add-on', 'Renewal prices increase substantially', 'Frequent upsells at checkout'],
    bestFor: ['Buyers who want one platform for everything', 'Domain investors needing bulk tools'],
    supportedTlds: ['.com', '.net', '.org', '.co', '.info', '.biz', '.in', '.shop'],
    isMockData: true, dataUpdated: '2026-01-15',
  },
  {
    id: 'cloudflare', slug: 'cloudflare-registrar', name: 'Cloudflare Registrar', logoInitials: 'CF', logoColor: '#F6821F',
    description: 'At-cost domain pricing with no markup, bundled with Cloudflare\'s DNS and security network.',
    websiteUrl: 'https://www.cloudflare.com/products/registrar/', affiliateUrl: '#', ctaText: 'Visit Cloudflare',
    registrationPriceFrom: 799, renewalPriceFrom: 799, transferPriceFrom: 799, currency: 'INR',
    whoisPrivacyFree: true, dnsManagement: true, emailForwarding: false, websiteBuilder: false, freeSsl: true,
    unlimitedSubdomains: true, supportChannels: ['Ticket', 'Community Forum'],
    rating: 4.7,
    pros: ['At-cost pricing with no renewal markup', 'Best-in-class DNS performance and security', 'Free WHOIS privacy'],
    cons: ['Requires an existing Cloudflare account', 'No new .com registrations (transfers only, subject to change)', 'No website builder or email hosting'],
    bestFor: ['Technical users who already use Cloudflare', 'Anyone prioritizing DNS performance and security'],
    supportedTlds: ['.com', '.net', '.dev', '.app', '.io', '.org'],
    isMockData: true, dataUpdated: '2026-01-15',
  },
  {
    id: 'porkbun', slug: 'porkbun', name: 'Porkbun', logoInitials: 'PB', logoColor: '#EF5A28',
    description: 'A developer-favorite registrar known for low prices and a refreshingly simple dashboard.',
    websiteUrl: 'https://porkbun.com', affiliateUrl: '#', ctaText: 'Visit Porkbun',
    registrationPriceFrom: 499, renewalPriceFrom: 899, transferPriceFrom: 699, currency: 'INR',
    whoisPrivacyFree: true, dnsManagement: true, emailForwarding: true, websiteBuilder: false, freeSsl: true,
    unlimitedSubdomains: true, supportChannels: ['Ticket'],
    rating: 4.6,
    pros: ['Very competitive registration and renewal pricing', 'Clean, fast dashboard', 'Free WHOIS privacy and SSL'],
    cons: ['Smaller company with a less-known brand', 'No phone support', 'No integrated website builder'],
    bestFor: ['Developers and price-sensitive buyers', 'Users who prefer a minimalist dashboard'],
    supportedTlds: ['.com', '.net', '.org', '.dev', '.xyz', '.app', '.co', '.io'],
    isMockData: true, dataUpdated: '2026-01-15',
  },
  {
    id: 'ionos', slug: 'ionos-domains', name: 'IONOS', logoInitials: 'IO', logoColor: '#003D8F',
    description: 'Domain registration bundled with IONOS\'s broader hosting and business tools.',
    websiteUrl: 'https://www.ionos.com/domains', affiliateUrl: '#', ctaText: 'Visit IONOS',
    registrationPriceFrom: 49, renewalPriceFrom: 1099, transferPriceFrom: 699, currency: 'INR',
    whoisPrivacyFree: true, dnsManagement: true, emailForwarding: true, websiteBuilder: true, freeSsl: true,
    unlimitedSubdomains: true, supportChannels: ['24/7 Phone', 'Live Chat', 'Ticket'],
    rating: 4.1,
    pros: ['Very low introductory registration pricing', 'Free WHOIS privacy included', 'Bundles well with IONOS hosting'],
    cons: ['Renewal price increases substantially', 'Interface less modern than newer registrars'],
    bestFor: ['Buyers already using IONOS hosting', 'Users wanting domain + hosting in one invoice'],
    supportedTlds: ['.com', '.net', '.org', '.de', '.eu', '.info'],
    isMockData: true, dataUpdated: '2026-01-15',
  },
];

export function getRegistrarBySlug(slug: string): DomainRegistrar | undefined {
  return REGISTRARS.find((r) => r.slug === slug);
}

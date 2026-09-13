import { DomainExtension } from '../../../core/models';

export const EXTENSIONS: DomainExtension[] = [
  { tld: '.com', category: 'Popular', registrationPrice: 599, renewalPrice: 999, currency: 'INR', popularity: 'high', description: 'The most recognized and trusted extension worldwide, ideal for most businesses.', isMockData: true },
  { tld: '.net', category: 'Popular', registrationPrice: 649, renewalPrice: 1099, currency: 'INR', popularity: 'high', description: 'A common alternative to .com, often used by tech and networking businesses.', isMockData: true },
  { tld: '.org', category: 'Popular', registrationPrice: 599, renewalPrice: 999, currency: 'INR', popularity: 'high', description: 'Traditionally associated with non-profits and community organizations.', isMockData: true },
  { tld: '.io', category: 'Tech', registrationPrice: 2999, renewalPrice: 2999, currency: 'INR', popularity: 'high', description: 'Popular with startups and developer tools thanks to its "input/output" association.', isMockData: true },
  { tld: '.dev', category: 'Tech', registrationPrice: 999, renewalPrice: 1299, currency: 'INR', popularity: 'medium', description: 'A Google-backed TLD for developers; requires HTTPS by default.', isMockData: true },
  { tld: '.app', category: 'Tech', registrationPrice: 999, renewalPrice: 1299, currency: 'INR', popularity: 'medium', description: 'Built-in HTTPS enforcement, popular for mobile and web applications.', isMockData: true },
  { tld: '.co', category: 'Business', registrationPrice: 799, renewalPrice: 1999, currency: 'INR', popularity: 'medium', description: 'A short, brandable alternative to .com used by many startups.', isMockData: true },
  { tld: '.store', category: 'Business', registrationPrice: 99, renewalPrice: 2499, currency: 'INR', popularity: 'medium', description: 'Signals an ecommerce or retail website to visitors immediately.', isMockData: true },
  { tld: '.online', category: 'Business', registrationPrice: 99, renewalPrice: 1799, currency: 'INR', popularity: 'medium', description: 'A generic, widely available alternative when your ideal .com is taken.', isMockData: true },
  { tld: '.site', category: 'Business', registrationPrice: 99, renewalPrice: 1699, currency: 'INR', popularity: 'medium', description: 'Short and flexible, suitable for almost any type of website.', isMockData: true },
  { tld: '.in', category: 'Country', registrationPrice: 499, renewalPrice: 699, currency: 'INR', popularity: 'high', description: "India's country-code TLD, ideal for businesses targeting Indian customers.", isMockData: true },
  { tld: '.us', category: 'Country', registrationPrice: 399, renewalPrice: 699, currency: 'INR', popularity: 'medium', description: "The United States' country-code TLD.", isMockData: true },
  { tld: '.uk', category: 'Country', registrationPrice: 399, renewalPrice: 599, currency: 'INR', popularity: 'medium', description: "The United Kingdom's country-code TLD.", isMockData: true },
  { tld: '.xyz', category: 'Niche', registrationPrice: 99, renewalPrice: 1099, currency: 'INR', popularity: 'medium', description: 'A generic, low-cost TLD popular with personal and experimental projects.', isMockData: true },
  { tld: '.blog', category: 'Niche', registrationPrice: 499, renewalPrice: 1999, currency: 'INR', popularity: 'low', description: 'Purpose-built for blogs and content publishers.', isMockData: true },
  { tld: '.shop', category: 'Niche', registrationPrice: 99, renewalPrice: 2999, currency: 'INR', popularity: 'low', description: 'A retail-focused TLD used by small ecommerce storefronts.', isMockData: true },
];

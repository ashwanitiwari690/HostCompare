import { GuideContentBlock } from '../../../core/models';

export interface LegalPage {
  slug: string;
  title: string;
  updatedDate: string;
  intro: string;
  content: GuideContentBlock[];
}

export const LEGAL_PAGES: LegalPage[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    updatedDate: '2026-01-15',
    intro: 'This Privacy Policy explains what information HostCompare collects, how it is used, and the choices you have. This is a template policy for a demonstration project — before going live, have it reviewed by a qualified professional for the regions you target.',
    content: [
      { type: 'heading', level: 2, text: 'Information We Collect', id: 'information-we-collect' },
      { type: 'paragraph', text: 'HostCompare is a frontend-only demonstration site. In its current form it does not operate a backend database, so no account information is stored on a server. Locally, your browser may store: your theme preference, your comparison selection, your favorites, your cookie preferences, and your Hosting Finder answers — all via browser localStorage on your own device.' },
      { type: 'heading', level: 2, text: 'Cookies & Similar Technologies', id: 'cookies' },
      { type: 'paragraph', text: 'We use a cookie consent banner to let you accept, reject, or manage non-essential cookies. See our Cookie Policy for details on the categories of cookies used and how to manage your preferences.' },
      { type: 'heading', level: 2, text: 'Third-Party Links & Affiliate Programs', id: 'third-party-links' },
      { type: 'paragraph', text: 'Provider "Visit" buttons may link to third-party hosting or domain providers, some of which may be affiliate links (see our Affiliate Disclosure). We do not control the privacy practices of third-party sites you visit from HostCompare.' },
      { type: 'heading', level: 2, text: 'Advertising', id: 'advertising' },
      { type: 'paragraph', text: 'This site reserves space for future advertising (e.g. Google AdSense). No advertising network is currently integrated; when one is added, this policy will be updated to describe any data such a network may collect (see docs/ADSENSE.md).' },
      { type: 'heading', level: 2, text: 'Contact Form', id: 'contact-form' },
      { type: 'paragraph', text: 'Our contact form is currently frontend-only and does not transmit data to a server — messages are not actually sent until backend email processing is integrated. Do not submit sensitive information through it.' },
      { type: 'heading', level: 2, text: 'Your Choices', id: 'your-choices' },
      { type: 'paragraph', text: 'You can clear locally stored data at any time by clearing your browser\'s site data for this domain, or by using the "Clear" actions available on the Compare and Favorites pages.' },
    ],
  },
  {
    slug: 'terms',
    title: 'Terms of Service',
    updatedDate: '2026-01-15',
    intro: 'These Terms of Service govern your use of HostCompare. This is a template for a demonstration project and should be reviewed by a qualified professional before real-world use.',
    content: [
      { type: 'heading', level: 2, text: 'Acceptance of Terms', id: 'acceptance' },
      { type: 'paragraph', text: 'By accessing HostCompare, you agree to these Terms of Service. If you do not agree, please do not use the site.' },
      { type: 'heading', level: 2, text: 'Informational Purpose', id: 'informational-purpose' },
      { type: 'paragraph', text: 'Content on HostCompare, including provider comparisons, editorial ratings and pricing, is provided for informational purposes and is sample/demonstration data unless otherwise stated. It should not be treated as financial, legal or professional advice.' },
      { type: 'heading', level: 2, text: 'Editorial Independence', id: 'editorial-independence' },
      { type: 'paragraph', text: 'Editorial ratings and recommendations reflect our own criteria and methodology. We may earn a commission from some providers via affiliate links (see our Affiliate Disclosure), which does not influence our editorial opinions.' },
      { type: 'heading', level: 2, text: 'No Warranty', id: 'no-warranty' },
      { type: 'paragraph', text: 'The site is provided "as is" without warranties of any kind, including accuracy of pricing or feature information, which can change at any time on the provider\'s end.' },
      { type: 'heading', level: 2, text: 'Limitation of Liability', id: 'limitation-of-liability' },
      { type: 'paragraph', text: 'To the fullest extent permitted by law, HostCompare is not liable for any damages arising from your use of, or reliance on, information provided on this site.' },
      { type: 'heading', level: 2, text: 'Changes to These Terms', id: 'changes' },
      { type: 'paragraph', text: 'We may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the updated terms.' },
    ],
  },
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    updatedDate: '2026-01-15',
    intro: 'Please read this disclaimer carefully before relying on any information found on HostCompare.',
    content: [
      { type: 'heading', level: 2, text: 'Sample & Editorial Data', id: 'sample-data' },
      { type: 'paragraph', text: 'This project uses sample/mock pricing and feature data for hosting providers, plans, and domain registrars during development. Where data is marked as sample or mock, it should not be treated as current, factual pricing. Always verify current pricing, renewal pricing, features and guarantees directly with the provider before making a purchase decision.' },
      { type: 'heading', level: 2, text: 'Editorial Ratings', id: 'editorial-ratings' },
      { type: 'paragraph', text: 'Ratings labeled "Editorial Rating" reflect our own assessment based on publicly available information and general industry criteria. They are not a guarantee of your individual experience with any provider.' },
      { type: 'heading', level: 2, text: 'No Professional Advice', id: 'no-professional-advice' },
      { type: 'paragraph', text: 'Nothing on this site constitutes legal, financial, or technical professional advice. Consult a qualified professional for advice specific to your situation.' },
      { type: 'heading', level: 2, text: 'Third-Party Content', id: 'third-party-content' },
      { type: 'paragraph', text: 'Links to third-party provider websites are provided for convenience. We are not responsible for the content, accuracy, or practices of third-party sites.' },
    ],
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    updatedDate: '2026-01-15',
    intro: 'This Cookie Policy explains how HostCompare uses cookies and similar technologies, and how you can manage your preferences.',
    content: [
      { type: 'heading', level: 2, text: 'What Are Cookies?', id: 'what-are-cookies' },
      { type: 'paragraph', text: 'Cookies are small text files stored on your device that help websites remember information about your visit, such as preferences and settings.' },
      { type: 'heading', level: 2, text: 'Categories We Use', id: 'categories' },
      { type: 'table', headers: ['Category', 'Purpose', 'Can be disabled?'], rows: [
        ['Necessary', 'Required for core site functionality (e.g. remembering your cookie choice)', 'No — always on'],
        ['Analytics', 'Helps us understand aggregate site usage to improve content and features', 'Yes'],
        ['Advertising', 'Reserved for future ad personalization (e.g. Google AdSense)', 'Yes'],
      ] },
      { type: 'heading', level: 2, text: 'Managing Your Preferences', id: 'managing-preferences' },
      { type: 'paragraph', text: 'You can accept all, reject non-essential, or manage individual cookie categories using the cookie banner shown on your first visit. You can revisit your choice at any time by clearing your browser\'s site data for this domain.' },
      { type: 'heading', level: 2, text: 'Regional Compliance', id: 'regional-compliance' },
      { type: 'paragraph', text: 'Cookie consent requirements vary by region (for example, GDPR in the EU/UK, or other regional privacy laws). This implementation is a general-purpose starting point and should be reviewed and adapted for the specific regions your site targets before production use.' },
    ],
  },
  {
    slug: 'affiliate-disclosure',
    title: 'Affiliate Disclosure',
    updatedDate: '2026-01-15',
    intro: 'Transparency about how HostCompare may be compensated is important to us.',
    content: [
      { type: 'heading', level: 2, text: 'How We May Earn a Commission', id: 'how-we-earn' },
      { type: 'paragraph', text: 'We may earn a commission when you purchase through links on our website. This is common practice for independent comparison and review websites and helps support the cost of researching and maintaining this content.' },
      { type: 'heading', level: 2, text: 'This Does Not Affect Our Editorial Opinions', id: 'editorial-independence' },
      { type: 'paragraph', text: 'Whether or not a provider link is an affiliate link, our editorial ratings, pros/cons, and recommendations are based on our own evaluation criteria. Providers cannot pay to change their editorial rating.' },
      { type: 'heading', level: 2, text: 'How to Identify Affiliate Links', id: 'identifying-links' },
      { type: 'paragraph', text: 'Where a "Visit Provider" button uses an affiliate link, we label it accordingly near the button. If no affiliate relationship exists for a given provider, we use a standard link instead and never misrepresent a plain link as an affiliate one.' },
      { type: 'heading', level: 2, text: 'Sponsored Content', id: 'sponsored-content' },
      { type: 'paragraph', text: 'HostCompare does not currently host sponsored listings. If sponsored placements are introduced in the future, they will be clearly labeled as "Sponsored" and kept separate from editorial rankings.' },
    ],
  },
];

export function getLegalPageBySlug(slug: string): LegalPage | undefined {
  return LEGAL_PAGES.find((p) => p.slug === slug);
}

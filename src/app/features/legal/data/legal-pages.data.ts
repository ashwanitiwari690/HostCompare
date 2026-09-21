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
    updatedDate: '2026-09-20',
    intro:
      'This Privacy Policy describes how HostCompare ("we", "us", or "our") collects, uses, and safeguards information when you visit https://host-compare.vercel.app (the "Website"). Please read this policy carefully to understand our practices regarding your personal data.',
    content: [
      { type: 'heading', level: 2, text: '1. Information We Collect', id: 'information-we-collect' },
      {
        type: 'paragraph',
        text: 'When you browse HostCompare, we may collect information in three primary ways: information you directly provide, information stored locally on your device, and standard technical server logging data.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Contact Form Information: When you send an inquiry via our contact form, we collect your name, email address, message subject, and content solely to respond to your inquiry.',
          'Local Device Storage: To provide a personalized user experience, your browser stores your theme preference (light/dark/system), comparison list selections, saved favorites, and cookie consent preferences using browser localStorage on your device.',
          'Server Log Files: Like most web servers, our hosting infrastructure automatically logs standard technical data including your IP address, browser user agent, operating system, referring URL, pages viewed, and access timestamps for security, DDoS mitigation, and server performance monitoring.',
        ],
      },
      { type: 'heading', level: 2, text: '2. Cookies and Web Beacons', id: 'cookies' },
      {
        type: 'paragraph',
        text: 'We use cookies, web beacons, and similar tracking technologies to analyze website traffic, maintain your preferences, and serve non-intrusive advertisements. You can control your cookie choices via our cookie banner and browser preferences.',
      },
      {
        type: 'paragraph',
        text: 'Google AdSense & Advertising Cookies: Third-party vendors, including Google, use cookies to serve ads based on a user\'s prior visits to this website or other websites. Google\'s use of advertising cookies enables it and its partners to serve ads based on your visit to HostCompare and/or other sites on the Internet. You may opt out of personalized advertising by visiting Google Ads Settings (https://adssettings.google.com) or aboutads.info.',
      },
      { type: 'heading', level: 2, text: '3. Affiliate Links & Outbound Tracking', id: 'affiliate-tracking' },
      {
        type: 'paragraph',
        text: 'HostCompare contains outbound links to third-party web hosting providers and domain registrars. If you click on an affiliate link and complete a purchase, the merchant\'s affiliate tracking network may place a temporary referral cookie on your device to credit HostCompare with a referral commission. These cookies do not transmit personally identifiable information to us.',
      },
      { type: 'heading', level: 2, text: '4. How We Use Your Information', id: 'how-we-use-information' },
      {
        type: 'list',
        ordered: false,
        items: [
          'To operate, maintain, and optimize the functionality of the comparison tools and educational content.',
          'To respond to your inquiries, feedback, and technical support requests.',
          'To prevent fraudulent activities, malicious traffic, and unauthorized scraping.',
          'To comply with legal obligations and enforce our Terms of Service.',
        ],
      },
      { type: 'heading', level: 2, text: '5. Data Sharing & Third-Party Disclosure', id: 'data-sharing' },
      {
        type: 'paragraph',
        text: 'HostCompare does not sell, rent, or trade your personal information. We may share technical data with trusted infrastructure providers (such as hosting and CDN services) strictly for the purpose of operating the Website, or when legally compelled by court orders or governmental authorities.',
      },
      { type: 'heading', level: 2, text: '6. User Rights (GDPR & CCPA Compliance)', id: 'user-rights' },
      {
        type: 'paragraph',
        text: 'Depending on your jurisdiction, you may have rights regarding your personal data, including the right to access, rectify, or request deletion of personal information held about you, as well as the right to object to or restrict processing. To exercise any of these rights, please email us at ashwini12tiwari@gmail.com.',
      },
      { type: 'heading', level: 2, text: '7. Data Security', id: 'data-security' },
      {
        type: 'paragraph',
        text: 'We implement industry-standard administrative and technical security measures, including SSL/TLS encryption for all data in transit. However, no electronic transmission over the Internet can be guaranteed 100% secure.',
      },
      { type: 'heading', level: 2, text: '8. Contact Information', id: 'contact-info' },
      {
        type: 'paragraph',
        text: 'For questions or concerns regarding this Privacy Policy or our data handling practices, please contact our privacy officer by email at ashwini12tiwari@gmail.com.',
      },
    ],
  },
  {
    slug: 'terms',
    title: 'Terms of Service',
    updatedDate: '2026-09-20',
    intro:
      'These Terms of Service ("Terms") govern your access to and use of HostCompare. By accessing or using our Website, you agree to be bound by these Terms.',
    content: [
      { type: 'heading', level: 2, text: '1. Agreement to Terms', id: 'agreement' },
      {
        type: 'paragraph',
        text: 'By visiting https://host-compare.vercel.app, you confirm that you have read, understood, and agreed to be legally bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these Terms, you must cease using the Website immediately.',
      },
      { type: 'heading', level: 2, text: '2. Informational & Educational Purpose', id: 'informational-purpose' },
      {
        type: 'paragraph',
        text: 'HostCompare is an independent web hosting comparison and educational resource. All content—including hosting plan comparisons, editorial ratings, guides, and technical glossary definitions—is provided for general informational purposes only. We are not a hosting provider and do not sell server infrastructure directly.',
      },
      { type: 'heading', level: 2, text: '3. Pricing & Feature Accuracy', id: 'pricing-accuracy' },
      {
        type: 'paragraph',
        text: 'Web hosting companies frequently update their introductory rates, renewal fees, storage quotas, and terms of service. While we make reasonable editorial efforts to verify information, HostCompare cannot guarantee that all provider pricing and specifications are current at the exact moment of your visit. You are responsible for verifying all final pricing and contractual terms directly on the provider\'s website before purchasing.',
      },
      { type: 'heading', level: 2, text: '4. Third-Party Websites and Services', id: 'third-party-links' },
      {
        type: 'paragraph',
        text: 'Our Website contains links to external websites operated by third parties. HostCompare has no control over, and assumes no responsibility for, the content, privacy policies, uptime, or business practices of any third-party hosting companies. Any contractual relationship entered into with a provider is strictly between you and that provider.',
      },
      { type: 'heading', level: 2, text: '5. Intellectual Property Rights', id: 'intellectual-property' },
      {
        type: 'paragraph',
        text: 'The original content, design, code, graphics, and compilation of HostCompare are protected by copyright and intellectual property laws. You may not scrape, copy, republish, or redistribute our comparison data or articles for commercial purposes without prior written authorization.',
      },
      { type: 'heading', level: 2, text: '6. Disclaimer of Warranties', id: 'disclaimer-warranties' },
      {
        type: 'paragraph',
        text: 'HostCompare is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express or implied, including fitness for a particular purpose or non-infringement.',
      },
      { type: 'heading', level: 2, text: '7. Limitation of Liability', id: 'limitation-liability' },
      {
        type: 'paragraph',
        text: 'To the fullest extent permitted by applicable law, HostCompare and its operators shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of, or inability to use, information provided on this Website or services purchased from linked providers.',
      },
      { type: 'heading', level: 2, text: '8. Governing Law and Changes', id: 'governing-law' },
      {
        type: 'paragraph',
        text: 'We reserve the right to modify these Terms at any time. Continued use of the Website following modifications constitutes your acceptance of the revised Terms.',
      },
      { type: 'heading', level: 2, text: '9. Contact', id: 'contact' },
      {
        type: 'paragraph',
        text: 'Questions regarding these Terms of Service should be directed to ashwini12tiwari@gmail.com.',
      },
    ],
  },
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    updatedDate: '2026-09-20',
    intro:
      'Please read this disclaimer carefully before relying on any hosting comparisons, ratings, or guides published on HostCompare.',
    content: [
      { type: 'heading', level: 2, text: '1. General Informational Nature', id: 'general-information' },
      {
        type: 'paragraph',
        text: 'The information provided on HostCompare is for general informational and educational guidance. Nothing on this website constitutes legal, technical infrastructure engineering, or financial professional advice. You should assess your own specific technical requirements and budget before purchasing any hosting service.',
      },
      { type: 'heading', level: 2, text: '2. Dynamic Pricing and Feature Changes', id: 'price-changes' },
      {
        type: 'paragraph',
        text: 'Hosting providers regularly change their introductory promotions, renewal pricing, resource quotas, and contractual terms without prior notice. Although we audit listings regularly, details may have changed since our last review. Always confirm current introductory and renewal rates directly with the hosting provider prior to completing an order.',
      },
      { type: 'heading', level: 2, text: '3. Editorial Ratings & Subjectivity', id: 'editorial-ratings' },
      {
        type: 'paragraph',
        text: 'All ratings and verdicts on HostCompare represent our independent editorial assessments based on standardized evaluation criteria (including hardware architecture, support responsiveness, and value). They do not constitute an individualized guarantee that your experience with a provider will match our scores.',
      },
      { type: 'heading', level: 2, text: '4. Third-Party Links & Endorsement', id: 'third-party-links' },
      {
        type: 'paragraph',
        text: 'HostCompare links to third-party web hosting and domain registration services. Outbound links do not constitute a legal endorsement or assumption of liability for a third-party\'s operational performance, data loss, server downtime, or customer service dispute.',
      },
    ],
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    updatedDate: '2026-09-20',
    intro:
      'This Cookie Policy explains how HostCompare uses cookies and similar technologies to recognize you when you visit our website, and how you can control them.',
    content: [
      { type: 'heading', level: 2, text: '1. What Are Cookies?', id: 'what-are-cookies' },
      {
        type: 'paragraph',
        text: 'Cookies are small data files placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work efficiently, remember user preferences, and provide reporting analytics.',
      },
      { type: 'heading', level: 2, text: '2. Types of Cookies We Use', id: 'cookie-types' },
      {
        type: 'table',
        headers: ['Category', 'Purpose', 'Can Be Disabled?'],
        rows: [
          [
            'Necessary Cookies',
            'Essential for site navigation, security, and remembering your cookie preference choice.',
            'No — strictly required for basic site functionality.',
          ],
          [
            'Analytics Cookies',
            'Helps us understand aggregate visitor counts, popular comparisons, and traffic sources to improve educational content.',
            'Yes — via our cookie consent banner.',
          ],
          [
            'Advertising Cookies',
            'Used by Google AdSense and ad network partners to deliver non-intrusive advertisements and limit repetitive impressions.',
            'Yes — via our cookie consent banner and Google Ads Settings.',
          ],
        ],
      },
      { type: 'heading', level: 2, text: '3. Google AdSense Advertising Cookies', id: 'adsense-cookies' },
      {
        type: 'paragraph',
        text: 'Google uses cookies (such as the DoubleClick cookie) to serve ads on our site. Google\'s use of advertising cookies enables it and its partners to serve relevant ads based on your visit to this site and other sites on the Internet. You can manage or disable personalized advertising by visiting Google Ads Settings (https://adssettings.google.com).',
      },
      { type: 'heading', level: 2, text: '4. Managing Your Cookie Preferences', id: 'managing-cookies' },
      {
        type: 'paragraph',
        text: 'You have the right to accept or decline non-essential cookies. You can adjust your preferences at any time through our on-site cookie consent banner or by configuring your web browser settings to block or delete cookies. Note that disabling certain cookies may affect website functionality.',
      },
    ],
  },
  {
    slug: 'affiliate-disclosure',
    title: 'Affiliate Disclosure',
    updatedDate: '2026-09-20',
    intro:
      'Transparency and reader trust are foundational to HostCompare. In compliance with Federal Trade Commission (FTC) guidelines, this page explains our commercial relationships and how our platform is funded.',
    content: [
      { type: 'heading', level: 2, text: '1. How HostCompare Earns Revenue', id: 'how-we-earn' },
      {
        type: 'paragraph',
        text: 'HostCompare is an independently owned comparison website. To fund our research, server infrastructure, editorial content, and continuous testing of web hosting providers, we participate in affiliate marketing programs. When you click on a link to a hosting provider or domain registrar on our site and subsequently complete a purchase, we may receive a referral commission from that merchant.',
      },
      { type: 'heading', level: 2, text: '2. No Additional Cost to You', id: 'no-cost-to-you' },
      {
        type: 'paragraph',
        text: 'Using our affiliate links does not increase the price you pay for web hosting. In fact, because we negotiate or track promotional affiliate coupon codes, using our referral links frequently entitles you to discounted introductory pricing that is equal to or lower than regular public rates.',
      },
      { type: 'heading', level: 2, text: '3. Editorial Independence Guarantee', id: 'editorial-independence' },
      {
        type: 'paragraph',
        text: 'Our editorial ratings, pros/cons, and recommendations are based strictly on standardized evaluation criteria, including server hardware, uptime SLAs, renewal transparency, and user experience. Providers cannot pay to alter their editorial rating, remove critical feedback, or manipulate head-to-head comparison conclusions.',
      },
      { type: 'heading', level: 2, text: '4. Non-Affiliated Providers', id: 'non-affiliated-providers' },
      {
        type: 'paragraph',
        text: 'We regularly review and include hosting providers and open-source tools with which we have no commercial relationship whenever they offer notable value, unique architectures, or popular developer adoption.',
      },
      { type: 'heading', level: 2, text: '5. Contact Us Regarding Disclosures', id: 'contact-disclosure' },
      {
        type: 'paragraph',
        text: 'If you have questions regarding our affiliate relationships or review methodology, please contact our editorial team at ashwini12tiwari@gmail.com.',
      },
    ],
  },
];

export function getLegalPageBySlug(slug: string): LegalPage | undefined {
  return LEGAL_PAGES.find((p) => p.slug === slug);
}

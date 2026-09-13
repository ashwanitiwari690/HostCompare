export type GuideCategory =
  | 'Hosting'
  | 'Domains'
  | 'WordPress'
  | 'VPS'
  | 'Cloud'
  | 'Website'
  | 'Security'
  | 'Performance'
  | 'Email'
  | 'Developer';

export type GuideContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string; id: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'code'; code: string; language?: string }
  | { type: 'quote'; text: string };

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface Guide {
  slug: string;
  title: string;
  category: GuideCategory;
  excerpt: string;
  content: GuideContentBlock[];
  author: string;
  publishedDate: string;
  updatedDate: string;
  readingTimeMinutes: number;
  featuredIconInitials: string;
  featuredIconColor: string;
  relatedGuideSlugs: string[];
  relatedProviderIds: string[];
  relatedComparisonSlugs: string[];
  faqs: GuideFaq[];
  isMockData: true;
}

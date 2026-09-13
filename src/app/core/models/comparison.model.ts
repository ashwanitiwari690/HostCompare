export interface ComparisonFaq {
  question: string;
  answer: string;
}

/**
 * A fully authored SEO comparison landing page, e.g. /compare/hostinger-vs-bluehost.
 */
export interface Comparison {
  slug: string;
  providerIdA: string;
  providerIdB: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  introduction: string;
  quickVerdict: string;
  pricingSummary: string;
  performanceSummary: string;
  easeOfUseSummary: string;
  supportSummary: string;
  securitySummary: string;
  featuresSummary: string;
  bestForA: string[];
  bestForB: string[];
  chooseAIf: string[];
  chooseBIf: string[];
  finalSummary: string;
  faqs: ComparisonFaq[];
  relatedGuideSlugs: string[];
  relatedComparisonSlugs: string[];
  popularity: number;
  isMockData: true;
  dataUpdated: string;
}

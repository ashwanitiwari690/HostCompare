import { HostingProvider } from './hosting-provider.model';

export type WebsiteType = 'blog' | 'business' | 'ecommerce' | 'portfolio' | 'saas' | 'developer';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
export type TrafficLevel = 'low' | 'medium' | 'high';
export type BudgetRange = 'under-100' | '100-300' | '300-700' | '700-plus';

export interface FinderAnswers {
  websiteType: WebsiteType | null;
  experience: ExperienceLevel | null;
  traffic: TrafficLevel | null;
  budget: BudgetRange | null;
  needsWordpress: boolean | null;
  needsVps: boolean | null;
  needsEmail: boolean | null;
}

export interface FinderQuestionOption {
  value: string;
  label: string;
  description?: string;
}

export interface FinderQuestion {
  id: keyof FinderAnswers;
  step: number;
  question: string;
  helpText: string;
  type: 'single' | 'boolean';
  options: FinderQuestionOption[];
}

export interface HostingRecommendation {
  provider: HostingProvider;
  matchScore: number;
  reasons: string[];
  matchingFeatures: string[];
}

export interface ScoreWeights {
  budget: number;
  hostingType: number;
  requiredFeatures: number;
  performance: number;
  wordpressVps: number;
  support: number;
}

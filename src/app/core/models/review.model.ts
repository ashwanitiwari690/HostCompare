import { RatingBreakdown } from './hosting-provider.model';

/**
 * Editorial review summary shown on /reviews and /reviews/:slug.
 * These are staff/editorial ratings, never fabricated customer reviews.
 */
export interface Review {
  id: string;
  providerId: string;
  slug: string;
  title: string;
  rating: RatingBreakdown;
  summary: string;
  verdict: string;
  pros: string[];
  cons: string[];
  bestFor: string[];
  author: string;
  publishedDate: string;
  updatedDate: string;
  isMockData: true;
}

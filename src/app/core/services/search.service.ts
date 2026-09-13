import { Injectable } from '@angular/core';
import { SearchResultItem } from '../models';
import { COMPARISONS } from '../../features/comparisons/data/comparisons.data';
import { REGISTRARS } from '../../features/domains/data/registrars.data';
import { GUIDES } from '../../features/guides/data/guides.data';
import { PROVIDERS } from '../../features/hosting/data/providers.data';
import { REVIEWS } from '../../features/reviews/data/reviews.data';

@Injectable({ providedIn: 'root' })
export class SearchService {
  search(query: string): SearchResultItem[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: SearchResultItem[] = [];

    for (const provider of PROVIDERS) {
      if (`${provider.name} ${provider.tagline} ${provider.description}`.toLowerCase().includes(q)) {
        results.push({
          type: 'provider',
          title: provider.name,
          description: provider.tagline,
          routerLink: `/hosting/${provider.slug}`,
          meta: `From ${provider.currency} ${provider.startingPrice}${provider.billingPeriod}`,
        });
      }
    }

    for (const registrar of REGISTRARS) {
      if (`${registrar.name} ${registrar.description}`.toLowerCase().includes(q)) {
        results.push({
          type: 'domain',
          title: registrar.name,
          description: registrar.description,
          routerLink: `/domains`,
          meta: 'Domain registrar',
        });
      }
    }

    for (const review of REVIEWS) {
      if (`${review.title} ${review.summary}`.toLowerCase().includes(q)) {
        results.push({
          type: 'review',
          title: review.title,
          description: review.summary,
          routerLink: `/reviews/${review.slug}`,
          meta: `Editorial rating ${review.rating.overall.toFixed(1)}/5`,
        });
      }
    }

    for (const guide of GUIDES) {
      if (`${guide.title} ${guide.excerpt}`.toLowerCase().includes(q)) {
        results.push({
          type: 'guide',
          title: guide.title,
          description: guide.excerpt,
          routerLink: `/guides/${guide.slug}`,
          meta: guide.category,
        });
      }
    }

    for (const comparison of COMPARISONS) {
      if (`${comparison.h1} ${comparison.introduction}`.toLowerCase().includes(q)) {
        results.push({
          type: 'comparison',
          title: comparison.h1,
          description: comparison.quickVerdict,
          routerLink: `/compare/${comparison.slug}`,
          meta: 'Comparison',
        });
      }
    }

    return results;
  }

  groupByType(results: SearchResultItem[]): Record<string, SearchResultItem[]> {
    return results.reduce<Record<string, SearchResultItem[]>>((groups, item) => {
      (groups[item.type] ??= []).push(item);
      return groups;
    }, {});
  }
}

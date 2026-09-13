import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comparison } from '../models';
import { COMPARISONS } from '../../features/comparisons/data/comparisons.data';

@Injectable({ providedIn: 'root' })
export class ComparisonsService {
  getComparisons(): Observable<Comparison[]> {
    return of(COMPARISONS);
  }

  getComparisonBySlug(slug: string): Observable<Comparison | undefined> {
    return of(COMPARISONS.find((c) => c.slug === slug));
  }

  getPopularComparisons(count: number): Comparison[] {
    return [...COMPARISONS].sort((a, b) => b.popularity - a.popularity).slice(0, count);
  }

  getComparisonsBySlugs(slugs: string[]): Comparison[] {
    return slugs.map((slug) => COMPARISONS.find((c) => c.slug === slug)).filter((c): c is Comparison => !!c);
  }

  /** Builds the canonical slug for a provider pair, e.g. 'hostinger-vs-bluehost'. */
  buildSlug(providerSlugA: string, providerSlugB: string): string {
    return `${providerSlugA}-vs-${providerSlugB}`;
  }
}

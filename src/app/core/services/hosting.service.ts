import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category, HostingPlan, HostingProvider, HostingType } from '../models';
import { CATEGORIES } from '../../features/hosting/data/categories.data';
import { PLANS } from '../../features/hosting/data/plans.data';
import { PROVIDERS } from '../../features/hosting/data/providers.data';

export interface ProviderFilters {
  query?: string;
  types?: HostingType[];
  maxPrice?: number;
  minRating?: number;
  freeDomain?: boolean;
  ssl?: boolean;
  backup?: boolean;
  email?: boolean;
}

export type ProviderSort = 'recommended' | 'price-asc' | 'price-desc' | 'rating' | 'popularity';

/**
 * Reads today from local mock data. The public method signatures return
 * Observables so this service can later be repointed at HttpClient calls
 * (e.g. GET /api/providers) without touching any component that consumes it.
 */
@Injectable({ providedIn: 'root' })
export class HostingService {
  getProviders(): Observable<HostingProvider[]> {
    return of(PROVIDERS);
  }

  getProviderBySlug(slug: string): Observable<HostingProvider | undefined> {
    return of(PROVIDERS.find((p) => p.slug === slug));
  }

  getProviderByIdSync(id: string): HostingProvider | undefined {
    return PROVIDERS.find((p) => p.id === id);
  }

  getProvidersByIds(ids: string[]): HostingProvider[] {
    return ids
      .map((id) => PROVIDERS.find((p) => p.id === id))
      .filter((p): p is HostingProvider => !!p);
  }

  getPlans(): Observable<HostingPlan[]> {
    return of(PLANS);
  }

  getPlansByProvider(providerId: string): HostingPlan[] {
    return PLANS.filter((p) => p.providerId === providerId);
  }

  getCategories(): Observable<Category[]> {
    return of(CATEGORIES);
  }

  filterProviders(providers: HostingProvider[], filters: ProviderFilters): HostingProvider[] {
    return providers.filter((provider) => {
      if (filters.query) {
        const q = filters.query.toLowerCase();
        const haystack = `${provider.name} ${provider.tagline} ${provider.description}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (filters.types?.length && !filters.types.some((t) => provider.hostingTypes.includes(t))) {
        return false;
      }
      if (filters.maxPrice !== undefined && provider.startingPrice > filters.maxPrice) return false;
      if (filters.minRating !== undefined && provider.rating.overall < filters.minRating) return false;
      if (filters.freeDomain && !provider.freeDomain) return false;
      if (filters.ssl && !provider.freeSsl) return false;
      if (filters.backup && !provider.freeBackup) return false;
      if (filters.email && !provider.freeEmail) return false;
      return true;
    });
  }

  sortProviders(providers: HostingProvider[], sort: ProviderSort): HostingProvider[] {
    const sorted = [...providers];
    switch (sort) {
      case 'price-asc':
        return sorted.sort((a, b) => a.startingPrice - b.startingPrice);
      case 'price-desc':
        return sorted.sort((a, b) => b.startingPrice - a.startingPrice);
      case 'rating':
        return sorted.sort((a, b) => b.rating.overall - a.rating.overall);
      case 'popularity':
        return sorted.sort((a, b) => b.popularity - a.popularity);
      case 'recommended':
      default:
        return sorted.sort((a, b) => b.popularity * b.rating.overall - a.popularity * a.rating.overall);
    }
  }
}

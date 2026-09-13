import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DomainExtension, DomainRegistrar, DomainSearchResult } from '../models';
import { EXTENSIONS } from '../../features/domains/data/extensions.data';
import { REGISTRARS } from '../../features/domains/data/registrars.data';

const SEARCH_TLDS = ['.com', '.net', '.org', '.io', '.co', '.in', '.online', '.store'];

/**
 * Domain data + a deterministic, frontend-only "availability" simulation.
 * This is NOT a real WHOIS/availability API — see project rule against
 * building a real domain availability backend. Swap `searchDomain` for a
 * real HttpClient call when a backend is introduced.
 */
@Injectable({ providedIn: 'root' })
export class DomainsService {
  getRegistrars(): Observable<DomainRegistrar[]> {
    return of(REGISTRARS);
  }

  getRegistrarBySlug(slug: string): Observable<DomainRegistrar | undefined> {
    return of(REGISTRARS.find((r) => r.slug === slug));
  }

  getExtensions(): Observable<DomainExtension[]> {
    return of(EXTENSIONS);
  }

  searchDomain(query: string): Observable<DomainSearchResult[]> {
    const base = query.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (!base) return of([]);

    const results = SEARCH_TLDS.map((tld) => {
      const extension = EXTENSIONS.find((e) => e.tld === tld);
      const hash = this.hashString(base + tld);
      return {
        domain: `${base}${tld}`,
        tld,
        available: hash % 3 !== 0,
        price: extension?.registrationPrice ?? 699,
        currency: 'INR',
      };
    });

    return of(results);
  }

  private hashString(value: string): number {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Guide, GuideCategory } from '../models';
import { GUIDES } from '../../features/guides/data/guides.data';

@Injectable({ providedIn: 'root' })
export class GuidesService {
  getGuides(): Observable<Guide[]> {
    return of(GUIDES);
  }

  getGuideBySlug(slug: string): Observable<Guide | undefined> {
    return of(GUIDES.find((g) => g.slug === slug));
  }

  getGuidesByCategory(category: GuideCategory): Guide[] {
    return GUIDES.filter((g) => g.category === category);
  }

  getGuidesBySlugs(slugs: string[]): Guide[] {
    return slugs.map((slug) => GUIDES.find((g) => g.slug === slug)).filter((g): g is Guide => !!g);
  }

  getLatestGuides(count: number): Guide[] {
    return [...GUIDES]
      .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
      .slice(0, count);
  }
}

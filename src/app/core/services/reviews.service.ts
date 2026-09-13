import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Review } from '../models';
import { REVIEWS } from '../../features/reviews/data/reviews.data';

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  getReviews(): Observable<Review[]> {
    return of(REVIEWS);
  }

  getReviewBySlug(slug: string): Observable<Review | undefined> {
    return of(REVIEWS.find((r) => r.slug === slug));
  }

  getReviewByProviderId(providerId: string): Review | undefined {
    return REVIEWS.find((r) => r.providerId === providerId);
  }
}

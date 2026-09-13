import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { HostingProvider, Review } from '../../../../core/models';
import { HostingService } from '../../../../core/services/hosting.service';
import { ReviewsService } from '../../../../core/services/reviews.service';
import { SeoService } from '../../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { ReviewCardComponent } from '../../../../shared/components/review-card/review-card.component';

@Component({
  selector: 'app-reviews-list',
  standalone: true,
  imports: [BreadcrumbComponent, ReviewCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reviews-list.component.html',
  styleUrl: './reviews-list.component.scss',
})
export class ReviewsListComponent implements OnInit {
  items = signal<{ review: Review; provider: HostingProvider }[]>([]);

  constructor(
    private reviewsService: ReviewsService,
    private hosting: HostingService,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Hosting Provider Reviews',
      description: 'Independent editorial reviews of web hosting providers covering ease of use, performance, support, features and value for money.',
      path: '/reviews',
    });

    this.reviewsService.getReviews().subscribe((reviews) => {
      const items = reviews
        .map((review) => {
          const provider = this.hosting.getProviderByIdSync(review.providerId);
          return provider ? { review, provider } : null;
        })
        .filter((item): item is { review: Review; provider: HostingProvider } => !!item);
      this.items.set(items);
    });
  }
}

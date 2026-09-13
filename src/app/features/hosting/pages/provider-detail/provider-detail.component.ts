import { ChangeDetectionStrategy, Component, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HostingPlan, HostingProvider, Review } from '../../../../core/models';
import { HostingService } from '../../../../core/services/hosting.service';
import { ReviewsService } from '../../../../core/services/reviews.service';
import { ComparisonsService } from '../../../../core/services/comparisons.service';
import { GuidesService } from '../../../../core/services/guides.service';
import { SeoService } from '../../../../core/services/seo.service';
import { AffiliateButtonComponent } from '../../../../shared/components/affiliate-button/affiliate-button.component';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { CompareButtonComponent } from '../../../../shared/components/compare-button/compare-button.component';
import { FaqAccordionComponent } from '../../../../shared/components/faq-accordion/faq-accordion.component';
import { FavoriteButtonComponent } from '../../../../shared/components/favorite-button/favorite-button.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { AdInArticleComponent } from '../../../../shared/components/ad-placeholder/ad-variants';
import { ProviderCardComponent } from '../../../../shared/components/provider-card/provider-card.component';
import { RatingDisplayComponent } from '../../../../shared/components/rating-display/rating-display.component';
import { RelatedContentComponent, RelatedSection } from '../../../../shared/components/related-content/related-content.component';

@Component({
  selector: 'app-provider-detail',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    RatingDisplayComponent,
    BadgeComponent,
    AffiliateButtonComponent,
    CompareButtonComponent,
    FavoriteButtonComponent,
    IconComponent,
    FaqAccordionComponent,
    RelatedContentComponent,
    ProviderCardComponent,
    AdInArticleComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './provider-detail.component.html',
  styleUrl: './provider-detail.component.scss',
})
export class ProviderDetailComponent implements OnInit {
  provider = signal<HostingProvider | null>(null);
  plans = signal<HostingPlan[]>([]);
  review = signal<Review | null>(null);
  relatedProviders = signal<HostingProvider[]>([]);

  relatedSections = computed<RelatedSection[]>(() => {
    const provider = this.provider();
    if (!provider) return [];
    return [
      {
        title: 'Related Comparisons',
        links: provider.relatedComparisonSlugs.map((slug) => {
          const comparison = this.comparisonsService.getComparisonsBySlugs([slug])[0];
          return { label: comparison?.h1 ?? slug, path: `/compare/${slug}` };
        }),
      },
      {
        title: 'Related Guides',
        links: provider.relatedGuideSlugs.map((slug) => {
          const guide = this.guidesService.getGuidesBySlugs([slug])[0];
          return { label: guide?.title ?? slug, path: `/guides/${slug}` };
        }),
      },
    ];
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hosting: HostingService,
    private reviewsService: ReviewsService,
    private comparisonsService: ComparisonsService,
    private guidesService: GuidesService,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (!slug) return;
      this.hosting.getProviderBySlug(slug).subscribe((provider) => {
        if (!provider) {
          this.router.navigate(['/404']);
          return;
        }
        this.provider.set(provider);
        this.plans.set(this.hosting.getPlansByProvider(provider.id));
        this.review.set(this.reviewsService.getReviewByProviderId(provider.id) ?? null);
        this.relatedProviders.set(this.hosting.getProvidersByIds(provider.relatedProviderIds));

        this.seo.setPage({
          title: `${provider.name} Review: Pricing, Features & Performance`,
          description: `${provider.name} review covering pricing, plans, performance, security, support and who it's best for. ${provider.tagline}`,
          path: `/hosting/${provider.slug}`,
          type: 'article',
        });
        this.seo.setJsonLd(
          'faq-jsonld',
          this.seo.buildFaqJsonLd(provider.faqs.map((f) => ({ question: f.question, answer: f.answer }))),
        );
        this.seo.setJsonLd(
          'breadcrumb-jsonld',
          this.seo.buildBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Hosting', path: '/hosting' },
            { name: provider.name, path: `/hosting/${provider.slug}` },
          ]),
        );
      });
    });
  }
}

import { ChangeDetectionStrategy, Component, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Comparison, HostingPlan, HostingProvider } from '../../../../core/models';
import { ComparisonsService } from '../../../../core/services/comparisons.service';
import { GuidesService } from '../../../../core/services/guides.service';
import { HostingService } from '../../../../core/services/hosting.service';
import { SeoService } from '../../../../core/services/seo.service';
import { AffiliateButtonComponent } from '../../../../shared/components/affiliate-button/affiliate-button.component';
import { AdInArticleComponent } from '../../../../shared/components/ad-placeholder/ad-variants';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { FaqAccordionComponent } from '../../../../shared/components/faq-accordion/faq-accordion.component';
import { FavoriteButtonComponent } from '../../../../shared/components/favorite-button/favorite-button.component';
import { RelatedContentComponent, RelatedSection } from '../../../../shared/components/related-content/related-content.component';
import { ComparisonTableComponent } from '../../components/comparison-table.component';

@Component({
  selector: 'app-comparison-detail',
  standalone: true,
  imports: [
    RouterLink,
    BreadcrumbComponent,
    ComparisonTableComponent,
    AffiliateButtonComponent,
    FaqAccordionComponent,
    RelatedContentComponent,
    AdInArticleComponent,
    FavoriteButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './comparison-detail.component.html',
  styleUrl: './comparison-detail.component.scss',
})
export class ComparisonDetailComponent implements OnInit {
  comparison = signal<Comparison | null>(null);
  providerA = signal<HostingProvider | null>(null);
  providerB = signal<HostingProvider | null>(null);

  plansByProvider = computed<Record<string, HostingPlan | undefined>>(() => {
    const map: Record<string, HostingPlan | undefined> = {};
    const a = this.providerA();
    const b = this.providerB();
    if (a) map[a.id] = this.hosting.getPlansByProvider(a.id)[0];
    if (b) map[b.id] = this.hosting.getPlansByProvider(b.id)[0];
    return map;
  });

  tableProviders = computed<HostingProvider[]>(() => {
    const a = this.providerA();
    const b = this.providerB();
    return a && b ? [a, b] : [];
  });

  relatedSections = computed<RelatedSection[]>(() => {
    const comparison = this.comparison();
    if (!comparison) return [];
    return [
      {
        title: 'Related Comparisons',
        links: this.comparisonsService.getComparisonsBySlugs(comparison.relatedComparisonSlugs).map((c) => ({
          label: c.h1,
          path: `/compare/${c.slug}`,
        })),
      },
      {
        title: 'Related Guides',
        links: this.guidesService.getGuidesBySlugs(comparison.relatedGuideSlugs).map((g) => ({
          label: g.title,
          path: `/guides/${g.slug}`,
        })),
      },
    ];
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private comparisonsService: ComparisonsService,
    private hosting: HostingService,
    private guidesService: GuidesService,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (!slug) return;
      this.comparisonsService.getComparisonBySlug(slug).subscribe((comparison) => {
        if (!comparison) {
          this.router.navigate(['/404']);
          return;
        }
        this.comparison.set(comparison);
        const a = this.hosting.getProviderByIdSync(comparison.providerIdA);
        const b = this.hosting.getProviderByIdSync(comparison.providerIdB);
        this.providerA.set(a ?? null);
        this.providerB.set(b ?? null);

        this.seo.setPage({
          title: comparison.seoTitle,
          description: comparison.metaDescription,
          path: `/compare/${comparison.slug}`,
          type: 'article',
        });
        this.seo.setJsonLd('faq-jsonld', this.seo.buildFaqJsonLd(comparison.faqs));
        this.seo.setJsonLd(
          'breadcrumb-jsonld',
          this.seo.buildBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Compare', path: '/compare' },
            { name: comparison.h1, path: `/compare/${comparison.slug}` },
          ]),
        );
      });
    });
  }
}

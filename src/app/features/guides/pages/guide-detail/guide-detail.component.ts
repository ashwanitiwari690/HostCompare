import { ChangeDetectionStrategy, Component, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Guide, GuideContentBlock, HostingProvider } from '../../../../core/models';
import { ComparisonsService } from '../../../../core/services/comparisons.service';
import { GuidesService } from '../../../../core/services/guides.service';
import { HostingService } from '../../../../core/services/hosting.service';
import { SeoService } from '../../../../core/services/seo.service';
import { ToastService } from '../../../../core/services/toast.service';
import { AdInArticleComponent } from '../../../../shared/components/ad-placeholder/ad-variants';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { ContentBlocksComponent } from '../../../../shared/components/content-blocks/content-blocks.component';
import { FaqAccordionComponent } from '../../../../shared/components/faq-accordion/faq-accordion.component';
import { FavoriteButtonComponent } from '../../../../shared/components/favorite-button/favorite-button.component';
import { ProviderCardComponent } from '../../../../shared/components/provider-card/provider-card.component';
import { RelatedContentComponent, RelatedSection } from '../../../../shared/components/related-content/related-content.component';

@Component({
  selector: 'app-guide-detail',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    FaqAccordionComponent,
    RelatedContentComponent,
    ProviderCardComponent,
    AdInArticleComponent,
    FavoriteButtonComponent,
    ContentBlocksComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './guide-detail.component.html',
  styleUrl: './guide-detail.component.scss',
})
export class GuideDetailComponent implements OnInit {
  guide = signal<Guide | null>(null);
  relatedProviders = signal<HostingProvider[]>([]);
  shareUrl = signal<string>('');

  tableOfContents = computed(() => {
    const guide = this.guide();
    if (!guide) return [];
    return guide.content.filter((block): block is Extract<GuideContentBlock, { type: 'heading' }> => block.type === 'heading');
  });

  twitterShareUrl = computed(() => {
    const guide = this.guide();
    const url = encodeURIComponent(this.shareUrl());
    return `https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(guide?.title ?? '')}`;
  });
  linkedinShareUrl = computed(() => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.shareUrl())}`);
  facebookShareUrl = computed(() => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.shareUrl())}`);

  relatedSections = computed<RelatedSection[]>(() => {
    const guide = this.guide();
    if (!guide) return [];
    return [
      {
        title: 'Related Guides',
        links: this.guidesService.getGuidesBySlugs(guide.relatedGuideSlugs).map((g) => ({ label: g.title, path: `/guides/${g.slug}` })),
      },
      {
        title: 'Related Comparisons',
        links: this.comparisonsService.getComparisonsBySlugs(guide.relatedComparisonSlugs).map((c) => ({ label: c.h1, path: `/compare/${c.slug}` })),
      },
    ];
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private guidesService: GuidesService,
    private hosting: HostingService,
    private comparisonsService: ComparisonsService,
    private seo: SeoService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (!slug) return;
      this.guidesService.getGuideBySlug(slug).subscribe((guide) => {
        if (!guide) {
          this.router.navigate(['/404']);
          return;
        }
        this.guide.set(guide);
        this.relatedProviders.set(this.hosting.getProvidersByIds(guide.relatedProviderIds));
        this.shareUrl.set(typeof window !== 'undefined' ? window.location.href : '');

        this.seo.setPage({
          title: guide.title,
          description: guide.excerpt,
          path: `/guides/${guide.slug}`,
          type: 'article',
        });
        if (guide.faqs.length) {
          this.seo.setJsonLd('faq-jsonld', this.seo.buildFaqJsonLd(guide.faqs));
        } else {
          this.seo.removeJsonLd('faq-jsonld');
        }
        this.seo.setJsonLd('article-jsonld', {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: guide.title,
          description: guide.excerpt,
          datePublished: guide.publishedDate,
          dateModified: guide.updatedDate,
          author: { '@type': 'Organization', name: guide.author },
        });
        this.seo.setJsonLd(
          'breadcrumb-jsonld',
          this.seo.buildBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Guides', path: '/guides' },
            { name: guide.title, path: `/guides/${guide.slug}` },
          ]),
        );
      });
    });
  }

  async copyLink(): Promise<void> {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    await navigator.clipboard.writeText(this.shareUrl());
    this.toast.show('Link copied to clipboard', 'success');
  }
}

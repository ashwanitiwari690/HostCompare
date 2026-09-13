import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Category, Comparison, Guide, HostingProvider } from '../../core/models';
import { ComparisonsService } from '../../core/services/comparisons.service';
import { GuidesService } from '../../core/services/guides.service';
import { HostingService } from '../../core/services/hosting.service';
import { SeoService } from '../../core/services/seo.service';
import { AdRectangleComponent } from '../../shared/components/ad-placeholder/ad-variants';
import { ComparisonCardComponent } from '../../shared/components/comparison-card/comparison-card.component';
import { GuideCardComponent } from '../../shared/components/guide-card/guide-card.component';
import { IconComponent, IconName } from '../../shared/components/icon/icon.component';
import { ProviderCardComponent } from '../../shared/components/provider-card/provider-card.component';
import { SearchBoxComponent } from '../../shared/components/search-box/search-box.component';
import { CATEGORIES } from '../hosting/data/categories.data';
import { DomainSearchWidgetComponent } from '../domains/components/domain-search-widget.component';

interface BestForItem {
  label: string;
  path: string;
  icon: IconName;
}

interface WhyItem {
  icon: IconName;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    SearchBoxComponent,
    ProviderCardComponent,
    ComparisonCardComponent,
    GuideCardComponent,
    DomainSearchWidgetComponent,
    IconComponent,
    AdRectangleComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  readonly categories: Category[] = CATEGORIES;

  readonly bestForItems: BestForItem[] = [
    { label: 'Beginners', path: '/guides/best-hosting-for-beginners', icon: 'star' },
    { label: 'Cheap Hosting', path: '/guides/best-cheap-hosting', icon: 'shield' },
    { label: 'WordPress', path: '/wordpress-hosting', icon: 'globe' },
    { label: 'Developers', path: '/guides/developer-hosting-guide', icon: 'server' },
    { label: 'Small Business', path: '/hosting?type=shared', icon: 'check' },
    { label: 'VPS', path: '/vps', icon: 'server' },
    { label: 'Cloud', path: '/guides/what-is-cloud-hosting', icon: 'globe' },
  ];

  readonly whyItems: WhyItem[] = [
    { icon: 'shield', title: 'Independent Comparisons', description: 'We compare providers on the same criteria, side by side, without pretending every host is "the best".' },
    { icon: 'info', title: 'Transparent Information', description: 'Editorial ratings, sample pricing and features are clearly labeled, including when they are estimates.' },
    { icon: 'scale', title: 'Easy Comparison', description: 'Add providers to a comparison table in one click and see the differences that actually matter.' },
    { icon: 'check', title: 'Hosting Finder', description: 'Answer a few questions and get a transparent, explained match instead of a generic "best of" list.' },
    { icon: 'clock', title: 'Helpful Guides', description: 'Practical, jargon-free guides for every stage, from buying a domain to scaling to a VPS.' },
  ];

  featuredProviders = signal<HostingProvider[]>([]);
  popularComparisons = signal<{ comparison: Comparison; a: HostingProvider; b: HostingProvider }[]>([]);
  latestGuides = signal<Guide[]>([]);

  newsletterEmail = '';
  newsletterSubmitted = signal(false);

  constructor(
    private hosting: HostingService,
    private comparisons: ComparisonsService,
    private guides: GuidesService,
    private seo: SeoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Compare Web Hosting & Domains Before You Buy',
      description:
        'Compare hosting providers, plans, pricing, features and performance to find the right hosting for your website. Independent comparisons, a hosting finder and editorial reviews.',
      path: '/',
    });

    this.hosting.getProviders().subscribe((providers) => {
      const sorted = this.hosting.sortProviders(providers, 'popularity');
      this.featuredProviders.set(sorted.slice(0, 8));
    });

    const popular = this.comparisons.getPopularComparisons(5);
    this.popularComparisons.set(
      popular.map((comparison) => ({
        comparison,
        a: this.hosting.getProviderByIdSync(comparison.providerIdA)!,
        b: this.hosting.getProviderByIdSync(comparison.providerIdB)!,
      })),
    );

    this.latestGuides.set(this.guides.getLatestGuides(3));
  }

  onHeroSearch(query: string): void {
    if (!query) return;
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }

  onNewsletterSubmit(event: Event): void {
    event.preventDefault();
    if (!this.newsletterEmail.trim()) return;
    this.newsletterSubmitted.set(true);
  }
}

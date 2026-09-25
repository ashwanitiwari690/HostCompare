import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { Guide, HostingPlan, HostingProvider } from '../../../core/models';
import { GuidesService } from '../../../core/services/guides.service';
import { HostingService } from '../../../core/services/hosting.service';
import { SeoService } from '../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { FaqAccordionComponent } from '../../../shared/components/faq-accordion/faq-accordion.component';
import { GuideCardComponent } from '../../../shared/components/guide-card/guide-card.component';
import { ProviderCardComponent } from '../../../shared/components/provider-card/provider-card.component';
import { ComparisonTableComponent } from '../../comparisons/components/comparison-table.component';

@Component({
  selector: 'app-wordpress-hosting',
  standalone: true,
  imports: [BreadcrumbComponent, ProviderCardComponent, ComparisonTableComponent, GuideCardComponent, FaqAccordionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './wordpress-hosting.component.html',
  styleUrl: './wordpress-hosting.component.scss',
})
export class WordpressHostingComponent implements OnInit {
  providers = signal<HostingProvider[]>([]);
  topProviders = signal<HostingProvider[]>([]);
  plansByProvider = signal<Record<string, HostingPlan | undefined>>({});
  guides = signal<Guide[]>([]);

  readonly faqs = [
    { question: 'What makes hosting "WordPress hosting" specifically?', answer: 'WordPress hosting typically includes 1-click installation, server-level caching tuned for WordPress, staging environments and security scanning aimed at common WordPress vulnerabilities.' },
    { question: 'Do I need managed WordPress hosting?', answer: 'Not necessarily — standard shared hosting with a 1-click WordPress installer is enough for most small sites. Managed WordPress hosting becomes more valuable as traffic and complexity grow.' },
    { question: 'Can I move an existing WordPress site to a new host?', answer: 'Yes, WordPress sites can be migrated using a migration plugin or a host\'s free migration service — see our guide on moving WordPress to new hosting.' },
  ];

  constructor(
    private hosting: HostingService,
    private guidesService: GuidesService,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'WordPress Hosting Comparison & Reviews | HostCompare',
      description: 'Compare WordPress hosting providers on pricing, performance, staging environments, security and support.',
      path: '/wordpress-hosting',
    });

    this.hosting.getProviders().subscribe((all) => {
      const wp = all.filter((p) => p.hostingTypes.includes('wordpress'));
      const sorted = this.hosting.sortProviders(wp, 'rating');
      this.providers.set(sorted);

      const top = sorted.slice(0, 3);
      this.topProviders.set(top);
      const map: Record<string, HostingPlan | undefined> = {};
      for (const provider of top) {
        map[provider.id] = this.hosting.getPlansByProvider(provider.id)[0];
      }
      this.plansByProvider.set(map);
    });

    this.guides.set(this.guidesService.getGuidesByCategory('WordPress'));
  }
}

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
import { FaqAccordionComponent } from '../../shared/components/faq-accordion/faq-accordion.component';
import { GuideCardComponent } from '../../shared/components/guide-card/guide-card.component';
import { IconComponent, IconName } from '../../shared/components/icon/icon.component';
import { LogoMarkComponent } from '../../shared/components/logo/logo-mark.component';
import { ProviderCardComponent } from '../../shared/components/provider-card/provider-card.component';
import { SearchBoxComponent } from '../../shared/components/search-box/search-box.component';
import { CATEGORIES } from '../hosting/data/categories.data';

interface BestForItem {
  label: string;
  path: string;
  icon: IconName;
}

interface FeatureExplainedItem {
  icon: IconName;
  title: string;
  summary: string;
  link: string;
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
    IconComponent,
    LogoMarkComponent,
    AdRectangleComponent,
    FaqAccordionComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  readonly categories: Category[] = CATEGORIES;

  readonly bestForItems: BestForItem[] = [
    { label: 'Beginners', path: '/guides/best-hosting-for-beginners', icon: 'star' },
    { label: 'Affordable Hosting', path: '/guides/best-cheap-hosting', icon: 'shield' },
    { label: 'WordPress', path: '/wordpress-hosting', icon: 'globe' },
    { label: 'Developers', path: '/guides/developer-hosting-guide', icon: 'server' },
    { label: 'Small Business', path: '/hosting?type=shared', icon: 'check' },
    { label: 'VPS', path: '/vps', icon: 'server' },
    { label: 'Cloud', path: '/guides/what-is-cloud-hosting', icon: 'globe' },
  ];

  readonly featuresExplained: FeatureExplainedItem[] = [
    {
      icon: 'server',
      title: 'NVMe & SSD Storage',
      summary: 'Why storage protocol (NVMe vs SATA) directly impacts database query speeds, dynamic PHP generation, and WordPress responsiveness.',
      link: '/glossary/nvme',
    },
    {
      icon: 'globe',
      title: 'Bandwidth & Traffic Limits',
      summary: 'Understanding unmetered bandwidth versus hard caps, port connection speeds, and how to estimate your website monthly transfer needs.',
      link: '/glossary/bandwidth',
    },
    {
      icon: 'shield',
      title: 'SSL/TLS Encryption',
      summary: 'How automated Let’s Encrypt certificates secure visitor sessions, activate HTTPS, and satisfy Google Chrome security standards.',
      link: '/glossary/ssl',
    },
    {
      icon: 'clock',
      title: 'Uptime & Service Level Agreements',
      summary: 'The mathematical difference between 99.9% and 99.99% uptime, hardware failover mechanisms, and what SLAs actually guarantee.',
      link: '/glossary/uptime',
    },
    {
      icon: 'monitor',
      title: 'Control Panels & UI',
      summary: 'Comparing industry standard cPanel with custom proprietary dashboards like Hostinger’s hPanel and SiteGround’s Site Tools.',
      link: '/glossary/control-panel',
    },
    {
      icon: 'globe',
      title: 'Content Delivery Networks (CDNs)',
      summary: 'How edge caching across distributed global Points of Presence reduces latency for international visitors and stops DDoS attacks.',
      link: '/glossary/cdn',
    },
  ];

  readonly homeFaqs = [
    {
      question: 'What is HostCompare and how does it help me?',
      answer:
        'HostCompare is an independent web hosting and domain comparison platform. We collect, analyze, and present verified plan specifications, introductory vs renewal pricing, server architectures, and customer support channels so you can choose the right host for your project with confidence.',
    },
    {
      question: 'How are hosting providers compared and scored on HostCompare?',
      answer:
        'Every provider is evaluated using standardized criteria: server software (LiteSpeed vs Apache vs Nginx), storage technology (NVMe vs SATA), uptime track record, backup and restoration policies, customer support availability, and pricing transparency. Providers cannot pay to alter their scores.',
    },
    {
      question: 'What is the main difference between Shared, VPS, and Cloud hosting?',
      answer:
        'Shared hosting runs multiple sites on a single server, making it affordable for beginners. VPS hosting partitions a physical server into isolated virtual machines with dedicated CPU and RAM. Cloud hosting pools resources across a network of clustered servers, providing high availability and dynamic scalability.',
    },
    {
      question: 'Why do hosting renewal prices often increase after the first term?',
      answer:
        'Hosting companies offer deep promotional discounts for the first 1 to 4 years to attract new customers. Once that initial term ends, plans renew at standard regular rates. HostCompare clearly displays both promotional and renewal rates on all plan comparisons.',
    },
    {
      question: 'How does HostCompare earn revenue?',
      answer:
        'We earn referral commissions when visitors click outbound links and purchase hosting plans from our partners, and we display non-intrusive advertisements. These commercial arrangements never determine editorial ratings, rankings, or review conclusions.',
    },
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
      title: 'Compare Web Hosting Providers | HostCompare',
      description:
        'Compare hosting features, plans, pricing information, support options, and other important factors in one place. Independent analysis, verified renewal rates, and practical guides.',
      path: '/',
    });

    this.seo.setJsonLd('home-faq-jsonld', this.seo.buildFaqJsonLd(this.homeFaqs));

    this.hosting.getProviders().subscribe((providers) => {
      const sorted = this.hosting.sortProviders(providers, 'popularity');
      this.featuredProviders.set(sorted.slice(0, 8));
    });

    const popular = this.comparisons.getPopularComparisons(6);
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

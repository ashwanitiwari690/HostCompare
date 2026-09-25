import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { Guide, HostingPlan, HostingProvider } from '../../../core/models';
import { GuidesService } from '../../../core/services/guides.service';
import { HostingService } from '../../../core/services/hosting.service';
import { SeoService } from '../../../core/services/seo.service';
import { AffiliateButtonComponent } from '../../../shared/components/affiliate-button/affiliate-button.component';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { FaqAccordionComponent } from '../../../shared/components/faq-accordion/faq-accordion.component';
import { GuideCardComponent } from '../../../shared/components/guide-card/guide-card.component';
import { ProviderCardComponent } from '../../../shared/components/provider-card/provider-card.component';

interface VpsSpecRow {
  provider: HostingProvider;
  plan: HostingPlan;
  managed: boolean;
}

interface VpsCategory {
  title: string;
  description: string;
}

@Component({
  selector: 'app-vps-hosting',
  standalone: true,
  imports: [ProviderCardComponent, GuideCardComponent, FaqAccordionComponent, BreadcrumbComponent, AffiliateButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './vps-hosting.component.html',
  styleUrl: './vps-hosting.component.scss',
})
export class VpsHostingComponent implements OnInit {
  vpsProviders = signal<HostingProvider[]>([]);
  specRows = signal<VpsSpecRow[]>([]);
  guides = signal<Guide[]>([]);

  readonly categories: VpsCategory[] = [
    { title: 'Managed VPS', description: 'The provider handles OS updates, security patching and server administration for you — best if you don\'t want to run your own server.' },
    { title: 'Unmanaged VPS', description: 'You get full root access and full responsibility for configuration, updates and security — best for developers who want control.' },
    { title: 'Linux VPS', description: 'The default choice for most web apps, offering the widest software compatibility and the lowest cost.' },
    { title: 'Windows VPS', description: 'Needed for .NET applications or software that specifically requires a Windows Server environment, usually at a higher price.' },
    { title: 'Developer VPS', description: 'Root access, multiple runtimes and API-driven provisioning aimed at engineers building and deploying custom applications.' },
    { title: 'Cloud VPS', description: 'VPS instances built on redundant cloud infrastructure, making it easier to scale resources and reduce single points of failure.' },
  ];

  readonly faqs = [
    { question: 'How is VPS different from shared hosting?', answer: 'A VPS gives you dedicated, isolated resources (CPU, RAM) rather than sharing an unpredictable pool with other websites, usually with root access to configure the server yourself.' },
    { question: 'Do I need a managed or unmanaged VPS?', answer: 'Choose managed if you want the provider to handle server administration; choose unmanaged if you\'re comfortable with Linux and want full control at a lower price.' },
    { question: 'Can I self-host a WordPress site on a VPS?', answer: 'Yes, though it requires manually installing and configuring a web server, PHP and a database — many users prefer managed WordPress hosting instead unless they specifically want that control.' },
  ];

  constructor(
    private hosting: HostingService,
    private guidesService: GuidesService,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'VPS Hosting Comparison & Server Specs | HostCompare',
      description: 'Compare VPS hosting providers on CPU, RAM, storage, bandwidth, root access, managed support and pricing.',
      path: '/vps',
    });

    this.hosting.getProviders().subscribe((all) => {
      const vps = all.filter((p) => p.hostingTypes.includes('vps') || p.hostingTypes.includes('cloud'));
      this.vpsProviders.set(this.hosting.sortProviders(vps, 'rating'));

      const specProviderIds = ['digitalocean', 'vultr', 'cloudways'];
      const rows: VpsSpecRow[] = [];
      for (const id of specProviderIds) {
        const provider = this.hosting.getProviderByIdSync(id);
        const plan = provider ? this.hosting.getPlansByProvider(id)[0] : undefined;
        if (provider && plan) {
          rows.push({ provider, plan, managed: id === 'cloudways' });
        }
      }
      this.specRows.set(rows);
    });

    this.guides.set(this.guidesService.getGuidesByCategory('VPS'));
  }
}

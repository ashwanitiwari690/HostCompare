import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { DomainRegistrar } from '../../../../core/models';
import { DomainsService } from '../../../../core/services/domains.service';
import { SeoService } from '../../../../core/services/seo.service';
import { AffiliateButtonComponent } from '../../../../shared/components/affiliate-button/affiliate-button.component';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-domain-comparison',
  standalone: true,
  imports: [BreadcrumbComponent, AffiliateButtonComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './domain-comparison.component.html',
  styleUrl: './domain-comparison.component.scss',
})
export class DomainComparisonComponent implements OnInit {
  registrars = signal<DomainRegistrar[]>([]);

  constructor(
    private domainsService: DomainsService,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Domain Registrar Comparison: Registration, Renewal & Features',
      description: 'Compare domain registrars side by side on registration price, renewal price, transfer price, WHOIS privacy, DNS management and more.',
      path: '/domain-comparison',
    });

    this.domainsService.getRegistrars().subscribe((registrars) => this.registrars.set(registrars));
  }
}

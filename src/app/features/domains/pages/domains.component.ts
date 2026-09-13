import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomainExtension, DomainRegistrar } from '../../../core/models';
import { DomainsService } from '../../../core/services/domains.service';
import { SeoService } from '../../../core/services/seo.service';
import { AffiliateButtonComponent } from '../../../shared/components/affiliate-button/affiliate-button.component';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { RatingDisplayComponent } from '../../../shared/components/rating-display/rating-display.component';
import { DomainSearchWidgetComponent } from '../components/domain-search-widget.component';

@Component({
  selector: 'app-domains',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, DomainSearchWidgetComponent, RatingDisplayComponent, AffiliateButtonComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './domains.component.html',
  styleUrl: './domains.component.scss',
})
export class DomainsComponent implements OnInit {
  extensions = signal<DomainExtension[]>([]);
  registrars = signal<DomainRegistrar[]>([]);

  constructor(
    private domainsService: DomainsService,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Domain Search & Registrar Comparison',
      description: 'Search domain availability and compare domain registrars on registration price, renewal price, WHOIS privacy and DNS management.',
      path: '/domains',
    });

    this.domainsService.getExtensions().subscribe((extensions) => this.extensions.set(extensions));
    this.domainsService.getRegistrars().subscribe((registrars) => this.registrars.set(registrars));
  }
}

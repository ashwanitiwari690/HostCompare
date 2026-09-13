import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DomainSearchResult } from '../../../core/models';
import { DomainsService } from '../../../core/services/domains.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';

/**
 * Frontend-only domain "availability" search widget backed by
 * DomainsService.searchDomain — a deterministic mock, not a real WHOIS
 * lookup. Reused on the homepage and the /domains directory page.
 */
@Component({
  selector: 'app-domain-search-widget',
  standalone: true,
  imports: [FormsModule, RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './domain-search-widget.component.html',
  styleUrl: './domain-search-widget.component.scss',
})
export class DomainSearchWidgetComponent {
  query = '';
  results = signal<DomainSearchResult[] | null>(null);
  searched = signal(false);

  constructor(private domainsService: DomainsService) {}

  search(): void {
    const q = this.query.trim();
    if (!q) return;
    this.domainsService.searchDomain(q).subscribe((results) => {
      this.results.set(results);
      this.searched.set(true);
    });
  }
}

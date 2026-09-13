import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SearchResultItem, SearchResultType } from '../../../core/models';
import { SearchService } from '../../../core/services/search.service';
import { SeoService } from '../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { IconComponent, IconName } from '../../../shared/components/icon/icon.component';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';

const TYPE_LABELS: Record<SearchResultType, string> = {
  provider: 'Hosting Providers',
  plan: 'Hosting Plans',
  domain: 'Domain Registrars',
  review: 'Reviews',
  guide: 'Guides',
  comparison: 'Comparisons',
};

const TYPE_ICONS: Record<SearchResultType, IconName> = {
  provider: 'server',
  plan: 'server',
  domain: 'globe',
  review: 'star',
  guide: 'clock',
  comparison: 'scale',
};

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, SearchBoxComponent, EmptyStateComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit {
  query = signal('');
  groups = signal<{ type: SearchResultType; label: string; icon: IconName; items: SearchResultItem[] }[]>([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const q = params.get('q') ?? '';
      this.query.set(q);
      this.runSearch(q);

      this.seo.setPage({
        title: q ? `Search results for "${q}"` : 'Search',
        description: 'Search hosting providers, domains, reviews, guides and comparisons on HostCompare.',
        path: '/search',
      });
    });
  }

  runSearch(query: string): void {
    const results = this.searchService.search(query);
    const grouped = this.searchService.groupByType(results);
    this.groups.set(
      (Object.keys(grouped) as SearchResultType[]).map((type) => ({
        type,
        label: TYPE_LABELS[type],
        icon: TYPE_ICONS[type],
        items: grouped[type],
      })),
    );
  }

  onSearch(query: string): void {
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }

  get hasResults(): boolean {
    return this.groups().some((g) => g.items.length > 0);
  }
}

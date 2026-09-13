import { ChangeDetectionStrategy, Component, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HostingType } from '../../../../core/models';
import { HostingService, ProviderFilters, ProviderSort } from '../../../../core/services/hosting.service';
import { SeoService } from '../../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { FilterPanelComponent } from '../../../../shared/components/filter-panel/filter-panel.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { ProviderCardComponent } from '../../../../shared/components/provider-card/provider-card.component';
import { SearchBoxComponent } from '../../../../shared/components/search-box/search-box.component';
import { HostingProvider } from '../../../../core/models';

const PAGE_SIZE = 8;

@Component({
  selector: 'app-hosting-directory',
  standalone: true,
  imports: [BreadcrumbComponent, FilterPanelComponent, ProviderCardComponent, SearchBoxComponent, PaginationComponent, EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hosting-directory.component.html',
  styleUrl: './hosting-directory.component.scss',
})
export class HostingDirectoryComponent implements OnInit {
  private allProviders = signal<HostingProvider[]>([]);

  filters = signal<ProviderFilters>({});
  sort = signal<ProviderSort>('recommended');
  visibleCount = signal(PAGE_SIZE);

  filteredSorted = computed(() => {
    const filtered = this.hosting.filterProviders(this.allProviders(), this.filters());
    return this.hosting.sortProviders(filtered, this.sort());
  });

  visibleProviders = computed(() => this.filteredSorted().slice(0, this.visibleCount()));

  constructor(
    private hosting: HostingService,
    private seo: SeoService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Compare Web Hosting Providers',
      description: 'Browse and filter shared, WordPress, VPS, cloud and dedicated hosting providers by price, rating and features.',
      path: '/hosting',
    });

    this.hosting.getProviders().subscribe((providers) => this.allProviders.set(providers));

    this.route.queryParamMap.subscribe((params) => {
      const type = params.get('type') as HostingType | null;
      if (type) {
        this.filters.set({ ...this.filters(), types: [type] });
      }
    });
  }

  onSearch(query: string): void {
    this.filters.set({ ...this.filters(), query });
    this.visibleCount.set(PAGE_SIZE);
  }

  onFiltersChange(filters: ProviderFilters): void {
    this.filters.set(filters);
    this.visibleCount.set(PAGE_SIZE);
  }

  onSortChange(sort: ProviderSort): void {
    this.sort.set(sort);
  }

  onClearAll(): void {
    this.filters.set({});
    this.sort.set('recommended');
    this.visibleCount.set(PAGE_SIZE);
  }

  loadMore(): void {
    this.visibleCount.update((count) => count + PAGE_SIZE);
  }
}

import { ChangeDetectionStrategy, Component, OnInit, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Comparison, HostingPlan, HostingProvider } from '../../../../core/models';
import { CompareSelectionService } from '../../../../core/services/compare-selection.service';
import { HostingService } from '../../../../core/services/hosting.service';
import { SeoService } from '../../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { ComparisonCardComponent } from '../../../../shared/components/comparison-card/comparison-card.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { ComparisonsService } from '../../../../core/services/comparisons.service';
import { ComparisonTableComponent } from '../../components/comparison-table.component';

@Component({
  selector: 'app-compare-tool',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, ComparisonTableComponent, EmptyStateComponent, ComparisonCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './compare-tool.component.html',
  styleUrl: './compare-tool.component.scss',
})
export class CompareToolComponent implements OnInit {
  private allProviders = signal<HostingProvider[]>([]);
  addProviderId = signal<string>('');

  selectedProviders = computed<HostingProvider[]>(() => this.compareSelection.getSelectedProviders());

  availableToAdd = computed<HostingProvider[]>(() => {
    const selectedIds = new Set(this.compareSelection.selectedIds());
    return this.allProviders().filter((p) => !selectedIds.has(p.id));
  });

  plansByProvider = computed<Record<string, HostingPlan | undefined>>(() => {
    const map: Record<string, HostingPlan | undefined> = {};
    for (const provider of this.selectedProviders()) {
      const plans = this.hosting.getPlansByProvider(provider.id);
      map[provider.id] = plans[0];
    }
    return map;
  });

  popularComparisons = signal<{ comparison: Comparison; a: HostingProvider; b: HostingProvider }[]>([]);

  constructor(
    protected compareSelection: CompareSelectionService,
    private hosting: HostingService,
    private comparisonsService: ComparisonsService,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Compare Hosting Providers Side by Side',
      description: 'Build a custom side-by-side comparison of hosting providers on pricing, storage, features, support and more.',
      path: '/compare',
    });

    this.hosting.getProviders().subscribe((providers) => this.allProviders.set(providers));

    const popular = this.comparisonsService.getPopularComparisons(6);
    this.popularComparisons.set(
      popular.map((comparison) => ({
        comparison,
        a: this.hosting.getProviderByIdSync(comparison.providerIdA)!,
        b: this.hosting.getProviderByIdSync(comparison.providerIdB)!,
      })),
    );
  }

  onAddProviderChange(event: Event): void {
    this.addProviderId.set((event.target as HTMLSelectElement).value);
  }

  addProvider(): void {
    if (this.addProviderId()) {
      this.compareSelection.add(this.addProviderId());
      this.addProviderId.set('');
    }
  }

  removeProvider(id: string): void {
    this.compareSelection.remove(id);
  }

  clearAll(): void {
    this.compareSelection.clear();
  }
}

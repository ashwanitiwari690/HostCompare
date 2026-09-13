import { ChangeDetectionStrategy, Component, OnInit, computed } from '@angular/core';
import { Comparison, Guide, HostingProvider } from '../../../core/models';
import { ComparisonsService } from '../../../core/services/comparisons.service';
import { FavoritesService } from '../../../core/services/favorites.service';
import { GuidesService } from '../../../core/services/guides.service';
import { HostingService } from '../../../core/services/hosting.service';
import { SeoService } from '../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { ComparisonCardComponent } from '../../../shared/components/comparison-card/comparison-card.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { GuideCardComponent } from '../../../shared/components/guide-card/guide-card.component';
import { ProviderCardComponent } from '../../../shared/components/provider-card/provider-card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [BreadcrumbComponent, ProviderCardComponent, GuideCardComponent, ComparisonCardComponent, EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  favoriteProviders = computed<HostingProvider[]>(() =>
    this.hosting.getProvidersByIds(this.favorites.getByType('provider').map((f) => f.id)),
  );

  favoriteGuides = computed<Guide[]>(() =>
    this.guidesService.getGuidesBySlugs(this.favorites.getByType('guide').map((f) => f.id)),
  );

  favoriteComparisons = computed<{ comparison: Comparison; a: HostingProvider; b: HostingProvider }[]>(() =>
    this.comparisonsService
      .getComparisonsBySlugs(this.favorites.getByType('comparison').map((f) => f.id))
      .map((comparison) => ({
        comparison,
        a: this.hosting.getProviderByIdSync(comparison.providerIdA)!,
        b: this.hosting.getProviderByIdSync(comparison.providerIdB)!,
      })),
  );

  hasAnyFavorites = computed(
    () => this.favoriteProviders().length > 0 || this.favoriteGuides().length > 0 || this.favoriteComparisons().length > 0,
  );

  constructor(
    protected favorites: FavoritesService,
    private hosting: HostingService,
    private guidesService: GuidesService,
    private comparisonsService: ComparisonsService,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Your Favorites',
      description: 'Providers, guides and comparisons you have saved for later.',
      path: '/favorites',
    });
  }
}

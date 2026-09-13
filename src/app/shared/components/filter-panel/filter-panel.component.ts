import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { HostingType } from '../../../core/models';
import { ProviderFilters, ProviderSort } from '../../../core/services/hosting.service';
import { IconComponent } from '../icon/icon.component';

const ALL_HOSTING_TYPES: { value: HostingType; label: string }[] = [
  { value: 'shared', label: 'Shared' },
  { value: 'wordpress', label: 'WordPress' },
  { value: 'vps', label: 'VPS' },
  { value: 'cloud', label: 'Cloud' },
  { value: 'dedicated', label: 'Dedicated' },
  { value: 'reseller', label: 'Reseller' },
  { value: 'email', label: 'Email' },
];

const SORT_OPTIONS: { value: ProviderSort; label: string }[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popularity', label: 'Most Popular' },
];

/**
 * Reusable, signal-driven filter panel for provider listings. The parent
 * page owns the `filters`/`sort` signals; this component only emits
 * change events, so there is no page reload and no duplicated state.
 */
@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.scss',
})
export class FilterPanelComponent {
  filters = input.required<ProviderFilters>();
  sort = input.required<ProviderSort>();
  resultCount = input<number>(0);

  filtersChange = output<ProviderFilters>();
  sortChange = output<ProviderSort>();
  clearAll = output<void>();

  readonly hostingTypes = ALL_HOSTING_TYPES;
  readonly sortOptions = SORT_OPTIONS;
  readonly priceOptions = [
    { value: undefined, label: 'Any price' },
    { value: 200, label: 'Under ₹200/mo' },
    { value: 400, label: 'Under ₹400/mo' },
    { value: 800, label: 'Under ₹800/mo' },
  ];
  readonly ratingOptions = [
    { value: undefined, label: 'Any rating' },
    { value: 4.5, label: '4.5+' },
    { value: 4, label: '4.0+' },
    { value: 3.5, label: '3.5+' },
  ];

  toggleType(type: HostingType): void {
    const current = this.filters().types ?? [];
    const next = current.includes(type) ? current.filter((t) => t !== type) : [...current, type];
    this.filtersChange.emit({ ...this.filters(), types: next });
  }

  isTypeActive(type: HostingType): boolean {
    return (this.filters().types ?? []).includes(type);
  }

  onPriceChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.filtersChange.emit({ ...this.filters(), maxPrice: value ? Number(value) : undefined });
  }

  onRatingChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.filtersChange.emit({ ...this.filters(), minRating: value ? Number(value) : undefined });
  }

  onSortChange(event: Event): void {
    this.sortChange.emit((event.target as HTMLSelectElement).value as ProviderSort);
  }

  toggleBooleanFilter(key: 'freeDomain' | 'ssl' | 'backup' | 'email'): void {
    this.filtersChange.emit({ ...this.filters(), [key]: !this.filters()[key] });
  }
}

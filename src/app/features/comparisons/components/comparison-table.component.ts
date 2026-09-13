import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HostingPlan, HostingProvider } from '../../../core/models';
import { AffiliateButtonComponent } from '../../../shared/components/affiliate-button/affiliate-button.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';

interface ComparisonColumn {
  provider: HostingProvider;
  plan?: HostingPlan;
}

/**
 * Reusable side-by-side hosting comparison table. Used by the /compare tool
 * (dynamic provider selection) and by SEO comparison landing pages
 * (/compare/:slug, fixed to two providers).
 */
@Component({
  selector: 'app-comparison-table',
  standalone: true,
  imports: [RouterLink, AffiliateButtonComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './comparison-table.component.html',
  styleUrl: './comparison-table.component.scss',
})
export class ComparisonTableComponent {
  providers = input.required<HostingProvider[]>();
  plans = input<Record<string, HostingPlan | undefined>>({});
  allowRemove = input<boolean>(true);
  remove = output<string>();

  columns = computed<ComparisonColumn[]>(() =>
    this.providers().map((provider) => ({ provider, plan: this.plans()[provider.id] })),
  );

  bestPriceProviderId = computed<string | null>(() => {
    const list = this.providers();
    if (list.length < 2) return null;
    return list.reduce((best, p) => (p.startingPrice < best.startingPrice ? p : best), list[0]).id;
  });

  bestRatingProviderId = computed<string | null>(() => {
    const list = this.providers();
    if (list.length < 2) return null;
    return list.reduce((best, p) => (p.rating.overall > best.rating.overall ? p : best), list[0]).id;
  });

  formatPrice(provider: HostingProvider, price?: number): string {
    if (price === undefined) return '—';
    return `${provider.currency === 'INR' ? '₹' : ''}${price}${provider.billingPeriod}`;
  }
}

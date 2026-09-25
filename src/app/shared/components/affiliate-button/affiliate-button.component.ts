import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';

export type AffiliateButtonVariant = 'primary' | 'secondary' | 'outline';
export type AffiliateButtonSize = 'sm' | 'md' | 'lg';

/**
 * The single canonical "go to provider" CTA. The URL always comes from
 * provider/plan/registrar data (`affiliateUrl`), never hardcoded in a
 * template. Falls back to the provider's plain website URL when no
 * affiliate URL has been configured yet, and never mislabels a plain
 * link as an affiliate one.
 */
@Component({
  selector: 'app-affiliate-button',
  standalone: true,
  imports: [IconComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      [href]="url()"
      target="_blank"
      [rel]="isAffiliate() ? 'nofollow sponsored noopener' : 'noopener noreferrer'"
      class="cta cta--{{ variant() }} cta--{{ size() }}"
      [attr.aria-label]="ctaText() + ' (opens in a new tab)'"
    >
      <span>{{ ctaText() }}</span>
      <app-icon name="external-link" [size]="size() === 'lg' ? 18 : 16" />
    </a>
    @if (showDisclosure() && isAffiliate()) {
      <span class="cta__disclosure">Affiliate link — <a routerLink="/affiliate-disclosure">why?</a></span>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }
    .cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-weight: 600;
      border-radius: var(--radius-pill);
      white-space: nowrap;
      cursor: pointer;
      border: 1px solid transparent;
      transition: transform 0.1s ease, background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
    }
    .cta:hover {
      text-decoration: none;
    }
    .cta:active {
      transform: scale(0.98);
    }
    .cta--sm { padding: 8px 16px; font-size: 0.85rem; }
    .cta--md { padding: 11px 22px; font-size: 0.95rem; }
    .cta--lg { padding: 14px 28px; font-size: 1.05rem; }

    .cta--primary {
      background: var(--color-primary);
      color: var(--color-primary-contrast);
    }
    .cta--primary:hover {
      background: var(--color-primary-hover);
    }
    .cta--secondary {
      background: var(--color-primary-soft);
      color: var(--color-primary);
    }
    .cta--secondary:hover {
      background: var(--color-border);
    }
    .cta--outline {
      background: transparent;
      border-color: var(--color-border-strong);
      color: var(--color-text);
    }
    .cta--outline:hover {
      border-color: var(--color-primary);
      color: var(--color-primary);
    }
    .cta__disclosure {
      font-size: 0.72rem;
      color: var(--color-text-faint);
    }
  `,
})
export class AffiliateButtonComponent {
  affiliateUrl = input<string | undefined>(undefined);
  fallbackUrl = input<string>('#');
  ctaText = input<string>('Visit Provider');
  variant = input<AffiliateButtonVariant>('primary');
  size = input<AffiliateButtonSize>('md');
  showDisclosure = input<boolean>(false);

  isAffiliate = computed(() => {
    const aff = this.affiliateUrl();
    return !!aff && aff.trim() !== '' && aff !== '#' && !aff.startsWith('#');
  });

  url = computed(() => {
    const aff = this.affiliateUrl();
    if (aff && aff.trim() !== '' && aff !== '#' && !aff.startsWith('#')) {
      return aff;
    }
    const fallback = this.fallbackUrl();
    return fallback && fallback.trim() !== '' && fallback !== '#' ? fallback : '#';
  });
}

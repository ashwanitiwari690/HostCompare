import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type AdFormat = 'banner' | 'in-article' | 'sidebar' | 'rectangle';

const FORMAT_LABELS: Record<AdFormat, string> = {
  banner: 'Leaderboard banner (728×90)',
  'in-article': 'In-article ad',
  sidebar: 'Sidebar ad (300×600)',
  rectangle: 'Medium rectangle (300×250)',
};

/**
 * Reserved ad space only — no real Google AdSense code is wired up yet.
 * Always clearly labeled "Advertisement" and never styled to resemble
 * navigation or a download/CTA button (see docs/ADSENSE.md).
 */
@Component({
  selector: 'app-ad-placeholder',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ad-placeholder ad-placeholder--{{ format() }}" role="complementary" aria-label="Advertisement">
      <span class="ad-placeholder__label">Advertisement</span>
      <span class="ad-placeholder__hint">{{ formatLabel() }}</span>
    </div>
  `,
  styles: `
    .ad-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      border: 1px dashed var(--color-border-strong);
      border-radius: var(--radius-md);
      background: var(--color-surface-alt);
      color: var(--color-text-faint);
      text-align: center;
      margin: 24px auto;
    }
    .ad-placeholder__label {
      font-size: 0.68rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-weight: 700;
    }
    .ad-placeholder__hint {
      font-size: 0.75rem;
    }
    .ad-placeholder--banner {
      width: 100%;
      max-width: 728px;
      height: 90px;
    }
    .ad-placeholder--in-article {
      width: 100%;
      height: 120px;
    }
    .ad-placeholder--sidebar {
      width: 100%;
      max-width: 300px;
      height: 300px;
    }
    .ad-placeholder--rectangle {
      width: 100%;
      max-width: 300px;
      height: 250px;
    }
  `,
})
export class AdPlaceholderComponent {
  format = input<AdFormat>('rectangle');

  formatLabel(): string {
    return FORMAT_LABELS[this.format()];
  }
}

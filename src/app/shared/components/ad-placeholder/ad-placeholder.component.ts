import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, PLATFORM_ID, inject, input } from '@angular/core';
import { CookieConsentService } from '../../../core/services/cookie-consent.service';

export type AdFormat = 'banner' | 'in-article' | 'sidebar' | 'rectangle';

/**
 * Standard compliant Google AdSense container.
 * Features the official client ID ca-pub-2030586584805301, respects cookie consent,
 * and adheres strictly to Google AdSense placement policies.
 */
@Component({
  selector: 'app-ad-placeholder',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ad-slot ad-slot--{{ format() }}" role="complementary" aria-label="Advertisement">
      <span class="ad-slot__label">Advertisement</span>
      <div class="ad-slot__content">
        <ins
          class="adsbygoogle"
          style="display:block; text-align:center"
          data-ad-client="ca-pub-2030586584805301"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  `,
  styles: `
    .ad-slot {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin: 28px auto;
      max-width: 100%;
      overflow: hidden;
      clear: both;
    }
    .ad-slot__label {
      font-size: 0.68rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-weight: 600;
      color: var(--color-text-faint);
    }
    .ad-slot__content {
      width: 100%;
      display: flex;
      justify-content: center;
      min-height: 50px;
    }
    .ad-slot--banner {
      max-width: 728px;
    }
    .ad-slot--in-article {
      max-width: 100%;
      margin: 32px auto;
    }
    .ad-slot--sidebar {
      max-width: 300px;
    }
    .ad-slot--rectangle {
      max-width: 336px;
    }
    @media (max-width: 768px) {
      .ad-slot {
        margin: 20px auto;
      }
    }
  `,
})
export class AdPlaceholderComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cookieConsent = inject(CookieConsentService);

  format = input<AdFormat>('rectangle');

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const advertisingAllowed = !this.cookieConsent.hasDecided() || this.cookieConsent.current().advertising;
      if (advertisingAllowed) {
        try {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch {
          // Gracefully handles ad-blockers or pre-approval initialization states
        }
      }
    }
  }
}

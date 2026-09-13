import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { EarnivoRewardService } from '../../../core/services/earnivo-reward.service';

/**
 * Floating panel shown only to visitors who arrived from an Earnivo Website
 * Promotion campaign - it renders nothing at all for everyone else. It
 * counts the required visit down (pausing whenever this tab isn't the one
 * on screen) and then offers the claim button that credits the visitor's
 * Earnivo wallet.
 *
 * All of the state lives in EarnivoRewardService rather than here, so the
 * countdown survives navigating between pages of this site: the service is
 * root-provided, this component is just its view.
 */
@Component({
  selector: 'app-earnivo-reward',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './earnivo-reward.component.html',
  styleUrl: './earnivo-reward.component.scss',
})
export class EarnivoRewardComponent implements OnInit {
  protected readonly reward = inject(EarnivoRewardService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly formattedRemaining = computed(() => {
    const seconds = this.reward.secondsRemaining();
    if (seconds < 60) return `${seconds}s`;
    return `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, '0')}s`;
  });

  // Measured against the campaign's full required duration, so a visitor who
  // resumes mid-visit sees the bar already part-filled - which is the honest
  // picture, since the time they already spent does count.
  protected readonly progressPercent = computed(() => {
    const required = this.reward.requiredSeconds();
    if (required === 0) return 100;
    return Math.round(((required - this.reward.secondsRemaining()) / required) * 100);
  });

  // Both this card and the cookie-consent banner are fixed to the bottom of
  // the viewport, and the banner's height swings widely with screen width
  // (a one-line desktop bar vs. three stacked buttons on a narrow phone), so
  // a guessed constant would either leave a gap or, worse, sit under the
  // banner again. This tracks the banner's real height live and lifts the
  // card clear of it whenever one is showing.
  protected readonly bannerClearance = signal(0);
  private resizeObserver?: ResizeObserver;
  private mutationObserver?: MutationObserver;

  ngOnInit(): void {
    this.reward.init();
    this.watchCookieBanner();
  }

  private watchCookieBanner(): void {
    if (typeof window === 'undefined' || typeof MutationObserver === 'undefined') return;

    const host = document.querySelector('app-cookie-consent-banner');
    if (!host) return;

    const sync = () => {
      const banner = host.querySelector<HTMLElement>('.cookie-banner');
      this.resizeObserver?.disconnect();
      if (!banner) {
        this.bannerClearance.set(0);
        return;
      }
      this.bannerClearance.set(banner.getBoundingClientRect().height);
      this.resizeObserver = new ResizeObserver(() => this.bannerClearance.set(banner.getBoundingClientRect().height));
      this.resizeObserver.observe(banner);
    };

    sync();
    this.mutationObserver = new MutationObserver(sync);
    this.mutationObserver.observe(host, { childList: true, subtree: true });

    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
      this.mutationObserver?.disconnect();
    });
  }
}

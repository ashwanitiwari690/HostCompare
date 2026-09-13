import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieConsentService } from '../../../core/services/cookie-consent.service';

@Component({
  selector: 'app-cookie-consent-banner',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cookie-consent-banner.component.html',
  styleUrl: './cookie-consent-banner.component.scss',
})
export class CookieConsentBannerComponent {
  managePreferencesOpen = signal(false);
  analyticsChecked = signal(false);
  advertisingChecked = signal(false);

  constructor(protected consent: CookieConsentService) {}

  acceptAll(): void {
    this.consent.acceptAll();
  }

  rejectNonEssential(): void {
    this.consent.rejectNonEssential();
  }

  openPreferences(): void {
    this.managePreferencesOpen.set(true);
  }

  savePreferences(): void {
    this.consent.savePreferences(this.analyticsChecked(), this.advertisingChecked());
    this.managePreferencesOpen.set(false);
  }
}

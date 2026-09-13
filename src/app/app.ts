import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeoService } from './core/services/seo.service';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { CookieConsentBannerComponent } from './shared/components/cookie-consent-banner/cookie-consent-banner.component';
import { EarnivoRewardComponent } from './shared/components/earnivo-reward/earnivo-reward.component';
import { ToastContainerComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ToastContainerComponent, CookieConsentBannerComponent, EarnivoRewardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setJsonLd('org-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'HostCompare',
      url: 'https://www.hostcompare.example',
      description: 'Independent hosting and domain comparison platform.',
    });
    this.seo.setJsonLd('website-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'HostCompare',
      url: 'https://www.hostcompare.example',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://www.hostcompare.example/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    });
  }
}

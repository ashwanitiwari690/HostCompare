import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HostingProvider } from '../../../core/models';
import { AffiliateButtonComponent } from '../affiliate-button/affiliate-button.component';
import { BadgeComponent } from '../badge/badge.component';
import { CompareButtonComponent } from '../compare-button/compare-button.component';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';
import { IconComponent } from '../icon/icon.component';
import { RatingDisplayComponent } from '../rating-display/rating-display.component';

@Component({
  selector: 'app-provider-card',
  standalone: true,
  imports: [
    RouterLink,
    RatingDisplayComponent,
    BadgeComponent,
    AffiliateButtonComponent,
    CompareButtonComponent,
    FavoriteButtonComponent,
    IconComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './provider-card.component.html',
  styleUrl: './provider-card.component.scss',
})
export class ProviderCardComponent {
  provider = input.required<HostingProvider>();
  showCompare = input<boolean>(true);
  showFavorite = input<boolean>(true);
  rank = input<number | null>(null);
}

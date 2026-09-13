import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HostingRecommendation } from '../../../core/models';
import { AffiliateButtonComponent } from '../../../shared/components/affiliate-button/affiliate-button.component';
import { CompareButtonComponent } from '../../../shared/components/compare-button/compare-button.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-recommendation-card',
  standalone: true,
  imports: [RouterLink, AffiliateButtonComponent, CompareButtonComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './recommendation-card.component.html',
  styleUrl: './recommendation-card.component.scss',
})
export class RecommendationCardComponent {
  recommendation = input.required<HostingRecommendation>();
  rank = input.required<number>();
}

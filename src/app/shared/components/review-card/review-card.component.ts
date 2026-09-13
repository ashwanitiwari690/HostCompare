import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HostingProvider, Review } from '../../../core/models';
import { AffiliateButtonComponent } from '../affiliate-button/affiliate-button.component';
import { RatingDisplayComponent } from '../rating-display/rating-display.component';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [RouterLink, RatingDisplayComponent, AffiliateButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss',
})
export class ReviewCardComponent {
  review = input.required<Review>();
  provider = input.required<HostingProvider>();
}

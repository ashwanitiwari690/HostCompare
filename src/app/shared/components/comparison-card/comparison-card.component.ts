import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Comparison, HostingProvider } from '../../../core/models';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-comparison-card',
  standalone: true,
  imports: [RouterLink, IconComponent, FavoriteButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="comparison-card card">
      <div class="comparison-card__fav">
        <app-favorite-button type="comparison" [id]="comparison().slug" [itemLabel]="providerA().name + ' vs ' + providerB().name" />
      </div>
      <a [routerLink]="['/compare', comparison().slug]" class="comparison-card__link-wrap">
        <div class="comparison-card__logos">
          <span class="comparison-card__logo" [style.background]="providerA().logoColor">{{ providerA().logoInitials }}</span>
          <span class="comparison-card__vs">VS</span>
          <span class="comparison-card__logo" [style.background]="providerB().logoColor">{{ providerB().logoInitials }}</span>
        </div>
        <h3>{{ providerA().name }} vs {{ providerB().name }}</h3>
        <p>{{ comparison().quickVerdict }}</p>
        <span class="comparison-card__cta">Compare now <app-icon name="arrow-right" [size]="15" /></span>
      </a>
    </article>
  `,
  styles: `
    .comparison-card {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 20px;
      height: 100%;
      color: var(--color-text);
    }
    .comparison-card:hover {
      box-shadow: var(--shadow-md);
    }
    .comparison-card__fav {
      position: absolute;
      top: 16px;
      right: 16px;
    }
    .comparison-card__link-wrap {
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
      color: inherit;
    }
    .comparison-card__link-wrap:hover {
      text-decoration: none;
    }
    .comparison-card__logos {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-right: 36px;
    }
    .comparison-card__logo {
      width: 38px;
      height: 38px;
      border-radius: var(--radius-md);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 800;
      font-size: 0.78rem;
    }
    .comparison-card__vs {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--color-text-faint);
    }
    .comparison-card h3 {
      font-size: 1rem;
      margin: 0;
    }
    .comparison-card p {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      margin: 0;
      flex: 1;
    }
    .comparison-card__cta {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--color-primary);
    }
  `,
})
export class ComparisonCardComponent {
  comparison = input.required<Comparison>();
  providerA = input.required<HostingProvider>();
  providerB = input.required<HostingProvider>();
}

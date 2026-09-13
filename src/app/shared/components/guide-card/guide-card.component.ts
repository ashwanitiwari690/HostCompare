import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Guide } from '../../../core/models';
import { BadgeComponent } from '../badge/badge.component';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-guide-card',
  standalone: true,
  imports: [RouterLink, BadgeComponent, IconComponent, FavoriteButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="guide-card card">
      <div class="guide-card__fav">
        <app-favorite-button type="guide" [id]="guide().slug" [itemLabel]="guide().title" />
      </div>
      <a [routerLink]="['/guides', guide().slug]" class="guide-card__icon" [style.background]="guide().featuredIconColor">
        {{ guide().featuredIconInitials }}
      </a>
      <div class="guide-card__body">
        <app-badge variant="primary">{{ guide().category }}</app-badge>
        <h3><a [routerLink]="['/guides', guide().slug]">{{ guide().title }}</a></h3>
        <p>{{ guide().excerpt }}</p>
        <div class="guide-card__meta">
          <span><app-icon name="clock" [size]="14" /> {{ guide().readingTimeMinutes }} min read</span>
        </div>
      </div>
    </article>
  `,
  styles: `
    .guide-card {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 20px;
      height: 100%;
    }
    .guide-card__fav {
      position: absolute;
      top: 16px;
      right: 16px;
    }
    .guide-card:hover {
      box-shadow: var(--shadow-md);
    }
    .guide-card__icon {
      width: 44px;
      height: 44px;
      border-radius: var(--radius-md);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 800;
      font-size: 0.85rem;
    }
    .guide-card__body {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .guide-card__body h3 {
      font-size: 1.02rem;
      margin: 0;
    }
    .guide-card__body h3 a {
      color: var(--color-text);
    }
    .guide-card__body p {
      color: var(--color-text-muted);
      font-size: 0.87rem;
      margin: 0;
    }
    .guide-card__meta {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--color-text-faint);
      font-size: 0.78rem;
      margin-top: auto;
    }
    .guide-card__meta span {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
  `,
})
export class GuideCardComponent {
  guide = input.required<Guide>();
}

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-rating-display',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rating" [class.rating--sm]="size() === 'sm'" role="img" [attr.aria-label]="ariaLabel()">
      <span class="rating__stars" aria-hidden="true">
        @for (i of [0, 1, 2, 3, 4]; track i) {
          <app-icon [name]="starState(i)" [size]="size() === 'sm' ? 14 : 18" />
        }
      </span>
      <span class="rating__value">{{ value().toFixed(1) }}</span>
      @if (label()) {
        <span class="rating__label">{{ label() }}</span>
      }
    </div>
  `,
  styles: `
    .rating {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--color-star);
    }
    .rating__stars {
      display: inline-flex;
      gap: 1px;
    }
    .rating__value {
      font-weight: 700;
      color: var(--color-text);
      font-size: 0.95rem;
    }
    .rating--sm .rating__value {
      font-size: 0.8rem;
    }
    .rating__label {
      color: var(--color-text-muted);
      font-size: 0.8rem;
    }
  `,
})
export class RatingDisplayComponent {
  value = input.required<number>();
  label = input<string>('');
  size = input<'sm' | 'md'>('md');

  ariaLabel = computed(() => `Editorial rating ${this.value().toFixed(1)} out of 5`);

  starState(index: number): 'star' | 'star-outline' {
    return index < Math.round(this.value()) ? 'star' : 'star-outline';
  }
}

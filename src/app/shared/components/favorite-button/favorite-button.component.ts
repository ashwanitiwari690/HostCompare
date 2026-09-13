import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FavoriteType } from '../../../core/models';
import { FavoritesService } from '../../../core/services/favorites.service';
import { ToastService } from '../../../core/services/toast.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="fav-btn"
      [class.fav-btn--active]="isFavorite()"
      [attr.aria-pressed]="isFavorite()"
      [attr.aria-label]="isFavorite() ? 'Remove from favorites' : 'Add to favorites'"
      (click)="toggle()"
    >
      <app-icon [name]="isFavorite() ? 'heart' : 'heart-outline'" [size]="18" />
    </button>
  `,
  styles: `
    .fav-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border-radius: var(--radius-pill);
      border: 1px solid var(--color-border);
      background: var(--color-surface);
      color: var(--color-text-muted);
      cursor: pointer;
      transition: color 0.15s ease, border-color 0.15s ease, transform 0.1s ease;
    }
    .fav-btn:hover {
      border-color: var(--color-danger);
      color: var(--color-danger);
    }
    .fav-btn:active {
      transform: scale(0.94);
    }
    .fav-btn--active {
      color: var(--color-danger);
      border-color: var(--color-danger);
    }
  `,
})
export class FavoriteButtonComponent {
  type = input.required<FavoriteType>();
  id = input.required<string>();
  itemLabel = input<string>('Item');

  isFavorite = computed(() => this.favorites.isFavorite(this.type(), this.id()));

  constructor(
    private favorites: FavoritesService,
    private toast: ToastService,
  ) {}

  toggle(): void {
    const wasFavorite = this.isFavorite();
    this.favorites.toggle(this.type(), this.id());
    this.toast.show(wasFavorite ? `Removed ${this.itemLabel()} from favorites` : `Added ${this.itemLabel()} to favorites`, 'success');
  }
}

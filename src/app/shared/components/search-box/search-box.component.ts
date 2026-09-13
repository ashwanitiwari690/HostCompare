import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [FormsModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form class="search-box" (submit)="onSubmit($event)" role="search">
      <app-icon name="search" [size]="18" />
      <input
        type="search"
        name="q"
        [placeholder]="placeholder()"
        [(ngModel)]="query"
        [attr.aria-label]="placeholder()"
      />
    </form>
  `,
  styles: `
    .search-box {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-pill);
      padding: 10px 16px;
      color: var(--color-text-faint);
      transition: border-color 0.15s ease;
    }
    .search-box:focus-within {
      border-color: var(--color-primary);
      color: var(--color-primary);
    }
    input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      font-size: 0.95rem;
      color: var(--color-text);
      min-width: 0;
    }
    input::placeholder {
      color: var(--color-text-faint);
    }
  `,
})
export class SearchBoxComponent {
  placeholder = input<string>('Search hosting, domains, providers...');
  initialValue = input<string>('');
  search = output<string>();

  query = '';

  ngOnInit(): void {
    this.query = this.initialValue();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.search.emit(this.query.trim());
  }
}

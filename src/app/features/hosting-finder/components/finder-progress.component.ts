import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-finder-progress',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="finder-progress">
      <div class="finder-progress__bar">
        <div class="finder-progress__fill" [style.width.%]="percent()"></div>
      </div>
      <span class="finder-progress__label">Step {{ current() }} of {{ total() }}</span>
    </div>
  `,
  styles: `
    .finder-progress {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .finder-progress__bar {
      flex: 1;
      height: 8px;
      border-radius: var(--radius-pill);
      background: var(--color-border);
      overflow: hidden;
    }
    .finder-progress__fill {
      height: 100%;
      background: var(--color-primary);
      border-radius: var(--radius-pill);
      transition: width 0.25s ease;
    }
    .finder-progress__label {
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--color-text-muted);
      white-space: nowrap;
    }
  `,
})
export class FinderProgressComponent {
  current = input.required<number>();
  total = input.required<number>();

  percent(): number {
    return Math.round((this.current() / this.total()) * 100);
  }
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type BadgeVariant = 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'neutral';

@Component({
  selector: 'app-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="badge badge--{{ variant() }}"><ng-content /></span>`,
  styles: `
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 10px;
      border-radius: var(--radius-pill);
      font-size: 0.75rem;
      font-weight: 600;
      white-space: nowrap;
      line-height: 1.6;
    }
    .badge--primary { background: var(--color-primary-soft); color: var(--color-primary); }
    .badge--accent { background: var(--color-accent-soft); color: var(--color-accent); }
    .badge--success { background: var(--color-success-soft); color: var(--color-success); }
    .badge--warning { background: var(--color-warning-soft); color: var(--color-warning); }
    .badge--danger { background: var(--color-danger-soft); color: var(--color-danger); }
    .badge--neutral { background: var(--color-surface-alt); color: var(--color-text-muted); }
  `,
})
export class BadgeComponent {
  variant = input<BadgeVariant>('neutral');
}

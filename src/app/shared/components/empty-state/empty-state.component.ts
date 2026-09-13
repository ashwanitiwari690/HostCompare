import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent, IconName } from '../icon/icon.component';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="empty-state">
      <div class="empty-state__icon"><app-icon [name]="icon()" [size]="26" /></div>
      <h3>{{ title() }}</h3>
      <p>{{ description() }}</p>
      <ng-content />
    </div>
  `,
  styles: `
    .empty-state {
      text-align: center;
      padding: 48px 20px;
      color: var(--color-text-muted);
    }
    .empty-state__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--color-surface-alt);
      color: var(--color-text-faint);
      margin-bottom: 16px;
    }
    .empty-state h3 {
      color: var(--color-text);
      font-size: 1.05rem;
      margin-bottom: 6px;
    }
    .empty-state p {
      max-width: 360px;
      margin: 0 auto;
      font-size: 0.9rem;
    }
  `,
})
export class EmptyStateComponent {
  icon = input<IconName>('info');
  title = input<string>('Nothing here yet');
  description = input<string>('');
}

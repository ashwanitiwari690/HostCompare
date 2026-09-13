import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="toast-container" aria-live="polite">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast toast--{{ toast.variant }}">
          <app-icon [name]="toast.variant === 'success' ? 'check' : 'info'" [size]="16" />
          <span>{{ toast.text }}</span>
          <button type="button" aria-label="Dismiss" (click)="toastService.dismiss(toast.id)">
            <app-icon name="close" [size]="14" />
          </button>
        </div>
      }
    </div>
  `,
  styles: `
    .toast-container {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 1000;
      width: min(92vw, 380px);
    }
    .toast {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      border-radius: var(--radius-md);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      box-shadow: var(--shadow-lg);
      font-size: 0.88rem;
      color: var(--color-text);
    }
    .toast span {
      flex: 1;
    }
    .toast button {
      background: none;
      border: none;
      color: var(--color-text-faint);
      cursor: pointer;
      display: inline-flex;
    }
    .toast--success app-icon:first-child {
      color: var(--color-success);
    }
    .toast--error app-icon:first-child {
      color: var(--color-danger);
    }
  `,
})
export class ToastContainerComponent {
  constructor(protected toastService: ToastService) {}
}

import { ChangeDetectionStrategy, Component, HostListener, input, output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (open()) {
      <div class="modal-backdrop" (click)="close.emit()">
        <div
          class="modal"
          role="dialog"
          aria-modal="true"
          [attr.aria-label]="title()"
          (click)="$event.stopPropagation()"
        >
          <div class="modal__header">
            <h2>{{ title() }}</h2>
            <button type="button" class="modal__close" aria-label="Close dialog" (click)="close.emit()">
              <app-icon name="close" [size]="18" />
            </button>
          </div>
          <div class="modal__body">
            <ng-content />
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      z-index: 1100;
    }
    .modal {
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      max-width: 480px;
      width: 100%;
      max-height: 85vh;
      overflow-y: auto;
    }
    .modal__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 20px;
      border-bottom: 1px solid var(--color-border);
    }
    .modal__header h2 {
      font-size: 1.05rem;
      margin: 0;
    }
    .modal__close {
      background: none;
      border: none;
      color: var(--color-text-muted);
      cursor: pointer;
    }
    .modal__body {
      padding: 20px;
    }
  `,
})
export class ModalComponent {
  open = input.required<boolean>();
  title = input<string>('');
  close = output<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) this.close.emit();
  }
}

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CompareSelectionService, MAX_COMPARE_PROVIDERS } from '../../../core/services/compare-selection.service';
import { ToastService } from '../../../core/services/toast.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-compare-button',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label class="compare-check" [class.compare-check--checked]="isSelected()">
      <input
        type="checkbox"
        [checked]="isSelected()"
        [disabled]="!isSelected() && compareSelection.isFull()"
        (change)="onToggle()"
      />
      <app-icon name="scale" [size]="16" />
      <span>{{ isSelected() ? 'Added to compare' : 'Add to compare' }}</span>
    </label>
  `,
  styles: `
    .compare-check {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: var(--radius-pill);
      border: 1px solid var(--color-border);
      background: var(--color-surface);
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--color-text-muted);
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .compare-check:has(input:disabled) {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .compare-check--checked {
      border-color: var(--color-primary);
      background: var(--color-primary-soft);
      color: var(--color-primary);
    }
    .compare-check input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }
  `,
})
export class CompareButtonComponent {
  providerId = input.required<string>();
  providerName = input<string>('Provider');

  isSelected = computed(() => this.compareSelection.isSelected(this.providerId()));

  constructor(
    protected compareSelection: CompareSelectionService,
    private toast: ToastService,
  ) {}

  onToggle(): void {
    if (!this.isSelected() && this.compareSelection.isFull()) {
      this.toast.show(`You can compare up to ${MAX_COMPARE_PROVIDERS} providers at once`, 'info');
      return;
    }
    const wasSelected = this.isSelected();
    this.compareSelection.toggle(this.providerId());
    this.toast.show(
      wasSelected ? `${this.providerName()} removed from comparison` : `${this.providerName()} added to comparison`,
      'success',
    );
  }
}

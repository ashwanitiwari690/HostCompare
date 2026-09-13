import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

export interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq-accordion',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="faq">
      @for (item of items(); track item.question; let i = $index) {
        <div class="faq__item">
          <button
            type="button"
            class="faq__question"
            [attr.aria-expanded]="isOpen(i)"
            [attr.aria-controls]="'faq-panel-' + i"
            (click)="toggle(i)"
          >
            <span>{{ item.question }}</span>
            <app-icon name="chevron-down" [size]="18" class="faq__chevron" [class.faq__chevron--open]="isOpen(i)" />
          </button>
          @if (isOpen(i)) {
            <div class="faq__answer" [id]="'faq-panel-' + i">
              <p>{{ item.answer }}</p>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: `
    .faq__item {
      border-bottom: 1px solid var(--color-border);
    }
    .faq__question {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: none;
      border: none;
      padding: 16px 4px;
      text-align: left;
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--color-text);
      cursor: pointer;
    }
    .faq__chevron {
      flex-shrink: 0;
      transition: transform 0.15s ease;
      color: var(--color-text-faint);
    }
    .faq__chevron--open {
      transform: rotate(180deg);
    }
    .faq__answer {
      padding: 0 4px 18px;
      color: var(--color-text-muted);
      font-size: 0.9rem;
    }
    .faq__answer p {
      margin: 0;
    }
  `,
})
export class FaqAccordionComponent {
  items = input.required<FaqItem[]>();
  private openIndices = signal<Set<number>>(new Set([0]));

  isOpen(index: number): boolean {
    return this.openIndices().has(index);
  }

  toggle(index: number): void {
    this.openIndices.update((set) => {
      const next = new Set(set);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  }
}

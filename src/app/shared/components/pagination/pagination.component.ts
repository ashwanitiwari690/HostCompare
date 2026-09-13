import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (hasMore()) {
      <div class="load-more">
        <button type="button" class="btn btn--outline" (click)="loadMore.emit()">
          Load More ({{ shown() }} of {{ total() }})
        </button>
      </div>
    }
  `,
  styles: `
    .load-more {
      display: flex;
      justify-content: center;
      margin-top: 32px;
    }
  `,
})
export class PaginationComponent {
  shown = input.required<number>();
  total = input.required<number>();
  loadMore = output<void>();

  hasMore(): boolean {
    return this.shown() < this.total();
  }
}

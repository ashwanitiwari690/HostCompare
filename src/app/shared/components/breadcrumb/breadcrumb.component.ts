import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol>
        @for (item of items(); track item.label; let last = $last) {
          <li>
            @if (item.path && !last) {
              <a [routerLink]="item.path">{{ item.label }}</a>
            } @else {
              <span [attr.aria-current]="last ? 'page' : null">{{ item.label }}</span>
            }
            @if (!last) {
              <app-icon name="chevron-right" [size]="14" />
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: `
    .breadcrumb ol {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
      padding: 0;
      margin: 0;
      font-size: 0.83rem;
      color: var(--color-text-faint);
    }
    .breadcrumb li {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .breadcrumb a {
      color: var(--color-text-muted);
    }
    .breadcrumb span[aria-current] {
      color: var(--color-text);
      font-weight: 600;
    }
  `,
})
export class BreadcrumbComponent {
  items = input.required<BreadcrumbItem[]>();
}

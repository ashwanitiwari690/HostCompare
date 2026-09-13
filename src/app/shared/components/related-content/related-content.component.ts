import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';

export interface RelatedLink {
  label: string;
  path: string;
  meta?: string;
}

export interface RelatedSection {
  title: string;
  links: RelatedLink[];
}

/**
 * Renders "related X" link blocks (related providers, guides, comparisons,
 * categories) used across provider, guide and comparison pages to support
 * the site's internal linking / SEO strategy.
 */
@Component({
  selector: 'app-related-content',
  standalone: true,
  imports: [RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (sections().length) {
      <div class="related-content">
        @for (section of sections(); track section.title) {
          @if (section.links.length) {
            <div class="related-content__group">
              <h3>{{ section.title }}</h3>
              <ul>
                @for (link of section.links; track link.path) {
                  <li>
                    <a [routerLink]="link.path">
                      <span>{{ link.label }}</span>
                      @if (link.meta) {
                        <span class="related-content__meta">{{ link.meta }}</span>
                      }
                      <app-icon name="chevron-right" [size]="16" />
                    </a>
                  </li>
                }
              </ul>
            </div>
          }
        }
      </div>
    }
  `,
  styles: `
    .related-content {
      display: grid;
      gap: 24px;
      grid-template-columns: 1fr;
    }
    .related-content__group h3 {
      font-size: 1rem;
      margin-bottom: 12px;
    }
    .related-content__group ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .related-content__group a {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 14px;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      color: var(--color-text);
      background: var(--color-surface);
    }
    .related-content__group a:hover {
      border-color: var(--color-primary);
      text-decoration: none;
    }
    .related-content__group a span:first-of-type {
      flex: 1;
      font-weight: 500;
      font-size: 0.9rem;
    }
    .related-content__meta {
      font-size: 0.78rem;
      color: var(--color-text-faint);
    }
    @media (min-width: 768px) {
      .related-content {
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      }
    }
  `,
})
export class RelatedContentComponent {
  sections = input.required<RelatedSection[]>();
}

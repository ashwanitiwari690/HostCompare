import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'search'
  | 'menu'
  | 'close'
  | 'sun'
  | 'moon'
  | 'monitor'
  | 'chevron-down'
  | 'chevron-right'
  | 'check'
  | 'star'
  | 'star-outline'
  | 'heart'
  | 'heart-outline'
  | 'scale'
  | 'arrow-right'
  | 'external-link'
  | 'shield'
  | 'plus'
  | 'minus'
  | 'clock'
  | 'globe'
  | 'server'
  | 'mail'
  | 'lock'
  | 'info'
  | 'filter'
  | 'trash';

/**
 * Centralised inline-SVG icon set. Kept dependency-free (no icon font/library)
 * and stroke-based so icons automatically pick up currentColor for theming.
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      class="app-icon"
    >
      @switch (name()) {
        @case ('search') {
          <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        }
        @case ('menu') {
          <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
        }
        @case ('close') {
          <line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" />
        }
        @case ('sun') {
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" />
          <line x1="4.2" y1="4.2" x2="5.6" y2="5.6" /><line x1="18.4" y1="18.4" x2="19.8" y2="19.8" />
          <line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" />
          <line x1="4.2" y1="19.8" x2="5.6" y2="18.4" /><line x1="18.4" y1="5.6" x2="19.8" y2="4.2" />
        }
        @case ('moon') {
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        }
        @case ('monitor') {
          <rect x="2" y="4" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="18" x2="12" y2="21" />
        }
        @case ('chevron-down') {
          <polyline points="6 9 12 15 18 9" />
        }
        @case ('chevron-right') {
          <polyline points="9 6 15 12 9 18" />
        }
        @case ('check') {
          <polyline points="20 6 9 17 4 12" />
        }
        @case ('star') {
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" fill="currentColor" />
        }
        @case ('star-outline') {
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
        }
        @case ('heart') {
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" fill="currentColor" />
        }
        @case ('heart-outline') {
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
        }
        @case ('scale') {
          <path d="M12 3v18M5 7l-3 7a3.5 3.5 0 0 0 7 0Zm14 0-3 7a3.5 3.5 0 0 0 7 0Z" /><path d="M5 7h14M9 21h6" />
        }
        @case ('arrow-right') {
          <line x1="4" y1="12" x2="20" y2="12" /><polyline points="14 6 20 12 14 18" />
        }
        @case ('external-link') {
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
        }
        @case ('shield') {
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        }
        @case ('plus') {
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        }
        @case ('minus') {
          <line x1="5" y1="12" x2="19" y2="12" />
        }
        @case ('clock') {
          <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15.5 14" />
        }
        @case ('globe') {
          <circle cx="12" cy="12" r="9" /><line x1="3" y1="12" x2="21" y2="12" />
          <path d="M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6-4-9s1.5-6.3 4-9Z" />
        }
        @case ('server') {
          <rect x="3" y="4" width="18" height="6" rx="1.5" /><rect x="3" y="14" width="18" height="6" rx="1.5" />
          <line x1="7" y1="7" x2="7.01" y2="7" /><line x1="7" y1="17" x2="7.01" y2="17" />
        }
        @case ('mail') {
          <rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3 7 12 13 21 7" />
        }
        @case ('lock') {
          <rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
        }
        @case ('info') {
          <circle cx="12" cy="12" r="9" /><line x1="12" y1="11" x2="12" y2="16" /><line x1="12" y1="8" x2="12.01" y2="8" />
        }
        @case ('filter') {
          <polygon points="4 4 20 4 14 12.5 14 19 10 21 10 12.5 4 4" />
        }
        @case ('trash') {
          <polyline points="3 6 5 6 21 6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0-1 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 6" />
        }
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      line-height: 0;
    }
  `,
})
export class IconComponent {
  name = input.required<IconName>();
  size = input<number>(20);
}

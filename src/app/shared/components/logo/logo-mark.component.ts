import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Brand mark for HostCompare: two comparison bars of different height (one
 * host "winning" the comparison) topped with a check badge, i.e. "compare,
 * then choose with confidence". Colors are fixed (not theme-driven) so the
 * brand mark stays consistent across light/dark mode, matching favicon.svg
 * and the generated PNG/ICO favicons in /public.
 */
@Component({
  selector: 'app-logo-mark',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 64 64" role="img" aria-label="HostCompare" class="logo-mark">
      <defs>
        <linearGradient [attr.id]="gradId" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#1b6ef3" />
          <stop offset="1" stop-color="#0b3fae" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" [attr.fill]="'url(#' + gradId + ')'" />
      <rect x="17" y="33" width="10" height="16" rx="5" fill="#ffffff" />
      <rect x="37" y="18" width="10" height="31" rx="5" fill="#ffffff" />
      <circle cx="47" cy="15" r="9" fill="#14b8a6" />
      <path d="M43.5 15.5 46 18 51 10.5" fill="none" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      line-height: 0;
      flex-shrink: 0;
    }
    .logo-mark {
      display: block;
    }
  `,
})
export class LogoMarkComponent {
  size = input<number>(34);

  private static nextId = 0;
  protected readonly gradId = `hc-logo-grad-${LogoMarkComponent.nextId++}`;
}

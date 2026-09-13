import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CompareSelectionService } from '../../core/services/compare-selection.service';
import { Theme } from '../../core/models';
import { ThemeService } from '../../core/services/theme.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { SearchBoxComponent } from '../../shared/components/search-box/search-box.component';

interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IconComponent, SearchBoxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly navLinks: NavLink[] = [
    { label: 'Hosting', path: '/hosting' },
    { label: 'WordPress', path: '/wordpress-hosting' },
    { label: 'VPS', path: '/vps' },
    { label: 'Domains', path: '/domains' },
    { label: 'Comparisons', path: '/compare' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Guides', path: '/guides' },
  ];

  readonly themeOrder: Theme[] = ['light', 'dark', 'system'];

  mobileMenuOpen = signal(false);
  mobileSearchOpen = signal(false);

  constructor(
    protected themeService: ThemeService,
    protected compareSelection: CompareSelectionService,
    private router: Router,
  ) {}

  @HostListener('window:keydown.escape')
  onEscape(): void {
    this.mobileMenuOpen.set(false);
    this.mobileSearchOpen.set(false);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((v) => !v);
    this.mobileSearchOpen.set(false);
  }

  toggleMobileSearch(): void {
    this.mobileSearchOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  cycleTheme(): void {
    const current = this.themeService.theme();
    const nextIndex = (this.themeOrder.indexOf(current) + 1) % this.themeOrder.length;
    this.themeService.setTheme(this.themeOrder[nextIndex]);
  }

  themeIcon(): 'sun' | 'moon' | 'monitor' {
    switch (this.themeService.theme()) {
      case 'light':
        return 'sun';
      case 'dark':
        return 'moon';
      default:
        return 'monitor';
    }
  }

  themeLabel(): string {
    switch (this.themeService.theme()) {
      case 'light':
        return 'Light theme';
      case 'dark':
        return 'Dark theme';
      default:
        return 'System theme';
    }
  }

  onSearch(query: string): void {
    if (!query) return;
    this.mobileMenuOpen.set(false);
    this.mobileSearchOpen.set(false);
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }
}

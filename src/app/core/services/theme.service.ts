import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Theme } from '../models';
import { StorageService } from './storage.service';

const STORAGE_KEY = 'hostcompare-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storage = inject(StorageService);

  private readonly systemPrefersDark = signal(this.matchesDark());

  readonly theme = signal<Theme>(this.storage.get<Theme>(STORAGE_KEY, 'system'));

  readonly effectiveTheme = computed<'light' | 'dark'>(() => {
    const theme = this.theme();
    if (theme === 'system') {
      return this.systemPrefersDark() ? 'dark' : 'light';
    }
    return theme;
  });

  constructor() {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      media.addEventListener('change', (e) => this.systemPrefersDark.set(e.matches));
    }

    effect(() => {
      const effective = this.effectiveTheme();
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', effective);
      }
    });
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
    this.storage.set(STORAGE_KEY, theme);
  }

  private matchesDark(): boolean {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}

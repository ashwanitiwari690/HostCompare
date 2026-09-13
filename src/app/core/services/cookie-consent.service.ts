import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { CookiePreferences } from '../models';
import { StorageService } from './storage.service';

const STORAGE_KEY = 'hostcompare-cookie-consent';

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  advertising: false,
  decidedAt: null,
};

@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  private readonly storage = inject(StorageService);

  private readonly preferences = signal<CookiePreferences>(
    this.storage.get<CookiePreferences>(STORAGE_KEY, DEFAULT_PREFERENCES),
  );

  readonly current = this.preferences.asReadonly();
  readonly hasDecided = computed(() => this.preferences().decidedAt !== null);

  constructor() {
    effect(() => this.storage.set(STORAGE_KEY, this.preferences()));
  }

  acceptAll(): void {
    this.preferences.set({ necessary: true, analytics: true, advertising: true, decidedAt: new Date().toISOString() });
  }

  rejectNonEssential(): void {
    this.preferences.set({ necessary: true, analytics: false, advertising: false, decidedAt: new Date().toISOString() });
  }

  savePreferences(analytics: boolean, advertising: boolean): void {
    this.preferences.set({ necessary: true, analytics, advertising, decidedAt: new Date().toISOString() });
  }
}

import { Injectable } from '@angular/core';

/**
 * Thin wrapper around window.localStorage. Centralised so every feature
 * reads/writes through one place and so storage failures (private browsing,
 * disabled storage, quota errors) never break the app.
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly available = typeof window !== 'undefined' && !!window.localStorage;

  get<T>(key: string, fallback: T): T {
    if (!this.available) return fallback;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }

  set<T>(key: string, value: T): void {
    if (!this.available) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore quota / privacy-mode failures */
    }
  }

  remove(key: string): void {
    if (!this.available) return;
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  }
}

import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { HostingProvider } from '../models';
import { HostingService } from './hosting.service';
import { StorageService } from './storage.service';

const STORAGE_KEY = 'hostcompare-comparison';
export const MAX_COMPARE_PROVIDERS = 4;

/**
 * Holds which providers the visitor currently wants to compare. Persisted to
 * localStorage so the selection survives navigation between the Hosting
 * Finder, the hosting directory, provider review pages and /compare.
 */
@Injectable({ providedIn: 'root' })
export class CompareSelectionService {
  private readonly storage = inject(StorageService);
  private readonly hosting = inject(HostingService);

  private readonly ids = signal<string[]>(this.storage.get<string[]>(STORAGE_KEY, []));

  readonly selectedIds = this.ids.asReadonly();
  readonly count = computed(() => this.ids().length);
  readonly isFull = computed(() => this.ids().length >= MAX_COMPARE_PROVIDERS);

  constructor() {
    effect(() => this.storage.set(STORAGE_KEY, this.ids()));
  }

  isSelected(providerId: string): boolean {
    return this.ids().includes(providerId);
  }

  add(providerId: string): void {
    if (this.isSelected(providerId) || this.isFull()) return;
    this.ids.update((list) => [...list, providerId]);
  }

  remove(providerId: string): void {
    this.ids.update((list) => list.filter((id) => id !== providerId));
  }

  toggle(providerId: string): void {
    this.isSelected(providerId) ? this.remove(providerId) : this.add(providerId);
  }

  clear(): void {
    this.ids.set([]);
  }

  /** Replaces the whole selection, e.g. when arriving from the Hosting Finder. */
  setSelection(providerIds: string[]): void {
    this.ids.set(providerIds.slice(0, MAX_COMPARE_PROVIDERS));
  }

  getSelectedProviders(): HostingProvider[] {
    return this.hosting.getProvidersByIds(this.ids());
  }
}

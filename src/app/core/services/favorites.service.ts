import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { FavoriteItem, FavoriteType } from '../models';
import { StorageService } from './storage.service';

const STORAGE_KEY = 'hostcompare-favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly storage = inject(StorageService);

  private readonly items = signal<FavoriteItem[]>(this.storage.get<FavoriteItem[]>(STORAGE_KEY, []));

  readonly favorites = this.items.asReadonly();
  readonly count = computed(() => this.items().length);

  constructor() {
    effect(() => this.storage.set(STORAGE_KEY, this.items()));
  }

  isFavorite(type: FavoriteType, id: string): boolean {
    return this.items().some((item) => item.type === type && item.id === id);
  }

  toggle(type: FavoriteType, id: string): void {
    if (this.isFavorite(type, id)) {
      this.remove(type, id);
    } else {
      this.items.update((list) => [...list, { type, id, addedAt: new Date().toISOString() }]);
    }
  }

  remove(type: FavoriteType, id: string): void {
    this.items.update((list) => list.filter((item) => !(item.type === type && item.id === id)));
  }

  getByType(type: FavoriteType): FavoriteItem[] {
    return this.items().filter((item) => item.type === type);
  }

  clear(): void {
    this.items.set([]);
  }
}

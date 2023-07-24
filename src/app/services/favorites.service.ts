import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Cocktail } from '../interfaces/cocktail';
import { FavoritesState } from '../interfaces/favorites-state';

const favoritesStorageKey = 'favorites';

// helper to clean up duplicates
export const uniqueArray = (array: Cocktail[] = []) =>
  array.filter(
    (item, index, self) =>
      index === self.findIndex((obj) => obj.idDrink === item.idDrink)
  );

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private storageInitialized = false;
  constructor(private storage: Storage) {}

  async loadFavorites(): Promise<Cocktail[]> {
    if (!this.storageInitialized) await this.storage.create();
    return this.storage.get(favoritesStorageKey);
  }

  async saveFavorites(favorites: FavoritesState): Promise<boolean> {
    if (!this.storageInitialized) await this.storage.create();
    if (favorites) {
      const store = uniqueArray(favorites.favorites);
      return this.storage.set(favoritesStorageKey, store);
    }
    return Promise.reject(false);
  }

  async resetFavorites() {
    if (!this.storageInitialized) await this.storage.create();
    this.storage.remove(favoritesStorageKey);
  }
}

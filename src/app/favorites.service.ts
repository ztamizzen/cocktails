import { Injectable } from '@angular/core';
import { Cocktail } from './cocktail';
import { FavoritesState } from './favorites-state';

const favoritesStorageKey = 'favorites';
// helper
const getFavorite = (drink: Cocktail): Cocktail | undefined => {
  const storage = localStorage.getItem(favoritesStorageKey);
  if (storage) {
    const json = JSON.parse(storage) as FavoritesState;
    if (json) {
      return json.favorites.find((_drink) => _drink.idDrink === drink.idDrink);
    }
  }
  return undefined;
};

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor() {}

  addFavorite(drink: Cocktail): void {
    const storage = localStorage.getItem(favoritesStorageKey);
    const isPresent = getFavorite(drink);
    if (storage && isPresent) {
      const json = JSON.parse(storage) as FavoritesState;
      if (json) {
        json.favorites.push(drink);
        localStorage.setItem(favoritesStorageKey, JSON.stringify(json));
      }
    }
  }

  hasFavorite(drink: Cocktail): boolean {
    return getFavorite(drink) !== undefined;
  }

  removeFavorite(drink: Cocktail): boolean {
    const storage = localStorage.getItem(favoritesStorageKey);
    if (storage) {
    }

    return false;
  }
}

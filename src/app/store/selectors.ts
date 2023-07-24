import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { FavoritesState } from '../interfaces/favorites-state';

export const selectFavorites = (state: AppState) => state.favorites;
export const selectAllFavorites = createSelector(
  selectFavorites,
  (state: FavoritesState) => state.favorites
);

export const selectFilters = (state: AppState) => state.filters;

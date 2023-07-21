import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { FavoritesState } from '../favorites-state';

export const selectFavorites = (state: AppState) => state.favorites;
export const selectAllFavorites = createSelector(
  selectFavorites,
  (state: FavoritesState) => state.favorites
);

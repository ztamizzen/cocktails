import { createReducer, on } from '@ngrx/store';
import * as FavoriteActions from './actions';
import { Cocktail } from '../cocktail';
import { FavoritesState } from '../favorites-state';

export const initialState: FavoritesState = { favorites: [] };

export const favoriteReducer = createReducer(
  initialState,
  on(FavoriteActions.AddToFavorites, (state, value) => {
    state.favorites.push({ ...value.drink });
    return state;
  }),
  on(FavoriteActions.GetFavorites, (state) => state),
  on(FavoriteActions.LoadSuccess, (state) => state),
  on(FavoriteActions.RemoveFromFavorites, (state, value) => {
    const idx = state.favorites.indexOf(value.drink);
    if (idx) {
      state.favorites.splice(idx, 1);
    }
    return state;
  }),
  on(FavoriteActions.Reset, () => ({
    favorites: [],
  }))
);

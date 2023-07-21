import { createReducer, on } from '@ngrx/store';
import * as FavoriteActions from './actions';
import { FavoritesState } from '../favorites-state';
import { uniqueArray } from '../favorites.service';

export const initialState: FavoritesState = {
  favorites: [],
  error: null,
  status: 'pending',
};

export const favoriteReducer = createReducer(
  initialState,
  on(FavoriteActions.AddToFavorites, (state, value) => {
    const favorites = {
      favorites: uniqueArray([...state.favorites, value.drink]),
      error: null,
      status: 'success' as const,
    };
    return favorites;
  }),
  on(FavoriteActions.LoadFavorites, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(FavoriteActions.LoadSuccess, (state, { favorites }) => ({
    ...state,
    error: null,
    favorites: favorites || [], // it ended up NULL at some point
    status: 'success' as const,
  })),
  on(FavoriteActions.LoadFailure, (state, { error }) => ({
    ...state,
    error,
    favorites: [],
    status: 'error' as const,
  })),
  on(FavoriteActions.RemoveFromFavorites, (state, value) => {
    return {
      ...state,
      favorites: state.favorites.filter(
        (f) => f.idDrink !== value.drink.idDrink
      ),
    };
  }),
  on(FavoriteActions.Reset, () => ({
    favorites: [],
    error: null,
    status: 'success' as const,
  })),
  on(FavoriteActions.Save, (state) => state)
);

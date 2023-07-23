import { createReducer, on } from '@ngrx/store';
import * as FavoriteActions from './actions';
import { FavoritesState } from '../favorites-state';
import { uniqueArray } from '../favorites.service';
import { FilterState } from './app.state';

export enum Statuses {
  pending = 'pending',
  loading = 'loading',
  error = 'error',
  success = 'success',
}
export const initialState: FavoritesState = {
  favorites: [],
  error: null,
  status: Statuses.pending,
};

export const favoriteReducer = createReducer(
  initialState,
  on(FavoriteActions.AddToFavorites, (state, value) => {
    const favorites = {
      favorites: uniqueArray([...state.favorites, value.drink]), // make sure we have unique values
      error: null,
      status: Statuses.success,
    };
    return favorites;
  }),
  on(FavoriteActions.LoadFavorites, (state) => ({
    ...state,
    status: Statuses.loading,
  })),
  on(FavoriteActions.LoadSuccess, (state, { favorites }) => ({
    ...state,
    error: null,
    favorites: favorites || [], // it ended up NULL at some point
    status: Statuses.success,
  })),
  on(FavoriteActions.LoadFailure, (state, { error }) => ({
    ...state,
    error,
    favorites: [],
    status: Statuses.error,
  })),
  on(FavoriteActions.RemoveFromFavorites, (state, value) => {
    return {
      ...state,
      favorites: state.favorites.filter(
        (f) => f.idDrink !== value.drink.idDrink
      ),
      status: Statuses.success,
    };
  }),
  on(FavoriteActions.Reset, () => ({
    favorites: [],
    error: null,
    status: Statuses.success,
  })),
  on(FavoriteActions.Save, (state) => state)
);

export const initialFilterState: FilterState = {
  filter: undefined,
  selected: undefined,
};

export const filterReducer = createReducer(
  initialFilterState,
  // loads filters in storage (memory)
  on(FavoriteActions.LoadFilters, (state) => ({ ...state })),
  // clears the storage (memory)
  on(FavoriteActions.ClearFilters, (state) => ({
    ...state,
    filter: undefined,
    selected: undefined,
  })),
  // update filters, filter and selected can be undefined
  on(FavoriteActions.UpdateFilters, (state, { filter, selected }) => ({
    ...state,
    filter,
    selected,
  })),
  on(FavoriteActions.LoadedFilters, (state, { filter, selected }) => ({
    ...state,
    filter,
    selected,
  }))
);

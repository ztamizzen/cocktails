import { createAction, props } from '@ngrx/store';
import { Cocktail } from '../interfaces/cocktail';
import { FilterState } from './app.state';

/** === FAVORITES ACTIONS === **/
export enum ActionTypes {
  Add = '[Cocktail] Add to favorites',
  Remove = '[Cocktail] Remove from favorites',
  LoadFavorites = '[Cocktail] Load items from storage',
  LoadSuccess = '[Cocktail] Load success',
  LoadFailure = '[Cocktail] Load failure',
  Reset = '[Cocktail] Reset',
  Save = '[Cocktail] Save to storage',
}
export const AddToFavorites = createAction(
  ActionTypes.Add,
  props<{ drink: Cocktail }>()
);
export const LoadFavorites = createAction(ActionTypes.LoadFavorites);
export const RemoveFromFavorites = createAction(
  ActionTypes.Remove,
  props<{ drink: Cocktail }>()
);
export const LoadSuccess = createAction(
  ActionTypes.LoadSuccess,
  props<{ favorites: Cocktail[] }>()
);
export const LoadFailure = createAction(
  ActionTypes.LoadFailure,
  props<{ error: string }>()
);
export const Reset = createAction(ActionTypes.Reset);
export const Save = createAction(ActionTypes.Save);

/** === FILTER ACTIONS === **/
export enum FilterActions {
  Update = '[Filters] Update filters',
  Clear = '[Filters] Clear filters',
  Load = '[Filters] Load filters',
  Loaded = '[Filters] Loaded filters',
}
export const UpdateFilters = createAction(
  FilterActions.Update,
  props<FilterState>()
);
export const ClearFilters = createAction(FilterActions.Clear);
export const LoadFilters = createAction(FilterActions.Load);
export const LoadedFilters = createAction(
  FilterActions.Loaded,
  props<FilterState>()
);

import { createAction, props } from '@ngrx/store';
import { Cocktail } from '../cocktail';

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

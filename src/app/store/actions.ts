import { createAction, props } from '@ngrx/store';
import { Cocktail } from '../cocktail';

export enum ActionTypes {
  Add = '[Cocktail] Add to favorites',
  Remove = '[Cocktail] Remove from favorites',
  LoadItems = '[Cocktail] Load items from storage',
  LoadSuccess = '[Cocktail] Load success',
  Reset = '[Cocktail] Reset',
}

export const AddToFavorites = createAction(
  ActionTypes.Add,
  props<{ drink: Cocktail }>()
);
export const GetFavorites = createAction(ActionTypes.LoadItems);
export const RemoveFromFavorites = createAction(
  ActionTypes.Remove,
  props<{ drink: Cocktail }>()
);
export const LoadSuccess = createAction(ActionTypes.LoadSuccess);
export const Reset = createAction(ActionTypes.Reset);

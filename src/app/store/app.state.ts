import { FavoritesState } from '../favorites-state';
import { Filters } from '../filters';

export interface FilterState {
  filter?: Filters;
  selected?: string;
}

export interface AppState {
  favorites: FavoritesState;
  filters: FilterState;
}

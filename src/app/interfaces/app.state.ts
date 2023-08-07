import { FavoritesState } from './favorites-state';
import { Filters } from '../filters';
import { Pagination } from './pagination';

export interface FilterState {
  filter?: Filters;
  selected?: string;
}

// Same as Pagination interface but separation of meaning is sometimes a good thing
export interface PaginationState extends Pagination {}

export interface AppState {
  favorites: FavoritesState;
  filters: FilterState;
  pagination: PaginationState;
}

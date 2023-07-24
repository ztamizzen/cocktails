import { Cocktail } from './cocktail';

// export type FavoritesState = Record<'favorites', Cocktail[]>;

export interface FavoritesState {
  favorites: Array<Cocktail>;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export interface FavoritesOnlyState {
  favorites: Array<Cocktail>;
}

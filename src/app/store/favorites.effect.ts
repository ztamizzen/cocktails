import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import {
  map,
  exhaustMap,
  catchError,
  withLatestFrom,
  switchMap,
} from 'rxjs/operators';
import * as FavoriteActions from './actions';
import { FavoritesService } from '../favorites.service';
import { Store } from '@ngrx/store';

@Injectable()
export class FavoritesEffects {
  loadFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoriteActions.ActionTypes.LoadFavorites),
      exhaustMap(() =>
        from(this.favoritesService.loadFavorites()).pipe(
          map((favorites) => FavoriteActions.LoadSuccess({ favorites })),
          catchError((error) => of(FavoriteActions.LoadFailure(error)))
        )
      )
    );
  });

  save$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          FavoriteActions.ActionTypes.Add,
          FavoriteActions.ActionTypes.Remove
        ),
        withLatestFrom(this.store.select('favorites')),
        switchMap(([actions, favorites]) =>
          from(this.favoritesService.saveFavorites(favorites))
        )
      ),
    { dispatch: false }
  );

  reset$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FavoriteActions.ActionTypes.Reset),
        withLatestFrom(this.store.select('favorites')),
        switchMap(([actions, favorites]) => {
          console.log(actions, favorites);
          return from(this.favoritesService.resetFavorites());
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private favoritesService: FavoritesService,
    private store: Store<any>
  ) {}
}

import { Injectable } from '@angular/core';
import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from, of } from 'rxjs';
import {
  map,
  exhaustMap,
  catchError,
  withLatestFrom,
  switchMap,
} from 'rxjs/operators';
import * as FavoriteActions from './actions';
import { Store } from '@ngrx/store';
import { FilterService } from '../services/filter.service';

@Injectable()
export class FilterEffects {
  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoriteActions.FilterActions.Load),
      exhaustMap(() =>
        from(this.filterService.loadFilters()).pipe(
          map(({ filter, selected }) =>
            FavoriteActions.LoadedFilters({ filter, selected })
          ),
          catchError(() => EMPTY)
        )
      )
    );
  });

  save$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FavoriteActions.FilterActions.Update),
        withLatestFrom(this.store.select('filters')),
        switchMap(([_actions, { filter, selected }]) =>
          from(this.filterService.updateFilters({ filter, selected }))
        )
      ),
    { dispatch: false }
  );

  reset$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FavoriteActions.FilterActions.Clear),
        withLatestFrom(this.store.select('filters')),
        switchMap(([actions, { filter, selected }]) => {
          console.log('reset$', actions, filter, selected);
          return from(this.filterService.clearFilters());
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private filterService: FilterService,
    private store: Store<any>
  ) {}
}

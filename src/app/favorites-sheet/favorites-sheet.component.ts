import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { Cocktail } from '../interfaces/cocktail';
import { selectAllFavorites } from '../store/selectors';
import * as Actions from '../store/actions';

@Component({
  selector: 'app-favorites-sheet',
  templateUrl: './favorites-sheet.component.html',
  styleUrls: ['./favorites-sheet.component.scss'],
})
export class FavoritesSheetComponent {
  favorites$!: Observable<Cocktail[]>;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<FavoritesSheetComponent>,
    private _store: Store<any>
  ) {}

  ngOnInit() {
    this.favorites$ = this._store.select(selectAllFavorites);
  }

  clearFavorites() {
    this._store.dispatch(Actions.Reset());
    this._bottomSheetRef.dismiss();
  }
  close() {
    this._bottomSheetRef.dismiss();
  }
}

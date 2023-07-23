import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import * as FavoriteActions from './store/actions';
import { FavoritesSheetComponent } from './favorites-sheet/favorites-sheet.component';
import { selectAllFavorites } from './store/selectors';
import { Observable } from 'rxjs';
import { Cocktail } from './cocktail';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cocktails';
  favorites$!: Observable<Cocktail[]>;
  showFavoriteSheetIcon: boolean = false;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.store.dispatch(FavoriteActions.LoadFavorites());
    this.favorites$ = this.store.select(selectAllFavorites);
    this.favorites$.subscribe((favorites) => {
      this.showFavoriteSheetIcon = favorites.length > 0;
    });
  }

  openFavoritesSheet() {
    this._bottomSheet.open(FavoritesSheetComponent);
  }
}

import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Cocktail } from '../cocktail';
import {
  AddToFavorites,
  GetFavorites,
  LoadSuccess,
  RemoveFromFavorites,
  Reset,
} from '../store/actions';

@Component({
  selector: 'app-add-to-favorites',
  templateUrl: './add-to-favorites.component.html',
  styleUrls: ['./add-to-favorites.component.scss'],
})
export class AddToFavoritesComponent {
  @Input() drink?: Cocktail;
  favorites$!: Observable<Array<Cocktail>>;

  constructor(private store: Store<{ favorites: [] }>) {
    // TODO: Connect this.favorites$ to the current favorites state
    this.favorites$ = store.select('favorites');
    this.favorites$.subscribe((favs) => {
      console.log(favs);
      if (this.drink) {
        console.log(
          'isDrink',
          favs.find((d) => {
            return d.idDrink === this.drink?.idDrink;
          })
        );
      }
    });
  }

  addToFavorites() {
    // TODO: dispatch ActionTypes.Add, send in the @Input of Drink this.drink
    this.store.dispatch(AddToFavorites({ drink: this.drink as Cocktail }));
  }

  getFavorites() {
    // TODO: dispatch ActionTypes.LoadItems
    this.store.dispatch(GetFavorites());
  }

  removeFromFavorites() {
    // TODO: dispatch ActionTypes.Remove removes the @Input drink if it's in the list
    this.store.dispatch(RemoveFromFavorites({ drink: this.drink as Cocktail }));
  }

  load() {
    // TODO: dispatch ActionTypes.LoadSuccess
    this.store.dispatch(LoadSuccess());
  }

  reset() {
    // TODO: dispatch ActionTypes.Reset
    alert('Working on it');
    this.store.dispatch(Reset());
  }
}

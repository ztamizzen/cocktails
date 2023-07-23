import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Cocktail } from '../cocktail';
import { AddToFavorites, RemoveFromFavorites, Reset } from '../store/actions';
import { selectFavorites } from '../store/selectors';
import { FavoritesState } from '../favorites-state';

@Component({
  selector: 'app-add-to-favorites',
  templateUrl: './add-to-favorites.component.html',
  styleUrls: ['./add-to-favorites.component.scss'],
})
export class AddToFavoritesComponent implements OnInit {
  @Input() drink!: Cocktail;
  favorites$!: Observable<FavoritesState>;
  isFavorite = false;
  checkingStatus = false;

  constructor(private store: Store<any>) {
    this.favorites$ = store.select(selectFavorites);
    this.favorites$.subscribe((favorites: FavoritesState) => {
      if (favorites.status === 'loading') {
        this.checkingStatus = true;
      } else if (favorites.status === 'success') {
        this.checkingStatus = false;
        const found = favorites.favorites.find(
          (d) => this.drink?.idDrink === d.idDrink
        );
        this.isFavorite = found !== undefined;
      }
    });
  }

  ngOnInit() {}

  addToFavorites() {
    const drink: Cocktail = {
      idDrink: this.drink?.idDrink,
      strDrinkThumb: this.drink?.strDrinkThumb,
      strDrink: this.drink?.strDrink,
    };
    if (this.isFavorite) {
      this.store.dispatch(RemoveFromFavorites({ drink }));
    } else {
      this.store.dispatch(AddToFavorites({ drink }));
    }
  }
}

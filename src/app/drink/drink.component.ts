import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CocktailComplete } from '../cocktails.service';
import { AddToFavorites, RemoveFromFavorites } from '../store/actions';
import { Cocktail } from '../cocktail';
import { selectAllFavorites } from '../store/selectors';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss'],
})
export class DrinkComponent {
  @Input() drink: CocktailComplete | undefined;
  @Input() showBackButton: boolean = true;
  favorites$!: Observable<Array<Cocktail>>;
  isLiked: boolean = false;

  constructor(private _location: Location, private store: Store<any>) {}

  ngOnInit() {
    this.favorites$ = this.store.select(selectAllFavorites);
    this.favorites$.subscribe((favorites) => {
      const foundIt = favorites.find((d) => d.idDrink === this.drink?.idDrink);
      this.isLiked = foundIt !== undefined;
    });
  }

  goBack() {
    this._location.back();
  }
}

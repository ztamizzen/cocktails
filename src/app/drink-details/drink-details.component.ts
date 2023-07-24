import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  CocktailComplete,
  CocktailsService,
} from '../services/cocktails.service';
import { FavoritesState } from '../interfaces/favorites-state';

@Component({
  selector: 'app-drink-details',
  templateUrl: './drink-details.component.html',
  styleUrls: ['./drink-details.component.scss'],
})
export class DrinkDetailsComponent implements OnInit {
  drink: CocktailComplete | undefined;

  constructor(
    private route: ActivatedRoute,
    private cocktailsService: CocktailsService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const drinkIdFromRoute: string = routeParams.get('drinkId') as string;
    this.cocktailsService.getCocktail(drinkIdFromRoute).subscribe((drink) => {
      this.drink = drink;
    });
  }
}

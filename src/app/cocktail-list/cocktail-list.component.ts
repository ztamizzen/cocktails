import { Component, Input, SimpleChanges } from '@angular/core';
import {
  CocktailsService,
  type Cocktail,
  type CocktailResponse,
} from '../cocktails.service';

interface Drinks {
  drinks: Array<any>;
}

interface DrinkIsAlcoholicFilter {
  drinks: Array<Record<'strAlcoholic', string>>;
}

interface DrinkCategoriesFilter {
  drinks: Array<Record<'strCategory', string>>;
}

interface DrinkGlassesFilter {
  drinks: Array<Record<'strGlass', string>>;
}

interface DrinkIngredientFilter {
  drinks: Array<Record<'strIngredient1', string>>;
}

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss'],
})
export class CocktailListComponent {
  showDrink: boolean = false;

  selectedAlcoholicFilter: string = '';
  selectedCategoryFilter: string = '';
  selectedGlassFilter: string = '';
  selectedIngredientFilter: string = '';

  alcoholFilters?: DrinkIsAlcoholicFilter;
  categoryFilters?: DrinkCategoriesFilter;
  ingredientsFilters?: DrinkIngredientFilter;
  glassFilters?: DrinkGlassesFilter;
  randomCocktail?: Cocktail;

  constructor(private cocktailsService: CocktailsService) {}

  ngOnInit() {
    this.cocktailsService.listAlcoholFilters().subscribe((response) => {
      this.alcoholFilters = response;
    });
    this.cocktailsService.listCategoryFilters().subscribe((response) => {
      this.categoryFilters = response;
    });
    this.cocktailsService.listGlassFilters().subscribe((response) => {
      this.glassFilters = response;
    });
    this.cocktailsService.listIngredientFilters().subscribe((response) => {
      this.ingredientsFilters = response;
    });
    this.cocktailsService.getRandomCocktail().subscribe((response) => {
      let cocktail = response as CocktailResponse;
      let firstCocktail = cocktail.drinks[0];
      this.randomCocktail = {};
      for (let key in firstCocktail) {
        let e = new RegExp('^strIngredient(?<number>[0-9]*)$');
        let r = e.exec(key);
        if (r !== null && Number(r[1]) !== 0) {
          let number: number = Number(r[1]);
          let newKey = `strIngredient${number}`;
          let ingrKey = `strIngredient${number}`;
          let measureKey = `strMeasure${number}`;

          if (firstCocktail[ingrKey] !== null)
            this.randomCocktail[newKey] = `${
              firstCocktail[measureKey] ? firstCocktail[measureKey] : ''
            } ${firstCocktail[ingrKey]}`;
          console.log(number, firstCocktail[ingrKey]);
        } else {
          this.randomCocktail[key] = firstCocktail[key];
        }
      }
      console.log(this.randomCocktail);
    });
  }

  ngOnChanges(o: SimpleChanges) {
    console.log(o);
  }
}

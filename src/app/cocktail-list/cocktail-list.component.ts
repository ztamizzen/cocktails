import { Component, SimpleChanges } from '@angular/core';
import { CocktailsService, type CocktailComplete } from '../cocktails.service';
import { IngredientFilter } from '../ingredient-filter';
import { Cocktail } from '../cocktail';
import { AlcoholFilter } from '../alcohol-filter';
import { CategoryFilter } from '../category-filter';
import { GlassesFilter } from '../glasses-filter';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss'],
})
export class CocktailListComponent {
  showDrink: boolean = false;

  selectedCategoryFilter!: string;
  selectedIngredientFilter!: string;
  selectedAlcoholicFilter!: string;
  selectedGlassFilter!: string;

  alcoholFilters?: AlcoholFilter;
  categoryFilters?: CategoryFilter;
  ingredientsFilters?: IngredientFilter;
  glassFilters?: GlassesFilter;
  randomCocktail?: CocktailComplete;

  cocktailList: Cocktail[] = [];

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
      this.randomCocktail = response as CocktailComplete;
    });

    if (sessionStorage.getItem('selectedCategoryFilter')) {
      this.selectedCategoryFilter = sessionStorage.getItem(
        'selectedCategoryFilter'
      ) as string;
      this.categoryChanged(this.selectedCategoryFilter);
    }
    if (sessionStorage.getItem('selectedIngredientFilter')) {
      this.selectedIngredientFilter = sessionStorage.getItem(
        'selectedIngredientFilter'
      ) as string;
      this.ingredientChanged(this.selectedIngredientFilter);
    }
    if (sessionStorage.getItem('selectedAlcoholicFilter')) {
      this.selectedAlcoholicFilter = sessionStorage.getItem(
        'selectedAlcoholicFilter'
      ) as string;
      this.isAlcoholicChanged(this.selectedAlcoholicFilter);
    }
    if (sessionStorage.getItem('selectedGlassFilter')) {
      this.selectedGlassFilter = sessionStorage.getItem(
        'selectedGlassFilter'
      ) as string;
      this.glassChanged(this.selectedGlassFilter);
    }
  }

  ngOnChanges(o: SimpleChanges) {
    console.log('ngOnChanges', o);
  }

  categoryChanged(value: string) {
    if (value !== '')
      this.cocktailsService.filterByCategory(value).subscribe((response) => {
        console.log(response);
        this.cocktailList = response as Cocktail[];
      });
  }
  ingredientChanged(value: string) {
    if (value !== '')
      this.cocktailsService.filterByAlcohol(value).subscribe((response) => {
        console.log(response);
        this.cocktailList = response as Cocktail[];
      });
  }
  glassChanged(value: string) {
    if (value !== '')
      this.cocktailsService.filterByGlass(value).subscribe((response) => {
        console.log(response);
        this.cocktailList = response as Cocktail[];
      });
  }
  isAlcoholicChanged(value: string) {
    if (value !== '')
      this.cocktailsService.filterByAlcoholic(value).subscribe((response) => {
        console.log(response);
        this.cocktailList = response as Cocktail[];
      });
  }
}

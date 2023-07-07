import { Component, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CocktailsService, type CocktailComplete } from '../cocktails.service';
import { IngredientFilter } from '../ingredient-filter';
import { Cocktail } from '../cocktail';
import { AlcoholFilter } from '../alcohol-filter';
import { CategoryFilter } from '../category-filter';
import { GlassesFilter } from '../glasses-filter';
import { Pagination } from '../pagination';
import { DrinkListItem } from '../drink-list-item';
import { Filters } from '../filters';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss'],
})
export class CocktailListComponent {
  showDrink: boolean = false;
  currentSearchValue!: string;
  currentFilter!: Filters;

  selectedCategoryFilter!: string;
  selectedIngredientFilter!: string;
  selectedAlcoholicFilter!: string;
  selectedGlassFilter!: string;

  alcoholFilters?: AlcoholFilter;
  categoryFilters?: CategoryFilter;
  ingredientsFilters?: IngredientFilter;
  glassFilters?: GlassesFilter;
  randomCocktail?: CocktailComplete;

  cocktailList: DrinkListItem[] = [];
  pagination: Pagination = {
    pageSize: 10,
    length: 0,
    page: 0,
    pageIndex: 1,
    pageSizeOptions: [5, 10, 25, 100],
    disabled: false,
  };

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
    this.cocktailsService
      .getRandomCocktail()
      .subscribe((response: CocktailComplete) => {
        this.randomCocktail = response;
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

  paginationChanged(pageEvent: PageEvent) {
    // if pageSize is updated we reset everything, or do some math magic
    if (pageEvent.pageSize !== this.pagination.pageSize) {
      this.pagination.page = 0;
      this.pagination.previousPage = 0;
      this.pagination.pageIndex = 0;
    } else {
      this.pagination.page = pageEvent.pageIndex;
      this.pagination.previousPage = pageEvent.previousPageIndex as number;
      this.pagination.pageIndex = pageEvent.pageIndex;
    }
    this.pagination.pageSize = pageEvent.pageSize;
    this.search();
  }

  updatePagination(responseSize: number) {
    this.pagination.length = responseSize;
    if (responseSize < 10) {
      this.pagination.disabled = true;
    } else {
      this.pagination.disabled = false;
    }
  }

  resetPagination(size: number = 0) {
    this.pagination = {
      pageSize: 10,
      length: size,
      page: 0,
      pageIndex: 0,
      pageSizeOptions: [5, 10, 25, 100],
      disabled: false,
      previousPage: 0,
    };
  }

  search() {
    switch (this.currentFilter) {
      case Filters.category:
        this.categoryChanged(this.currentSearchValue);
        break;
      case Filters.ingredient:
        this.ingredientChanged(this.currentSearchValue);
        break;
      case Filters.glass:
        this.glassChanged(this.currentSearchValue);
        break;
      case Filters.alcohol:
        this.isAlcoholicChanged(this.currentSearchValue);
        break;
      default:
        void console.log('no action taken');
    }
  }

  paginateResponse(response: DrinkListItem[]) {
    return response.slice(
      this.pagination.page *
        Math.min(response.length, this.pagination.pageSize),
      Math.min(response.length, this.pagination.pageSize) *
        (this.pagination.page + 1)
    );
  }

  categoryChanged(value: string) {
    if (value) {
      this.currentSearchValue = value;
      this.currentFilter = Filters.category;
      this.cocktailsService
        .filterByCategory(value)
        .subscribe((response: DrinkListItem[]) => {
          this.updatePagination(response.length);
          this.cocktailList = this.paginateResponse(response);
        });
    }
  }

  ingredientChanged(value: string) {
    if (value) {
      this.currentSearchValue = value;
      this.currentFilter = Filters.ingredient;
      this.cocktailsService
        .filterByAlcohol(value)
        .subscribe((response: DrinkListItem[]) => {
          this.updatePagination(response.length);
          this.cocktailList = this.paginateResponse(response);
        });
    }
  }

  glassChanged(value: string) {
    if (value) {
      this.currentSearchValue = value;
      this.currentFilter = Filters.glass;
      this.cocktailsService
        .filterByGlass(value)
        .subscribe((response: DrinkListItem[]) => {
          this.updatePagination(response.length);
          this.cocktailList = this.paginateResponse(response);
        });
    }
  }

  isAlcoholicChanged(value: string) {
    if (value) {
      this.currentSearchValue = value;
      this.currentFilter = Filters.alcohol;
      this.cocktailsService
        .filterByAlcoholic(value)
        .subscribe((response: DrinkListItem[]) => {
          this.updatePagination(response.length);
          this.cocktailList = this.paginateResponse(response);
        });
    }
  }
}

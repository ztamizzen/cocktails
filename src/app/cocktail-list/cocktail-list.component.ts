import { Component, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CocktailsService, type CocktailComplete } from '../cocktails.service';
import { IngredientFilter } from '../ingredient-filter';
import { AlcoholFilter } from '../alcohol-filter';
import { CategoryFilter } from '../category-filter';
import { GlassesFilter } from '../glasses-filter';
import { Pagination } from '../pagination';
import { DrinkListItem } from '../drink-list-item';
import { Filters } from '../filters';
import { selectFavorites, selectFilters } from '../store/selectors';
import { FavoritesState } from '../favorites-state';
import { FilterState } from '../store/app.state';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss'],
})
export class CocktailListComponent {
  showDrink: boolean = false;
  currentSearchValue!: string;
  currentFilter!: Filters;
  sortByValue!: string;
  sortOrderValue: string = 'ascending';
  fullResponseList: DrinkListItem[] = [];
  paginationUpdated: boolean = false;

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

  favorites$: Observable<FavoritesState> = this.store.select(selectFavorites);
  filters$: Observable<FilterState> = this.store.select(selectFilters);

  constructor(
    private cocktailsService: CocktailsService,
    private store: Store<any>
  ) {}

  /**
   * TODO:
   * the filter part needs a rewrite since using NGRX made most of it redundant.
   * I don't need to send stuff up and down to the filter component anymore.
   */
  ngOnInit() {
    // when the filters are updated this will handle the logic
    this.filters$.subscribe(({ filter, selected }) => {
      console.log('filters$ >>', filter, selected);
      if (filter && selected) {
        switch (filter) {
          case Filters.category:
            console.log(filter, selected);
            this.categoryChanged(selected);
            break;
          case Filters.ingredient:
            console.log(filter, selected);
            this.ingredientChanged(selected);
            break;
          case Filters.glass:
            console.log(filter, selected);
            this.glassChanged(selected);
            break;
          case Filters.alcohol:
            console.log(filter, selected);
            this.isAlcoholicChanged(selected);
            break;
        }
      }
    });

    // load filters
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
  }

  resetList() {
    this.fullResponseList = this.cocktailList = [];
    this.updatePagination(0);
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
    this.paginationUpdated = true;
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
      if (this.paginationUpdated) {
        this.updatePagination(this.fullResponseList.length);
        this.cocktailList = this.paginateResponse(this.fullResponseList);
        this.paginationUpdated = false;
      } else {
        this.currentSearchValue = value;
        this.currentFilter = Filters.category;
        this.cocktailsService
          .filterByCategory(value)
          .subscribe((response: DrinkListItem[]) => {
            this.fullResponseList = response;
            this.updatePagination(this.fullResponseList.length);
            this.cocktailList = this.paginateResponse(this.fullResponseList);
          });
      }
    }
  }

  ingredientChanged(value: string) {
    if (value) {
      if (this.paginationUpdated) {
        this.updatePagination(this.fullResponseList.length);
        this.cocktailList = this.paginateResponse(this.fullResponseList);
        this.paginationUpdated = false;
      } else {
        this.currentSearchValue = value;
        this.currentFilter = Filters.ingredient;
        this.cocktailsService
          .filterByAlcohol(value)
          .subscribe((response: DrinkListItem[]) => {
            this.fullResponseList = response;
            this.updatePagination(this.fullResponseList.length);
            this.cocktailList = this.paginateResponse(this.fullResponseList);
          });
      }
    }
  }

  glassChanged(value: string) {
    if (value) {
      if (this.paginationUpdated) {
        this.updatePagination(this.fullResponseList.length);
        this.cocktailList = this.paginateResponse(this.fullResponseList);
        this.paginationUpdated = false;
      } else {
        this.currentSearchValue = value;
        this.currentFilter = Filters.glass;
        this.cocktailsService
          .filterByGlass(value)
          .subscribe((response: DrinkListItem[]) => {
            this.fullResponseList = response;
            this.updatePagination(this.fullResponseList.length);
            this.cocktailList = this.paginateResponse(this.fullResponseList);
          });
      }
    }
  }

  isAlcoholicChanged(value: string) {
    if (value) {
      if (this.paginationUpdated) {
        this.updatePagination(this.fullResponseList.length);
        this.cocktailList = this.paginateResponse(this.fullResponseList);
        this.paginationUpdated = false;
      } else {
        this.currentSearchValue = value;
        this.currentFilter = Filters.alcohol;
        this.cocktailsService
          .filterByAlcoholic(value)
          .subscribe((response: DrinkListItem[]) => {
            this.fullResponseList = response;
            this.updatePagination(this.fullResponseList.length);
            this.cocktailList = this.paginateResponse(this.fullResponseList);
          });
      }
    }
  }

  sortBy(change: MatButtonToggleChange) {
    console.log(change, this.sortByValue);
  }

  sortOrder(change: MatButtonToggleChange) {
    console.log(change, this.sortOrderValue);
  }
}

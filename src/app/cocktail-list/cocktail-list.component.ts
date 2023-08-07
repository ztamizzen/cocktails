import { Component, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CocktailsService } from '../services/cocktails.service';
import { IngredientFilter } from '../interfaces/ingredient-filter';
import { AlcoholFilter } from '../interfaces/alcohol-filter';
import { CategoryFilter } from '../interfaces/category-filter';
import { GlassesFilter } from '../interfaces/glasses-filter';
import { Pagination } from '../interfaces/pagination';
import { DrinkListItem } from '../interfaces/drink-list-item';
import { Filters } from '../filters';
import { selectFavorites, selectFilters } from '../store/selectors';
import { FavoritesState } from '../interfaces/favorites-state';
import { FilterState } from '../interfaces/app.state';
import { FullCocktail } from '../interfaces/full-cocktail';

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
  randomCocktail?: FullCocktail;

  cocktailList: DrinkListItem[] = [];
  pageSize: number = 10;
  pageIndex: number = 0;
  pageSizeOptions: Array<number> = [5, 10, 25, 100];
  paginationDisabled: boolean = false;

  favorites$: Observable<FavoritesState> = this.store.select(selectFavorites);
  filters$: Observable<FilterState> = this.store.select(selectFilters);

  constructor(
    private cocktailsService: CocktailsService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    // when the filters are updated this will handle the logic
    this.filters$.subscribe(({ filter, selected }) => {
      if (filter && selected) {
        switch (filter) {
          case Filters.category:
            this.categoryChanged(selected);
            break;
          case Filters.ingredient:
            this.ingredientChanged(selected);
            break;
          case Filters.glass:
            this.glassChanged(selected);
            break;
          case Filters.alcohol:
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

    this.reloadRandomCocktail();
  }

  reloadRandomCocktail() {
    this.cocktailsService
      .getRandomCocktail()
      .subscribe((response: FullCocktail) => {
        this.randomCocktail = response;
      });
  }

  resetList() {
    this.fullResponseList = this.cocktailList = [];
    this.updatePagination(0);
  }

  paginationChanged(pageEvent: PageEvent) {
    console.log(pageEvent, this.pageIndex);
    if (pageEvent.pageSize !== this.pageSize) {
      this.pageIndex = 0;
    } else {
      this.pageIndex = pageEvent.pageIndex;
    }
    this.pageSize = pageEvent.pageSize;
    this.paginationUpdated = true;
    this.search();
  }

  updatePagination(responseSize: number) {
    if (responseSize < 10) {
      this.paginationDisabled = true;
      this.pageIndex = 0;
    } else {
      this.paginationDisabled = false;
    }
  }

  resetPagination() {
    this.paginationDisabled = false;
    this.pageIndex = 0;
    this.pageSizeOptions = [5, 10, 25, 100];
    this.pageSize = 10;
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
      this.pageIndex * Math.min(response.length, this.pageSize),
      Math.min(response.length, this.pageSize) * (this.pageIndex + 1)
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

import { Component, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  Observable,
  distinctUntilChanged,
  map,
  of,
  pairwise,
  pluck,
  startWith,
  switchMap,
} from 'rxjs';
import { CocktailsService } from '../cocktails.service';
import { CategoryFilter } from '../category-filter';
import { IngredientFilter } from '../ingredient-filter';
import { AlcoholFilter } from '../alcohol-filter';
import { GlassesFilter } from '../glasses-filter';
import { Store } from '@ngrx/store';
import { selectFilters } from '../store/selectors';
import { FilterState } from '../store/app.state';
import { ClearFilters, UpdateFilters } from '../store/actions';
import { Filters } from '../filters';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  @Output() categoryChanged = new EventEmitter<string>();
  @Output() ingredientChanged = new EventEmitter<string>();
  @Output() glassChanged = new EventEmitter<string>();
  @Output() isAlcoholicChanged = new EventEmitter<string>();
  @Output() resetList = new EventEmitter();

  categoryFilters?: CategoryFilter;
  ingredientsFilters?: IngredientFilter;
  alcoholFilters?: AlcoholFilter;
  glassFilters?: GlassesFilter;

  filterForm!: FormGroup;
  filters$: Observable<FilterState> = this.store.select(selectFilters);

  constructor(
    private formBuilder: FormBuilder,
    private cocktailsService: CocktailsService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      category: '',
      ingredient: '',
      glass: '',
      isAlcoholic: '',
    });
    this.cocktailsService.listCategoryFilters().subscribe((response) => {
      this.categoryFilters = response;
      this.categoryFilters?.drinks.sort((a, b) =>
        a.strCategory.localeCompare(b.strCategory)
      );
    });
    this.cocktailsService
      .listIngredientFilters()
      .subscribe((response: IngredientFilter) => {
        this.ingredientsFilters = response;
        this.ingredientsFilters.drinks.sort((a, b) =>
          a.strIngredient1.localeCompare(b.strIngredient1)
        );
      });
    this.cocktailsService.listGlassFilters().subscribe((response) => {
      this.glassFilters = response;
      this.glassFilters?.drinks.sort((a, b) =>
        a.strGlass.localeCompare(b.strGlass)
      );
    });
    this.cocktailsService.listAlcoholFilters().subscribe((response) => {
      this.alcoholFilters = response;
      this.alcoholFilters?.drinks.sort((a, b) =>
        a.strAlcoholic.localeCompare(b.strAlcoholic)
      );
    });

    this.filterForm.get('category')?.valueChanges.subscribe((value) => {
      this.dispatchAction(Filters.category, value as string);
      this.categoryChanged.emit(value as string);
      this.resetFields({ ingredient: '', alcoholic: '', glass: '' });
    });

    this.filterForm.get('ingredient')?.valueChanges.subscribe((value) => {
      this.dispatchAction(Filters.ingredient, value as string);
      this.ingredientChanged.emit(value as string);
      this.resetFields({ category: '', alcoholic: '', glass: '' });
    });

    this.filterForm.get('glass')?.valueChanges.subscribe((value) => {
      this.dispatchAction(Filters.glass, value as string);
      this.glassChanged.emit(value as string);
      this.resetFields({ category: '', ingredient: '', alcoholic: '' });
    });

    this.filterForm.get('isAlcoholic')?.valueChanges.subscribe((value) => {
      this.dispatchAction(Filters.alcohol, value as string);
      this.isAlcoholicChanged.emit(value as string);
      this.resetFields({ category: '', ingredient: '', glass: '' });
    });

    this.filters$.subscribe((f) => {
      this.filterForm
        .get(f.filter as string)
        ?.setValue(f.selected, { emitEvent: false });
    });
  }

  dispatchAction(filter: Filters, selected: string) {
    if (filter && selected) {
      this.store.dispatch(UpdateFilters({ filter, selected }));
    }
  }

  resetFields(others: Record<string, string>) {
    this.filterForm.patchValue(others, { emitEvent: false });
  }

  reset() {
    this.store.dispatch(ClearFilters());
    this.filterForm?.reset();
    this.resetList.emit();
  }
}

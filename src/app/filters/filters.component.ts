import {
  Component,
  SimpleChanges,
  Output,
  Input,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CocktailsService } from '../cocktails.service';
import { CategoryFilter } from '../category-filter';
import { IngredientFilter } from '../ingredient-filter';
import { AlcoholFilter } from '../alcohol-filter';
import { GlassesFilter } from '../glasses-filter';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  @Input() category!: string;
  @Input() ingredient!: string;
  @Input() glass!: string;
  @Input() alcoholic!: string;

  @Output() categoryChanged = new EventEmitter<string>();
  @Output() ingredientChanged = new EventEmitter<string>();
  @Output() glassChanged = new EventEmitter<string>();
  @Output() isAlcoholicChanged = new EventEmitter<string>();

  categoryFilters?: CategoryFilter;
  ingredientsFilters?: IngredientFilter;
  alcoholFilters?: AlcoholFilter;
  glassFilters?: GlassesFilter;

  filterForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cocktailsService: CocktailsService
  ) {}

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      category: this.category || '',
      ingredient: this.ingredient || '',
      glass: this.glass || '',
      isAlcoholic: this.alcoholic || '',
    });
    this.cocktailsService.listCategoryFilters().subscribe((response) => {
      this.categoryFilters = response;
    });
    this.cocktailsService.listIngredientFilters().subscribe((response) => {
      this.ingredientsFilters = response;
    });
    this.cocktailsService.listGlassFilters().subscribe((response) => {
      this.glassFilters = response;
    });
    this.cocktailsService.listAlcoholFilters().subscribe((response) => {
      this.alcoholFilters = response;
    });

    this.filterForm.get('category')?.valueChanges.subscribe((value) => {
      this.category = value as string;
      this.categoryChanged.emit(value as string);
      this.updateSessionStorage('selectedCategoryFilter', value as string);
      this.resetFields({ ingredient: '', alcoholic: '', glass: '' });
    });
    this.filterForm.get('ingredient')?.valueChanges.subscribe((value) => {
      this.ingredient = value as string;
      this.ingredientChanged.emit(value as string);
      this.updateSessionStorage('selectedIngredientFilter', value as string);
      this.resetFields({ category: '', alcoholic: '', glass: '' });
    });
    this.filterForm.get('glass')?.valueChanges.subscribe((value) => {
      this.glass = value as string;
      this.glassChanged.emit(value as string);
      this.updateSessionStorage('selectedGlassFilter', value as string);
      this.resetFields({ category: '', ingredient: '', alcoholic: '' });
    });
    this.filterForm.get('isAlcoholic')?.valueChanges.subscribe((value) => {
      this.alcoholic = value as string;
      this.isAlcoholicChanged.emit(value as string);
      this.updateSessionStorage('selectedAlcoholicFilter', value as string);
      this.resetFields({ category: '', ingredient: '', glass: '' });
    });
  }

  updateSessionStorage(key?: string, value?: string) {
    sessionStorage.clear();
    if (key && value) sessionStorage.setItem(key, value);
  }

  resetFields(others: Record<string, string>) {
    this.filterForm.patchValue(others, { emitEvent: false });
  }

  reset(): void {
    this.updateSessionStorage();
    this.filterForm?.reset();
  }
}

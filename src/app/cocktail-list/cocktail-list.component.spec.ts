import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailListComponent } from './cocktail-list.component';
import { CocktailsService } from '../services/cocktails.service';
import { Store } from '@ngrx/store';

describe('CocktailListComponent', () => {
  let component: CocktailListComponent;
  let fixture: ComponentFixture<CocktailListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CocktailListComponent],
      providers: [CocktailsService, Store],
    });
    fixture = TestBed.createComponent(CocktailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

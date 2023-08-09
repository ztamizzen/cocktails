import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import { CocktailsService } from '../services/cocktails.service';
import { Store } from '@ngrx/store';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltersComponent],
      providers: [CocktailsService, FormBuilder, Store, HttpClient],
    });
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

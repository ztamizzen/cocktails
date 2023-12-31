import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToFavoritesComponent } from './add-to-favorites.component';
import { Store } from '@ngrx/store';

describe('AddToFavoritesComponent', () => {
  let component: AddToFavoritesComponent;
  let fixture: ComponentFixture<AddToFavoritesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddToFavoritesComponent],
      providers: [Store],
    });
    fixture = TestBed.createComponent(AddToFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

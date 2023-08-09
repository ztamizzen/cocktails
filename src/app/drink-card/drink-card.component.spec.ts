import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkCardComponent } from './drink-card.component';
import { AddToFavoritesComponent } from '../add-to-favorites/add-to-favorites.component';

describe('DrinkCardComponent', () => {
  let component: DrinkCardComponent;
  let fixture: ComponentFixture<DrinkCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrinkCardComponent],
      imports: [AddToFavoritesComponent],
    });
    fixture = TestBed.createComponent(DrinkCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

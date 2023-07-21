import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesSheetComponent } from './favorites-sheet.component';

describe('FavoritesSheetComponent', () => {
  let component: FavoritesSheetComponent;
  let fixture: ComponentFixture<FavoritesSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesSheetComponent]
    });
    fixture = TestBed.createComponent(FavoritesSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

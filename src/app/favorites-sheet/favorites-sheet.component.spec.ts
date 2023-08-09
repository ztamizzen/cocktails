import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesSheetComponent } from './favorites-sheet.component';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';

describe('FavoritesSheetComponent', () => {
  let component: FavoritesSheetComponent;
  let fixture: ComponentFixture<FavoritesSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesSheetComponent],
      providers: [MatBottomSheetRef, Store],
    });
    fixture = TestBed.createComponent(FavoritesSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

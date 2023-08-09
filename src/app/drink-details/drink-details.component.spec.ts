import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkDetailsComponent } from './drink-details.component';
import { ActivatedRoute } from '@angular/router';

describe('DrinkDetailsComponent', () => {
  let component: DrinkDetailsComponent;
  let fixture: ComponentFixture<DrinkDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrinkDetailsComponent],
      providers: [ActivatedRoute],
    });
    fixture = TestBed.createComponent(DrinkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

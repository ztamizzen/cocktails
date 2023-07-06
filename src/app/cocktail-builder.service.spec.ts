import { TestBed } from '@angular/core/testing';

import { CocktailBuilderService } from './cocktail-builder.service';

describe('CocktailBuilderService', () => {
  let service: CocktailBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CocktailBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

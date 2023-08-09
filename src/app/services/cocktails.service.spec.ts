import { TestBed } from '@angular/core/testing';

import { CocktailsService } from './cocktails.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CocktailBuilderService } from './cocktail-builder.service';

describe('CocktailsService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: CocktailsService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        CocktailBuilderService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    service = TestBed.inject(CocktailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

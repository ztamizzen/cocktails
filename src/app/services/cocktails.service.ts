import { Injectable } from '@angular/core';
import { Observable, throwError, map } from 'rxjs';
// import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpContextToken,
  HttpContext,
} from '@angular/common/http';
import { CocktailBuilderService } from './cocktail-builder.service';
import { DrinkListItem } from '../interfaces/drink-list-item';
import { FullCocktail } from '../interfaces/full-cocktail';

export const SKIP_CACHE = new HttpContextToken(() => true);

export interface CocktailResponse {
  drinks: Array<FullCocktail>;
}
export interface DrinksListResponse {
  drinks: Array<DrinkListItem>;
}

@Injectable({
  providedIn: 'root',
})
export class CocktailsService {
  apiUrl: string = 'https://www.thecocktaildb.com/api/json/v1/1';
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
  constructor(
    private http: HttpClient,
    private cocktailBuilder: CocktailBuilderService
  ) {}

  searchByName(searchString: string): Observable<any> {
    let API_URL = `${this.apiUrl}/search.php?s=${searchString}`;
    return this.http.get(API_URL);
  }

  listCategoryFilters(): Observable<any> {
    let API_URL = `${this.apiUrl}/list.php?c=list`;
    return this.http.get(API_URL);
  }

  listGlassFilters(): Observable<any> {
    let API_URL = `${this.apiUrl}/list.php?g=list`;
    return this.http.get(API_URL);
  }

  listIngredientFilters(): Observable<any> {
    let API_URL = `${this.apiUrl}/list.php?i=list`;
    return this.http.get(API_URL);
  }

  listAlcoholFilters(): Observable<any> {
    let API_URL = `${this.apiUrl}/list.php?a=list`;
    return this.http.get(API_URL);
  }

  filterByCategory(category: string): Observable<any> {
    let API_URL = `${this.apiUrl}/filter.php?c=${category}`;
    return this.http
      .get<DrinksListResponse>(API_URL)
      .pipe(map((response) => response.drinks));
  }

  filterByGlass(glass: string): Observable<any> {
    let API_URL = `${this.apiUrl}/filter.php?g=${glass}`;
    return this.http
      .get<DrinksListResponse>(API_URL)
      .pipe(map((response) => response.drinks));
  }

  filterByAlcohol(alcohol: string): Observable<any> {
    let API_URL = `${this.apiUrl}/filter.php?i=${alcohol}`;
    return this.http
      .get<DrinksListResponse>(API_URL)
      .pipe(map((response) => response.drinks));
  }

  filterByAlcoholic(alcoholic: string): Observable<any> {
    let API_URL = `${this.apiUrl}/filter.php?a=${alcoholic}`;
    return this.http
      .get<DrinksListResponse>(API_URL)
      .pipe(map((response) => response.drinks));
  }

  getRandomCocktail() {
    let API_URL = `${this.apiUrl}/random.php`;
    return this.http
      .get<CocktailResponse>(API_URL, {
        context: new HttpContext().set(SKIP_CACHE, true),
      })
      .pipe(
        map((response) => {
          return this.cocktailBuilder.mapIngredientsAndMeasurements(
            response.drinks[0]
          );
        })
      );
  }

  getCocktail(id: string): Observable<FullCocktail> {
    let API_URL = `${this.apiUrl}/lookup.php?i=${id}`;
    return this.http.get<CocktailResponse>(API_URL).pipe(
      map((response) => {
        return this.cocktailBuilder.mapIngredientsAndMeasurements(
          response.drinks[0]
        );
      })
    );
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => errorMessage);
  }
}

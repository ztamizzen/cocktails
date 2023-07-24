import { Injectable } from '@angular/core';
import { Observable, throwError, map } from 'rxjs';
// import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { CocktailBuilderService } from './cocktail-builder.service';
import { DrinkListItem } from '../interfaces/drink-list-item';

export interface CocktailComplete {
  [key: string]: string | undefined;
  idDrink?: string;
  strDrink?: string;
  strDrinkAlternate?: string;
  strTags?: string;
  strVideo?: string;
  strCategory?: string;
  strIBA?: string;
  strAlcoholic?: 'Alcoholic' | 'Non alcoholic' | 'Optional alcohol';
  strGlass?: string;
  strInstructions?: string;
  strInstructionsES?: string;
  strInstructionsDE?: string;
  strInstructionsFR?: string;
  strInstructionsIT?: string;
  'strInstructionsZH-HANS'?: string;
  'strInstructionsZH-HANT'?: string;
  strDrinkThumb?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strImageSource?: string;
  strImageAttribution?: string;
  strCreativeCommonsConfirmed?: string;
  dateModified?: string;
}

export interface CocktailResponse {
  drinks: Array<CocktailComplete>;
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
    return this.http.get<CocktailResponse>(API_URL).pipe(
      map((response) => {
        return this.cocktailBuilder.mapIngredientsAndMeasurements(
          response.drinks[0]
        );
      })
    );
  }

  getCocktail(id: string): Observable<CocktailComplete> {
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

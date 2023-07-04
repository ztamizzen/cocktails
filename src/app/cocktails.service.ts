import { Injectable } from '@angular/core';
import { Observable, throwError, map } from 'rxjs';
// import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

export interface Cocktail {
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
  drinks: Array<Cocktail>;
}

@Injectable({
  providedIn: 'root',
})
export class CocktailsService {
  apiUrl: string = 'https://www.thecocktaildb.com/api/json/v1/1';
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
  constructor(private http: HttpClient) {}

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
    return this.http.get(API_URL);
  }

  filterByGlass(glass: string): Observable<any> {
    let API_URL = `${this.apiUrl}/filter.php?g=${glass}`;
    return this.http.get(API_URL);
  }

  filterByAlcohol(alcohol: string): Observable<any> {
    let API_URL = `${this.apiUrl}/filter.php?i=${alcohol}`;
    return this.http.get(API_URL);
  }

  filterByAlcoholic(alcoholic: boolean): Observable<any> {
    let API_URL = `${this.apiUrl}/filter.php?a=${
      alcoholic ? 'Alcoholic' : 'Non_Alcoholic'
    }`;
    return this.http.get(API_URL);
  }

  getRandomCocktail() {
    let API_URL = `${this.apiUrl}/random.php`;
    return this.http.get(API_URL);
  }

  getCocktail(id: number): Observable<CocktailResponse> {
    let API_URL = `${this.apiUrl}/lookup.php?i=${id}`;
    return this.http
      .get<CocktailResponse>(API_URL)
      .pipe((response) => response);
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

/*
{
    "idDrink": "178310",
    "strDrink": "Brooklyn",
    "strDrinkAlternate": null,
    "strTags": "Alcoholic,Sweet,DateNight,USA",
    "strVideo": null,
    "strCategory": "Cocktail",
    "strIBA": null,
    "strAlcoholic": "Alcoholic",
    "strGlass": "Cocktail glass",
    "strInstructions": "Combine ingredients with ice and stir until well-chilled. Strain into a chilled cocktail glass.",
    "strInstructionsES": null,
    "strInstructionsDE": null,
    "strInstructionsFR": null,
    "strInstructionsIT": "Unisci gli ingredienti con il ghiaccio e mescola finché non si saranno raffreddati. Filtrare in una coppetta da cocktail ghiacciata.",
    "strInstructionsZH-HANS": null,
    "strInstructionsZH-HANT": null,
    "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/ojsezf1582477277.jpg",
    "strIngredient1": "Rye Whiskey",
    "strIngredient2": "Dry Vermouth",
    "strIngredient3": "Maraschino Liqueur",
    "strIngredient4": "Angostura Bitters",
    "strIngredient5": "Maraschino Cherry",
    "strIngredient6": null,
    "strIngredient7": null,
    "strIngredient8": null,
    "strIngredient9": null,
    "strIngredient10": null,
    "strIngredient11": null,
    "strIngredient12": null,
    "strIngredient13": null,
    "strIngredient14": null,
    "strIngredient15": null,
    "strMeasure1": "2 oz",
    "strMeasure2": "1 oz",
    "strMeasure3": "1/4 oz",
    "strMeasure4": "3 dashes",
    "strMeasure5": "1",
    "strMeasure6": null,
    "strMeasure7": null,
    "strMeasure8": null,
    "strMeasure9": null,
    "strMeasure10": null,
    "strMeasure11": null,
    "strMeasure12": null,
    "strMeasure13": null,
    "strMeasure14": null,
    "strMeasure15": null,
    "strImageSource": null,
    "strImageAttribution": null,
    "strCreativeCommonsConfirmed": "Yes",
    "dateModified": null
}
*/

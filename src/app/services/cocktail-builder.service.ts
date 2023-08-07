import { Injectable } from '@angular/core';
import { FullCocktail } from '../interfaces/full-cocktail';

@Injectable({
  providedIn: 'root',
})
export class CocktailBuilderService {
  constructor() {}

  mapIngredientsAndMeasurements(drink: FullCocktail) {
    let cocktail: FullCocktail = {};
    for (let key in drink) {
      let e = new RegExp('^strIngredient(?<number>[0-9]*)$');
      let r = e.exec(key);
      // the regexp returned a value, the "number" is not 0 and the value of the key is not null
      if (r !== null && Number(r[1]) !== 0 && drink[key] !== null) {
        let number: number = Number(r[1]);
        let measureKey = `strMeasure${number}`;
        cocktail[key] = `${
          drink[measureKey] ? drink[measureKey]?.trim() : ''
        } ${drink[key]?.trim()}`;
      } else {
        cocktail[key] = drink[key];
      }
    }
    return cocktail;
  }
}

import { Component } from '@angular/core';
import { Cocktail } from '../cocktails.service';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss'],
})
export class DrinkComponent {
  drink?: Cocktail;
}

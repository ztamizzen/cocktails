import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { CocktailComplete } from '../cocktails.service';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss'],
})
export class DrinkComponent {
  @Input() drink: CocktailComplete | undefined;
  @Input() showBackButton: boolean = true;
  constructor(private _location: Location) {}
  goBack() {
    this._location.back();
  }
}

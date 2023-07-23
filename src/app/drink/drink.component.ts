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
  @Input() standalone?: boolean = false;

  constructor(private _location: Location) {}

  ngOnInit() {}

  goBack() {
    this._location.back();
  }
}

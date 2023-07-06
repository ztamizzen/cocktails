import { Component, Input } from '@angular/core';
import { Cocktail } from '../cocktail';

@Component({
  selector: 'app-drink-card',
  templateUrl: './drink-card.component.html',
  styleUrls: ['./drink-card.component.scss'],
})
export class DrinkCardComponent {
  @Input() drink!: Cocktail;

  alert() {
    window.alert('Not implemented yet');
  }
}

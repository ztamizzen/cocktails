import { Component, OnInit } from '@angular/core';
import { CocktailComplete, CocktailsService } from '../cocktails.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-drink-details',
  templateUrl: './drink-details.component.html',
  styleUrls: ['./drink-details.component.scss'],
})
export class DrinkDetailsComponent implements OnInit {
  drink: CocktailComplete | undefined;
  constructor(
    private route: ActivatedRoute,
    private cocktailsService: CocktailsService
  ) {}
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const drinkIdFromRoute: string = routeParams.get('drinkId') as string;
    this.cocktailsService
      .getCocktail(drinkIdFromRoute)
      .subscribe((response) => {
        this.drink = response;
        console.log(this.drink);
      });
  }
}

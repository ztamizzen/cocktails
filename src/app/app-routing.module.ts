import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocktailListComponent } from './cocktail-list/cocktail-list.component';
import { DrinkDetailsComponent } from './drink-details/drink-details.component';

const routes: Routes = [
  { path: '', component: CocktailListComponent },
  { path: 'drink/:drinkId', component: DrinkDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

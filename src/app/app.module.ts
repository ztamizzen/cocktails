import { NgModule } from '@angular/core';
import { NgFor } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { StoreModule } from '@ngrx/store';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CocktailListComponent } from './cocktail-list/cocktail-list.component';
import { CocktailsService } from './services/cocktails.service';
import { DrinkComponent } from './drink/drink.component';
import { DrinkDetailsComponent } from './drink-details/drink-details.component';
import { CachingInterceptor } from './http-interceptors/caching.interceptor';
import { FiltersComponent } from './filters/filters.component';
import { DrinkCardComponent } from './drink-card/drink-card.component';
import { favoriteReducer, filterReducer } from './store/reducers';
import { AddToFavoritesComponent } from './add-to-favorites/add-to-favorites.component';
import { EffectsModule } from '@ngrx/effects';
import { FavoritesEffects } from './store/favorites.effect';
import { FilterEffects } from './store/filters.effect';
import { FavoritesSheetComponent } from './favorites-sheet/favorites-sheet.component';
import { metaReducers } from './store/debug-reducer';

@NgModule({
  declarations: [
    AppComponent,
    CocktailListComponent,
    DrinkComponent,
    DrinkDetailsComponent,
    FiltersComponent,
    DrinkCardComponent,
    AddToFavoritesComponent,
    FavoritesSheetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    NgFor,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatBottomSheetModule,
    StoreModule.forRoot(
      { favorites: favoriteReducer, filters: filterReducer },
      { metaReducers }
    ),
    EffectsModule.forRoot(FavoritesEffects, FilterEffects),
    IonicStorageModule.forRoot(),
  ],
  providers: [
    CocktailsService,
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

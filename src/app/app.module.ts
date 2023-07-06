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
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CocktailListComponent } from './cocktail-list/cocktail-list.component';
import { CocktailsService } from './cocktails.service';
import { DrinkComponent } from './drink/drink.component';
import { DrinkDetailsComponent } from './drink-details/drink-details.component';
import { CachingInterceptor } from './caching.interceptor';
import { FiltersComponent } from './filters/filters.component';
import { DrinkCardComponent } from './drink-card/drink-card.component';

@NgModule({
  declarations: [
    AppComponent,
    CocktailListComponent,
    DrinkComponent,
    DrinkDetailsComponent,
    FiltersComponent,
    DrinkCardComponent,
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
  ],
  providers: [
    CocktailsService,
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

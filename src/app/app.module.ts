import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DetailsComponent } from './components/details/details.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from './components/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { RatingComponent } from './shared/components/rating/rating.component';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { GenreCardComponent } from './shared/components/genre-card/genre-card.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    HeaderComponent,
    DetailsComponent,
    FooterComponent,
    HomeComponent,
    CardComponent,
    RatingComponent,
    InfoCardComponent,
    GenreCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

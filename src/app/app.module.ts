import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {PokedexModule} from "./pages/pokedex/pokedex.module";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [AppComponent],
  imports: [PokedexModule, AppRoutingModule, BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}

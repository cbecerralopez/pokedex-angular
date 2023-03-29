import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {PokemonListComponent} from "./components/pokemon-list/pokemon-list.component";
import {PaginationComponent} from "./components/pagination/pagination.component";
import {PokedexComponent} from "./pokedex.component";

@NgModule({
  declarations: [PokedexComponent, PokemonListComponent, PaginationComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  exports: [PokedexComponent],
  providers: [],
})
export class PokedexModule {
}

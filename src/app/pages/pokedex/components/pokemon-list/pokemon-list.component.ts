import {Component, OnInit} from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';
import {Observable} from "rxjs";
import {Pokemon} from "../../interfaces/pokemon";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  searchText = '';
  sortOrder = 'asc';
  pageSize = 12;
  currentPage = 1;
  sortType = 'number';
  pokemons$: Observable<Pokemon[]>

  constructor(private pokemonService: PokemonService) {
    this.pokemons$ = this.pokemonService.pokemons
  }

  ngOnInit(): void {
    this.pokemonService.getAllPokemon();
  }

  sortPokemons() {
    this.pokemonService.sortPokemons(this.sortType, this.sortOrder);
  }

  searchPokemon() {
    this.pokemonService.searchPokemon(this.searchText);
    this.currentPage = 1;

  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortPokemons();
  }

  removePokemon(pokemonNumber: number) {
    this.pokemonService.removePokemon(pokemonNumber);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
}

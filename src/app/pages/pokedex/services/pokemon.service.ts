import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Pokemon} from "../interfaces/pokemon";
import {PokemonInfo} from "../interfaces/PokemonInfo";

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';
  private _pokemonsBack: Pokemon[] = []
  _pokemons: BehaviorSubject<Pokemon[]> = new BehaviorSubject<Pokemon[]>([])

  get pokemons() {
    return this._pokemons.asObservable()
  }

  constructor(private http: HttpClient) {
  }

  getAllPokemon() {
    this.http.get<PokemonInfo>(this.apiUrl).subscribe({
      next: resp => {
        this._pokemonsBack = resp.results.map((info, i: number) => {
          return {
            name: info.name,
            number: i + 1,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
              i + 1
            }.svg`,
          }
        })
        this._pokemons.next(this._pokemonsBack)
      }
    });
  }

  sortPokemons(sortType: string, sortOrder: string) {
    if (sortType === 'name') {
      this._pokemons.next(
        this._pokemons.value.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          return sortOrder === 'asc'
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
        })
      )
    } else if (sortType === 'number') {
      this._pokemons.next(
        this._pokemons.value.sort((a, b) =>
          sortOrder === 'asc' ? a.number - b.number : b.number - a.number
        )
      )
    }
  }

  removePokemon(pokemonNumber: number) {
    this._pokemonsBack = this._pokemonsBack.filter(pokemon => pokemon.number !== pokemonNumber)
    this._pokemons.next(this._pokemons.value.filter(pokemon => pokemon.number !== pokemonNumber));
  }

  searchPokemon(searchText: string) {
    this._pokemons.next(this._pokemonsBack.filter(pokemon => {
      if (pokemon.name.includes(searchText)) {
        return pokemon
      }
      return;
    }).filter(notUndefined => notUndefined !== undefined));
  }
}

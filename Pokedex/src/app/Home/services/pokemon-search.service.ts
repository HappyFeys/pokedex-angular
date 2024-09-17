import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon, PokemonList } from '../models/pokemon.models';

@Injectable({
  providedIn: 'root'
})
export class PokemonSearchService {

  private apiURL = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  searchPokemon(name: string): Observable<PokemonList[]> {
    return this.http.get<{ results: { name: string; url: string; }[] }>(`${this.apiURL}?limit=500`).pipe(
      map(response =>
        response.results.filter(pokemon => pokemon.name.includes(name.toLowerCase()))
      )
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { PokelistComponent } from '../../components/pokelist/pokelist.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { PokemonList } from '../../models/pokemon.models';
import { PokemonSearchService } from '../../services/pokemon-search.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeaderComponent,
    PokelistComponent,
    NavigationComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  pokemonList: PokemonList[] = [];

  constructor(private pokemonSearchService: PokemonSearchService ) {}

  searchPokemons(query: string): void {
    if (query && query.trim().length > 0) {
      this.pokemonSearchService.searchPokemon(query).subscribe(pokemons => {
        this.pokemonList = pokemons;
      });
    } else {
      this.pokemonList = [];
    }
  }

  ngOnInit(): void {
    document.body.style.backgroundColor = '#dc0a2d'
  }
}

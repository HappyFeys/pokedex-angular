import { Component, OnInit } from '@angular/core';
import { PokecardComponent } from '../pokecard/pokecard.component';
import { PokemonListService } from '../../services/pokemonList.service';
import { Pokemon } from '../../models/pokemon.models';
import { NgFor } from '@angular/common';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-pokelist',
  standalone: true,
  imports: [
    PokecardComponent,
    NgFor
  ],
  templateUrl: './pokelist.component.html',
  styleUrl: './pokelist.component.scss'
})
export class PokelistComponent implements OnInit{

  constructor(private pokemonListService: PokemonListService){}

  pokemonDetails: Pokemon[] = []

  ngOnInit(): void {
    this.pokemonListService.currentPage$.pipe(
      switchMap((page: number) => {
        console.log(`Changement de page: ${page}`);
        return this.pokemonListService.getPokemon(page);
      })
    ).subscribe(pokemonDetails => {
      console.log('Détails des Pokémon reçus:', pokemonDetails);
      this.pokemonDetails = pokemonDetails; 
    });
  }

}

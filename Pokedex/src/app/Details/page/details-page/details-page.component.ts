import { Component, OnInit } from '@angular/core';
import { HeaderDetailsComponent } from '../../components/header-details/header-details.component';
import { PokemonDetailsComponent } from '../../components/pokemon-details/pokemon-details.component';
import { PokemonDetailsService } from '../../services/pokemon-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../../../Home/models/pokemon.models';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [
    HeaderDetailsComponent,
    PokemonDetailsComponent,
    NgIf
  ],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss'
})
export class DetailsPageComponent implements OnInit {

  pokemonId!: number
  pokemon!: Pokemon
  pokemonDescription!: any

  constructor(private pokemonDetailsService: PokemonDetailsService, private activatedRoute: ActivatedRoute, private route: Router){}

  

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params => {
      this.pokemonId = +params['id'];  // Utiliser + pour convertir en nombre
  
      // Charger les détails du Pokémon
      this.pokemonDetailsService.getPokemonDetailsById(this.pokemonId).subscribe(pokemonDetails => {
        this.pokemon = pokemonDetails;
  
        // Changer la couleur de fond après avoir obtenu les données
        document.body.style.backgroundColor = this.pokemonDetailsService.setBgColor(this.pokemon.types[0].type.name);
      });

      // Charger la description du Pokémon
      this.pokemonDetailsService.getPokemonDescriptionById(this.pokemonId).subscribe(pokemonDescription => {
        this.pokemonDescription = pokemonDescription;
      });
    });
  }

  getPreviousPokemon(id : number){
    if(id > 1){
      this.route.navigate([`/${id-1}`], { relativeTo: this.activatedRoute })
    }
  }

  getNextPokemon(id : number){
    this.route.navigate([`/${id+1}`], { relativeTo: this.activatedRoute })
  }
}

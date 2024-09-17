import { Component, Input } from '@angular/core';
import { Pokemon } from '../../../Home/models/pokemon.models';
import { NgFor, NgStyle, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { PokemonDetailsService } from '../../services/pokemon-details.service';
import { StatsTransformPipe } from '../../pipe/stats-transform.pipe';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [
    NgFor,
    NgStyle,
    TitleCasePipe,
    UpperCasePipe,
    StatsTransformPipe,
  ],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss'
})
export class PokemonDetailsComponent {
  @Input() pokemon! : Pokemon
  @Input() pokemonDescription! : any

  constructor(public pokemonDetailsService: PokemonDetailsService){}
  
  setWidthStatBar = (statbar : number) : number => {
    return statbar > 100 ? 100 : statbar
  }
}

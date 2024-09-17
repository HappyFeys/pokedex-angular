import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon.models';
import { TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokecard',
  standalone: true,
  imports: [
    TitleCasePipe
  ],
  templateUrl: './pokecard.component.html',
  styleUrl: './pokecard.component.scss'
})
export class PokecardComponent {

  @Input() pokemon!: Pokemon;

  constructor(private route: Router){}

  onClick(){
    this.route.navigateByUrl(`/${this.pokemon.id}`);
  } 
}

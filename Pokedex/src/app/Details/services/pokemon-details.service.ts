import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../../Home/models/pokemon.models';

@Injectable({
  providedIn: 'root'
})
export class PokemonDetailsService {
  private apiURL = "https://pokeapi.co/api/v2/pokemon"


  constructor(private http: HttpClient) { }

  getPokemonDetailsById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiURL}/${id}`)
  }
  
  getPokemonDescriptionById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}-species/${id}`)
  }

  setBgColor(type: string){
    switch(type){
      case 'grass': return 'var(--typeGrass)';
      case 'poison': return 'var(--typePoison)';
      case 'fire': return 'var(--typeFire)';
      case 'flying': return 'var(--typeFlying)';
      case 'water': return 'var(--typeWater)';
      case 'bug': return 'var(--typeBug)';
      case 'normal': return 'var(--typeNormal)';
      case 'electric': return 'var(--typeElectric)';
      case 'ground': return 'var(--typeGround)';
      case 'fairy': return 'var(--typeFairy)';
      case 'fighting': return 'var(--typeFighting)';
      case 'psychic': return 'var(--typePsychic)';
      case 'rock': return 'var(--typeRock)';
      case 'steel': return 'var(--typeSteel)';
      case 'ice': return 'var(--typeIce)';
      case 'ghost': return 'var(--typeGhost)';
      case 'dragon': return 'var(--typeDragon)';
      case 'dark': return 'var(--typeDark)';
      default: return 'var(--primary)';
    }
  }
}

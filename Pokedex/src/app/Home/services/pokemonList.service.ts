import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pokemon, PokemonList } from "../models/pokemon.models";
import { BehaviorSubject, forkJoin, map, Observable, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PokemonListService {
    private apiURL = "https://pokeapi.co/api/v2/pokemon"
    private currentPageSubject = new BehaviorSubject<number>(1);
    currentPage$ = this.currentPageSubject.asObservable();

    constructor(private http: HttpClient){}

    getPokemonList(offset:number = 0, limit: number = 21): Observable<PokemonList[]> {
        return this.http.get(`${this.apiURL}?limit=${limit}&offset=${offset}`).pipe(
            map((response: any) => {
                if (response && response.results) {
                    return response.results.map((pokemon: any) => ({
                        name: pokemon.name,
                        url: pokemon.url
                    }));
                } 
                return [];
            })
        );
    }    

    getPokemonDetailsByURL(url: string): Observable<Pokemon> {
        return this.http.get<Pokemon>(url)
    }

    getAllPokemonDetails(offset: number = 0, limit: number = 21): Observable<Pokemon[]> {
        return this.getPokemonList(offset, limit).pipe(
          switchMap(pokemonList => {
            const requests = pokemonList.map(pokemon => this.getPokemonDetailsByURL(pokemon.url));
            return forkJoin(requests);
          })
        );
      }

    getPreviousPokemon(currentPage: number, limit: number = 21){
        const previousPage = currentPage > 1 ? currentPage - 1 : 1;
        return this.getAllPokemonDetails((previousPage - 1)*limit, limit)
    }

    getNextPokemon(currentPage: number, limit: number = 21){
        const nextPage = currentPage + 1;
        return this.getAllPokemonDetails((nextPage - 1)*limit, limit)
    }

    getPokemon(page: number, limit: number = 21){
        const offset = (page - 1)*limit;
        return this.getAllPokemonDetails(offset, limit)
    }

    setCurrentPage(page: number) {
        this.currentPageSubject.next(page);
    }

    getCurrentPage(){
        return this.currentPageSubject.value
    }
}
import { Component, OnInit } from '@angular/core';
import { PokemonListService } from '../../services/pokemonList.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    NgFor,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {

  currentPage: number = 1;
  totalPages: number = 20;

  pages: number[] = [];
  
  constructor(private pokemonListService: PokemonListService){}
  
  loadNextPage() {
    this.currentPage = this.pokemonListService.getCurrentPage();
    if (this.currentPage < 20) {
      this.pokemonListService.setCurrentPage(this.currentPage + 1);
    }
  }

  loadPreviousPage() {
    this.currentPage = this.pokemonListService.getCurrentPage();
    if (this.currentPage > 1) {
      this.pokemonListService.setCurrentPage(this.currentPage - 1);
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.pokemonListService.setCurrentPage(this.currentPage);
    console.log("tu as cliqué");
  }
  
  updatePageList() {
    const numPagesToShow = 1;
    const totalPages = this.totalPages;

    let startPage = Math.max(1, this.currentPage - numPagesToShow);
    let endPage = Math.min(totalPages, this.currentPage + numPagesToShow);

    if (endPage - startPage < numPagesToShow * 2) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + numPagesToShow * 2);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - numPagesToShow * 2);
      }
    }

    this.pages = [];
    for (let i = startPage; i <= endPage; i++) {
      this.pages.push(i);
    }
  }

  ngOnInit(): void {
    this.pokemonListService.currentPage$.subscribe(page => {
      this.currentPage = page;
      this.updatePageList();
    });
  }
}
  
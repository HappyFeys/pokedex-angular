import { Component, Input } from '@angular/core';
import { Pokemon } from '../../../Home/models/pokemon.models';
import {  TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-details',
  standalone: true,
  imports: [
    TitleCasePipe,
  ],
  templateUrl: './header-details.component.html',
  styleUrl: './header-details.component.scss'
})
export class HeaderDetailsComponent {
  @Input() pokemon!: Pokemon

  constructor(private route: Router){}

  goBack(){
    this.route.navigateByUrl('/')
  }
}

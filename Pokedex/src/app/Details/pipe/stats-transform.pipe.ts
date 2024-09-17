import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statsTransform',
  standalone: true
})
export class StatsTransformPipe implements PipeTransform {

  private statMap: { [key: string]: string } = {
    'hp': 'HP',
    'attack': 'ATK',
    'defense': 'DEF',
    'special-attack': 'SATK',
    'special-defense': 'SDEF',
    'speed': 'SPD'
  }

  transform(value: string): string {
    return this.statMap[value] || value;
  }

}

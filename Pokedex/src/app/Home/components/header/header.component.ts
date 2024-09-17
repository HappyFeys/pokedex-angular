import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() searchEvent = new EventEmitter<string>()

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement

    if( inputElement && inputElement.value !== null && inputElement.value !== undefined ) {
      this.searchEvent.emit(inputElement.value)
    } else {
      this.searchEvent.emit('')
    }
  }

}

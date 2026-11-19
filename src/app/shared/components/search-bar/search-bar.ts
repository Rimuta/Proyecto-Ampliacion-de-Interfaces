
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {
  searchText = '';

  @Output() searchChange = new EventEmitter<string>();

  buscar(texto: string): void {
    this.searchChange.emit(texto);
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchBar } from '../search-bar/search-bar';
@Component({
 selector: 'app-header',
 standalone: true,
 imports: [RouterLink, SearchBar],
 templateUrl: './header.html',
 styleUrl: './header.css'
})
export class Header {

    @Output() categoryChange = new EventEmitter<string>();
    @Output() searchChange = new EventEmitter<string>();

    /**Esto es para que al dar a la categoria, te lleve a la pagina de esa categoria*/
    seleccionarCategoria(categoria: string): void {
        this.categoryChange.emit(categoria);
    }
    /**Esto es para buscar el juego pero bueno no funciona como dije  */
    buscarJuego(texto: string): void {
        this.searchChange.emit(texto);
    }
}

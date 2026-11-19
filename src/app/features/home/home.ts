import { Component, inject } from '@angular/core';
import { GameService } from '../../core/games/game.service';
import { GameCard } from '../../shared/components/game-card/game-card';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [GameCard],
    templateUrl: './home.html',
    styleUrl: './home.css'
})

export class Home {
    private gameService = inject(GameService);
    /**Esto es para que solo se muestren los primeros 8 juegos solo */
    juegos = this.gameService.getAll().slice(0, 8);

    /**Esto es para filtrar los juegos mostrados que no funciona aun*/
    juegosFiltrados = this.juegos;

    buscarJuego(texto: string): void {
    this.juegosFiltrados = this.juegos.filter(juego =>
      juego.title.toLowerCase().includes(texto.toLowerCase())
    );
    }
}
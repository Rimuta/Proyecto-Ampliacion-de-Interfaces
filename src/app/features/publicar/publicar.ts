import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Game, NewGame } from '../../core/games/game.model';
import { GameService } from '../../core/games/game.service';
import { GameForm } from '../../shared/components/game-form/game-form';

/**
 * Página "Publicar videojuego" (componente de página).
 * Muestra el formulario de venta y, al recibir los datos, los guarda con GameService.
 * @author Tu nombre
 * @version 1.0
 */
@Component({
  selector: 'app-publicar',
  standalone: true,
  imports: [GameForm, RouterLink],
  templateUrl: './publicar.html',
  styleUrl: './publicar.css'
})
export class Publicar {
  private readonly gameService = inject(GameService);

  /** Último juego publicado (null si todavía no se ha publicado ninguno). */
  readonly publicado = signal<Game | null>(null);

  /** Recibe los datos del formulario, publica el juego y muestra la confirmación. */
  onGameSubmit(datos: NewGame): void {
    this.publicado.set(this.gameService.add(datos));
  }

  /** Oculta el mensaje de confirmación. */
  cerrarAviso(): void {
    this.publicado.set(null);
  }
}

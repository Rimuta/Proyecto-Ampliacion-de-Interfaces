import { Component, inject } from '@angular/core';
import { FavoritesService } from '../../core/games/favorites.service';
import { EmptyState } from '../../shared/components/empty-state/empty-state';
import { GameCard } from '../../shared/components/game-card/game-card';

/**
 * Página "Mis favoritos" (componente de página).
 * Lista los videojuegos favoritos con GameCard, permite quitarlos uno a uno o
 * vaciar la lista, y usa EmptyState cuando no hay ninguno.
 * @author Tu nombre
 * @version 1.0
 */
@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [GameCard, EmptyState],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
export class Favoritos {
  readonly favService = inject(FavoritesService);

  /** Quita un videojuego de favoritos. */
  quitar(id: number): void {
    this.favService.remove(id);
  }

  /** Vacía la lista de favoritos. */
  vaciar(): void {
    this.favService.clear();
  }
}

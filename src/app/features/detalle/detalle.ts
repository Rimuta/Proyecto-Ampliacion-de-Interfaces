import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Game } from '../../core/games/game.model';
import { GameService } from '../../core/games/game.service';
import { FavoritesService } from '../../core/games/favorites.service';
import { EmptyState } from '../../shared/components/empty-state/empty-state';

/**
 * Página de detalle de un videojuego (ruta /juego/:id).
 * Lee el id de la URL, busca el juego en GameService y permite
 * marcarlo como favorito mediante FavoritesService.
 */
@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [RouterLink, EmptyState],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export class Detalle {
  private readonly route = inject(ActivatedRoute);
  private readonly gameService = inject(GameService);
  private readonly favorites = inject(FavoritesService);

  /** Videojuego mostrado (undefined si el id de la URL no existe). */
  id = Number(this.route.snapshot.paramMap.get('id'));

  readonly game: Game | undefined = this.gameService.getById(this.id);

  /** Indica si el videojuego está marcado como favorito. */
  get favorite(): boolean {
    return !!this.game && this.favorites.isFavorite(this.game.id);
  }


  /** Añade o quita el videojuego de favoritos. */
  toggleFavorite(): void {
    if (this.game) {
      this.favorites.toggle(this.game.id);
    }
  }
}
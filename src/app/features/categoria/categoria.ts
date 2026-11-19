
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { GameService } from '../../core/games/game.service';
import { GameCard } from '../../shared/components/game-card/game-card';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [GameCard],
  templateUrl: './categoria.html',
  styleUrl: './categoria.css'
})
export class Categoria {

  private route = inject(ActivatedRoute);
  private gameService = inject(GameService);

  /**Esto es para obtener el nombre de la categoria desde la URL */
  nombreCategoria = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('nombre') ?? '')
    ),
    {
      initialValue: this.route.snapshot.paramMap.get('nombre') ?? ''
    }
  );
  /**Esto es para que solo se muestren los juegos de la categoria seleccionada */
  juegos = computed(() => {
    const categoria = this.nombreCategoria().toLowerCase();

    return this.gameService.games().filter(juego =>
      juego.platform.toLowerCase().includes(categoria)
    );
  });
}

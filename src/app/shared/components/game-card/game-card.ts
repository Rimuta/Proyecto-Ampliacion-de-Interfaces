
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css'
})
export class GameCard {
  @Input() id = 0;
  @Input() title = 'Videojuego';
  @Input() platform = 'PS5';
  @Input() price = 0;
  @Input() condition = 'Buen estado';
  @Input() image = 'https://placehold.co/400x300?text=GameSwap';
  @Input() category = 'Videojuegos';
}

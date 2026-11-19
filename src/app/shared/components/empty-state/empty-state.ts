
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.css'
})
export class EmptyState {
  @Input() title = 'No se han encontrado videojuegos';

  @Input() message = 'Prueba a cambiar los filtros o buscar otro videojuego.';
}

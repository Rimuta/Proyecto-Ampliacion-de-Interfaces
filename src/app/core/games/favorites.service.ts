import { Injectable, computed, inject, signal } from '@angular/core';
import { Game } from './game.model';
import { GameService } from './game.service';

const CLAVE_FAVORITOS = 'gameswap.favoritos';

/**
 * Servicio de favoritos. Guarda solo los ids en localStorage y los cruza con el
 * catálogo de GameService. Es un servicio de estado: lo comparten el Detalle,
 * el catálogo y la página Mis favoritos.
 * @author Tu nombre
 * @version 1.0
 */
@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly gameService = inject(GameService);
  private readonly ids = signal<number[]>(this.cargar());

  /** Videojuegos marcados como favoritos, en el orden del catálogo. */
  readonly favorites = computed<Game[]>(() =>
    this.gameService.games().filter(g => this.ids().includes(g.id))
  );

  /** Número de favoritos (útil para mostrarlo en el menú). */
  readonly count = computed(() => this.favorites().length);

  isFavorite(id: number): boolean {
    return this.ids().includes(id);
  }

  add(id: number): void {
    if (this.isFavorite(id)) return;
    this.ids.update(lista => [...lista, id]);
    this.guardar();
  }

  remove(id: number): void {
    this.ids.update(lista => lista.filter(x => x !== id));
    this.guardar();
  }

  /** Alterna el favorito y devuelve el estado nuevo (true = ahora es favorito). */
  toggle(id: number): boolean {
    if (this.isFavorite(id)) {
      this.remove(id);
      return false;
    }
    this.add(id);
    return true;
  }

  /** Elimina todos los favoritos. */
  clear(): void {
    this.ids.set([]);
    this.guardar();
  }

  private cargar(): number[] {
    try {
      const datos = JSON.parse(localStorage.getItem(CLAVE_FAVORITOS) ?? '[]');
      return Array.isArray(datos) ? datos.filter((x): x is number => typeof x === 'number') : [];
    } catch {
      return [];
    }
  }

  private guardar(): void {
    try {
      localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(this.ids()));
    } catch {
      // Sin almacenamiento: los favoritos duran solo mientras la pestaña esté abierta.
    }
  }
}

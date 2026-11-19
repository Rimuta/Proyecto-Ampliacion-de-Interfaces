import { Injectable, computed, signal, inject } from '@angular/core';
import { Game, NewGame, placeholderImage } from './game.model';
import { GAMES } from './games.data';

const CLAVE_PUBLICADOS = 'gameswap.publicados';

/**
 * Servicio con el catálogo de videojuegos.
 * Los componentes no saben de dónde salen los datos: hoy son un array de ejemplo
 * más los juegos publicados por el usuario (guardados en localStorage, solo práctica);
 * mañana pueden venir de una API con HttpClient.
 * @author Tu nombre
 * @version 1.0
 */
@Injectable({ providedIn: 'root' })
export class GameService {
  /** Juegos publicados desde el formulario de venta. */
  private readonly publicados = signal<Game[]>(this.cargar());

  /** Catálogo completo: ejemplos + publicados. Se recalcula solo al publicar. */
  readonly games = computed<Game[]>(() => [...GAMES, ...this.publicados()]);

  /** Devuelve todos los videojuegos. */
  getAll(): Game[] {
    return this.games();
  }

  /** Busca un videojuego por id (undefined si no existe). */
  getById(id: number): Game | undefined {
    return this.games().find(g => g.id === id);
  }

  /**
   * Publica un videojuego nuevo: le asigna un id, rellena la imagen por defecto
   * si viene vacía y lo guarda.
   */
  add(datos: NewGame): Game {
    const siguienteId = Math.max(0, ...this.games().map(g => g.id)) + 1;
    const titulo = datos.title.trim();
    const juego: Game = {
      ...datos,
      id: siguienteId,
      title: titulo,
      image: datos.image.trim() || placeholderImage(titulo)
    };
    this.publicados.update(lista => [...lista, juego]);
    this.guardar();
    return juego;
  }

  private cargar(): Game[] {
    try {
      const datos = JSON.parse(localStorage.getItem(CLAVE_PUBLICADOS) ?? '[]');
      return Array.isArray(datos) ? datos : [];
    } catch {
      return [];
    }
  }

  private guardar(): void {
    try {
      localStorage.setItem(CLAVE_PUBLICADOS, JSON.stringify(this.publicados()));
    } catch {
      // Sin almacenamiento disponible: el juego sigue en memoria durante la sesión.
    }
  }
}

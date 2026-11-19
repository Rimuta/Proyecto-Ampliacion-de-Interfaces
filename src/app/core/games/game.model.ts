/**
 * Modelo de datos de GameSwap.
 * @author Tu nombre
 * @version 1.0
 */

/** Videojuego a la venta (mismo modelo acordado en el grupo). */
export interface Game {
  id: number;
  title: string;
  platform: string;
  price: number;
  condition: string;
  image: string;
  description: string;
  category: string;
}

/** Datos de un juego recién publicado: todavía no tiene id (lo asigna GameService). */
export type NewGame = Omit<Game, 'id'>;

/** Plataformas disponibles y la categoría del filtro (CategoryFilter) a la que pertenecen. */
export const PLATFORMS: { name: string; category: string }[] = [
  { name: 'PlayStation 5', category: 'PlayStation' },
  { name: 'PlayStation 4', category: 'PlayStation' },
  { name: 'Xbox Series X|S', category: 'Xbox' },
  { name: 'Xbox One', category: 'Xbox' },
  { name: 'Nintendo Switch', category: 'Nintendo' },
  { name: 'PC', category: 'PC' }
];

/** Estados posibles de un producto. */
export const CONDITIONS: string[] = ['Nuevo', 'Segunda mano'];

/** Devuelve la categoría de una plataforma (si no la conoce, 'PC'). */
export function categoryOf(platform: string): string {
  return PLATFORMS.find(p => p.name === platform)?.category ?? 'PC';
}

/**
 * Imagen por defecto (SVG en data-URI) para juegos sin foto.
 * Así nunca se muestra una imagen rota y no hace falta ningún archivo en public/.
 */
export function placeholderImage(title: string): string {
  const texto = title
    .slice(0, 28)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">' +
    '<rect width="100%" height="100%" fill="#232738"/>' +
    '<text x="50%" y="50%" fill="#a78bfa" font-family="sans-serif" font-size="22" ' +
    'text-anchor="middle" dominant-baseline="middle">' + texto + '</text></svg>';
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

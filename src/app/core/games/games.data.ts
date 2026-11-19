import { Game, categoryOf, placeholderImage } from './game.model';

/** Crea un juego de ejemplo; la categoría y la imagen se calculan solas. */
function juego(
  id: number,
  title: string,
  platform: string,
  price: number,
  condition: string,
  description: string
): Game {
  return { id, title, platform, price, condition, description, category: categoryOf(platform), image: placeholderImage(title) };
}

/** Videojuegos de ejemplo (datos inventados; se pueden sustituir por reales sin tocar nada más). */
export const GAMES: Game[] = [
  // Nintendo
  juego(1, 'The Legend of Zelda: Tears of the Kingdom', 'Nintendo Switch', 49.99, 'Nuevo', 'Aventura de mundo abierto. Edición física precintada.'),
  juego(2, 'Mario Kart 8 Deluxe', 'Nintendo Switch', 34.5, 'Segunda mano', 'Carreras para hasta 4 jugadores. Cartucho en perfecto estado, con caja.'),
  juego(3, 'Animal Crossing: New Horizons', 'Nintendo Switch', 29.9, 'Segunda mano', 'Simulación de vida en una isla. Incluye estuche original.'),
  // PlayStation
  juego(4, 'God of War Ragnarök', 'PlayStation 5', 39.95, 'Segunda mano', 'Acción y mitología nórdica. Disco sin rayones.'),
  juego(5, 'Marvel’s Spider-Man 2', 'PlayStation 5', 54.99, 'Nuevo', 'Aventura de superhéroes en Nueva York. Precintado.'),
  juego(6, 'The Last of Us Part II', 'PlayStation 4', 18, 'Segunda mano', 'Aventura de acción y supervivencia. Funciona también en PS5.'),
  // Xbox
  juego(7, 'Halo Infinite', 'Xbox Series X|S', 24.99, 'Segunda mano', 'Shooter en primera persona con campaña y multijugador.'),
  juego(8, 'Forza Horizon 5', 'Xbox Series X|S', 32, 'Segunda mano', 'Conducción en mundo abierto ambientado en México.'),
  juego(9, 'Red Dead Redemption 2', 'Xbox One', 15.5, 'Segunda mano', 'Western de mundo abierto. Dos discos con su estuche.'),
  // PC
  juego(10, 'Baldur’s Gate 3', 'PC', 59.99, 'Nuevo', 'RPG por turnos de fantasía. Clave digital sin usar.'),
  juego(11, 'Hades', 'PC', 12, 'Segunda mano', 'Roguelike de acción. Clave digital transferible.'),
  juego(12, 'Cyberpunk 2077', 'PC', 19.99, 'Nuevo', 'RPG de acción en una ciudad futurista. Edición física.')
];

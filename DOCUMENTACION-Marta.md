# Documentación – Servicios, formulario de venta y favoritos (GameSwap)

## 1. Game (modelo) – `core/games/game.model.ts`

Define la forma de un videojuego (`id`, `title`, `platform`, `price`, `condition`, `image`, `description`, `category`) y el tipo `NewGame` (un `Game` sin `id`, que asigna el servicio).
Incluye también las listas `PLATFORMS` y `CONDITIONS`, y dos funciones auxiliares:

- `categoryOf(platform)`: devuelve la categoría del filtro (PlayStation, Xbox, Nintendo, PC) a la que pertenece una plataforma.
- `placeholderImage(title)`: genera una imagen SVG por defecto para juegos sin foto, de modo que nunca se ve una imagen rota.

## 2. GameService – `core/games/game.service.ts`

Servicio global (`providedIn: 'root'`) con el catálogo. Los componentes piden los datos al servicio y no saben de dónde salen.

**Propiedades:**

- `games`: signal calculado con los juegos de ejemplo más los publicados por el usuario.

**Métodos:**

- `getAll()`: devuelve todos los videojuegos.
- `getById(id)`: devuelve un videojuego o `undefined` si no existe.
- `add(datos)`: asigna un id nuevo, rellena la imagen por defecto si viene vacía, guarda el juego y lo devuelve.

**Almacenamiento:** los juegos publicados se guardan en `localStorage` (clave `gameswap.publicados`). Es solo para prácticas: no es seguro ni se comparte entre dispositivos.

## 3. FavoritesService – `core/games/favorites.service.ts`

Servicio de estado compartido por el Detalle, el catálogo y la página Mis favoritos. Guarda solo los ids (`localStorage`, clave `gameswap.favoritos`) y los cruza con el catálogo.

**Propiedades:**

- `favorites`: signal calculado con los videojuegos favoritos.
- `count`: número de favoritos.

**Métodos:**

- `isFavorite(id)`: indica si un juego es favorito.
- `add(id)` / `remove(id)`: añade o quita un favorito (no duplica).
- `toggle(id)`: alterna el estado y devuelve el estado nuevo.
- `clear()`: elimina todos los favoritos.

## 4. GameForm – `shared/components/game-form/`

Formulario para vender un videojuego (componente presentacional). No guarda nada: valida y emite los datos.

**Propiedades (`@Input`):**

- `submitText`: texto del botón (por defecto «Publicar videojuego»).

**Eventos (`@Output`):**

- `gameSubmit`: emite un `NewGame` cuando el formulario es válido.

**Métodos:**

- `submit()`: valida; si hay errores los muestra, y si no emite el juego y vacía el formulario.
- `invalid(campo)`: indica si un campo debe mostrar error (solo tras tocarlo).

**Validaciones:** título (3–60 caracteres), plataforma y estado obligatorios, precio entre 0,01 y 999, imagen opcional (debe empezar por `http://` o `https://`) y descripción (10–500 caracteres). La categoría se calcula sola a partir de la plataforma.

**Ejemplo de uso:**

```html
<app-game-form submitText="Publicar" (gameSubmit)="onGameSubmit($event)" />
```

## 5. Publicar – `features/publicar/`

Página de venta. Muestra `GameForm` y, al recibir el evento `gameSubmit`, guarda el juego con `GameService.add()` y enseña un aviso de confirmación con un enlace al catálogo.

**Métodos:** `onGameSubmit(datos)` y `cerrarAviso()`.

## 6. Favoritos – `features/favoritos/`

Página «Mis favoritos». Lista los favoritos con `GameCard`, ofrece un botón «Quitar de favoritos» en cada uno y «Vaciar lista». Si no hay ninguno, muestra `EmptyState`.

**Métodos:** `quitar(id)` y `vaciar()`.

## 7. Pruebas unitarias

| Archivo | Pruebas |
|---|---:|
| GameService | 7 |
| FavoritesService | 7 |
| GameForm | 7 |
| Publicar | 4 |
| Favoritos | 5 |
| **Total** | **30** |

Se comprueba la creación de cada pieza, las validaciones del formulario, la emisión del evento, la publicación de juegos, el alta y baja de favoritos y la persistencia en `localStorage`.
Ejecución: `ng test` (o `ng test --include=src/app/core/games/game.service.spec.ts` para un solo archivo).

## 8. Compilación

`ng build` genera la aplicación en la carpeta `dist/`.

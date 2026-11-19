import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { Detalle } from './detalle';
import { FavoritesService } from '../../core/games/favorites.service';

describe('Detalle', () => {
  let harness: RouterTestingHarness;
  let component: Detalle;

  /** Abre la ruta /juego/:id con el id indicado y devuelve el componente creado. */
  async function abrir(id: string): Promise<void> {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: 'juego/:id', component: Detalle }])]
    });
    harness = await RouterTestingHarness.create();
    component = await harness.navigateByUrl('/juego/' + id, Detalle);
    harness.detectChanges();
  }

  beforeEach(() => localStorage.clear());

  it('debe crear el componente', async () => {
    await abrir('4');
    expect(component).toBeTruthy();
  });

  it('debe cargar el videojuego según el id de la ruta', async () => {
    await abrir('4');
    expect(component.game?.title).toBe('God of War Ragnarök');
  });

  it('debe mostrar el título y el precio en pantalla', async () => {
    await abrir('4');
    const raiz = harness.routeNativeElement as HTMLElement;

    expect(raiz.querySelector('h1')?.textContent).toContain('God of War Ragnarök');
    expect(raiz.querySelector('.price')?.textContent).toContain('39.95');
  });

  it('debe añadir y quitar favoritos en FavoritesService', async () => {
    await abrir('4');
    const favoritos = TestBed.inject(FavoritesService);

    component.toggleFavorite();
    expect(component.favorite).toBe(true);
    expect(favoritos.isFavorite(4)).toBe(true);

    component.toggleFavorite();
    expect(component.favorite).toBe(false);
    expect(favoritos.isFavorite(4)).toBe(false);
  });

  it('el botón debe cambiar su texto al marcar como favorito', async () => {
    await abrir('4');
    const raiz = harness.routeNativeElement as HTMLElement;
    const boton = raiz.querySelector('.favorite-button') as HTMLButtonElement;
    expect(boton.textContent).toContain('Añadir a favoritos');

    boton.click();
    harness.detectChanges();
    expect(boton.textContent).toContain('En favoritos');
  });

  it('con un id que no existe debe mostrar el estado vacío', async () => {
    await abrir('9999');
    const raiz = harness.routeNativeElement as HTMLElement;

    expect(component.game).toBeUndefined();
    expect(raiz.querySelector('app-empty-state')).toBeTruthy();
  });
});
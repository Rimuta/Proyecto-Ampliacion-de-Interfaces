import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';
import { provideRouter } from '@angular/router';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideRouter([])]
    });
    service = TestBed.inject(FavoritesService);
  });

  it('debe empezar sin favoritos', () => {
    expect(service.count()).toBe(0);
    expect(service.favorites()).toEqual([]);
  });

  it('add debe guardar un favorito y reflejarlo en la lista', () => {
    service.add(1);

    expect(service.isFavorite(1)).toBe(true);
    expect(service.count()).toBe(1);
    expect(service.favorites()[0].id).toBe(1);
  });

  it('add no debe duplicar un favorito', () => {
    service.add(1);
    service.add(1);
    expect(service.count()).toBe(1);
  });

  it('remove debe eliminar un favorito', () => {
    service.add(1);
    service.add(2);
    service.remove(1);

    expect(service.isFavorite(1)).toBe(false);
    expect(service.count()).toBe(1);
  });

  it('toggle debe alternar el estado y devolver el valor nuevo', () => {
    expect(service.toggle(3)).toBe(true);
    expect(service.isFavorite(3)).toBe(true);
    expect(service.toggle(3)).toBe(false);
    expect(service.isFavorite(3)).toBe(false);
  });

  it('clear debe vaciar todos los favoritos', () => {
    service.add(1);
    service.add(2);
    service.clear();
    expect(service.count()).toBe(0);
  });

  it('los favoritos deben sobrevivir a una recarga (localStorage)', () => {
    service.add(4);

    TestBed.resetTestingModule();
    const otroServicio = TestBed.inject(FavoritesService);

    expect(otroServicio.isFavorite(4)).toBe(true);
  });
});

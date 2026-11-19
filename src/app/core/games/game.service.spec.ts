import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';
import { GAMES } from './games.data';
import { NewGame } from './game.model';

const NUEVO: NewGame = {
  title: '  Hollow Knight  ',
  platform: 'Nintendo Switch',
  category: 'Nintendo',
  condition: 'Segunda mano',
  price: 14.5,
  image: '',
  description: 'Metroidvania en perfecto estado.'
};

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe devolver los videojuegos de ejemplo', () => {
    expect(service.getAll().length).toBe(GAMES.length);
  });

  it('todos los videojuegos de ejemplo deben tener un id único', () => {
    const ids = service.getAll().map(g => g.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('getById debe devolver el juego o undefined si no existe', () => {
    expect(service.getById(1)?.id).toBe(1);
    expect(service.getById(9999)).toBeUndefined();
  });

  it('add debe asignar un id nuevo, limpiar el título y usar imagen por defecto', () => {
    const creado = service.add(NUEVO);

    expect(creado.id).toBeGreaterThan(GAMES.length);
    expect(creado.title).toBe('Hollow Knight');
    expect(creado.image.startsWith('data:image/svg+xml')).toBe(true);
    expect(service.getAll().length).toBe(GAMES.length + 1);
  });

  it('add debe conservar la imagen si el usuario la indica', () => {
    const creado = service.add({ ...NUEVO, image: 'https://ejemplo.com/foto.jpg' });
    expect(creado.image).toBe('https://ejemplo.com/foto.jpg');
  });

  it('los juegos publicados deben sobrevivir a una recarga (localStorage)', () => {
    const creado = service.add(NUEVO);

    TestBed.resetTestingModule();
    const otroServicio = TestBed.inject(GameService);

    expect(otroServicio.getById(creado.id)?.title).toBe('Hollow Knight');
  });
});

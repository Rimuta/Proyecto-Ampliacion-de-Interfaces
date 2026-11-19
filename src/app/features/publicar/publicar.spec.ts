import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Publicar } from './publicar';
import { GameService } from '../../core/games/game.service';
import { NewGame } from '../../core/games/game.model';

const JUEGO: NewGame = {
  title: 'Celeste',
  platform: 'PC',
  category: 'PC',
  condition: 'Nuevo',
  price: 9.99,
  image: '',
  description: 'Plataformas muy exigentes y bonitas.'
};

describe('Publicar', () => {
  let component: Publicar;
  let fixture: ComponentFixture<Publicar>;
  let servicio: GameService;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Publicar],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Publicar);
    component = fixture.componentInstance;
    servicio = TestBed.inject(GameService);
    fixture.detectChanges();
  });

  it('debe crearse y mostrar el formulario de venta', () => {
    expect(component).toBeTruthy();
    expect((fixture.nativeElement as HTMLElement).querySelector('app-game-form')).toBeTruthy();
  });

  it('no debe mostrar el aviso de éxito al empezar', () => {
    expect((fixture.nativeElement as HTMLElement).querySelector('.publicar__exito')).toBeFalsy();
  });

  it('al recibir un juego debe guardarlo en el servicio y mostrar la confirmación', () => {
    const antes = servicio.getAll().length;

    component.onGameSubmit(JUEGO);
    fixture.detectChanges();

    expect(servicio.getAll().length).toBe(antes + 1);
    expect((fixture.nativeElement as HTMLElement).querySelector('.publicar__exito')).toBeTruthy();
  });

  it('cerrarAviso debe ocultar la confirmación', () => {
    component.onGameSubmit(JUEGO);
    component.cerrarAviso();
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).querySelector('.publicar__exito')).toBeFalsy();
  });
});

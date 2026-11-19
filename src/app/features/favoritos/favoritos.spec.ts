import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Favoritos } from './favoritos';
import { FavoritesService } from '../../core/games/favorites.service';
import { provideRouter } from '@angular/router';

describe('Favoritos', () => {
  let component: Favoritos;
  let fixture: ComponentFixture<Favoritos>;
  let servicio: FavoritesService;
  let raiz: HTMLElement;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Favoritos],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Favoritos);
    component = fixture.componentInstance;
    servicio = TestBed.inject(FavoritesService);
    raiz = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('sin favoritos debe mostrar el estado vacío y ninguna tarjeta', () => {
    expect(raiz.querySelector('app-empty-state')).toBeTruthy();
    expect(raiz.querySelectorAll('app-game-card').length).toBe(0);
  });

  it('con favoritos debe mostrar una tarjeta por cada uno', () => {
    servicio.add(1);
    servicio.add(2);
    fixture.detectChanges();

    expect(raiz.querySelectorAll('app-game-card').length).toBe(2);
    expect(raiz.querySelector('app-empty-state')).toBeFalsy();
  });

  it('el botón "Quitar de favoritos" debe eliminar ese juego', () => {
    servicio.add(1);
    fixture.detectChanges();

    (raiz.querySelector('.favoritos__quitar') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(servicio.isFavorite(1)).toBe(false);
    expect(raiz.querySelector('app-empty-state')).toBeTruthy();
  });

  it('vaciar debe eliminar todos los favoritos', () => {
    servicio.add(1);
    servicio.add(2);
    component.vaciar();

    expect(servicio.count()).toBe(0);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameForm } from './game-form';
import { NewGame } from '../../../core/games/game.model';

describe('GameForm', () => {
  let component: GameForm;
  let fixture: ComponentFixture<GameForm>;
  let emitidos: NewGame[];

  const rellenarValido = () =>
    component.form.setValue({
      title: '  Mario Kart 8  ',
      platform: 'Nintendo Switch',
      condition: 'Nuevo',
      price: 34.567,
      image: '',
      description: 'Juego de carreras para toda la familia.'
    });

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [GameForm] }).compileComponents();
    fixture = TestBed.createComponent(GameForm);
    component = fixture.componentInstance;
    emitidos = [];
    component.gameSubmit.subscribe(juego => emitidos.push(juego));
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar el texto por defecto del botón y permitir cambiarlo con @Input', () => {
    const boton = (fixture.nativeElement as HTMLElement).querySelector('.game-form__submit') as HTMLButtonElement;
    expect(boton.textContent?.trim()).toBe('Publicar videojuego');

    fixture.componentRef.setInput('submitText', 'Vender ahora');
    fixture.detectChanges();
    expect(boton.textContent?.trim()).toBe('Vender ahora');
  });

  it('el formulario vacío debe ser inválido', () => {
    expect(component.form.invalid).toBe(true);
  });

  it('no debe emitir nada y debe mostrar errores si se envía vacío', () => {
    component.submit();
    fixture.detectChanges();

    expect(emitidos.length).toBe(0);
    expect((fixture.nativeElement as HTMLElement).querySelector('.game-form__error')).toBeTruthy();
  });

  it('debe rechazar precios no válidos y enlaces de imagen incorrectos', () => {
    rellenarValido();
    component.form.controls.price.setValue(0);
    expect(component.form.controls.price.invalid).toBe(true);

    component.form.controls.price.setValue(10);
    component.form.controls.image.setValue('foto.jpg');
    expect(component.form.controls.image.invalid).toBe(true);
  });

  it('debe emitir el juego con categoría, precio redondeado y textos limpios', () => {
    rellenarValido();
    component.submit();

    expect(emitidos.length).toBe(1);
    expect(emitidos[0].title).toBe('Mario Kart 8');
    expect(emitidos[0].category).toBe('Nintendo');
    expect(emitidos[0].price).toBe(34.57);
  });

  it('debe vaciar el formulario después de emitir', () => {
    rellenarValido();
    component.submit();

    expect(component.form.controls.title.value).toBe('');
    expect(component.form.controls.platform.value).toBe('');
  });
});

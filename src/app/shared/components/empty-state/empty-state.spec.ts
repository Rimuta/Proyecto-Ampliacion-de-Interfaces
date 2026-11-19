
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyState } from './empty-state';

describe('EmptyState', () => {
  let component: EmptyState;
  let fixture: ComponentFixture<EmptyState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyState],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyState);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar el título predeterminado', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('No se han encontrado videojuegos');
  });

  it('debe mostrar el mensaje predeterminado', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Prueba a cambiar los filtros o buscar otro videojuego.');
  });

  it('debe permitir cambiar el título y el mensaje', () => {
    fixture.componentRef.setInput('title', 'No hay resultados');
    fixture.componentRef.setInput('message', 'Prueba otra búsqueda.');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).toContain('No hay resultados');
    expect(element.textContent).toContain('Prueba otra búsqueda.');
  });
});

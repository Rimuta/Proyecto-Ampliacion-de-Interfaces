
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBar } from './search-bar';

describe('SearchBar', () => {
  let component: SearchBar;
  let fixture: ComponentFixture<SearchBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBar],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe empezar con el texto vacío', () => {
    expect(component.searchText).toBe('');
  });

  it('debe guardar el texto introducido', () => {
    component.searchText = 'God of War';

    expect(component.searchText).toBe('God of War');
  });

  it('debe emitir el texto al buscar', () => {
    let textoEmitido = '';

    component.searchChange.subscribe(texto => {
      textoEmitido = texto;
    });

    component.searchText = 'Minecraft';
    component.buscar(component.searchText);

    expect(textoEmitido).toBe('Minecraft');
  });

  it('debe emitir una búsqueda vacía', () => {
    let textoEmitido = 'prueba';

    component.searchChange.subscribe(texto => {
      textoEmitido = texto;
    });

    component.searchText = '';
    component.buscar(component.searchText);

    expect(textoEmitido).toBe('');
  });
});

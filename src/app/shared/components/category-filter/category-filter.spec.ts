
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryFilter } from './category-filter';

describe('CategoryFilter', () => {
  let component: CategoryFilter;
  let fixture: ComponentFixture<CategoryFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar todas las categorías', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).toContain('PlayStation');
    expect(element.textContent).toContain('Xbox');
    expect(element.textContent).toContain('Nintendo');
    expect(element.textContent).toContain('PC');
  });

  it('debe tener seleccionada la categoría Todos inicialmente', () => {
    expect(component.selectedCategory).toBe('Todos');
  });

  it('debe cambiar la categoría seleccionada', () => {
    component.selectCategory('Xbox');

    expect(component.selectedCategory).toBe('Xbox');
  });

  it('debe emitir la categoría seleccionada', () => {
    let categoriaEmitida = '';

    component.categoryChange.subscribe(categoria => {
      categoriaEmitida = categoria;
    });

    component.selectCategory('PlayStation');

    expect(categoriaEmitida).toBe('PlayStation');
  });
});

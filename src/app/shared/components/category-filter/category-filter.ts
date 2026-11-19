
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [],
  templateUrl: './category-filter.html',
  styleUrl: './category-filter.css'
})
export class CategoryFilter {
  categories = ['Todos', 'PlayStation', 'Xbox', 'Nintendo', 'PC'];

  selectedCategory = 'Todos';

  @Output() categoryChange = new EventEmitter<string>();

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.categoryChange.emit(category);
  }
}

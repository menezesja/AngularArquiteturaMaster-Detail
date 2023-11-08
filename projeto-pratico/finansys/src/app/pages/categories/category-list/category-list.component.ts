import { Component} from '@angular/core';

import { BaseResourceListComponent } from 'src/app/shared';

import { Category, CategoryService } from '../shared';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {
  constructor(private categoryService: CategoryService) { 
    super(categoryService);
  }
}
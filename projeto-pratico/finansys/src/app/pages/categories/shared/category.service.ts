import { Injectable, Injector } from '@angular/core';
import { Category } from './category.model';
import { BaseResourceService } from 'src/app/shared/services';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Category> {
  constructor(protected override injector: Injector) {
    super("api/categories", injector, Category.fromJson);
  }
}

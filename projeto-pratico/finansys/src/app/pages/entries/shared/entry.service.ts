import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services';
import { Entry } from './entry.model';
import { CategoryService } from '../../categories';

import { Observable, mergeMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService <Entry> {

  constructor(protected override injector: Injector, private categoryService: CategoryService) { 
    super("api/entries", injector);
  }

  override create(entry: Entry): Observable<Entry>{
    return this.categoryService.getByID(entry.categoryId).pipe(
      mergeMap(category => {
        entry.category = category;
        return super.create(entry);
      })
  );
}

  override update(entry: Entry): Observable<Entry> {
    return this.categoryService.getByID(entry.categoryId).pipe(
      mergeMap(category => {
        entry.category = category;
        return super.update(entry);
      })
    )
  }

  //protected methods
  protected override jsonDataToResources(jsonData: any[]): Entry[]{
    const entries: Entry[] = [];
    jsonData.forEach(element => {
      const entry = Object.assign(new Entry(), element);
      entries.push(entry);
    });
    return entries;
  }

  protected override jsonDataToResource(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }
}

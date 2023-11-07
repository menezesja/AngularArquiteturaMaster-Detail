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
    super("api/entries", injector, Entry.fromJson);
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

}

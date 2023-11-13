import { Injectable, Injector } from '@angular/core';

import { Observable, catchError, mergeMap, map} from 'rxjs';

import { BaseResourceService } from 'src/app/shared/services';
import { CategoryService } from '../../categories';
import { Entry } from './entry.model';

import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService <Entry> {

  constructor(protected override injector: Injector, private categoryService: CategoryService) { 
    super("api/entries", injector, Entry.fromJson);
  }

  override create(entry: Entry): Observable<Entry>{
    return this.setCategoryAndSendToServer(entry, super.create.bind(this));
  }

  override update(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.update.bind(this));
  }

  getByMonthAndYear(month: number, year: number): Observable<Entry[]> {
    return this.getAll().pipe(
      map(entries => this.filterByMonthAndYear(entries, month, year))
    )
  }

  private setCategoryAndSendToServer(entry: Entry, sendFn: any): Observable<Entry>{
    return this.categoryService.getByID(entry.categoryId).pipe(
      mergeMap(category => {
        entry.category = category;
        return sendFn(entry)
      }),
      catchError(this.handlerError)
    );
  }

  private filterByMonthAndYear(entries: Entry[], month: number, year: number) {
    return entries.filter(entry => {
      const entryDate = moment(entry.date, "DD/MM/YYYY");
      const monthMatches = entryDate.month() + 1 == month;
      const yearMatches = entryDate.year() == year;

      if(monthMatches && yearMatches) 
        return entry;
      else
        return [];
    })
  }
}

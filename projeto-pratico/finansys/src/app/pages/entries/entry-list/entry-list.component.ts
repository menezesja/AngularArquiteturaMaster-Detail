import { Component} from '@angular/core';

import { BaseResourceListComponent } from 'src/app/shared';

import { Entry, EntryService } from '../shared/';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent extends BaseResourceListComponent<Entry> {
  constructor(private entryService: EntryService) { 
    super(entryService);
  }
}
//refactoring lançamentos
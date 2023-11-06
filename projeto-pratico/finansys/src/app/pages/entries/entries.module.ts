import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared';
import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListComponent } from './entry-list';
import { EntryFormComponent } from './entry-form';
import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';

@NgModule({
  declarations: [
    EntryListComponent,
    EntryFormComponent
  ],
  imports: [
    SharedModule,
    EntriesRoutingModule,
    CalendarModule,
    IMaskModule
  ]
})
export class EntriesModule { }

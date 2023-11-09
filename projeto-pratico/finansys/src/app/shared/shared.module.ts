import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { BreadCrumbComponent } from './components';
import { PageHeaderComponent } from './components';
import { FormFieldErrorComponent } from './components';
import { ServerErrorMessagesComponent } from './components';

@NgModule({
  declarations: [
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule 
  ], 
  exports:[
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent
  ]
})
export class SharedModule { }

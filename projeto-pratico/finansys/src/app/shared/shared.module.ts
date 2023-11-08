import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { BreadCrumbComponent } from './components';

@NgModule({
  declarations: [
    BreadCrumbComponent
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
    BreadCrumbComponent
  ]
})
export class SharedModule { }

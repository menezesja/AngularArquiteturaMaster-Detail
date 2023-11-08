import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './components';

@NgModule({
  declarations: [
    BreadCrumbComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule 
  ], 
  exports:[
    CommonModule,
    ReactiveFormsModule,
    BreadCrumbComponent
  ]
})
export class SharedModule { }

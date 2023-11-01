import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Category, CategoryService } from '../shared';

import { switchMap } from 'rxjs';

import * as toasrt from 'toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked{

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(){
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked(){
    this.setPageTitle();
  }

  submitForm(){
    this.submittingForm = true;

    if(this.currentAction == "new")
      this.createCategory();
    else
      this.updateCategory();
  }

  //private methods
  private setCurrentAction(){
    if(this.route.snapshot.url[0].path == "new")
      this.currentAction = "new"
    else
      this.currentAction = "edit"
    
  }

  private buildCategoryForm(){
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  private loadCategory(){
    if(this.currentAction == "edit"){
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getByID(+params.get("id"))),
      ).subscribe({
        next: (category) => {
          this.category = category;
          this.categoryForm.patchValue(category);
        },
        error: () => alert('Ocorreu um error no servidor, tente mais tarde'),
      })
    }
  }


  private setPageTitle(){
    if(this.currentAction == 'new')
      this.pageTitle = "Cadastro de Nova Categoria"
    else{
      const categoryName = this.category.name || ""
      this.pageTitle = "Editando Categoria: " + categoryName;
    }
  }
  
  createCategory(){
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.create(category)
      .subscribe({
        next: category => this.actionsForSuccess(category),
        error: error => this.actionsForError(error),
      });
  }

  private updateCategory(){
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.update(category)
    .subscribe({
      next: category => this.actionsForSuccess(category),
      error: error => this.actionsForError(error),
    });
  }

  private actionsForSuccess(category: Category){
    toasrt.success("Solicitação Processada com sucesso!");

    this.router.navigateByUrl("categories", {skipLocationChange: true}).then(
      () => this.router.navigate(["categories", category.id, "edit"])
    )
  }

  private actionsForError(error){
    toasrt.error("Ocorreu um erro ao processar a sua solicitação");

    this.submittingForm = false;

    if(error.status == 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, teste mais tarde"]
  }


}

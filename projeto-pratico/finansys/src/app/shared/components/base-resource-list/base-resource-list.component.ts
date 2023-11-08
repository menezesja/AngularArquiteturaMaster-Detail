import { OnInit, Injectable } from '@angular/core';

import { BaseResourceModel } from '../../models';
import { BaseResourceService } from '../../services';

@Injectable()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];

  constructor(private resourceService: BaseResourceService<T>) { }

  ngOnInit() {
    this.resourceService.getAll().subscribe({
      next: resources => this.resources = resources.sort((a,b) => b.id - a.id),
      error: () => alert('Erro ao carregar a lista')
    })
  }

  deleteResource(resource: T){
    const mustDelete = confirm('Deseja realmente excluir este item?');
    
    if(mustDelete){
      this.resourceService.delete(resource.id).subscribe({
        next: () => this.resources = this.resources.filter(element => element != resource),
        error: () => alert("Erro ao tentar excluir")
      })
    } 
  }
}
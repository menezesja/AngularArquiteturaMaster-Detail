import { Component, OnInit } from '@angular/core';

import { Entry, EntryService } from '../shared/';
@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];

  constructor(private entryService: EntryService) { }

  ngOnInit() {
    this.entryService.getAll().subscribe({
      next: entries => this.entries = entries.sort((a,b) => b.id - a.id),
      error: () => alert('Erro ao carregar a lista')
    })
  }

  deleteEntry(entry){
    const mustDelete = confirm('Deseja realmente excluir este item?');
    
    if(mustDelete){
      this.entryService.delete(entry.id).subscribe({
        next: () => this.entries = this.entries.filter(element => element != entry),
        error: () => alert("Erro ao tentar excluir")
      })
    } 
  }
}
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  template: `
  <div class="my-6">
    <input 
        type="text"
        [(ngModel)]="search"
        placeholder="Find your favorite cookie"
        class="focus:ring-2 focus:ring-teal-300 focus:outline-none h-9 w-96 text-sm text-slate-900 placeholder-slate-500 rounded p-2 ring-1 ring-slate-400 bg-zinc-50"
      />
      <button class="h-9 ml-0.5 px-4 rounded-md text-white bg-emerald-400" (click)="onSearch()">Search</button>
  </div>
  `
})
export class SearchComponent {
  public search!: string;
  private router = inject(Router);

  public onSearch(): void {
    this.router.navigate(['/results', {query: this.search}]);
  }
}

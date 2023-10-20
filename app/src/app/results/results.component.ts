import { Component, Input, OnInit, inject } from '@angular/core';
import { ProductsService } from '../products.service';
import { Observable } from 'rxjs';
import { Product } from '../product';

@Component({
  selector: 'app-results',
  template: `
  <h2 class="mt-3 text-center text-4xl text-teal-500">So you want cookies?</h2>

  <p class="m-6 text-center text-lg">We're on it! Searching our kitchen for...</p>
  <div [innerHTML]="query"></div>

  <ng-container *ngIf="(results$ | async)">
    <div class="flex my-12 justify-center">
      <svg class="animate-spin h-24 w-24 mr-3 fill-lime-200" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z"/>
      </svg>
    </div>
  <ng-container>
  `,
})
export class ResultsComponent implements OnInit {
  @Input() query = '';

  public results$!: Observable<Product[]>;
  private productsService = inject(ProductsService);


  ngOnInit(): void {

    if (this.query) {
      this.results$ = this.productsService.findProducts(this.query);
    }
  }
}

import { Component, inject } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-home',
  template: `
  <div class="flex flex-row items-center justify-center my-3">
    <p class="w-80 text-7xl text-sky-500">Who wants cookies?</p>
    <img src="assets/img/logo.jpg" alt="Cookies 4 U logo" />
  </div>

  <app-banner></app-banner>
  <app-search></app-search>
  <app-featured></app-featured>

  <div class="m-6 w-100 flex items-center justify-between">
    <app-deals></app-deals>
    <app-coffee-promo></app-coffee-promo>
  </div>
  `,
  styles: [
    ` :host { display: flex; flex-direction: column; align-items: center;}
    `
  ]
})
export class HomeComponent {
  private productsService = inject(ProductsService);
  public products$ = this.productsService.getProducts();

}

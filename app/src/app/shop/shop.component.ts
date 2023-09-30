import { Component, inject } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-shop',
  template: `
  <h2 class="text-center mb-6 text-4xl text-teal-600">Shop</h2>
  <div class="flex flex-wrap">
    <div class="flex m-6 h-56" *ngFor="let product of products$ | async">
      <div class="w-36 relative">
          <img [src]="product.imageUrl" alt="{{product.name}}" class="absolute inset-0 w-full h-full object-cover rounded-l-lg" />
      </div>
      <div class="p-6 border-y border-r border-sky-300 rounded-r-lg w-56 flex flex-col">
        <h2 class="text-xl text-violet-600">{{product.name}}</h2>
        <p class="my-2 text-md text-slate-600 flex-grow">{{product.description}}</p>
        <button class="text-md text-white bg-emerald-400 py-1 w-24 rounded-lg self-end">Add to cart</button>
      </div>
    </div>
  </div>
  `
})
export class ShopComponent {
  private productsService = inject(ProductsService);
  public products$ = this.productsService.getProducts();
}

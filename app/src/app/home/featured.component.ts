import { Component, inject } from '@angular/core';
import { ProductsService } from '../products.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-featured',
  template: `
<div class="my-6">
  <h3 class="text-3xl text-center text-emerald-500 mb-3">Featured cookie</h3>

  <div class="flex" *ngIf="featured$ | async as featured">
    <img [src]="featured.imageUrl" alt="{{featured.name}}" class="max-h-96 max-w-96 rounded-lg" />
    <div class="ml-6 mt-6">
      <p class="text-xl text-violet-600">{{featured.name}}</p>
      <p class="my-3 text-md text-slate-600 flex-grow">{{featured.description}}</p>
      <a routerLink="/shop" class="underline text-blue-500">Buy some in the store</a>
    </div>
  </div>
</div>
  `,
})
export class FeaturedComponent {
  private productsService = inject(ProductsService);
  public featured$ = this.productsService.getFeaturedProduct();

}

import { Component, inject } from '@angular/core';
import { ProductsService } from '../products.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin',
  template: `
  <h2 class="text-center text-3xl">Add a cookie</h2>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <div class="mb-6">
      <label for="name" class="block text-sm font-medium leading-6 text-gray-900">
        Name of cookie
      </label>
      <input type="text" required id="name" [formControl]="name"
      class="w-full text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200"
      placeholder="Name"
      />
    </div>
    
    <div class="mb-6">
      <label for="description" class="block text-sm font-medium leading-6 text-gray-900">
        Description
      </label>
      <input type="text" required id="description" [formControl]="description"
      class="w-full text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200" 
      placeholder="Description" />
    </div>
    <div class="mb-6">
      <label for="imageUrl" class="block text-sm font-medium leading-6 text-gray-900">
        Image URL
      </label>
      <input type="text" required id="imageUrl" [formControl]="imageUrl"
      class="w-full text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200" 
      placeholder="Image URL" />
    </div>
    <button type="submit"
        class="w-full py-2 px-3 bg-slate-300 rounded-md"
        (click)= "onSubmit()"
        [disabled]="!this.name.valid || !this.description.valid || !this.imageUrl.valid"
      >
        Save
    </button>
  </div>
  `,
})
export class AdminComponent {
  public name = new FormControl('');
  public description = new FormControl('');
  public imageUrl = new FormControl('');
  private productsService = inject(ProductsService);

  onSubmit(): void {
    if (!this.name.valid || !this.description.valid || !this.imageUrl.valid) {
      return;
    }
    const product = {
      name: this.name.value,
      description: this.description.value,
      imageUrl: this.imageUrl.value
    } as {name: string, description: string, imageUrl: string};

    this.productsService.addProduct(product)
    .subscribe(_ => {
      this.name.setValue('');
      this.description.setValue('');
      this.imageUrl.setValue('');
    });
  }
}

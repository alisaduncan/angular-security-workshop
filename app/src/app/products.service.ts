import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly URL = 'http://localhost:3000/api';

  private http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.URL}/products`);
  }

  addProduct(product:{name:string, description: string, imageUrl: string}): Observable<Product> {
    return this.http.post<Product>(`${this.URL}/products`, product);
  }

  getFeaturedProduct(): Observable<Product> {
    return this.http.get<Product>(`${this.URL}/products/featured`);
  }

  findProducts(searchTerm: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.URL}/products?q=${searchTerm}`);
  }
}

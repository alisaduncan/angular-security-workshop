import { Component, OnInit, inject } from '@angular/core';
import { PromosService } from '../promos.service';

@Component({
  selector: 'app-coffee-promo',
  template: `
  <section>
    <h3 class="text-sky-500 text-2xl mb-3">You know what goes well with cookies?</h3>
    <div class="flex items-center">
    <iframe
      src="https://www.youtube.com/embed/1fueZCTYkpA"
      width="560" height="315"
      title="YouTube video player" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    >
    </iframe> 
    <p class="ml-3 w-72 text-lg text-sky-500">{{promoMessage}}</p>
    </div>
  </section>
  `
})
export class CoffeePromoComponent implements OnInit {
  public promoMessage = '';
  private promosService = inject(PromosService);
  
  public ngOnInit(): void {
    const {message} = this.promosService.getCoffeePromos()
    this.promoMessage = message;
  }
}

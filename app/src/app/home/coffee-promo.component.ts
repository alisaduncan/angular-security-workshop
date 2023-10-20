import { Component, OnInit, inject } from '@angular/core';
import { PromosService } from '../promos.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-coffee-promo',
  template: `
  <section>
    <h3 class="text-sky-500 text-2xl mb-3">You know what goes well with cookies?</h3>
    <div class="flex items-center">
    <iframe
      [src]="videoLink"
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
  public videoLink!: SafeResourceUrl;
  private promosService = inject(PromosService);
  private sanitizer = inject(DomSanitizer);
  
  public ngOnInit(): void {
    const {message, videoId} = this.promosService.getCoffeePromos()
    this.promoMessage = message;
    this.videoLink = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }
}

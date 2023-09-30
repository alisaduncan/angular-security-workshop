import { Component, OnInit, inject } from '@angular/core';
import { Deal, PromosService } from 'src/app/promos.service';

@Component({
  selector: 'app-deals',
  template: `
  <div class="bg-red-100 mr-6 p-8 rounded-lg">
    <h3 class="text-xl">Join the craving. Sweet deals just for you</h3>
    <ng-container *ngFor="let promo of promos">
      <p class="text-md">{{promo.message}}</p>
    </ng-container>    
  </div>
  `,
  styles: []
})
export class DealsComponent implements OnInit {
  public promos: Deal[] = [];
  private promosService = inject(PromosService);
  

  ngOnInit(): void {
    this.promos = this.promosService.getDeals()
  }
}

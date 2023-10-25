import { Component, OnInit, inject } from '@angular/core';
import { Deal, PromosService } from 'src/app/promos.service';
import { AuthService } from '../auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-deals',
  template: `
  <div class="bg-red-100 mr-6 p-8 rounded-lg">
    <h3 class="text-xl">Join the craving. Sweet deals just for you</h3>
    <ng-container *ngFor="let promo of promos">
      <p *appUserType="promo.deal; claim:(userType$ | async) ??''" class="text-md">{{promo.message}}</p>
    </ng-container>    
  </div>
  `,
  styles: []
})
export class DealsComponent implements OnInit {
  public promos: Deal[] = [];
  private promosService = inject(PromosService);
  private authService = inject(AuthService);

  userType$ = this.authService.userType.pipe(
    takeUntilDestroyed()
  );
  
  ngOnInit(): void {
    this.promos = this.promosService.getDeals()
  }
}

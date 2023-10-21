import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  template: `
  <div class="flex flex-col min-h-screen justify-center">
    <app-header></app-header>

    <main class="flex-grow">
      <router-outlet></router-outlet>
    </main>
  
    <app-footer></app-footer>
  </div>
  `,
})
export class AppComponent {
  title = 'app';
  private oidcSecurityService = inject(OidcSecurityService);

  constructor() {
    this.oidcSecurityService.checkAuth().pipe(takeUntilDestroyed()).subscribe(res => console.log(res));
  }
}

import { Injectable, inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map, take } from 'rxjs';

export type ROLE = 'admin' | 'member';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private oidcSecurityService = inject(OidcSecurityService);

  readonly isAuthenticated = this.oidcSecurityService.isAuthenticated$.pipe(
    map(res => res.isAuthenticated)
  );

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    this.oidcSecurityService.logoff().pipe(take(1)).subscribe();
  }
}

import { Injectable, inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { filter, map, take } from 'rxjs';

export type ROLE = 'admin' | 'member';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private oidcSecurityService = inject(OidcSecurityService);

  readonly isAuthenticated = this.oidcSecurityService.isAuthenticated$.pipe(
    map(res => res.isAuthenticated),
  );

  readonly isAdmin = this.oidcSecurityService.userData$.pipe(
    filter(data => !!data && data.userData),
    map(data => data.userData['userType'] === 'admin')
  );

  readonly userType = this.oidcSecurityService.userData$.pipe(
    filter(data => !!data && data.userData),
    map(data => data.userData['userType'])
  );

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    this.oidcSecurityService.logoff().pipe(take(1)).subscribe();
  }
}

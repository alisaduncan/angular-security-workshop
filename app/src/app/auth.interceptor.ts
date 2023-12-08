import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  private oidcSecurityService = inject(OidcSecurityService);

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const allowedOrigins = ['localhost:3000'];
    if (!allowedOrigins.find(origin => request.url.includes(origin))) {
      return next.handle(request)
    }
    return this.oidcService.getAccessToken()
      .pipe(
        take(1),
        switchMap((t) => {
          const headers = request.headers.set('Authorization', `Bearer ${t}`);
          request = request.clone({headers});
          return next.handle(request)
        })
      )
  }
}

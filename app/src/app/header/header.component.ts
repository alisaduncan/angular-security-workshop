import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  template: `
  <header class="h-12 bg-blue-200 mb-6">
    <nav class="mx-5">
        <ul class="flex flex-row h-12 justify-between items-center">
            <li><a routerLink="/" class="text-lg font-semibold">🍪 Cookies 4 U</a></li>
            <div class="inline-flex">
                <li class="pr-5"><a routerLink="/shop" class="uppercase">Shop</a></li>
                <li *ngIf="!(isAuthenticated$ | async); else logout"><a (click)="onLogin()" class="uppercase">Login</a></li>

                <ng-template #logout>
                  <li class="pr-5"><a routerLink="/members" class="uppercase">Cookie Jar</a></li>
                  <li *ngIf="isAdmin$ | async" class="pr-5">
                    <a routerLink="/admin" class="uppercase">Manage</a>
                  </li>
                  <li><button (click)="onLogout()" class="uppercase">Logout</button></li>
                </ng-template>
            </div>
        </ul>
    </nav>
  </header>
  `
})
export class HeaderComponent {
  public authService = inject(AuthService);
  public isAuthenticated$ = this.authService.isAuthenticated.pipe(takeUntilDestroyed());
  public isAdmin$ = this.authService.isAdmin.pipe(takeUntilDestroyed());

  onLogin(): void {
    this.authService.login();
  }

  onLogout(): void {
    this.authService.logout();
  }
}

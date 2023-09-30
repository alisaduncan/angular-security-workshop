import { Component, inject } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <div class="mb-6">
      <label for="username" class="block text-sm font-medium leading-6 text-gray-900">
        Username
      </label>
      <input type="text" id="username" required [formControl]="username" 
      class="w-full text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200" 
      placeholder="Username" />
    </div>
    
    <div class="mb-6">
      <label for="password" class="block text-sm font-medium leading-6 text-gray-900">
        Password
      </label>
      <input type="password" id="password" required [formControl]="password"
      class="w-full text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200"
      placeholder="Password" />
    </div>
    <button 
        class="w-full py-2 px-3 bg-slate-300 rounded-md" [disabled]="!this.username.valid || !this.password.valid"
        (click)= "onAuthenticate()"
      >
        Log in
    </button>
    <p class="text-red-500" *ngIf="authFail">Username or password is incorrect</p>
  </div>
  `,
})
export class LoginComponent {
  public username = new FormControl('');
  public password = new FormControl('');
  public authFail = false;
  private authService = inject(AuthService);
  private router = inject(Router);

  public onAuthenticate(): void {
    if (!this.username.value || !this.password.value) {
      return;
    }

    this.authService.login(this.username.value, this.password.value).pipe(
      take(1)
    ).subscribe({ 
      next: _ => {
        this.authFail = false;
        this.username.setValue('');
        this.password.setValue('');
        this.router.navigate(['/']);
      },
      error: error => this.authFail = true

    })
  }
}

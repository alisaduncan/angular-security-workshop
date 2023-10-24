import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authenticatedGuard: CanActivateFn = (route, state, authService = inject(AuthService)) => authService.isAuthenticated;
export const adminGuard: CanActivateFn = (route, state, authService = inject(AuthService)) => authService.isAdmin;
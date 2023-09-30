import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';

export type ROLE = 'admin' | 'member';

export interface MyInfo {
  id: number;
  name: string;
  username: string;
  email: string;
  roles: ROLE[];
  deals: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = 'http://localhost:3000/api';

  private http = inject(HttpClient);
  private userInfo: {username: string} | MyInfo | undefined;

  isAuthenticated(): boolean {
    return !!this.userInfo;
  }

  login(username: string, password: string): Observable<{username: string}> {
    return this.http.post<{username: string}>(`${this.URL}/signin`, {username, password}).pipe(
      tap(res => this.userInfo = res),
      catchError(err => {this.userInfo = undefined; throw 'Authentication error';})
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.URL}/signout`, {}).pipe(
      tap(_ => this.userInfo = undefined)
    );
  }
}

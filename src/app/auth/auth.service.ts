import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LoginResult } from '../declarations/models/login-result';
import { LoginRequest } from '../declarations/models/login-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string;
  isLoggedIn = false;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('papaya-token')) {
      this.token = localStorage.getItem('papaya-token');
      this.isLoggedIn = true;
    }
  }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.http.post<LoginResult>(`api/login`, loginRequest).pipe(
      tap(loginResult => {
        if (loginResult.valid) {
          this.token = loginResult.token;
          localStorage.setItem('papaya-token', this.token);
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      }),
      map(loginResult => loginResult.valid)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.token = undefined;
    localStorage.removeItem('papaya-token');
  }
}

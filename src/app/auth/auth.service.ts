import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LoginResult } from '../declarations/models/login-result';
import { LoginRequest } from '../declarations/models/login-request';
import { StoreService } from '../p-common/store.service';
import { UserDto } from '../declarations/models/user-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  token: string;
  isLoggedIn = false;

  constructor(private http: HttpClient,
              private store: StoreService) {
    if (localStorage.getItem('papaya-token')) {
      this.token = localStorage.getItem('papaya-token');
      this.isLoggedIn = true;
      setTimeout(() =>  this.getCurrentUser().subscribe(res => this.store.currentUserId = res.id));
    }
  }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.http.post<LoginResult>(`api/login`, loginRequest).pipe(
      tap(loginResult => {
        if (loginResult.valid) {
          this.token = loginResult.token;
          this.store.currentUserId = loginResult.userId;
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

  getCurrentUser(): Observable<UserDto> {
    return this.http.get<UserDto>('api/me');
  }
}

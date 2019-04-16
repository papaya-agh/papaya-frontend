import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../../../declarations/models/login-request';
import { LoginResult } from '../../../declarations/models/login-result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    private baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {
    }

    requestLogin(loginRequest: LoginRequest): Observable<LoginResult> {
        return this.http.post<LoginResult>(`api/login`, loginRequest);
    }
}

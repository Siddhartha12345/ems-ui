import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../model/login-request';
import { Observable } from 'rxjs';
import { LoginResponse } from '../model/login-response';
import { AppConfig } from '../app.config';
import { RefreshTokenRequest } from '../model/refresh-token-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${AppConfig.API_GATEWAY_URL}${AppConfig.AUTH_CONTEXT_PATH}/login`, loginRequest);
  }

  refresh(refreshTokenRequest: RefreshTokenRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${AppConfig.API_GATEWAY_URL}${AppConfig.AUTH_CONTEXT_PATH}/refreshToken`, refreshTokenRequest);
  }
}

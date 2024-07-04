import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../model/login-request';
import { Observable } from 'rxjs';
import { LoginResponse } from '../model/login-response';
import { AppConfig } from '../app.config';
import { RefreshTokenRequest } from '../model/refresh-token-request';
import { OAuth2Url } from '../model/oauth2-url';
import { OAuth2Token } from '../model/oauth2-token';
import { PrivateMessage } from '../model/private-message';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // specific to jwt authentication

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${AppConfig.API_GATEWAY_URL}${AppConfig.AUTH_CONTEXT_PATH}/login`, loginRequest);
  }

  refresh(refreshTokenRequest: RefreshTokenRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${AppConfig.API_GATEWAY_URL}${AppConfig.AUTH_CONTEXT_PATH}/refreshToken`, refreshTokenRequest);
  }

  // specific to google oauth2 authentication

  oauth2Url(): Observable<OAuth2Url> {
    const OAUTH2_SVC_BASE_URL = 'http://localhost:8086/oauth2-svc/api/v1/auth';
    return this.http.get<OAuth2Url>(`${OAUTH2_SVC_BASE_URL}/url`);
  }

  oauth2AccessToken(code: string): Observable<OAuth2Token> {
    const OAUTH2_SVC_BASE_URL = 'http://localhost:8086/oauth2-svc/api/v1/auth';
    return this.http.get<OAuth2Token>(`${OAUTH2_SVC_BASE_URL}/callback?code=` + code);
  }

  // test
  getPrivateMessage(): Observable<PrivateMessage> {
    const OAUTH2_SVC_BASE_URL = 'http://localhost:8086/oauth2-svc/api/v1/private';
    return this.http.get<PrivateMessage>(`${OAUTH2_SVC_BASE_URL}/messages`);
  }
}

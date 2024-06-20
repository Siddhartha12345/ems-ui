import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { RefreshTokenRequest } from '../model/refresh-token-request';
import { LoginResponse } from '../model/login-response';
import { AuthService } from '../services/auth.service';

@Injectable()
export class MonitorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(error => {
      if(error.error.errorCode == 'AUTH004') {
        localStorage.removeItem('access-token');
        let refreshTokenRequest = new RefreshTokenRequest();
        refreshTokenRequest.refreshToken = localStorage.getItem('refresh-token');
        console.log('Refresh Token Request:', refreshTokenRequest);
        return this.authService.refresh(refreshTokenRequest).pipe(
          map((response: LoginResponse) => {
            console.log('Received fresh access and refresh token:', response);
            localStorage.setItem('access-token', response.accessToken);
            console.log('Latest local storage values:', localStorage);
            request = request.clone({
              headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`
              })
            });
          }),
          switchMap(() => {
            console.log('switchMap executed!!');
            return next.handle(request)
          })
        )
      }
      return throwError(error);
    }));
  }
}

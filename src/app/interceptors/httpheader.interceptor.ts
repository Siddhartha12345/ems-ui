import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpheaderInterceptor implements HttpInterceptor {

  accessToken: string;

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Hey...its the http header interceptor...');
    this.accessToken = localStorage.getItem('access-token');
    console.log('Access token 1', this.accessToken);
    if(this.accessToken) {
      request = request.clone({
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`
        })
      });
      console.log('Sent Http Headers:', request);
    }
    return next.handle(request);
  }
}

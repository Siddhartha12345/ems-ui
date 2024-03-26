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

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const httpReq = request.clone({
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json'
      })
    });
    console.log('Sent Http Headers:', httpReq);
    return next.handle(httpReq);
  }
}

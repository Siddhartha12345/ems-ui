import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return new Observable(observer => {
      //subscribing to the request
      next.handle(request).subscribe(
        // success
        (res: HttpResponse<any>) => {
          if(res instanceof HttpResponse) {
            // continuing the HTTP cycle
            console.log('Successfully received response', res);
            observer.next(res);
          }
        },
        (err: HttpErrorResponse) => {
          if(err.status != 400) { // opting out the 400 bad request condition
            console.log('Error encountered', err);
            const navigationExtras: NavigationExtras = {
              state: {
                errorStatus: err.error.status
              }
            };
            this.router.navigateByUrl('/error', navigationExtras);
          }
        }
      )
    });
  }
}
